import styles from './Navbar.module.css';
import logoIcon from '../../../assets/images/SVG/logo-icon.svg';
import logoText from '../../../assets/images/SVG/logo-text.svg';
import Button from '../Button/Button.tsx';

const Navbar = () => {
    return (    
        <nav className={styles.navbar}>
            {/* Logo */}
            <div className={styles.logo}>
                <img src={logoIcon} alt="Logo" className={styles.logoIcon} />
                <img src={logoText} alt="AutoLatino" className={styles.logoText} />
            </div>

            {/* Menú */}
            <ul className={styles.menu}>
                <li><a href="#">Catálogo</a></li>
                <li><a href="#">Crédito</a></li>
                <li><a href="#">Cotiza tu seguro</a></li>
                <li><a href="#">Vende tu auto</a></li>
            </ul>

            {/* Botón de contacto */}
            <Button size="medium">Contáctanos</Button>
        </nav>
    );
};

export default Navbar;