#!/bin/bash

# 🐳 Script para Build e Push da Imagem Docker
# B2X Gestor de Imagens

echo "🐳 Iniciando build da imagem Docker..."

# Configurações
IMAGE_NAME="b2x-gestor-images"
TAG="latest"

# Perguntar qual Dockerfile usar
echo "🔨 Escolha o tipo de build:"
echo "1) Dockerfile padrão (otimizado)"
echo "2) Dockerfile simples"
echo "3) Dockerfile EasyPanel (recomendado)"
read -p "Digite 1, 2 ou 3: " -n 1 -r
echo

if [[ $REPLY =~ ^[2]$ ]]; then
    echo "🔨 Usando Dockerfile simples..."
    docker build -f Dockerfile.simple -t $IMAGE_NAME:$TAG .
elif [[ $REPLY =~ ^[3]$ ]]; then
    echo "🔨 Usando Dockerfile EasyPanel..."
    docker build -f Dockerfile.easypanel -t $IMAGE_NAME:$TAG .
else
    echo "🔨 Usando Dockerfile padrão..."
    docker build -t $IMAGE_NAME:$TAG .
fi

if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    
    # Perguntar se quer fazer push
    read -p "🚀 Deseja fazer push para o Docker Hub? (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Solicitar nome do usuário do Docker Hub
        read -p "👤 Digite seu nome de usuário do Docker Hub: " DOCKER_USER
        
        # Tag da imagem
        echo "🏷️  Fazendo tag da imagem..."
        docker tag $IMAGE_NAME:$TAG $DOCKER_USER/$IMAGE_NAME:$TAG
        
        # Push para Docker Hub
        echo "📤 Fazendo push para Docker Hub..."
        docker push $DOCKER_USER/$IMAGE_NAME:$TAG
        
        if [ $? -eq 0 ]; then
            echo "✅ Push concluído com sucesso!"
            echo "🎉 Imagem disponível em: $DOCKER_USER/$IMAGE_NAME:$TAG"
            echo ""
            echo "📋 Para usar no EasyPanel:"
            echo "   Imagem: $DOCKER_USER/$IMAGE_NAME:$TAG"
            echo "   Porta: 3031"
        else
            echo "❌ Erro ao fazer push!"
        fi
    else
        echo "ℹ️  Push cancelado."
        echo "📋 Para fazer push manualmente:"
        echo "   docker tag $IMAGE_NAME:$TAG SEU_USUARIO/$IMAGE_NAME:$TAG"
        echo "   docker push SEU_USUARIO/$IMAGE_NAME:$TAG"
    fi
else
    echo "❌ Erro no build da imagem!"
    exit 1
fi 