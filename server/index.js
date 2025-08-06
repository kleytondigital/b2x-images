const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
// Carregar variáveis de ambiente
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: './config.env' });
}

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

const config = require('./config');
const app = express();
const PORT = config.server.port;

// Middlewares de segurança
app.use(helmet());
app.use(cors({
    origin: config.server.nodeEnv === 'production' ? ['https://seu-dominio.com'] : ['http://localhost:3000'],
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'B2X Gestor de Imagens está funcionando!',
        timestamp: new Date().toISOString()
    });
});

// Servir arquivos estáticos (sempre em produção, ou se o build existir)
const buildPath = path.join(__dirname, '../client/build');
if (config.server.nodeEnv === 'production' || require('fs').existsSync(buildPath)) {
    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: config.server.nodeEnv === 'development' ? err.message : 'Algo deu errado'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📁 Ambiente: ${config.server.nodeEnv}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);

    // Log das variáveis de ambiente (apenas em desenvolvimento)
    if (config.server.nodeEnv === 'development') {
        console.log('🔧 Variáveis de ambiente:');
        console.log('MINIO_ENDPOINT:', config.minio.endpoint);
        console.log('MINIO_PORT:', config.minio.port);
        console.log('MINIO_USE_SSL:', config.minio.useSSL);
        console.log('MINIO_ACCESS_KEY:', config.minio.accessKey);
        console.log('MINIO_BUCKET_NAME:', config.minio.bucketName);
    }
});