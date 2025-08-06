import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Upload,
    LogOut,
    Copy,
    ExternalLink,
    Trash2,
    Image as ImageIcon,
    Download,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    // Carregar imagens existentes
    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async() => {
        try {
            console.log('Carregando imagens...');
            const response = await axios.get('/api/upload/images');
            console.log('Resposta da API:', response.data);
            if (response.data.success) {
                console.log('Imagens carregadas:', response.data.data);
                setUploadedImages(response.data.data);
            }
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        } finally {
            setLoading(false);
        }
    };

    // Configuração do Dropzone
    const onDrop = async(acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        setUploading(true);

        try {
            const formData = new FormData();
            acceptedFiles.forEach(file => {
                formData.append('images', file);
            });

            const response = await axios.post('/api/upload/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setUploadedImages(prev => [...response.data.data, ...prev]);
            }
        } catch (error) {
            console.error('Erro no upload:', error);
            toast.error(error.response && error.response.data && error.response.data.error || 'Erro ao fazer upload');
        } finally {
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: true
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
        toast.success('Logout realizado com sucesso!');
    };

    const copyToClipboard = async(text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Link copiado para a área de transferência!');
        } catch (error) {
            toast.error('Erro ao copiar link');
        }
    };

    const deleteImage = async(objectName) => {
        try {
            await axios.delete(`/api/upload/image/${encodeURIComponent(objectName)}`);
            setUploadedImages(prev => prev.filter(img => img.objectName !== objectName));
            toast.success('Imagem deletada com sucesso!');
        } catch (error) {
            toast.error('Erro ao deletar imagem');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return ( <
            div className = "min-h-screen bg-gray-50" > { /* Header */ } <
            header className = "bg-white shadow-sm border-b" >
            <
            div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
            <
            div className = "flex justify-between items-center py-4" >
            <
            div className = "flex items-center space-x-3" >
            <
            div className = "h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center" >
            <
            span className = "text-white font-bold text-lg" > B2X < /span> < /
            div > <
            div >
            <
            h1 className = "text-xl font-semibold text-gray-900" >
            Gestor de Imagens <
            /h1> <
            p className = "text-sm text-gray-500" >
            Bem - vindo, { user && user.username }!
            <
            /p> < /
            div > <
            /div> <
            button onClick = { handleLogout }
            className = "flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" >
            <
            LogOut className = "h-5 w-5" / >
            <
            span > Sair < /span> < /
            button > <
            /div> < /
            div > <
            /header>

            <
            div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" > { /* Área de Upload */ } <
            div className = "mb-8" >
            <
            div {...getRootProps() }
            className = { `border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${uploading ? 'opacity-50 pointer-events-none' : ''}` } >
            <
            input {...getInputProps() }
            /> <
            div className = "space-y-4" >
            <
            div className = "mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center" > {
                uploading ? ( <
                    div className = "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" > < /div>
                ) : ( <
                    Upload className = "h-8 w-8 text-blue-600" / >
                )
            } <
            /div> <
            div >
            <
            h3 className = "text-lg font-medium text-gray-900 mb-2" > { uploading ? 'Enviando imagens...' : 'Arraste e solte suas imagens aqui' } <
            /h3> <
            p className = "text-gray-500" >
            ou clique para selecionar arquivos <
            /p> <
            p className = "text-sm text-gray-400 mt-2" >
            Suporta: JPG, PNG, GIF, WEBP(máx .10 MB cada) <
            /p> < /
            div > <
            /div> < /
            div > <
            /div>

            { /* Lista de Imagens */ } <
            div className = "space-y-6" >
            <
            div className = "flex items-center justify-between" >
            <
            h2 className = "text-xl font-semibold text-gray-900" >
            Imagens Enviadas <
            /h2> {
            uploadedImages.length > 0 && ( <
                span className = "text-sm text-gray-500" > { uploadedImages.length }
                imagem(ns) <
                /span>
            )
        } <
        /div>

    {
        loading ? ( <
            div className = "text-center py-12" >
            <
            div className = "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" > < /div> <
            p className = "text-gray-500 mt-2" > Carregando imagens... < /p> < /
            div >
        ) : uploadedImages.length === 0 ? ( <
            div className = "text-center py-12" >
            <
            ImageIcon className = "h-12 w-12 text-gray-400 mx-auto mb-4" / >
            <
            h3 className = "text-lg font-medium text-gray-900 mb-2" >
            Nenhuma imagem enviada <
            /h3> <
            p className = "text-gray-500" >
            Faça upload de suas primeiras imagens para começar <
            /p> < /
            div >
        ) : ( <
            div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" > {
                uploadedImages.map((image, index) => ( <
                    div key = { index }
                    className = "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow" > { /* Preview da Imagem */ } <
                    div className = "aspect-w-16 aspect-h-9 bg-gray-100" >
                    <
                    img src = { `/api/upload/image/${encodeURIComponent(image.objectName)}` }
                    alt = { image.fileName }
                    className = "w-full h-48 object-cover"
                    onError = {
                        (e) => {
                            console.log('Erro ao carregar imagem:', image.fileName, 'URL:', e.target.src);
                            // Fallback para rota proxy se a URL direta falhar
                            if (image.objectName && !e.target.src.includes('/api/upload/image/')) {
                                console.log('Tentando fallback para proxy:', image.objectName);
                                e.target.src = `/api/upload/image/${encodeURIComponent(image.objectName)}`;
                            } else {
                                console.log('Usando placeholder para:', image.fileName);
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+SW1hZ2VtIG5vIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+';
                            }
                        }
                    }
                    /> < /
                    div >

                    { /* Informações da Imagem */ } <
                    div className = "p-4 space-y-3" >
                    <
                    div >
                    <
                    h3 className = "font-medium text-gray-900 truncate"
                    title = { image.fileName } > { image.fileName } <
                    /h3> <
                    p className = "text-sm text-gray-500" > { formatFileSize(image.size) } <
                    /p> < /
                    div >

                    { /* Links de Acesso */ } <
                    div className = "space-y-2" >
                    <
                    div className = "flex items-center space-x-2" >
                    <
                    span className = "text-xs font-medium text-gray-700" > Link Direto: < /span> <
                    button onClick = {
                        () => copyToClipboard(image.accessUrl)
                    }
                    className = "flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800" >
                    <
                    Copy className = "h-3 w-3" / >
                    <
                    span > Copiar < /span> < /
                    button > <
                    /div>

                    {
                        image.presignedUrl && ( <
                            div className = "flex items-center space-x-2" >
                            <
                            span className = "text-xs font-medium text-gray-700" > Link Temporário: < /span> <
                            button onClick = {
                                () => copyToClipboard(image.presignedUrl)
                            }
                            className = "flex items-center space-x-1 text-xs text-green-600 hover:text-green-800" >
                            <
                            Copy className = "h-3 w-3" / >
                            <
                            span > Copiar < /span> < /
                            button > <
                            /div>
                        )
                    } <
                    /div>

                    { /* Ações */ } <
                    div className = "flex items-center justify-between pt-2 border-t border-gray-100" >
                    <
                    button onClick = {
                        () => window.open(image.accessUrl, '_blank')
                    }
                    className = "flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800" >
                    <
                    ExternalLink className = "h-3 w-3" / >
                    <
                    span > Visualizar < /span> < /
                    button >

                    <
                    button onClick = {
                        () => deleteImage(image.objectName)
                    }
                    className = "flex items-center space-x-1 text-xs text-red-600 hover:text-red-800" >
                    <
                    Trash2 className = "h-3 w-3" / >
                    <
                    span > Deletar < /span> < /
                    button > <
                    /div> < /
                    div > <
                    /div>
                ))
            } <
            /div>
        )
    } <
    /div> < /
    div > <
        /div>
);
};

export default Dashboard;