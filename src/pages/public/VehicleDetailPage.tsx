import styles from './VehicleDetailPage.module.css';
import flechaIzquierda from '../../assets/images/Iconos/arrow-prev.svg';
import flechaDerecha from '../../assets/images/Iconos/arrow-next.svg';
import flechaVolver from '../../assets/images/Iconos/arrow-return.svg';
import Button from '../../components/common/Button/Button';
import { Pencil, Trash2, List } from 'lucide-react';
import EditVehicleModal from '../../components/admin/EditVehicleModal/EditVehicleModal';
import ConfirmModal from '../../components/common/ConfirmModal/ConfirmModal';
import { useVehicleDetail } from '../../hooks/useVehicleDetail';

const VehicleDetailPage = () => {        
    const {
        vehicle,
        loading,
        selectedImage,
        setSelectedImage,
        isZoomed,
        setIsZoomed,        
        setTouchStart,        
        setTouchEnd,
        isLoggedIn,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,
        vehicles,
        prevIndex,
        nextIndex,
        handleTouchEnd,
        deleteVehicle,
        navigate
    } = useVehicleDetail();

    if (loading) return <div className={styles.loadingText}>Cargando vehículo...</div>;
    if (!vehicle) return <p>Vehículo no encontrado</p>;

    return (
        <div className={styles.detailPage}>
            <div className={styles.headerRow}>
                <h1 className={styles.titulo}>Catálogo</h1>
                
                {isLoggedIn && (
                    <button 
                        className={styles.backToListBtn} 
                        onClick={() => navigate('/admin/vehiculos')}
                        title="Regresar a la lista de vehículos"
                    >
                        <List size={20} />
                        Regresar a la lista
                    </button>
                )}
            </div>
            <div className={styles.mainContent}>
                {/* Galería de imágenes */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <button 
                            className={`${styles.arrowLeft} ${prevIndex < 0 ? styles.disabled : ''}`}
                            title="Anterior vehículo"
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
                            className={`${styles.arrowRight} ${nextIndex === -1 ? styles.disabled : ''}`}
                            title="Próximo vehículo"
                            onClick={() => {
                                if (nextIndex >= 0 && nextIndex < vehicles.length) {
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
                            {vehicle.features && vehicle.features.split('\n').map((feature, index) => (
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
                    onConfirm={async () => {
                        try {
                            await deleteVehicle(vehicle.id);
                            setShowDeleteModal(false);
                            navigate('/'); 
                        } catch (error) {
                            console.error("Error al eliminar:", error);
                        }
                    }}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default VehicleDetailPage;