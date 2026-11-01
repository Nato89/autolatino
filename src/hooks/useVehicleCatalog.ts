import { useState, useEffect } from 'react';
import type { Vehicle } from '../types/vehicle';
import { subscribeToVehicles, deleteVehicle } from '../services/vehicleService';
import { useAuth } from '../context/AuthContext';

export const useVehicleCatalog = () => {
    // 1. Todos los estados originales del catálogo
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [transmision, setTransmision] = useState('todos');
    const [precio, setPrecio] = useState({ min: 20000000, max: 200000000 });
    const [modelo, setModelo] = useState({ min: 2000, max: 2027 });
    const [kilometraje, setKilometraje] = useState({ min: 0, max: 200000 });
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { isLoggedIn } = useAuth();   
    const [editingVehicle, setEditingVehicle] = useState<string | number | null>(null);
    const [deletingVehicle, setDeletingVehicle] = useState<string | number | null>(null);

    // 2. Efecto para escuchar los vehículos en tiempo real desde Firebase
    useEffect(() => {
        const unsubscribe = subscribeToVehicles((data) => {
            setVehicles(data);
            setLoadingVehicles(false);
        });

        return () => unsubscribe();
    }, []);   

    // 3. Lógica de filtrado de vehículos
    const vehiclesFiltrados = vehicles.filter((vehicle) => {
        const cumpleTransmision = transmision === 'todos' || vehicle.transmission === transmision;
        const cumplePrecio = vehicle.price >= precio.min && vehicle.price <= precio.max;
        const cumpleModelo = vehicle.year >= modelo.min && vehicle.year <= modelo.max;
        const cumpleKilometraje = vehicle.km >= kilometraje.min && vehicle.km <= kilometraje.max;
        return cumpleTransmision && cumplePrecio && cumpleModelo && cumpleKilometraje;
    });

    // 4. Control de cuántos vehículos se muestran en pantalla
    const vehiculosAMostrar = mostrarTodos ? vehiclesFiltrados : vehiclesFiltrados.slice(0, 4);

    // 5. Retornamos todo lo que el componente visual necesita usar
    return {
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
    };
};