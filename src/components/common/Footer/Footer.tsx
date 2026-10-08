import styles from './Footer.module.css';
import alLogo from '../../../assets/images/Iconos/al-logo.svg';
import instagramIcon from '../../../assets/images/Iconos/instagram.svg';
import facebookIcon from '../../../assets/images/Iconos/facebook.svg';
import avatarIcon from '../../../assets/images/Iconos/avatar.svg';
import cameraIcon from '../../../assets/images/Iconos/camera-icon.svg';
import Button from '../Button/Button';
import { useState, useEffect, useRef } from 'react';
import LoginModal from '../../admin/LoginModal/LoginModal';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState<{ name?: string; adminName?: string; avatar?: string } | null>(null);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {        
        const storedUser = localStorage.getItem('autolatino_user');
        if (storedUser) {
            try {                
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error al leer el usuario", e);
            }
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;                
                const updatedUser = {
                    ...(user || { name: 'Asesor' }),
                    avatar: base64String
                };
                setUser(updatedUser);
                localStorage.setItem('autolatino_user', JSON.stringify(updatedUser));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('autolatino_user');
        setUser(null);
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
    };

    return (
        <footer className={styles.footer}>
            {/* Franja superior */}
            <div className={styles.topBanner}>
                <h2>Autolatino servicio con <span className={styles.gold}>integridad</span></h2>
            </div>

            {/* Recuadro azul */}
            <div className={styles.mainFooter}>
                {/* Columna 1: Logo */}
                <div className={styles.colLogo}>
                    <img src={alLogo} alt="Autolatino" className={styles.logo} />                  
                </div>

                {/* Columna 2: Servicios + Contacto */}
                <div className={styles.colServicios}>
                    <div className={styles.serviciosBlock}>
                        <h3>Servicios:</h3>
                        <p>Compra - Venta</p>
                        <p>Crédito</p>
                        <p>Seguro todo riesgo</p>
                    </div>
                    <div className={styles.contactoBlock}>
                        <h3>Contacto:</h3>
                        <p>whatsapp:</p>
                        <p>316 248 97 45</p>
                    </div>
                </div>

                {/* Columna 3: Redes sociales */}
                <div className={styles.colRedes}>
                    <h3>Redes sociales:</h3>
                    <div className={styles.socialIcons}>
                        <a href="https://www.instagram.com/autolatino.medellin/" target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                        <a href="https://www.facebook.com/Autolatino.medellin" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" />
                        </a>
                    </div>
                </div>

                <div className={styles.colEmpleados}>
                    {user ? (
                        <>
                            <h3>{user.name || user.adminName}</h3>
                            <div className={styles.avatarContainer}>
                                <img 
                                    src={user.avatar || avatarIcon} 
                                    alt={user.name || user.adminName} 
                                    className={styles.avatar} 
                                />
                                <div 
                                    className={styles.cameraOverlay} 
                                    onClick={() => fileInputRef.current?.click()} 
                                    title="Cambiar imagen de perfil"
                                >
                                    <img src={cameraIcon} alt="Cambiar foto" className={styles.cameraSvg} />
                                </div>
                            </div>

                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                accept="image/*" 
                                onChange={handleImageChange}
                            />

                            <div className={styles.authButtons}>
                                <Button size="small" onClick={() => navigate('/admin')}>Dashboard</Button>
                                <Button size="small" onClick={handleLogout}>Salir</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>Empleados:</h3>
                            <img src={avatarIcon} alt="Empleado" className={styles.avatar} />
                            <Button size="small" onClick={() => setShowLogin(true)}>Ingreso</Button>
                        </>
                    )}
                </div>
            </div>

            {/* Franja inferior: copyright */}
            <div className={styles.bottomBanner}>
                <p>® 2026 Autolatino. Todos los derechos reservados</p>
            </div>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </footer>
    );
};

export default Footer;