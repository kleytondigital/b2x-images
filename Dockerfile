# Dockerfile para B2X Gestor de Imagens
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração primeiro (para cache)
COPY package*.json ./
COPY config.env ./

# Instalar dependências do servidor
RUN npm install

# Copiar código do servidor
COPY server/ ./server/

# Copiar arquivos do cliente
COPY client/ ./client/

# Instalar dependências do cliente
RUN cd client && npm install

# Build do cliente
RUN cd client && npm run build

# Copiar script de inicialização
COPY start.sh ./
RUN chmod +x start.sh

# Criar diretório para logs
RUN mkdir -p /app/logs

# Expor porta
EXPOSE 3031

# Definir variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3031

# Comando de inicialização
CMD ["./start.sh"] 