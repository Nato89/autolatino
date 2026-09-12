import styles from './whatsAppButton.module.css'

const WhatsAppButton = () => {
    return (
        <a 
            href="https://wa.me/53218590819" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.waButton}
        >
            <img src="/src/assets/images/Iconos/wa.png" alt="WhatsApp" />
        </a>
    );
};

export default WhatsAppButton;