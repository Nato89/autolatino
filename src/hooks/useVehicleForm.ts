import { useState } from 'react';
import { addVehicle } from '../services/vehicleService';
import { uploadPublicImage } from '../services/cloudinaryService';

export const useVehicleForm = (onClose: () => void) => {
    // 1. Aquí van los estados
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        price: '',
        km: '',
        transmission: '',
        features: '',
    });
    const [files, setFiles] = useState<File[]>([]); 
    const [loading, setLoading] = useState(false);

    // 2. Aquí van las funciones (handleChange y handleSave)
    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };    

    const handleSave = async () => {
        try {
        setLoading(true);
        // Subir cada imagen a Cloudinary y obtener las URLs
        const imageUrls: string[] = [];
        for (const file of files) {
            const url = await uploadPublicImage(file);
            imageUrls.push(url);
        }
        const vehiclePayload = {
            id: Date.now(), 
                brand: formData.brand,
                model: formData.model,
                year: Number(formData.year),
                price: Number(formData.price),
                km: Number(formData.km),
                transmission: formData.transmission,
                features: formData.features,
                images: imageUrls
            };

            await addVehicle(vehiclePayload);
            console.log('Vehículo guardado exitosamente en Firestore');
            onClose();
        } catch (error) {
            console.error('Error al guardar el vehículo:', error);
        } finally {
            setLoading(false);
        }    
    };

    // 3. Aquí va el return
    return {
        formData,
        handleChange,
        files,
        setFiles,
        loading,
        handleSave
    };
};