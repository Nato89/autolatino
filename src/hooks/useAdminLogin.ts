import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

export const useAdminLogin = (onClose: () => void) => {
    const navigate = useNavigate();
    const { setAdminName } = useAuth();

    // 1. Aquí van los estados (usuario, password, error)
    const [usuario, setUsuario ] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // 2. Aquí va la función handleLogin
    const handleLogin = async () => {
        try {
            setError('');
            const emailPrefix = usuario.split('@')[0];
            const formattedName = emailPrefix
            .replace('.', ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
            await signInWithEmailAndPassword(auth, usuario, password);
            const adminData = { name: formattedName };
            localStorage.setItem('autolatino_user', JSON.stringify(adminData));
            setAdminName(formattedName);
            onClose();
            navigate('/admin', { state: { adminName: formattedName } });        
        } catch (err) {
            console.error(err);
            setError('Usuario o contraseña incorrectos');
        }
    };

    // 3. Aquí va el return
        return {
        usuario,
        setUsuario,
        password,
        setPassword,
        error,
        handleLogin
    };
};