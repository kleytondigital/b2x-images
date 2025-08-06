// Configuração para desenvolvimento e produção
const config = {
    // Configurações do MinIO
    minio: {
        endpoint: process.env.MINIO_ENDPOINT || 'gestor-minio.y0q0vs.easypanel.host',
        port: parseInt(process.env.MINIO_PORT) || 443,
        useSSL: process.env.MINIO_USE_SSL === 'true' || true,
        accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
        secretKey: process.env.MINIO_SECRET_KEY || '@senhaELAST007',
        bucketName: process.env.MINIO_BUCKET_NAME || 'b2x-images'
    },

    // Configurações do JWT
    jwt: {
        secret: process.env.JWT_SECRET || 'b2x-gestor-images-secret-key-2024'
    },

    // Configurações do servidor
    server: {
        port: process.env.PORT || 3031,
        nodeEnv: process.env.NODE_ENV || 'development'
    },

    // Credenciais de login
    auth: {
        adminUser: process.env.ADMIN_USER || 'b2x',
        adminPassword: process.env.ADMIN_PASSWORD || 'b2x'
    }
};

module.exports = config;