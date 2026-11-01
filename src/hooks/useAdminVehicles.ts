import { useState } from 'react';
import { deleteVehicle } from '../services/vehicleService';
import { useVehicles } from '../context/VehicleContext';

export const useAdminVehicles = () => {
    const { vehicles, loading } = useVehicles();
    const [editingVehicle, setEditingVehicle] = useState<string | number | null>(null);
    const [deletingVehicle, setDeletingVehicle] = useState<string | number | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleDelete = async () => {
        if (deletingVehicle !== null) {
            try {
                await deleteVehicle(deletingVehicle);
                setDeletingVehicle(null);
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return {
        vehicles,
        loading,
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