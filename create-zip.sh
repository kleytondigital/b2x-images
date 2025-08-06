#!/bin/bash

# 🗜️ Script para criar ZIP do projeto B2X Gestor de Imagens
# Para upload no EasyPanel

echo "🗜️ Criando ZIP do projeto..."

# Nome do arquivo ZIP
ZIP_NAME="b2x-gestor-images.zip"

# Remover ZIP anterior se existir
if [ -f "$ZIP_NAME" ]; then
    rm "$ZIP_NAME"
    echo "🗑️ ZIP anterior removido"
fi

# Criar ZIP com todos os arquivos necessários
zip -r "$ZIP_NAME" . \
    -x "node_modules/*" \
    -x "client/node_modules/*" \
    -x "client/build/*" \
    -x ".git/*" \
    -x "*.log" \
    -x ".DS_Store" \
    -x "*.zip"

if [ $? -eq 0 ]; then
    echo "✅ ZIP criado com sucesso: $ZIP_NAME"
    echo "📁 Tamanho: $(du -h "$ZIP_NAME" | cut -f1)"
    echo ""
    echo "🚀 Próximos passos:"
    echo "1. Faça upload do ZIP no EasyPanel"
    echo "2. Configure as variáveis de ambiente"
    echo "3. Deploy"
else
    echo "❌ Erro ao criar ZIP"
    exit 1
fi 