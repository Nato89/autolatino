import { useState, useRef, } from 'react';
import { PlusCircle } from 'lucide-react';
import styles from './EditVehicleModal.module.css';
import Button from '../../common/Button/Button';
import InputField from '../../common/InputField/InputField';
import type { Vehicle } from '../../../types/vehicle';

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

    const handleSave = () => {
        console.log('Datos guardados:', formData);
        onClose();
    };

    const handleRemoveExistingImage = (index: number) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
            
            const totalImages = [...existingImages, ...newImageUrls].slice(0, 5);
            setExistingImages(totalImages);
        }
    };
    
    const [existingImages, setExistingImages] = useState<string[]>(vehicle.images);
    const fileInputRef = useRef<HTMLInputElement>(null);  

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
                    <Button size="medium" onClick={handleSave}>
                        Guardar
                    </Button>
                    <Button size="medium" onClick={onClose}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditVehicleModal;