import styles from './Navbar.module.css';
import logoIcon from '../../../assets/images/SVG/logo-icon.svg';
import logoText from '../../../assets/images/SVG/logo-text.svg';
import Button from '../Button/Button.tsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import menuIcon from '../../../assets/images/Iconos/menu.svg';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScrollToSection = (sectionId: string) => {
        setIsMenuOpen(false);

        if (location.pathname !== '/') {
                navigate('/');
                // Damos un pequeño respiro para que cargue la página principal antes de buscar el elemento
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                // Si ya estamos en el Home, solo hacemos scroll directo
                const element = document.getElementById(sectionId);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                }
            }
        };

    return (    
        <nav className={styles.navbar}>
            {/* Logo */}
            <div className={styles.logo} onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
                <img src={logoIcon} alt="Logo" className={styles.logoIcon} />
                <img src={logoText} alt="AutoLatino" className={styles.logoText} />
            </div>

            {/* Botón hamburguesa */}
            <button 
                className={styles.menuBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <img src={menuIcon} alt="Menú" />
            </button>

            {/* Menú */}
            <div className={styles.menuWrapper}>
                <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
                    {/* Catálogo */}
                    <li>
                        <a 
                            href="#catalogo" 
                            onClick={(e) => {
                                e.preventDefault();
                                handleScrollToSection('catalogo');
                            }}
                        >
                            Catálogo
                        </a>
                    </li>

                    {/* Crédito */}
                    <li>
                        <a 
                            href="#credito" 
                            onClick={(e) => {
                                e.preventDefault();
                                handleScrollToSection('credito');
                            }}
                        >
                            Crédito
                        </a>
                    </li>

                    {/* Cotización de seguro todo riesgo */}
                    <li>
                        <a 
                            href="https://wa.me/573162489745?text=Hola,%20deseo%20cotizar%20mi%20seguro%20todo%20riesgo!!!" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Cotiza tu seguro
                        </a>
                    </li>

                    {/* Vender vehículo */}
                    <li>
                        <a 
                            href="https://wa.me/573162489745?text=Hola,%20deseo%20vender%20mi%20vehículo,%20que%20datos%20necesitas?" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Vende tu auto
                        </a>
                    </li>

                    {/* Botón de contacto */}
                    <li>
                        <Button 
                            size="medium" 
                            onClick={() => {
                                handleScrollToSection('contacto');
                            }}
                        >
                            Contáctanos
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;