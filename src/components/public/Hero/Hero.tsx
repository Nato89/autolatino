import styles from './Hero.module.css';
import Button from '../../common/Button/Button.tsx';

const Hero = () => {
  return (
    <section className={styles.hero}>       
        <div className={styles.content}>
            <h1 className={styles.title}>
                El auto
                <br /> 
                <span className={styles.gold}>perfecto</span>
                <br />
                te espera
            </h1>
            <p className={styles.subtitle}>
                Compra, vende o financia tu vehículo
                <br />
                con las mejores condiciones del
                <br />
                mercado.
                <br />
                Más de 200 vehículos disponibles y
                <br />
                créditos desde el 1.4% mensual.
            </p>
            <div className={styles.buttonWrapper}>
                <Button size="medium">VER CATÁLOGO</Button>
            </div>  
        </div>       
    </section>
  );
}   

export default Hero;