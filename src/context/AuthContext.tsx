import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
    user: any | null;
    isLoggedIn: boolean;
    adminName: string | null;
    loading: boolean;
    setAdminName: (name: string | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Función auxiliar para leer el localStorage de forma segura
const getStoredAdminName = () => {
    const stored = localStorage.getItem('autolatino_user');
    if (stored) {
        try {
            return JSON.parse(stored).name || null;
        } catch (e) {
            return null;
        }
    }
    return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    // Inicializamos el nombre leyendo el localStorage inmediatamente
    const [adminName, setAdminName] = useState<string | null>(getStoredAdminName);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }           
            
            setAdminName(getStoredAdminName());
            
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('autolatino_user');
            setUser(null);
            setAdminName(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoggedIn: !!user, 
            adminName, 
            loading, 
            setAdminName,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};