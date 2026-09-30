import styles from './Slide.module.css';
import Button from '../../common/Button/Button.tsx';

interface SlideProps {
  title: string;
  title2?: string;
  subtitle?: string;
  buttonText: string;
  buttonAction?: string;
  hasIcon?: boolean;
  image: string;
  isActive: boolean;
}

const Slide = ({ title, title2, subtitle, buttonText, buttonAction, hasIcon, image, isActive }: SlideProps) => {
  const handleButtonClick = () => {
    if (buttonAction === 'catalogo') {
        const element = document.getElementById('catalogo');
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
            }
        } else if (buttonAction === 'credito') {
            document.getElementById('credito')?.scrollIntoView({ behavior: 'smooth' });
        } else if (buttonAction === 'contacto') {
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
        } else if (buttonAction === 'whatsapp-seguro') {
            window.open('https://wa.me/573162489745?text=Hola,%20deseo%20cotizar%20mi%20seguro%20todo%20riesgo!!!', '_blank');
        } else if (buttonAction === 'whatsapp-vende') {
            window.open('https://wa.me/573162489745?text=Hola,%20deseo%20vender%20mi%20vehículo,%20que%20datos%20necesitas?', '_blank');
        }
    };
  return (
    <section
      className={`${styles.slide} ${isActive ? styles.active : styles.hidden}`}
      style={{ backgroundImage: `url(${image})` }}
    >              
            <div className={styles.content}>
                <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                {title2 && <h1 className={styles.title2} dangerouslySetInnerHTML={{ __html: title2 }} />}
                {subtitle && <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />}                
                <div className={`${styles.buttonWrapper} ${styles.buttonWrapperRelative}`}>
                    <Button size="large" onClick={handleButtonClick}>
                        {buttonText}
                        {hasIcon && (
                            <img 
                                src="/src/assets/images/Iconos/wa.png" 
                                alt="whatsapp ícono" 
                                className={styles.whatsappIconFloat}
                            />
                        )}
                    </Button>
                </div>
            </div>       
    </section>
  );
}   

export default Slide;