# 🐳 Deploy via Docker - B2X Gestor de Imagens

## ✅ Configuração Atualizada

### **Portas Configuradas:**

- **Frontend**: Porta 3030
- **Backend**: Porta 3031
- **Docker**: Porta 3031

## 🚀 Deploy via Docker Hub

### **1. Build e Push da Imagem:**

#### **Opção A: Script Automatizado**

```bash
# Dar permissão de execução
chmod +x docker-build.sh

# Executar script
./docker-build.sh
```

#### **Opção B: Comandos Manuais**

```bash
# Build da imagem
docker build -t b2x-gestor-images:latest .

# Tag da imagem (substitua SEU_USUARIO)
docker tag b2x-gestor-images:latest SEU_USUARIO/b2x-gestor-images:latest

# Push para Docker Hub
docker push SEU_USUARIO/b2x-gestor-images:latest
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

### **Comandos Atualizados:**

#### **Desenvolvimento:**

```bash
# Cliente + Servidor (portas 3030 e 3031)
npm run dev

# Apenas servidor (porta 3031)
npm run server

# Apenas cliente (porta 3030)
npm run client
```

#### **Produção Local:**

```bash
# Build + Start
npm run deploy
```

### **Teste Local:**

- **Frontend**: `http://localhost:3030`
- **Backend**: `http://localhost:3031`
- **Health Check**: `http://localhost:3031/api/health`

## 📁 Arquivos Atualizados

### **Portas Alteradas:**

- ✅ `config.env` - Porta 3031
- ✅ `client/package.json` - Porta 3030 (start) e proxy 3031
- ✅ `server/config.js` - Porta padrão 3031
- ✅ `Dockerfile` - Porta 3031
- ✅ `easypanel.json` - Porta 3031
- ✅ `.easypanel` - Porta 3031
- ✅ `easypanel.config.json` - Porta 3031

### **Novos Arquivos:**

- ✅ `Dockerfile` - Configuração Docker
- ✅ `.dockerignore` - Otimização Docker
- ✅ `docker-build.sh` - Script de build/push

## 🎯 Processo Completo

### **1. Preparar Repositório:**

```bash
git add .
git commit -m "Update: Portas 3030/3031 e Docker config"
git push origin main
```

### **2. Build e Push Docker:**

```bash
./docker-build.sh
```

### **3. Deploy no EasyPanel:**

1. **Criar Projeto** → Docker Image
2. **Configurar Imagem** → `SEU_USUARIO/b2x-gestor-images:latest`
3. **Configurar Porta** → `3031`
4. **Adicionar Variáveis de Ambiente**
5. **Deploy**

## ✅ Verificação

Após o deploy:

1. **Health Check**:

   ```bash
   curl https://seu-dominio.com/api/health
   ```

2. **Teste da Aplicação**:
   - URL: `https://seu-dominio.com`
   - Login: `b2x` / `b2x`

## 🎉 Deploy Concluído!

A aplicação agora está configurada com:

- ✅ Frontend na porta 3030
- ✅ Backend na porta 3031
- ✅ Docker configurado
- ✅ EasyPanel compatível
- ✅ MinIO conectado
- ✅ Upload funcionando
