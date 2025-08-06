# 🔧 Troubleshooting EasyPanel - B2X Gestor de Imagens

## ❌ Problemas Comuns

### **1. Erro SIGTERM / npm error path /app**

**Sintomas:**

```
npm error path /app
npm error command failed
npm error signal SIGTERM
```

**Solução:**

1. **Use o Dockerfile simples**:

   ```bash
   docker build -f Dockerfile.simple -t b2x-gestor-images:latest .
   ```

2. **Verifique as variáveis de ambiente no EasyPanel**:
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

### **2. Erro "Cannot GET" na porta 3031**

**Sintomas:**

- Aplicação não responde na porta 3031
- Erro 404 ou "Cannot GET"

**Solução:**

1. **Verifique os logs no EasyPanel**
2. **Use o Dockerfile simples**:
   ```bash
   docker build -f Dockerfile.simple -t b2x-gestor-images:latest .
   docker tag b2x-gestor-images:latest SEU_USUARIO/b2x-gestor-images:latest
   docker push SEU_USUARIO/b2x-gestor-images:latest
   ```

### **3. Erro de Build no EasyPanel**

**Solução:**

1. **Teste local primeiro**:

   ```bash
   # Build local
   docker build -f Dockerfile.simple -t b2x-gestor-images:latest .

   # Teste local
   docker run -p 3031:3031 -e NODE_ENV=production b2x-gestor-images:latest
   ```

2. **Verifique se o Dockerfile está correto**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY . .
   RUN npm install
   RUN cd client && npm install
   RUN cd client && npm run build
   EXPOSE 3031
   ENV NODE_ENV=production
   ENV PORT=3031
   CMD ["node", "server/index.js"]
   ```

## 🚀 Deploy Alternativo

### **Opção 1: Git Repository (Recomendado)**

1. **No EasyPanel**:

   - New Project → Git Repository
   - Conecte seu repositório

2. **Configuração**:

   ```
   Build Command: npm install && cd client && npm install && npm run build
   Start Command: npm start
   Port: 3031
   ```

3. **Variáveis de Ambiente** (todas listadas acima)

### **Opção 2: Docker Image (Se preferir)**

1. **Build com Dockerfile simples**:

   ```bash
   docker build -f Dockerfile.simple -t b2x-gestor-images:latest .
   docker tag b2x-gestor-images:latest SEU_USUARIO/b2x-gestor-images:latest
   docker push SEU_USUARIO/b2x-gestor-images:latest
   ```

2. **No EasyPanel**:
   - New Project → Docker Image
   - Image: `SEU_USUARIO/b2x-gestor-images:latest`
   - Port: `3031`

## 🔍 Verificação

### **1. Health Check**:

```bash
curl https://seu-dominio.com/api/health
```

### **2. Logs no EasyPanel**:

- Vá em "Logs" no projeto
- Verifique se há erros de inicialização

### **3. Teste da Aplicação**:

- URL: `https://seu-dominio.com`
- Login: `b2x` / `b2x`

## ✅ Solução Recomendada

**Use o Git Repository no EasyPanel** - É mais confiável e evita problemas de Docker:

1. **Configuração**:

   ```
   Build Command: npm install && cd client && npm install && npm run build
   Start Command: npm start
   Port: 3031
   ```

2. **Variáveis de Ambiente**: Todas as 10 variáveis listadas acima

3. **Deploy**: Clique em Deploy

**Esta opção é mais estável e evita problemas de Docker!** 🎉
