import { useParams, useNavigate } from 'react-router-dom';
import { vehicles } from '../../data/vehicles';
import { useEffect, useState } from 'react';
import styles from './VehicleDetailPage.module.css';
import flechaIzquierda from '../../assets/images/Iconos/arrow-prev.svg';
import flechaDerecha from '../../assets/images/Iconos/arrow-next.svg';
import flechaVolver from '../../assets/images/Iconos/arrow-return.svg';
import Button from '../../components/common/Button/Button';
import { Pencil, Trash2 } from 'lucide-react';
import EditVehicleModal from '../../components/admin/EditVehicleModal/EditVehicleModal';
import ConfirmModal from '../../components/common/ConfirmModal/ConfirmModal';

const VehicleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vehicle = vehicles.find(v => v.id === Number(id));
    const currentIndex = vehicles.findIndex(v => v.id === Number(id));
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleTouchEnd = () => {
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            // Deslizó hacia la izquierda → siguiente vehículo
            if (nextIndex < vehicles.length) {
                navigate(`/vehiculo/${vehicles[nextIndex].id}`);
            }
        } else if (distance < -minSwipeDistance) {
            // Deslizó hacia la derecha → vehículo anterior
            if (prevIndex >= 0) {
                navigate(`/vehiculo/${vehicles[prevIndex].id}`);
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('autolatino_user');
        if (storedUser) {
            setIsLoggedIn(true);
        }
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
                            src={vehicle.images[selectedImage]} 
                            alt={vehicle.model} 
                            onClick={() => setIsZoomed(!isZoomed)}
                            className={isZoomed ? styles.zoomed : ''}
                            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
                            onTouchEnd={(e) => {
                                setTouchEnd(e.changedTouches[0].clientX);
                                handleTouchEnd();
                            }}
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
                        {vehicle.images.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt={vehicle.model} 
                                onClick={() => setSelectedImage(index)} 
                            />
                        ))}
                    </div>
                </div>

                {/* Información del vehículo */}
                <div className={styles.bottomSection}>
                    {/* Columna izquierda: info del vehículo */}
                    <div className={styles.info}>
                        <div className={styles.infoHeader}>
                            <h1>{vehicle.brand} {vehicle.model}</h1>
                            {isLoggedIn && (
                                <div className={styles.adminActions}>
                                    <button 
                                        className={styles.editBtn} 
                                        title="Editar vehículo"
                                        onClick={() => setShowEditModal(true)}
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button 
                                        className={styles.deleteBtn} 
                                        title="Eliminar vehículo"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
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
                            {vehicle.features && vehicle.features.split(',').map((feature, index) => (
                                <p key={index}>{feature.trim()}</p>
                            ))}
                        </div>
                    </div>

                    {/* Columna derecha: botones */}
                    <div className={styles.actions}>
                        <div className={`${styles.buttonWrapper} ${styles.buttonWrapperRelative}`}>
                            <Button 
                                size="large"
                                onClick={() => {
                                    const url = `${window.location.origin}/vehiculo/${vehicle.id}`;
                                    const message = `Hola, estoy interesado en el ${vehicle.brand} ${vehicle.model}. ¿Me puedes dar más información? ${url}`;
                                    window.open(`https://wa.me/573162489745?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                            >
                                Contacta a un asesor
                                <img 
                                    src="/src/assets/images/Iconos/wa.png" 
                                    alt="WhatsApp" 
                                    className={styles.whatsappIconFloat}
                                />
                            </Button>
                        </div>
                        <Button 
                            size="large"
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    const element = document.getElementById('credito');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }, 100);
                            }}
                        >
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

            {showEditModal && (
                <EditVehicleModal
                    vehicle={vehicle}
                    onClose={() => setShowEditModal(false)}
                />
            )}

            {showDeleteModal && (
                <ConfirmModal
                    message={`¿Estás seguro de que quieres eliminar el vehículo ${vehicle.brand} ${vehicle.model}?`}
                    onConfirm={() => {
                        console.log('Eliminar vehículo:', vehicle.id);
                        setShowDeleteModal(false);
                    }}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default VehicleDetailPage;