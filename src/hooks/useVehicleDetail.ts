import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subscribeToVehicles, deleteVehicle } from '../services/vehicleService';
import type { Vehicle } from '../types/vehicle';

export const useVehicleDetail = () => {
    // 1. Aquí van los estados
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    
    // 2. Aquí va la lógica derivada (vehicle, currentIndex, etc.)
    const { id } = useParams();
    const navigate = useNavigate();
    const vehicle = vehicles.find(v => v.id === id);
    const currentIndex = vehicles.findIndex(v => v.id === id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : -1;
    const nextIndex = currentIndex >= 0 && currentIndex < vehicles.length - 1 ? currentIndex + 1 : -1;
    
    // 3. Aquí van los useEffect y handleTouchEnd
    useEffect(() => {
        const unsubscribe = subscribeToVehicles((data) => {
            setVehicles(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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

    // 4. Aquí va el return
        return {
        vehicle,
        loading,
        selectedImage,
        setSelectedImage,
        isZoomed,
        setIsZoomed,
        touchStart,
        setTouchStart,
        touchEnd,
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
    };
};