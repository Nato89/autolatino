import { useState, useEffect } from 'react';
import type { Vehicle } from '../types/vehicle';
import { getVehicles, deleteVehicle } from '../services/vehicleService';

export const useAdminVehicles = () => {
    // 1. Aquí van los estados
    const [editingVehicle, setEditingVehicle] = useState<string | number | null>(null);
    const [deletingVehicle, setDeletingVehicle] = useState<string | number | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    // 2. Aquí va el useEffect (carga inicial)
    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleDelete = async () => {
        if (deletingVehicle !== null) {
            try {
                await deleteVehicle(deletingVehicle);
                setVehicles(prev => prev.filter(v => v.id !== deletingVehicle));
                setDeletingVehicle(null);
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    // 3. Aquí van las funciones (fetchVehicles)
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

    // 4. Aquí va el return
        return {
        vehicles,
        setVehicles,
        loading,
        fetchVehicles,
        editingVehicle,
        setEditingVehicle,
        deletingVehicle,
        setDeletingVehicle,
        showAddModal,
        setShowAddModal,
        handleDelete, 
        deleteVehicle 
    };
};