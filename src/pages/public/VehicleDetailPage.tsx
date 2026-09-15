import { useParams, useNavigate } from 'react-router-dom';
import { vehicles } from '../../data/vehicles';
import { useEffect, useState } from 'react';
import styles from './VehicleDetailPage.module.css';
import flechaIzquierda from '../../assets/images/Iconos/arrow-prev.svg';
import flechaDerecha from '../../assets/images/Iconos/arrow-next.svg';
import flechaVolver from '../../assets/images/Iconos/arrow-return.svg';
import Button from '../../components/common/Button/Button';
import imagenReverse from '../../assets/images/Catalogo/renault-reverse.jpg';

const VehicleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vehicle = vehicles.find(v => v.id === Number(id));
    const currentIndex = vehicles.findIndex(v => v.id === Number(id));
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        if (isZoomed) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isZoomed]);

    if (!vehicle) {
        return <p>Vehículo no encontrado</p>;
    }

    return (
        <div className={styles.detailPage}>
            <h1 className={styles.titulo}>Catálogo</h1>
            <div className={styles.mainContent}>
                {/* Galería de imágenes */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <button 
                            className={`${styles.arrowLeft} ${prevIndex < 0 ? styles.disabled : ''}`}
                            onClick={() => {
                                if (prevIndex >= 0) {
                                    navigate(`/vehiculo/${vehicles[prevIndex].id}`);
                                }
                            }}
                        >
                            <img src={flechaIzquierda} alt="Anterior" />
                        </button>
                        <img 
                            src={selectedImage === 0 ? vehicle.image : imagenReverse} 
                            alt={vehicle.model} 
                            onClick={() => setIsZoomed(!isZoomed)}
                            className={isZoomed ? styles.zoomed : ''}
                        />
                        <button 
                            className={`${styles.arrowRight} ${nextIndex >= vehicles.length ? styles.disabled : ''}`}
                            onClick={() => {
                                if (nextIndex < vehicles.length) {
                                    navigate(`/vehiculo/${vehicles[nextIndex].id}`);
                                }
                            }}
                        >
                            <img src={flechaDerecha} alt="Siguiente" />
                        </button>
                    </div>
                    <div className={styles.thumbnails}>
                        <img src={vehicle.image} alt={vehicle.model} onClick={() => setSelectedImage(0)} />
                        <img src={imagenReverse} alt={vehicle.model} onClick={() => setSelectedImage(1)} />
                        <img src={imagenReverse} alt={vehicle.model} onClick={() => setSelectedImage(1)} />
                        <img src={imagenReverse} alt={vehicle.model} onClick={() => setSelectedImage(1)} />
                    </div>
                </div>

                {/* Información del vehículo */}
                <div className={styles.bottomSection}>
                    {/* Columna izquierda: info del vehículo */}
                    <div className={styles.info}>
                        <h1>{vehicle.brand} {vehicle.model}</h1>
                        <div className={styles.yearKmRow}>
                            <p>{vehicle.year} - {vehicle.km} km</p>
                            <span className={styles.badge}>{vehicle.transmission}</span>
                        </div>
                        <div className={styles.priceRow}>
                            <span className={styles.priceLabel}>PRECIO:</span>
                            <span className={styles.priceValue}>${vehicle.price.toLocaleString()}</span>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.features}>
                            <p>Soat</p>
                            <p>Tecno</p>
                            <p>Asientos de cuero, aire acondicionado, etc.</p>
                        </div>
                    </div>

                    {/* Columna derecha: botones */}
                    <div className={styles.actions}>
                        <div className={`${styles.buttonWrapper} ${styles.buttonWrapperRelative}`}>
                            <Button size="large">
                                Contacta a un asesor
                                <img 
                                    src="/src/assets/images/Iconos/wa.png" 
                                    alt="WhatsApp" 
                                    className={styles.whatsappIconFloat}
                                />
                            </Button>
                        </div>
                        <Button size="large">
                            Viabilidad de crédito
                        </Button>
                        <button 
                            className={styles.volverBtn} 
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'auto' });
                                }, 300);
                            }}
                        >
                            <img src={flechaVolver} alt="Volver atrás" />
                            Volver atrás
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailPage;