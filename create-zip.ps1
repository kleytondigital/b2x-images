# 🗜️ Script PowerShell para criar ZIP do projeto B2X Gestor de Imagens
# Para upload no EasyPanel

Write-Host "🗜️ Criando ZIP do projeto..." -ForegroundColor Green

# Nome do arquivo ZIP
$ZIP_NAME = "b2x-gestor-images.zip"

# Remover ZIP anterior se existir
if (Test-Path $ZIP_NAME) {
    Remove-Item $ZIP_NAME
    Write-Host "🗑️ ZIP anterior removido" -ForegroundColor Yellow
}

# Ir para o diretório raiz do projeto
Set-Location ..

# Criar ZIP com todos os arquivos necessários
try {
    # Excluir diretórios e arquivos desnecessários
    $exclude = @(
        "node_modules",
        "client/node_modules", 
        "client/build",
        ".git",
        "*.log",
        ".DS_Store",
        "*.zip"
    )
    
    # Criar ZIP
    Compress-Archive -Path * -DestinationPath $ZIP_NAME -Force
    
    # Verificar se o ZIP foi criado
    if (Test-Path $ZIP_NAME) {
        $size = (Get-Item $ZIP_NAME).Length
        $sizeMB = [math]::Round($size / 1MB, 2)
        
        Write-Host "✅ ZIP criado com sucesso: $ZIP_NAME" -ForegroundColor Green
        Write-Host "📁 Tamanho: $sizeMB MB" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "🚀 Próximos passos:" -ForegroundColor Yellow
        Write-Host "1. Faça upload do ZIP no EasyPanel" -ForegroundColor White
        Write-Host "2. Configure as variáveis de ambiente" -ForegroundColor White
        Write-Host "3. Deploy" -ForegroundColor White
    } else {
        Write-Host "❌ Erro ao criar ZIP" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erro ao criar ZIP: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 