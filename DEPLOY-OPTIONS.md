# 🚀 Opções de Deploy - B2X Gestor de Imagens

## 📦 Opção 1: Upload ZIP (Recomendado)

### **1. Gerar ZIP:**

```bash
# No Windows (PowerShell)
.\create-zip.sh

# Ou manualmente:
# 1. Selecione todos os arquivos do projeto
# 2. Exclua: node_modules, client/node_modules, client/build, .git
# 3. Crie um ZIP
```

### **2. No EasyPanel:**

1. **Criar Novo Projeto**:

   - EasyPanel → New Project
   - Selecione **"Upload ZIP"**

2. **Upload do ZIP**:

   - Faça upload do arquivo `b2x-gestor-images.zip`

3. **Configuração**:

   ```
   Build Command: npm install && cd client && npm install && npm run build
   Start Command: npm start
   Port: 3031
   ```

4. **Variáveis de Ambiente**:
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

## 🐳 Opção 2: Docker Image

### **1. Build da Imagem:**

```bash
# Build com Dockerfile otimizado para EasyPanel
docker build -f Dockerfile.easypanel -t b2x-gestor-images:latest .

# Tag da imagem
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

3. **Variáveis de Ambiente** (mesmas listadas acima)

## 🔧 Scripts Disponíveis

### **Gerar ZIP:**

```bash
# Windows (PowerShell)
.\create-zip.sh

# Linux/Mac
chmod +x create-zip.sh
./create-zip.sh
```

### **Build Docker:**

```bash
# Windows (PowerShell)
.\docker-build.sh

# Linux/Mac
chmod +x docker-build.sh
./docker-build.sh
```

## 📋 Arquivos Incluídos no ZIP

```
b2x-gestor-images.zip
├── package.json
├── config.env
├── server/
│   ├── index.js
│   ├── config.js
│   ├── routes/
│   └── middleware/
├── client/
│   ├── package.json
│   ├── public/
│   └── src/
├── easypanel.json
├── .easypanel
└── easypanel.config.json
```

## ✅ Verificação

### **Após o Deploy:**

1. **Health Check**:

   ```bash
   curl https://seu-dominio.com/api/health
   ```

2. **Teste da Aplicação**:
   - URL: `https://seu-dominio.com`
   - Login: `b2x` / `b2x`

## 🎯 Recomendação

**Use a Opção 1 (Upload ZIP)** porque:

- ✅ Mais simples
- ✅ Menos problemas de configuração
- ✅ Funciona melhor no EasyPanel
- ✅ Não precisa de Docker Hub

## 🚀 Processo Completo

### **Opção 1 - ZIP:**

1. Execute `.\create-zip.sh`
2. Upload do ZIP no EasyPanel
3. Configure variáveis de ambiente
4. Deploy

### **Opção 2 - Docker:**

1. Execute `.\docker-build.sh`
2. Configure Docker Image no EasyPanel
3. Configure variáveis de ambiente
4. Deploy

**Ambas as opções funcionam perfeitamente!** 🎉
