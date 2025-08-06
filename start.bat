@echo off
echo Iniciando B2X Gestor de Imagens...
echo.

echo Iniciando servidor backend...
start "Backend" cmd /k "npm run server"

echo Aguardando 3 segundos...
timeout /t 3 /nobreak > nul

echo Iniciando frontend...
start "Frontend" cmd /k "cd client && npm start"

echo.
echo Sistema iniciado!
echo Backend: http://localhost:3002
echo Frontend: http://localhost:3000
echo.
echo Pressione qualquer tecla para sair...
pause > nul 