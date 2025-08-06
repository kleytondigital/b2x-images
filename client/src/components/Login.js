import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, User, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error('Preencha todos os campos');
            return;
        }

        setLoading(true);

        try {
            const result = await login(username, password);

            if (result.success) {
                toast.success('Login realizado com sucesso!');
                navigate('/dashboard');
            } else {
                toast.error(result.error || 'Erro ao fazer login');
            }
        } catch (error) {
            toast.error('Erro inesperado. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4" >
        <
        div className = "max-w-md w-full space-y-8" > { /* Logo e Título */ } <
        div className = "text-center fade-in" >
        <
        div className = "mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-6" >
        <
        div className = "text-3xl font-bold text-blue-600" > B2X < /div> <
        /div> <
        h2 className = "text-3xl font-bold text-white mb-2" >
        Gestor de Imagens <
        /h2> <
        p className = "text-blue-100 text-sm" >
        Faça login para acessar o painel <
        /p> <
        /div>

        { /* Formulário */ } <
        div className = "bg-white rounded-2xl shadow-2xl p-8 space-y-6 fade-in" >
        <
        form onSubmit = { handleSubmit }
        className = "space-y-6" > { /* Campo Usuário */ } <
        div className = "space-y-2" >
        <
        label htmlFor = "username"
        className = "block text-sm font-medium text-gray-700" >
        Usuário <
        /label> <
        div className = "relative" >
        <
        div className = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" >
        <
        User className = "h-5 w-5 text-gray-400" / >
        <
        /div> <
        input id = "username"
        name = "username"
        type = "text"
        required value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        className = "block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder = "Digite seu usuário" /
        >
        <
        /div> <
        /div>

        { /* Campo Senha */ } <
        div className = "space-y-2" >
        <
        label htmlFor = "password"
        className = "block text-sm font-medium text-gray-700" >
        Senha <
        /label> <
        div className = "relative" >
        <
        div className = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" >
        <
        Lock className = "h-5 w-5 text-gray-400" / >
        <
        /div> <
        input id = "password"
        name = "password"
        type = { showPassword ? 'text' : 'password' }
        required value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        className = "block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder = "Digite sua senha" /
        >
        <
        button type = "button"
        onClick = {
            () => setShowPassword(!showPassword) }
        className = "absolute inset-y-0 right-0 pr-3 flex items-center" >
        {
            showPassword ? ( <
                EyeOff className = "h-5 w-5 text-gray-400 hover:text-gray-600" / >
            ) : ( <
                Eye className = "h-5 w-5 text-gray-400 hover:text-gray-600" / >
            )
        } <
        /button> <
        /div> <
        /div>

        { /* Botão de Login */ } <
        button type = "submit"
        disabled = { loading }
        className = "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg" >
        {
            loading ? ( <
                div className = "flex items-center" >
                <
                div className = "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" > < /div>
                Entrando... <
                /div>
            ) : ( <
                div className = "flex items-center" >
                <
                LogIn className = "h-5 w-5 mr-2" / >
                Entrar <
                /div>
            )
        } <
        /button> <
        /form>

        { /* Informações de Acesso */ } <
        div className = "mt-6 p-4 bg-blue-50 rounded-lg" >
        <
        h3 className = "text-sm font-medium text-blue-800 mb-2" >
        Credenciais de Acesso:
        <
        /h3> <
        div className = "text-xs text-blue-700 space-y-1" >
        <
        p > < strong > Usuário: < /strong> b2x</p >
        <
        p > < strong > Senha: < /strong> b2x</p >
        <
        /div> <
        /div> <
        /div>

        { /* Footer */ } <
        div className = "text-center" >
        <
        p className = "text-blue-100 text-sm" > ©2024 B2X Gestor de Imagens.Todos os direitos reservados. <
        /p> <
        /div> <
        /div> <
        /div>
    );
};

export default Login;