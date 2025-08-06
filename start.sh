#!/bin/sh

# Script de inicialização para B2X Gestor de Imagens
echo "🚀 Iniciando B2X Gestor de Imagens..."

# Verificar se estamos no diretório correto
if [ ! -f "server/index.js" ]; then
    echo "❌ Erro: server/index.js não encontrado"
    exit 1
fi

# Verificar se o build do cliente existe
if [ ! -d "client/build" ]; then
    echo "🔨 Fazendo build do cliente..."
    cd client && npm install && npm run build && cd ..
fi

# Definir variáveis de ambiente padrão se não estiverem definidas
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3031}

echo "📁 Ambiente: $NODE_ENV"
echo "🔗 Porta: $PORT"
echo "📂 Diretório de trabalho: $(pwd)"

# Iniciar o servidor
echo "🚀 Iniciando servidor..."
exec node server/index.js 