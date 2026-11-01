import { createContext, useContext, useState, useEffect } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { Vehicle } from '../types/vehicle';
import { subscribeToVehicles } from '../services/vehicleService';

interface FilterRange {
    min: number;
    max: number;
}

interface VehicleContextType {
    vehicles: Vehicle[];
    loading: boolean;
    transmision: string;
    setTransmision: Dispatch<SetStateAction<string>>;
    precio: FilterRange;
    setPrecio: Dispatch<SetStateAction<FilterRange>>;
    modelo: FilterRange;
    setModelo: Dispatch<SetStateAction<FilterRange>>;
    kilometraje: FilterRange;
    setKilometraje: Dispatch<SetStateAction<FilterRange>>;
    resetFilters: () => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const initialTransmision = 'todos';
const initialPrecio = { min: 20000000, max: 200000000 };
const initialModelo = { min: 2000, max: 2027 };
const initialKilometraje = { min: 0, max: 200000 };

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [transmision, setTransmision] = useState(initialTransmision);
    const [precio, setPrecio] = useState(initialPrecio);
    const [modelo, setModelo] = useState(initialModelo);
    const [kilometraje, setKilometraje] = useState(initialKilometraje);

    useEffect(() => {
        const unsubscribe = subscribeToVehicles((data) => {
            setVehicles(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const resetFilters = () => {
        setTransmision(initialTransmision);
        setPrecio(initialPrecio);
        setModelo(initialModelo);
        setKilometraje(initialKilometraje);
    };

    return (
        <VehicleContext.Provider value={{
            vehicles,
            loading,
            transmision,
            setTransmision,
            precio,
            setPrecio,
            modelo,
            setModelo,
            kilometraje,
            setKilometraje,
            resetFilters,
        }}>
            {children}
        </VehicleContext.Provider>
    );
};

export const useVehicles = () => {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error('useVehicles debe usarse dentro de un VehicleProvider');
    }
    return context;
};