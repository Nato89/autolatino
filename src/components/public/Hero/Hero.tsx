import { useEffect, useState, useRef } from 'react';
import styles from './Hero.module.css';
import Slide from './Slide.tsx';

const Hero = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const intervalRef = useRef<number | null>(null);  
  const slides = [
    {
        id: 1,
        title: 'El auto <span class="gold">perfecto</span> te espera',
        subtitle: 'Compra, vende o financia tu vehículo con las mejores condiciones del mercado. Más de 200 vehículos disponibles y créditos desde el 1.4% mensual.',
        buttonText: 'VER CATÁLOGO',
        buttonAction: 'catalogo',
        image: '/src/assets/images/hero/auto.png',
        hasIcon: false,
    },
    {
        id: 2,
        title: 'Financiación hasta el <span class="gold">100% sin cuota inicial</span>',
        subtitle: 'Has la viabilidad ya mismo, sin costo alguno, y te damos respuesta de 1 a 2 días hábiles.',
        buttonText: 'REALÍZALA AQUÍ',
        buttonAction: 'credito',
        image: '/src/assets/images/hero/financiacion.png',
        hasIcon: false,
    },
    {
        id: 3,
        title: 'Seguro todo riesgo para tu vehículo',
        subtitle: 'Has la viabilidad ya mismo, sin costo alguno, y te damos respuesta de 1 a 2 días hábiles.',
        buttonText: 'COTIZA AQUÍ',
        buttonAction: 'whatsapp-seguro',
        image: '/src/assets/images/hero/seguro.png',
        hasIcon: false,
    },
    {
        id: 4,
        title: '¿Quieres vender tu auto?',
        title2: '<span class="gold">nosotros te ayudamos!!!</span>',
        buttonText: 'VENDE AQUÍ',
        buttonAction: 'whatsapp-vende',
        image: '/src/assets/images/hero/vender.png',
        hasIcon: true,
    },
    {
        id: 5,
        title: 'Déjanos un mensaje y nosotros te contactamos',
        title2: '<span class="gold">Te esperamos!</span>',
        buttonText: 'CONTÁCTANOS',
        buttonAction: 'contacto',
        image: '/src/assets/images/hero/contacto.png',
        hasIcon: false,
    }
];

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
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
                    buttonAction={slide.buttonAction}
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

