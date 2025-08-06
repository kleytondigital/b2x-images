# 🚀 B2X Gestor de Imagens - Deploy Final

## ✅ Configuração Atualizada

### **Portas Configuradas:**

- **Frontend**: Porta 3030
- **Backend**: Porta 3031
- **Docker**: Porta 3031

## 🐳 Deploy via Docker Hub

### **1. Build e Push da Imagem:**

```bash
# Dar permissão de execução
chmod +x docker-build.sh

# Executar script automatizado
./docker-build.sh
```

### **2. No EasyPanel:**

1. **Criar Novo Projeto**:

   - EasyPanel → New Project
   - Selecione **"Docker Image"**

2. **Configuração**:

   ```
   Image: SEU_USUARIO/b2x-gestor-images:latest
   Port: 3031
   ```

3. **Variáveis de Ambiente**:
   ```
   NODE_ENV=production
   PORT=3031
   MINIO_ENDPOINT=gestor-minio.y0q0vs.easypanel.host
   MINIO_PORT=443
   MINIO_USE_SSL=true
   MINIO_ACCESS_KEY=admin
   MINIO_SECRET_KEY=@senhaELAST007
   MINIO_BUCKET_NAME=b2x-images
   JWT_SECRET=b2x-gestor-images-secret-key-2024
   ADMIN_USER=b2x
   ADMIN_PASSWORD=b2x
   ```

## 🔧 Desenvolvimento Local

### **Comandos:**

```bash
# Instalar dependências
npm run install-all

# Desenvolvimento (portas 3030 e 3031)
npm run dev

# Apenas servidor (porta 3031)
npm run server

# Apenas cliente (porta 3030)
npm run client

# Produção local
npm run deploy
```

### **Teste Local:**

- **Frontend**: `http://localhost:3030`
- **Backend**: `http://localhost:3031`
- **Health Check**: `http://localhost:3031/api/health`

## 📁 Estrutura do Projeto

```
b2x-gestor-images/
├── package.json              # Scripts principais
├── config.env               # Configurações locais
├── Dockerfile               # Configuração Docker
├── .dockerignore            # Otimização Docker
├── docker-build.sh          # Script de build/push
├── easypanel.json           # Configuração EasyPanel
├── .easypanel              # Configuração alternativa
├── easypanel.config.json   # Configuração alternativa
├── server/                  # Backend Node.js
│   ├── index.js
│   ├── config.js           # Configuração centralizada
│   ├── routes/
│   └── middleware/
└── client/                  # Frontend React
    ├── package.json
    ├── public/
    └── src/
```

## 🎯 Funcionalidades

- ✅ **Login seguro** com JWT
- ✅ **Upload de imagens** com drag-and-drop
- ✅ **MinIO integrado** para armazenamento
- ✅ **Links diretos** e temporários
- ✅ **Interface moderna** e responsiva
- ✅ **Deletar imagens**
- ✅ **Visualização** de imagens

## 🔍 Troubleshooting

### **Problemas Comuns:**

1. **Erro de porta em uso**:

   - Verificar se as portas 3030 e 3031 estão livres
   - Usar `netstat -ano | findstr :3030` (Windows)

2. **Erro de MinIO**:

   - Verificar se as variáveis de ambiente estão corretas
   - Verificar se o MinIO está acessível

3. **Erro de build Docker**:
   - Verificar se o Docker está instalado
   - Verificar se há espaço suficiente

## ✅ Verificação do Deploy

Após o deploy:

1. **Health Check**:

   ```bash
   curl https://seu-dominio.com/api/health
   ```

2. **Teste da Aplicação**:
   - URL: `https://seu-dominio.com`
   - Login: `b2x` / `b2x`

## 🎉 Deploy Concluído!

A aplicação está configurada e pronta para uso com:

- ✅ Frontend na porta 3030
- ✅ Backend na porta 3031
- ✅ Docker configurado
- ✅ EasyPanel compatível
- ✅ MinIO conectado
- ✅ Upload funcionando
- ✅ Links gerados corretamente
