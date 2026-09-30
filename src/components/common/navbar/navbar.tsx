import styles from './Navbar.module.css';
import logoIcon from '../../../assets/images/SVG/logo-icon.svg';
import logoText from '../../../assets/images/SVG/logo-text.svg';
import Button from '../Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
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

            {/* Menú */}
            <ul className={styles.menu}>
                {/* Catálogo */}
                <li>
                    <a 
                        href="#catalogo" 
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('catalogo');
                            if (element) {
                                const offset = 80; 
                                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                            }
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
                            const element = document.getElementById('credito');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
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
            </ul>

            {/* Botón de contacto */}
            <Button 
                size="medium" 
                onClick={() => {
                    const element = document.getElementById('contacto');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
                Contáctanos
            </Button>
        </nav>
    );
};

export default Navbar;