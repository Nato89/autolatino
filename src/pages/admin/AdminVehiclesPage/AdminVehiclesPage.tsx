import styles from './AdminVehiclesPage.module.css';
import Button from '../../../components/common/Button/Button';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditVehicleModal from '../../../components/admin/EditVehicleModal/EditVehicleModal';
import ConfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import AddVehicleModal from '../../../components/admin/AddVehicleModal/AddVehicleModal';
import type { Vehicle } from '../../../types/vehicle';
import { getVehicles, deleteVehicle } from '../../../services/vehicleService';

const AdminVehiclesPage = () => {
    const navigate = useNavigate();
    const [editingVehicle, setEditingVehicle] = useState<string | number | null>(null);
    const [deletingVehicle, setDeletingVehicle] = useState<string | number | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchVehicles = async () => {
        try {
            const data = await getVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Error al cargar vehículos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);    

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de Vehículos</h1>
                <Button size="medium" onClick={() => navigate('/admin')}>
                    Volver
                </Button>
            </div>

            <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Lista de Vehículos</h2>
                    <button 
                        className={styles.addBtn} 
                        title="Agregar vehículo"
                        onClick={() => setShowAddModal(true)}
                    >
                        <PlusCircle size={40} />
                    </button>
                </div>

            {loading ? (
                <p className={styles.loadingText}>Cargando vehículos...</p>
            ) : (    
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Año</th>
                            <th>Km</th>
                            <th>Transmisión</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr 
                                key={vehicle.id} 
                                onClick={() => navigate(`/vehiculo/${vehicle.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td data-label="ID">{vehicle.id}</td>
                                <td data-label="Nombre">{vehicle.brand} {vehicle.model}</td>
                                <td data-label="Año">{vehicle.year}</td>
                                <td data-label="Km">{vehicle.km}</td>
                                <td data-label="Transmisión">{vehicle.transmission}</td>
                                <td data-label="Precio">${vehicle.price.toLocaleString()}</td>
                                <td className={styles.actionsCell} data-label="Acciones">
                                    <div className={styles.actionsButtons}>
                                        <button 
                                            className={styles.editBtn}
                                            title="Editar vehículo"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingVehicle(vehicle.id);
                                            }}
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button 
                                            className={styles.deleteBtn}
                                            title="Eliminar vehículo"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeletingVehicle(vehicle.id);
                                            }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>

            {showAddModal && (
                <AddVehicleModal 
                    onClose={() => {
                        setShowAddModal(false);
                        fetchVehicles(); 
                    }} 
                />
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
        </div>
    );
};

export default AdminVehiclesPage;