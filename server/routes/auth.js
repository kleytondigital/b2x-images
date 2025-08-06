const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acesso necessário' });
    }

    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

// Login
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // Validação básica
        if (!username || !password) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
        }

        // Verificar credenciais (hardcoded para simplificar)
        if (username === config.auth.adminUser && password === config.auth.adminPassword) {
            const token = jwt.sign({ username, role: 'admin' },
                config.jwt.secret, { expiresIn: '24h' }
            );

            res.json({
                success: true,
                message: 'Login realizado com sucesso!',
                token,
                user: { username, role: 'admin' }
            });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Verificar token
router.get('/verify', authenticateToken, (req, res) => {
    res.json({
        valid: true,
        user: req.user
    });
});

// Logout (opcional - o frontend pode apenas remover o token)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;