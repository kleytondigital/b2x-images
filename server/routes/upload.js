const express = require('express');
const multer = require('multer');
const Minio = require('minio');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { authenticateToken } = require('../middleware/auth');
const config = require('../config');
const router = express.Router();

// Configuração do MinIO
const minioClient = new Minio.Client({
    endPoint: config.minio.endpoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey
});

// Configuração do Multer para upload temporário
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, cb) => {
        // Permitir apenas imagens
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas arquivos de imagem são permitidos!'));
        }
    }
});

// Função para gerar URL de acesso (usando presigned URL como fallback)
const generateAccessUrl = async (objectName) => {
    try {
        // Tentar gerar URL pré-assinada (mais confiável)
        const presignedUrl = await minioClient.presignedGetObject(
            config.minio.bucketName,
            objectName,
            24 * 60 * 60 // 24 horas
        );
        return presignedUrl;
    } catch (error) {
        console.error('Erro ao gerar URL de acesso:', error);
        // Fallback para URL direta
        const baseUrl = `https://${config.minio.endpoint}`;
        return `${baseUrl}/${config.minio.bucketName}/${objectName}`;
    }
};

// Função para gerar URL pré-assinada (opcional)
const generatePresignedUrl = async(objectName, expiresIn = 604800) => {
    try {
        return await minioClient.presignedGetObject(
            config.minio.bucketName,
            objectName,
            expiresIn
        );
    } catch (error) {
        console.error('Erro ao gerar URL pré-assinada:', error);
        return null;
    }
};

// Upload de imagem
router.post('/image', authenticateToken, upload.single('image'), async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
        }

        // Gerar nome único para o arquivo
        const fileExtension = path.extname(req.file.originalname);
        const fileName = `${uuidv4()}${fileExtension}`;
        const objectName = `images/${fileName}`;

        // Upload para o MinIO
        await minioClient.putObject(
            config.minio.bucketName,
            objectName,
            req.file.buffer,
            req.file.size, {
                'Content-Type': req.file.mimetype,
                'x-amz-meta-originalname': req.file.originalname
            }
        );

        // Gerar URLs de acesso
        const accessUrl = await generateAccessUrl(objectName);
        const presignedUrl = await generatePresignedUrl(objectName);

        res.json({
            success: true,
            message: 'Imagem enviada com sucesso!',
            data: {
                fileName: req.file.originalname,
                objectName: objectName,
                size: req.file.size,
                mimeType: req.file.mimetype,
                accessUrl: accessUrl,
                presignedUrl: presignedUrl,
                uploadedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).json({
            error: 'Erro ao fazer upload da imagem',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Upload múltiplo de imagens
router.post('/images', authenticateToken, upload.array('images', 10), async(req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
        }

        const uploadResults = [];

        for (const file of req.files) {
            const fileExtension = path.extname(file.originalname);
            const fileName = `${uuidv4()}${fileExtension}`;
            const objectName = `images/${fileName}`;

            // Upload para o MinIO
            await minioClient.putObject(
                config.minio.bucketName,
                objectName,
                file.buffer,
                file.size, {
                    'Content-Type': file.mimetype,
                    'x-amz-meta-originalname': file.originalname
                }
            );

            const accessUrl = await generateAccessUrl(objectName);
            const presignedUrl = await generatePresignedUrl(objectName);

            uploadResults.push({
                fileName: file.originalname,
                objectName: objectName,
                size: file.size,
                mimeType: file.mimetype,
                accessUrl: accessUrl,
                presignedUrl: presignedUrl,
                uploadedAt: new Date().toISOString()
            });
        }

        res.json({
            success: true,
            message: `${uploadResults.length} imagem(ns) enviada(s) com sucesso!`,
            data: uploadResults
        });

    } catch (error) {
        console.error('Erro no upload múltiplo:', error);
        res.status(500).json({
            error: 'Erro ao fazer upload das imagens',
            details: config.server.nodeEnv === 'development' ? error.message : undefined
        });
    }
});

// Listar imagens
router.get('/images', authenticateToken, async(req, res) => {
    try {
        const objectsList = [];

        const stream = minioClient.listObjects(config.minio.bucketName, 'images/', true);

        stream.on('data', async (obj) => {
            try {
                const accessUrl = await generateAccessUrl(obj.name);
                objectsList.push({
                    fileName: obj.name.split('/').pop() || obj.name,
                    objectName: obj.name,
                    size: obj.size,
                    lastModified: obj.lastModified,
                    accessUrl: accessUrl,
                    mimeType: 'image/jpeg' // Default, pode ser melhorado
                });
            } catch (error) {
                console.error('Erro ao processar objeto:', obj.name, error);
            }
        });

        stream.on('end', () => {
            console.log('Imagens encontradas:', objectsList.length);
            res.json({
                success: true,
                data: objectsList
            });
        });

        stream.on('error', (error) => {
            console.error('Erro ao listar objetos:', error);
            res.status(500).json({ error: 'Erro ao listar imagens' });
        });

    } catch (error) {
        console.error('Erro ao listar imagens:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota proxy para servir imagens
router.get('/image/:objectName', authenticateToken, async(req, res) => {
    try {
        const { objectName } = req.params;

        const stream = await minioClient.getObject(config.minio.bucketName, objectName);
        
        // Obter metadados para definir o Content-Type
        const stat = await minioClient.statObject(config.minio.bucketName, objectName);
        
        res.setHeader('Content-Type', stat.metaData['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        
        stream.pipe(res);
    } catch (error) {
        console.error('Erro ao servir imagem:', error);
        res.status(404).json({ error: 'Imagem não encontrada' });
    }
});

// Deletar imagem
router.delete('/image/:objectName', authenticateToken, async(req, res) => {
    try {
        const { objectName } = req.params;

        await minioClient.removeObject(config.minio.bucketName, objectName);

        res.json({
            success: true,
            message: 'Imagem deletada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao deletar imagem:', error);
        res.status(500).json({ error: 'Erro ao deletar imagem' });
    }
});

module.exports = router;