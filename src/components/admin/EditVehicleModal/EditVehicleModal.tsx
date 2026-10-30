import { useState, useRef, } from 'react';
import { PlusCircle } from 'lucide-react';
import styles from './EditVehicleModal.module.css';
import Button from '../../common/Button/Button';
import InputField from '../../common/InputField/InputField';
import type { Vehicle } from '../../../types/vehicle';
import { updateVehicle } from '../../../services/vehicleService';
import { uploadPublicImage } from '../../../services/cloudinaryService';

interface EditVehicleModalProps {
    vehicle: Vehicle;
    onClose: () => void;
}

const EditVehicleModal = ({ vehicle, onClose }: EditVehicleModalProps) => {
    const [formData, setFormData] = useState({
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        km: vehicle.km,
        transmission: vehicle.transmission,
        features: vehicle.features || '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            // 1. Subir las imágenes nuevas a Cloudinary
            const newImageUrls: string[] = [];
            for (const file of files) {
                const url = await uploadPublicImage(file, 'autolatino/vehiculos');
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
            console.log('Vehículo actualizado exitosamente');
            onClose();
        } catch (error) {
            console.error('Error al actualizar el vehículo:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveExistingImage = (index: number) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
            
            // Guardar los archivos reales para subirlos a Cloudinary
            setFiles(prev => [...prev, ...newFiles]);

            // Mostrar las URLs temporales en la vista previa
            const totalImages = [...existingImages, ...newImageUrls].slice(0, 5);
            setExistingImages(totalImages);
        }
    };
    
    const [existingImages, setExistingImages] = useState<string[]>(vehicle.images);
    const fileInputRef = useRef<HTMLInputElement>(null);  
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>

                <h2 className={styles.modalTitle}>Editar Vehículo</h2>

                <div className={styles.formRow}>
                    <InputField
                        label="Marca"
                        type="text"
                        value={formData.brand}
                        onChange={(val) => handleChange('brand', val)}
                        required
                    />
                    <InputField
                        label="Modelo"
                        type="text"
                        value={formData.model}
                        onChange={(val) => handleChange('model', val)}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <InputField
                        label="Año"
                        type="text"
                        value={formData.year.toString()}
                        onChange={(val) => handleChange('year', val)}
                        required
                        pattern="[0-9]*"
                    />
                    <InputField
                        label="Precio"
                        type="text"
                        value={formData.price.toString()}
                        onChange={(val) => handleChange('price', val)}
                        required
                        pattern="[0-9]*"
                    />
                </div>

                <div className={styles.formRow}>
                    <InputField
                        label="Km"
                        type="text"
                        value={formData.km.toString()}
                        onChange={(val) => handleChange('km', val)}
                        required
                        pattern="[0-9]*"
                    />
                    <InputField
                        label="Transmisión"
                        type="select"
                        value={formData.transmission}
                        onChange={(val) => handleChange('transmission', val)}
                        required
                        options={[
                            { value: 'Mecánico', label: 'Mecánico' },
                            { value: 'Automático', label: 'Automático' },
                        ]}
                    />
                </div>

                <div className={styles.formRow}>
                    <InputField
                        label="Detalles adicionales"
                        type="textarea"
                        placeholder="Ej: Soat, Tecno, Asientos de cuero, Aire acondicionado"
                        value={formData.features}
                        onChange={(val) => {
                            if (val.length <= 200) {
                                handleChange('features', val);
                            }
                        }}
                        maxLength={500}
                    />
                </div>
                
                <div className={styles.formRow}>
                    <div className={styles.existingImagesWrapper}>
                        <label className={styles.fileLabel}>Imágenes del vehículo</label>
                        <div className={styles.existingImages}>
                            {existingImages.map((img, index) => (
                                <div key={index} className={styles.existingImageWrapper}>
                                    <img 
                                        src={img} 
                                        alt={`Imagen ${index + 1}`} 
                                        className={styles.existingImage}
                                    />
                                    <button 
                                        className={styles.removeExistingImageBtn}
                                        onClick={() => handleRemoveExistingImage(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {existingImages.length < 5 && (
                                <button 
                                    className={styles.addImageBtn}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <PlusCircle size={40} />
                                </button>
                            )}
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAddImages}
                            accept=".jpg,.jpeg,.png,.pdf"
                            multiple
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>                

                <div className={styles.buttonsContainer}>
                    <Button size="medium" onClick={handleSave} disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                    <Button size="medium" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditVehicleModal;