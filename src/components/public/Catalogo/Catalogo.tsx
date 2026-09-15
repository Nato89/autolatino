import styles from './Catalogo.module.css';
import { vehicles } from '../../../data/vehicles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RangeFilter from '../../common/RangeFilter/RangeFilter';
import logo from '../../../assets/images/Catalogo/Autolatino-logo.jpg';
import verTodosIcon from '../../../assets/images/Iconos/ver-todos.svg';
import contraerIcon from '../../../assets/images/Iconos/contraer.svg';
import filterIcon from '../../../assets/images/Iconos/filter.svg';
import Button from '../../common/Button/Button';

const Catalogo = () => {
    const [transmision, setTransmision] = useState('todos');
    const [precio, setPrecio] = useState({ min: 20000000, max: 200000000 });
    const [modelo, setModelo] = useState({ min: 2000, max: 2027 });
    const [kilometraje, setKilometraje] = useState({ min: 0, max: 200000 });
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();

    const vehiclesFiltrados = vehicles.filter((vehicle) => {
        const cumpleTransmision = transmision === 'todos' || vehicle.transmission === transmision;
        const cumplePrecio = vehicle.price >= precio.min && vehicle.price <= precio.max;
        const cumpleModelo = vehicle.year >= modelo.min && vehicle.year <= modelo.max;
        const cumpleKilometraje = vehicle.km >= kilometraje.min && vehicle.km <= kilometraje.max;
        return cumpleTransmision && cumplePrecio && cumpleModelo && cumpleKilometraje;
    });

    // Variable que controla cuántos vehículos se muestran
    const vehiculosAMostrar = mostrarTodos ? vehiclesFiltrados : vehiclesFiltrados.slice(0, 4);

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
                        {/* Botones de transmisión */}
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

                        {/* Rango de precio */}
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

                        {/* Rango de Modelo */}
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

                        {/* Rango de Kilometraje */}
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

                <div className={styles.cards}>
                    {vehiculosAMostrar.map((vehicle) => (
                        <div key={vehicle.id} className={styles.card}>
                            <img src={vehicle.image} alt={vehicle.model} />
                            <div className={styles.cardContent}>
                                <h3>{vehicle.brand} {vehicle.model}</h3>
                                <p className={styles.details}>{vehicle.year} - {vehicle.km} km</p>
                                <span className={styles.badge}>{vehicle.transmission}</span>
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
                    </section>
                );
};

export default Catalogo;