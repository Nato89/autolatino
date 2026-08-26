import styles from './Slide.module.css';
import Button from '../../common/Button/Button.tsx';

interface SlideProps {
  title: string;
  title2?: string;
  subtitle?: string;
  buttonText: string;
  hasIcon?: boolean;
  image: string;
  isActive: boolean;
}

const Slide = ({ title, title2, subtitle, buttonText, hasIcon, image, isActive }: SlideProps) => {
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
                    <Button size="medium">
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