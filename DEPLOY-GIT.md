# 🚀 Deploy via Git Repository - B2X Gestor de Imagens

## ✅ Repositório Preparado

O repositório Git já está configurado e pronto para deploy!

### **📋 Arquivos Incluídos:**

- ✅ Backend Node.js (porta 3031)
- ✅ Frontend React (porta 3030)
- ✅ Configuração MinIO
- ✅ Sistema de autenticação
- ✅ Upload de imagens
- ✅ Todos os arquivos de configuração

## 🎯 Deploy no EasyPanel

### **1. Criar Novo Projeto:**

1. **Acesse o EasyPanel**
2. **Clique em "New Project"**
3. **Selecione "Git Repository"**
4. **Conecte seu repositório GitHub/GitLab**

### **2. Configuração do Projeto:**

```
Build Command: npm install && cd client && npm install && npm run build
Start Command: npm start
Port: 3031
```

### **3. Variáveis de Ambiente (Obrigatórias):**

Adicione estas 10 variáveis no EasyPanel:

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

### **4. Deploy:**

1. **Clique em "Deploy"**
2. **Aguarde o build e deploy**
3. **Verifique os logs se necessário**

## 🔧 Comandos Git (Se precisar atualizar):

```bash
# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Update: Descrição das mudanças"

# Push para o repositório
git push origin main
```

## ✅ Verificação do Deploy

### **1. Health Check:**

```bash
curl https://seu-dominio.com/api/health
```

**Resposta esperada:**

```json
{
  "status": "OK",
  "message": "B2X Gestor de Imagens está funcionando!",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### **2. Teste da Aplicação:**

- **URL**: `https://seu-dominio.com`
- **Login**: `b2x` / `b2x`
- **Funcionalidades**:
  - ✅ Upload de imagens
  - ✅ Links de acesso
  - ✅ Deletar imagens
  - ✅ Interface responsiva

## 🔍 Troubleshooting

### **Se o deploy falhar:**

1. **Verifique os logs no EasyPanel**
2. **Confirme se todas as variáveis de ambiente estão definidas**
3. **Verifique se o MinIO está acessível**
4. **Teste localmente primeiro**: `npm run deploy`

### **Se a aplicação não carregar:**

1. **Verifique se a porta 3031 está configurada**
2. **Confirme se o build foi bem-sucedido**
3. **Verifique se o MinIO está conectado**

## 🎉 Deploy Concluído!

Após o deploy bem-sucedido, você terá:

- ✅ **Aplicação funcionando** na porta 3031
- ✅ **MinIO conectado** para armazenamento
- ✅ **Upload de imagens** funcionando
- ✅ **Links de acesso** gerados
- ✅ **Interface moderna** e responsiva
- ✅ **Sistema de login** seguro

## 📞 Suporte

Se houver problemas:

1. Verifique os logs no EasyPanel
2. Confirme as variáveis de ambiente
3. Teste o health check
4. Verifique a conectividade com MinIO

**A aplicação está pronta para uso!** 🚀
