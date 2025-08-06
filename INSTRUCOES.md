# 🚀 B2X Gestor de Imagens - Instruções Rápidas

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Acesso ao MinIO configurado

## ⚡ Início Rápido

### 1. Instalar dependências

```bash
npm install
cd client && npm install && cd ..
```

### 2. Iniciar o sistema

```bash
# Opção 1: Script automático (Windows)
start.bat

# Opção 2: Manual
npm run dev
```

### 3. Acessar o sistema

- **URL:** http://localhost:3000
- **Usuário:** b2x
- **Senha:** b2x

## 🔧 Configuração

### Variáveis de Ambiente

Edite o arquivo `config.env`:

```env
# MinIO
MINIO_ENDPOINT=console-gestor-minio.y0q0vs.easypanel.host
MINIO_PORT=443
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=senhaELAST007
MINIO_BUCKET_NAME=b2x-images

# Servidor
PORT=3002
JWT_SECRET=b2x-gestor-images-secret-key-2024

# Login
ADMIN_USER=b2x
ADMIN_PASSWORD=b2x
```

## 📱 Como Usar

### 1. Login

- Acesse http://localhost:3000
- Use as credenciais: b2x / b2x

### 2. Upload de Imagens

- Arraste e solte imagens na área de upload
- Ou clique para selecionar arquivos
- Formatos: JPG, PNG, GIF, WEBP
- Tamanho máximo: 10MB

### 3. Gerenciar Imagens

- Visualize preview das imagens
- Copie links de acesso
- Delete imagens desnecessárias

## 🐛 Solução de Problemas

### Porta em uso

- Mude a porta no `config.env`
- Ou pare outros serviços na porta

### Erro de conexão MinIO

- Verifique as credenciais
- Confirme se o bucket existe
- Teste a conectividade

### Frontend não carrega

- Verifique se o React está rodando
- Confirme se a porta 3000 está livre

## 📞 Suporte

Para problemas ou dúvidas, consulte o README.md completo.
