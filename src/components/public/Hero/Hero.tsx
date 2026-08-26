import { useEffect, useState, useRef } from 'react';
import styles from './Hero.module.css';
import Slide from './Slide.tsx';

const Hero = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const intervalRef = useRef<number | null>(null);  
  const slides = [
    {
        id: 1,
        title: 'El auto<br /><span class="gold">perfecto</span><br />te espera',        
        subtitle: 'Compra, vende o financia tu vehículo<br />con las mejores condiciones del<br />mercado.<br />Más de 200 vehículos disponibles y<br />créditos desde el 1.4% mensual.',
        buttonText: 'VER CATÁLOGO',
        image: '/src/assets/images/hero/auto.png',
        hasIcon: false,
    },
    {
        id: 2,
        title: 'Financiación<br />hasta el<br /><span class="gold">100% sin<br />cuota inicial</span>',       
        subtitle: 'Has la viabilidad ya mismo, sin<br />costo alguno, y te damos respuesta<br />de 1 a 2 días hábiles.',
        buttonText: 'REALÍZALA AQUÍ',
        image: '/src/assets/images/hero/financiacion.png',
        hasIcon: false,
    },
    {
        id: 3,
        title: 'Seguro todo<br />riesgo para<br />tu vehículo',        
        subtitle: 'Has la viabilidad ya mismo, sin<br />costo alguno, y te damos respuesta<br />de 1 a 2 días hábiles.',
        buttonText: 'COTIZA AQUÍ',
        image: '/src/assets/images/hero/seguro.png',
        hasIcon: false,
    },
    {
        id: 4,
        title: 'Quieres<br />vender tu<br />auto?',
        title2: '<span class="gold">nosotros te <br />ayudamos!!!</span>',
        buttonText: 'VENDE AQUÍ',
        image: '/src/assets/images/hero/vender.png',
        hasIcon: true,
    },
    {
        id: 5,
        title: 'Déjanos un<br />mensaje y<br />nosotros te<br />contactamos',
        title2: '<span class="gold">Te esperamos!</span>',
        buttonText: 'CONTÁCTANOS',
        image: '/src/assets/images/hero/contacto.png',
        hasIcon: false,
    }
];

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000);
};

    useEffect(() => {
        startInterval();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <section className={styles.hero}>       
           {slides.map((slide, index) => (
                <Slide
                    key={slide.id}
                    title={slide.title}
                    title2={slide.title2}
                    subtitle={slide.subtitle}
                    buttonText={slide.buttonText}
                    hasIcon={slide.hasIcon}
                    image={slide.image}
                    isActive={index === currentSlide}
                />
            ))}

            {/* Flecha izquierda */}
            <button 
                className={styles.arrowLeft} 
                onClick={() => {
                    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
                    startInterval();
                }}
            >
                <img src="/SVG/flecha-izquierda.svg" alt="Anterior" />
            </button>
            
            {/* Flecha derecha */}
            <button 
                className={styles.arrowRight} 
                onClick={() => {
                    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
                    startInterval();
                }}
            >
                <img src="/SVG/flecha-derecha.svg" alt="Siguiente" />
            </button> 

            {/* Puntos indicadores */}
            <div className={styles.dots}>
                {slides.map((_, index) => (
                    <span 
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                        onClick={() => {
                            setCurrentSlide(index);
                            startInterval();
                        }}
                    />
                ))}
            </div>
        </section>
    );
}   

export default Hero;