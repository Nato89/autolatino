import styles from './Catalogo.module.css';
import { useNavigate } from 'react-router-dom';
import RangeFilter from '../../common/RangeFilter/RangeFilter';
import logo from '../../../assets/images/Catalogo/Autolatino-logo.jpg';
import verTodosIcon from '../../../assets/images/Iconos/ver-todos.svg';
import contraerIcon from '../../../assets/images/Iconos/contraer.svg';
import filterIcon from '../../../assets/images/Iconos/filter.svg';
import Button from '../../common/Button/Button';
import { Pencil, Trash2 } from 'lucide-react';
import EditVehicleModal from '../../admin/EditVehicleModal/EditVehicleModal';
import ConfirmModal from '../../common/ConfirmModal/ConfirmModal';
import { useVehicleCatalog } from '../../../hooks/useVehicleCatalog';

const Catalogo = () => {
    // Consumimos todo lo que nos devuelve el hook
    const {
        vehicles,
        setVehicles,
        loadingVehicles,
        transmision,
        setTransmision,
        precio,
        setPrecio,
        modelo,
        setModelo,
        kilometraje,
        setKilometraje,
        mostrarTodos,
        setMostrarTodos,
        isFilterOpen,
        setIsFilterOpen,
        isLoggedIn,
        editingVehicle,
        setEditingVehicle,
        deletingVehicle,
        setDeletingVehicle,
        vehiculosAMostrar,
        deleteVehicle,
    } = useVehicleCatalog();

    const navigate = useNavigate();

    return (
        <section className={styles.Catalogo}>
            <h1 className={styles.titulo}>Catálogo</h1>
            <button 
                className={styles.filtrosBtn}
                onClick={() => setIsFilterOpen(true)}
            >
                <img src={filterIcon} alt="Filtros" />
                Filtros
            </button>
            <div className={styles.row}>
                <div className={`${styles.left} ${isFilterOpen ? styles.filterOpen : ''}`}>
                    <button 
                        className={styles.closeFilterBtn}
                        onClick={() => setIsFilterOpen(false)}
                    >
                        ✕
                    </button>
                    <div className={styles.filtros}>
                        <h2>Filtros</h2>
                        <div className={styles.buttonGroup}>
                            <button 
                                className={`${styles.filterBtn} ${transmision === 'todos' ? styles.active : ''}`}
                                onClick={() => setTransmision('todos')}
                            >
                                Todos
                            </button>
                            <button 
                                className={`${styles.filterBtn} ${transmision === 'Mecánico' ? styles.active : ''}`}
                                onClick={() => setTransmision('Mecánico')}
                            >
                                Mecánico
                            </button>
                            <button 
                                className={`${styles.filterBtn} ${transmision === 'Automático' ? styles.active : ''}`}
                                onClick={() => setTransmision('Automático')}
                            >
                                Automático
                            </button>
                        </div>

                        <RangeFilter
                            label="Precio"
                            min={20000000}
                            max={200000000}
                            step={1000000}
                            minDistance={5000000}
                            value={precio}
                            onChange={(nuevoPrecio) => setPrecio(nuevoPrecio)}
                            formatValue={(val) => `$${val.toLocaleString()}`}
                        />

                        <RangeFilter
                            label="Modelo"
                            min={2000}
                            max={2027}
                            step={1}
                            minDistance={5}
                            value={modelo}
                            onChange={(nuevoModelo) => setModelo(nuevoModelo)}
                            formatValue={(val) => val.toString()}
                        />

                        <RangeFilter
                            label="Kilometraje"
                            min={0}
                            max={200000}
                            step={1000}
                            minDistance={5000}
                            value={kilometraje}
                            onChange={(nuevoKilometraje) => setKilometraje(nuevoKilometraje)}
                            formatValue={(val) => `${val.toLocaleString()} km`}
                        />
                        <div className={styles.applyBtnWrapper}>
                            <Button size="large" onClick={() => setIsFilterOpen(false)}>
                                Aplicar filtros
                            </Button>
                        </div>
                    </div>
                    <img className={styles.logo} src={logo} alt="Logo Autolatino" />
                </div>

            {loadingVehicles ? (
                <p className={styles.loadingText}>Cargando vehículos...</p>
            ) : (    
                <div className={styles.cards}>
                    {vehiculosAMostrar.map((vehicle) => (
                        <div key={vehicle.id} className={styles.card}>
                            <img src={vehicle.images[0]} alt={vehicle.model} />
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <h3>{vehicle.brand} {vehicle.model}</h3>
                                        <p className={styles.details}>{vehicle.year} - {vehicle.km} km</p>
                                        <span className={styles.badge}>{vehicle.transmission}</span>
                                    </div>

                                    {isLoggedIn && (
                                        <div className={styles.adminActions}>
                                            <button 
                                                className={styles.editBtn} 
                                                title="Editar vehículo"
                                                onClick={() => setEditingVehicle(vehicle.id)}
                                            >
                                                <Pencil size={20} />
                                            </button>
                                            <button 
                                                className={styles.deleteBtn} 
                                                title="Eliminar vehículo"
                                                onClick={() => setDeletingVehicle(vehicle.id)}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.divider}></div>
                                <div className={styles.priceRow}>
                                    <div className={styles.priceColumn}>
                                        <span className={styles.priceLabel}>PRECIO:</span>
                                        <span className={styles.priceValue}>${vehicle.price.toLocaleString()}</span>
                                    </div>
                                    <button 
                                        className={styles.verMas}
                                        onClick={() => navigate(`/vehiculo/${vehicle.id}`)}
                                    >
                                        VER MÁS
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>

            {!mostrarTodos ? (
                <button 
                    className={styles.verTodosBtn}
                    onClick={() => setMostrarTodos(true)}
                >
                    <img src={verTodosIcon} alt="Ver todos" />
                </button>
            ) : (
                <button 
                    className={styles.verTodosBtn}
                    onClick={() => setMostrarTodos(false)}
                >
                    <img src={contraerIcon} alt="Contraer" />
                </button>
            )}

            {editingVehicle !== null && (
                <EditVehicleModal
                    vehicle={vehicles.find(v => v.id === editingVehicle)!}
                    onClose={() => setEditingVehicle(null)}
                />
            )}

            {deletingVehicle !== null && (
                <ConfirmModal
                    message={`¿Estás seguro de que quieres eliminar el vehículo ${vehicles.find(v => v.id === deletingVehicle)?.brand} ${vehicles.find(v => v.id === deletingVehicle)?.model}?`}
                    onConfirm={async () => {
                        if (deletingVehicle !== null) {
                            try {
                                await deleteVehicle(deletingVehicle);
                                setVehicles(prev => prev.filter(v => v.id !== deletingVehicle));
                                setDeletingVehicle(null);
                            } catch (error) {
                                console.error("Error al eliminar:", error);
                            }
                        }
                    }}
                    onCancel={() => setDeletingVehicle(null)}
                />
            )}
        </section>
    );
};

export default Catalogo;
