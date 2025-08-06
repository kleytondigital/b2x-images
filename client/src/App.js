import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : < Navigate to = "/login"
    replace / > ;
};

function App() {
    return ( <
        AuthProvider >
        <
        Router >
        <
        div className = "App" >
        <
        Toaster position = "top-right"
        toastOptions = {
            {
                duration: 4000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                    },
                },
                error: {
                    duration: 4000,
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                },
            }
        }
        />

        <
        Routes >
        <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/dashboard"
        element = { <
            ProtectedRoute >
            <
            Dashboard / >
            <
            /ProtectedRoute>
        }
        /> <
        Route path = "/"
        element = { < Navigate to = "/login"
            replace / > }
        /> <
        /Routes> <
        /div> <
        /Router> <
        /AuthProvider>
    );
}

export default App;