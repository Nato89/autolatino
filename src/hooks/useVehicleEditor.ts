import { useState, useRef, type ChangeEvent } from 'react';
import { updateVehicle } from '../services/vehicleService';
import { deletePublicImage, uploadPublicImage } from '../services/cloudinaryService';
import type { Vehicle } from '../types/vehicle';

interface PendingImage {
    file: File;
    previewUrl: string;
}

export const useVehicleEditor = (vehicle: Vehicle, onClose: () => void) => {
    const [formData, setFormData] = useState({
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            price: vehicle.price,
            km: vehicle.km,
            transmission: vehicle.transmission,
            features: vehicle.features || '',
        });

        const [existingImages, setExistingImages] = useState<string[]>(vehicle.images);         
        const [files, setFiles] = useState<PendingImage[]>([]);
        const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
        const [loading, setLoading] = useState(false);       
        const [saveError, setSaveError] = useState('');
        
        const fileInputRef = useRef<HTMLInputElement>(null); 

        const handleChange = (field: string, value: string) => {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

        const handleRemoveExistingImage = (index: number) => {
            const image = existingImages[index];
            if (!image) return;

            setExistingImages((previous) => previous.filter((_, i) => i !== index));

            if (image.startsWith('blob:')) {
                setFiles((previous) => {
                    const removedFile = previous.find((item) => item.previewUrl === image);
                    if (removedFile) URL.revokeObjectURL(removedFile.previewUrl);
                    return previous.filter((item) => item.previewUrl !== image);
                });
                return;
            }

            setImagesToDelete((previous) => previous.includes(image) ? previous : [...previous, image]);
        };

        const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const availableSlots = Math.max(0, 5 - existingImages.length);
                const newFiles = Array.from(e.target.files).slice(0, availableSlots);
                const pendingImages = newFiles.map((file) => ({
                    file,
                    previewUrl: URL.createObjectURL(file),
                }));
                
                setFiles((previous) => [...previous, ...pendingImages]);
                setExistingImages((previous) => [...previous, ...pendingImages.map((image) => image.previewUrl)]);
            }
            e.target.value = '';
        };

        const handleSave = async () => {
            try {
                setLoading(true);
                setSaveError('');

                // 1. Subir las imágenes nuevas a Cloudinary
                const newImageUrls: string[] = [];
                for (const pendingImage of files) {
                    const url = await uploadPublicImage(pendingImage.file);
                    newImageUrls.push(url);
                }

            // 2. Filtrar las URLs temporales (blob:) y combinar con las nuevas
                const validExistingImages = existingImages.filter(img => !img.startsWith('blob:'));
                const allImages = [...validExistingImages, ...newImageUrls];

                // 3. Preparar los datos a actualizar
                const vehiclePayload = {
                    brand: formData.brand,
                    model: formData.model,
                    year: Number(formData.year),
                    price: Number(formData.price),
                    km: Number(formData.km),
                    transmission: formData.transmission,
                    features: formData.features,
                    images: allImages
                };

                // 4. Actualizar en Firestore
                await updateVehicle(vehicle.id, vehiclePayload);

                setExistingImages(allImages);
                setFiles([]);
                files.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));

                const failedDeletions: string[] = [];
                for (const imageUrl of imagesToDelete) {
                    try {
                        await deletePublicImage(imageUrl);
                    } catch (error) {
                        console.error(`Error al eliminar la imagen ${imageUrl}:`, error);
                        failedDeletions.push(imageUrl);
                    }
                }

                setImagesToDelete(failedDeletions);
                if (failedDeletions.length > 0) {
                    setSaveError('Los cambios se guardaron, pero algunas imágenes no se pudieron eliminar de Cloudinary. Presiona Guardar para reintentar.');
                    return;
                }

                console.log('Vehículo actualizado exitosamente');
                onClose();
            } catch (error) {
                console.error('Error al actualizar el vehículo:', error);
                setSaveError(error instanceof Error ? error.message : 'No se pudieron guardar los cambios.');
            } finally {
                setLoading(false);
            }
        };

    return {
        formData,
        handleChange,
        existingImages,
        handleRemoveExistingImage,
        handleAddImages,
        fileInputRef,
        loading,
        saveError,
        handleSave
    };
};