import styles from './whatsAppButton.module.css'

const WhatsAppButton = () => {
    return (
        <a 
            href="https://wa.me/573162489745?text=Hola,%20deseo%20asesoría%20por%20favor."  
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.waButton}
        >
            <img src="/src/assets/images/Iconos/wa.png" alt="WhatsApp" />
        </a>
    );
};

export default WhatsAppButton;