import styles from './Footer.module.css';
import alLogo from '../../../assets/images/Iconos/al-logo.svg';
import instagramIcon from '../../../assets/images/Iconos/instagram.svg';
import facebookIcon from '../../../assets/images/Iconos/facebook.svg';
import avatarIcon from '../../../assets/images/Iconos/avatar.svg';
import Button from '../Button/Button';

const Footer = () => {
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

                {/* Columna 3: Redes sociales + Empleados */}
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
                    <h3>Empleados:</h3>
                    <img src={avatarIcon} alt="Empleado" className={styles.avatar} />
                    <Button size="small">Ingreso</Button>
                </div>
            </div>

            {/* Franja inferior: copyright */}
            <div className={styles.bottomBanner}>
                <p>® 2026 Autolatino. Todos los derechos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;