import { useState } from 'react';
import { deleteVehicle } from '../services/vehicleService';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';

export const useVehicleCatalog = () => {
    const {
        vehicles,
        loading: loadingVehicles,
        transmision,
        setTransmision,
        precio,
        setPrecio,
        modelo,
        setModelo,
        kilometraje,
        setKilometraje,
        resetFilters,
    } = useVehicles();
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { isLoggedIn } = useAuth();   
    const [editingVehicle, setEditingVehicle] = useState<string | number | null>(null);
    const [deletingVehicle, setDeletingVehicle] = useState<string | number | null>(null);

    const vehiclesFiltrados = vehicles.filter((vehicle) => {
        const cumpleTransmision = transmision === 'todos' || vehicle.transmission === transmision;
        const cumplePrecio = vehicle.price >= precio.min && vehicle.price <= precio.max;
        const cumpleModelo = vehicle.year >= modelo.min && vehicle.year <= modelo.max;
        const cumpleKilometraje = vehicle.km >= kilometraje.min && vehicle.km <= kilometraje.max;
        return cumpleTransmision && cumplePrecio && cumpleModelo && cumpleKilometraje;
    });

    const vehiculosAMostrar = mostrarTodos ? vehiclesFiltrados : vehiclesFiltrados.slice(0, 4);

    return {
        vehicles,
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
        resetFilters,
        deleteVehicle,
    };
};