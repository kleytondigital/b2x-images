# 🔧 Solução para Deploy no EasyPanel

## ❌ Problema Identificado

O erro `manifest for kleytondigital/b2x-images:latest not found` indica que você está tentando usar uma imagem Docker que não existe.

## ✅ Soluções

### **Opção 1: Deploy via Git (Recomendado)**

1. **No EasyPanel**:

   - Vá em "New Project"
   - Selecione "Git Repository"
   - Conecte seu repositório GitHub/GitLab

2. **Configuração**:

   ```
   Build Command: npm install && cd client && npm install && npm run build
   Start Command: npm start
   Port: 3002
   ```

3. **Variáveis de Ambiente** (no EasyPanel):
   ```
   NODE_ENV=production
   PORT=3002
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

### **Opção 2: Deploy via Docker (Se preferir)**

1. **Build da imagem localmente**:

   ```bash
   docker build -t b2x-gestor-images .
   ```

2. **Push para Docker Hub**:

   ```bash
   docker tag b2x-gestor-images seu-usuario/b2x-gestor-images
   docker push seu-usuario/b2x-gestor-images
   ```

3. **No EasyPanel**:
   - Use a imagem: `seu-usuario/b2x-gestor-images:latest`

## 🚀 Passo a Passo Simplificado

### **1. Preparar Repositório**:

```bash
# Certifique-se de que todos os arquivos estão commitados
git add .
git commit -m "Deploy: B2X Gestor de Imagens"
git push origin main
```

### **2. No EasyPanel**:

1. **Criar Novo Projeto**:

   - EasyPanel → New Project
   - Selecione "Git Repository"
   - Conecte seu repositório

2. **Configurar Build**:

   - Build Command: `npm install && cd client && npm install && npm run build`
   - Start Command: `npm start`
   - Port: `3002`

3. **Adicionar Variáveis de Ambiente**:

   - Clique em "Environment Variables"
   - Adicione todas as variáveis listadas acima

4. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o build e deploy

## 📋 Arquivos Importantes

Certifique-se de que estes arquivos estão no repositório:

```
b2x-gestor-images/
├── package.json              ✅
├── client/package.json       ✅
├── server/index.js           ✅
├── config.env               ✅
├── easypanel.config.json    ✅
└── todos os arquivos do projeto
```

## 🔍 Verificação

Após o deploy:

1. **Health Check**:

   ```bash
   curl https://seu-dominio.com/api/health
   ```

2. **Teste da Aplicação**:
   - Acesse: `https://seu-dominio.com`
   - Login: `b2x` / `b2x`

## 🎯 Comandos de Deploy

### **Local (para testar)**:

```bash
npm run deploy
```

### **No EasyPanel**:

- Build Command: `npm install && cd client && npm install && npm run build`
- Start Command: `npm start`

## ❌ Evite

- Não use Docker se não souber configurar
- Não use imagens que não existem
- Não esqueça das variáveis de ambiente

## ✅ Recomendação

**Use a Opção 1 (Git Repository)** - É mais simples e direta!
