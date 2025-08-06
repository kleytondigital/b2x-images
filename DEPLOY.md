# 🚀 Deploy no EasyPanel - B2X Gestor de Imagens

## 📋 Pré-requisitos

- Conta no EasyPanel
- Repositório Git configurado
- MinIO configurado e acessível

## 🔧 Configuração do Deploy

### 1. **Preparar o Repositório**

Certifique-se de que todos os arquivos estão no repositório:

- `package.json` (raiz)
- `client/package.json`
- `server/` (todos os arquivos)
- `client/` (todos os arquivos)
- `config.env` (com as configurações corretas)
- `Dockerfile`
- `.dockerignore`

### 2. **Configuração no EasyPanel**

#### **Opção A: Deploy via Git (Recomendado)**

1. **Conectar Repositório**:

   - Acesse o EasyPanel
   - Clique em "New Project"
   - Selecione "Git Repository"
   - Conecte seu repositório

2. **Configurar Build**:

   ```
   Build Command: npm run install-all && npm run build
   Start Command: npm start
   Port: 3002
   ```

3. **Variáveis de Ambiente**:
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

#### **Opção B: Deploy via Docker**

1. **Usar o Dockerfile**:
   - O EasyPanel detectará automaticamente o Dockerfile
   - Build será executado automaticamente
   - Aplicação será iniciada com `npm start`

### 3. **Comandos de Deploy**

#### **Comando Único para Deploy**:

```bash
# Build e Start em um comando
npm run build-all
```

#### **Comandos Separados**:

```bash
# Instalar dependências
npm run install-all

# Build do cliente
npm run build

# Iniciar servidor
npm start
```

## 🔄 Processo de Deploy

### **Passo a Passo**:

1. **Push para Git**:

   ```bash
   git add .
   git commit -m "Deploy: B2X Gestor de Imagens"
   git push origin main
   ```

2. **EasyPanel Detecta Mudanças**:

   - Build automático
   - Instalação de dependências
   - Build do React
   - Inicialização do servidor

3. **Verificação**:
   - Health check: `https://seu-dominio.com/api/health`
   - Aplicação: `https://seu-dominio.com`

## 📁 Estrutura de Arquivos

```
b2x-gestor-images/
├── package.json          # Scripts principais
├── config.env           # Configurações
├── Dockerfile           # Configuração Docker
├── .dockerignore        # Otimização Docker
├── easypanel.json       # Configuração EasyPanel
├── server/              # Backend Node.js
│   ├── index.js
│   ├── routes/
│   └── middleware/
└── client/              # Frontend React
    ├── package.json
    ├── public/
    └── src/
```

## 🎯 Scripts Disponíveis

### **Desenvolvimento**:

```bash
npm run dev          # Cliente + Servidor
npm run server       # Apenas servidor
npm run client       # Apenas cliente
```

### **Produção**:

```bash
npm run install-all  # Instalar tudo
npm run build        # Build do cliente
npm start           # Iniciar servidor
npm run build-all   # Build + Start
```

## 🔍 Troubleshooting

### **Problemas Comuns**:

1. **Erro de Build**:

   - Verificar se todas as dependências estão instaladas
   - Verificar se o Node.js está na versão correta

2. **Erro de MinIO**:

   - Verificar se as variáveis de ambiente estão corretas
   - Verificar se o MinIO está acessível

3. **Erro de Porta**:
   - Verificar se a porta 3002 está disponível
   - Verificar se o proxy está configurado corretamente

### **Logs**:

```bash
# Ver logs do EasyPanel
# Acesse o painel do EasyPanel > Logs
```

## ✅ Verificação do Deploy

1. **Health Check**:

   ```bash
   curl https://seu-dominio.com/api/health
   ```

2. **Teste de Login**:

   - Acesse a aplicação
   - Faça login com `b2x` / `b2x`

3. **Teste de Upload**:
   - Faça upload de uma imagem
   - Verifique se o link é gerado

## 🎉 Deploy Concluído!

Após o deploy, sua aplicação estará disponível em:

- **URL**: `https://seu-dominio.com`
- **API**: `https://seu-dominio.com/api/*`
- **Health Check**: `https://seu-dominio.com/api/health`
