import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verificar token ao inicializar
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    // Configurar axios com interceptor para token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [isAuthenticated]);

    const verifyToken = async(token) => {
        try {
            const response = await axios.get('/api/auth/verify', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.valid) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                logout();
            }
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async(username, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password
            });

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                setUser(user);
                setIsAuthenticated(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return { success: true };
            }
        } catch (error) {
            console.error('Erro no login:', error);
            return {
                success: false,
                error: error.response && error.response.data && error.response.data.error || 'Erro ao fazer login'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        delete axios.defaults.headers.common['Authorization'];
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return ( <
        AuthContext.Provider value = { value } > { children } <
        /AuthContext.Provider>
    );
};