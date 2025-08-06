# 🖼️ B2X Gestor de Imagens

Sistema profissional para upload e gerenciamento de imagens com integração MinIO.

## ✨ Funcionalidades

- 🔐 **Autenticação segura** com JWT
- 📤 **Upload drag & drop** de múltiplas imagens
- 🔗 **Geração automática de links** de acesso
- 🖼️ **Preview das imagens** em tempo real
- 📋 **Cópia de links** para área de transferência
- 🗑️ **Deleção de imagens** com confirmação
- 📱 **Interface responsiva** e moderna
- ⚡ **Performance otimizada** com React

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MinIO** - Storage de objetos
- **JWT** - Autenticação
- **Multer** - Upload de arquivos
- **CORS** - Cross-origin resource sharing

### Frontend

- **React** - Biblioteca JavaScript
- **React Router** - Roteamento
- **React Dropzone** - Upload drag & drop
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 16+
- NPM ou Yarn
- Acesso ao MinIO

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd b2x-gestor-images
```

### 2. Instale as dependências

```bash
# Instalar dependências do backend
npm install

# Instalar dependências do frontend
cd client
npm install
cd ..
```

### 3. Configure as variáveis de ambiente

Edite o arquivo `config.env` com suas configurações:

```env
# Configurações do MinIO
MINIO_ENDPOINT=console-gestor-minio.y0q0vs.easypanel.host
MINIO_PORT=443
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=senhaELAST007
MINIO_BUCKET_NAME=b2x-images

# Configurações do JWT
JWT_SECRET=b2x-gestor-images-secret-key-2024

# Configurações do servidor
PORT=3001
NODE_ENV=development

# Credenciais de login
ADMIN_USER=b2x
ADMIN_PASSWORD=b2x
```

### 4. Execute o projeto

#### Desenvolvimento (Backend + Frontend)

```bash
npm run dev
```

#### Apenas Backend

```bash
npm run server
```

#### Apenas Frontend

```bash
cd client
npm start
```

## 📱 Como Usar

### 1. Acesse o sistema

- URL: `http://localhost:3000`
- Usuário: `b2x`
- Senha: `b2x`

### 2. Faça upload de imagens

- Arraste e solte imagens na área de upload
- Ou clique para selecionar arquivos
- Formatos suportados: JPG, PNG, GIF, WEBP
- Tamanho máximo: 10MB por arquivo

### 3. Gerencie suas imagens

- Visualize preview das imagens
- Copie links de acesso
- Delete imagens desnecessárias
- Acesse links diretos ou temporários

## 🔧 Configurações Avançadas

### MinIO

O sistema está configurado para usar MinIO como storage. Certifique-se de que:

1. O bucket `b2x-images` existe
2. As credenciais estão corretas
3. O endpoint está acessível

### Segurança

- JWT tokens expiram em 24h
- Upload limitado a 10MB por arquivo
- Apenas imagens são aceitas
- CORS configurado para desenvolvimento

### Produção

Para deploy em produção:

1. Configure `NODE_ENV=production`
2. Atualize as URLs de CORS
3. Use HTTPS
4. Configure proxy reverso se necessário

## 📁 Estrutura do Projeto

```
b2x-gestor-images/
├── server/
│   ├── index.js          # Servidor principal
│   └── routes/
│       ├── auth.js       # Rotas de autenticação
│       └── upload.js     # Rotas de upload
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   └── Dashboard.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── config.env            # Variáveis de ambiente
├── package.json
└── README.md
```

## 🔍 API Endpoints

### Autenticação

- `POST /api/auth/login` - Login do usuário
- `GET /api/auth/verify` - Verificar token
- `POST /api/auth/logout` - Logout

### Upload

- `POST /api/upload/image` - Upload de uma imagem
- `POST /api/upload/images` - Upload de múltiplas imagens
- `GET /api/upload/images` - Listar imagens
- `DELETE /api/upload/image/:objectName` - Deletar imagem

## 🐛 Solução de Problemas

### Erro de conexão com MinIO

- Verifique as credenciais no `config.env`
- Confirme se o endpoint está acessível
- Teste a conectividade com o MinIO

### Erro de upload

- Verifique o tamanho do arquivo (máx. 10MB)
- Confirme se é uma imagem válida
- Verifique as permissões do bucket

### Problemas de autenticação

- Limpe o localStorage do navegador
- Verifique se o token não expirou
- Confirme as credenciais de login

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas:

- Abra uma issue no GitHub
- Entre em contato com a equipe B2X

---

**B2X Gestor de Imagens** - Sistema profissional para gerenciamento de imagens 🚀
