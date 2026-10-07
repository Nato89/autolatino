import { useState } from 'react';
import styles from './AddVehicleModal.module.css';
import Button from '../../common/Button/Button';
import InputField from '../../common/InputField/InputField';
import FileUploader from '../../public/FileUploader/FileUploader';

interface AddVehicleModalProps {
    onClose: () => void;
}

const AddVehicleModal = ({ onClose }: AddVehicleModalProps) => {
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

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        console.log('Nuevo vehículo:', formData, files);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>

                <h2 className={styles.modalTitle}>Agregar Vehículo</h2>

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
                        value={formData.year}
                        onChange={(val) => handleChange('year', val)}
                        required
                        pattern="[0-9]*"
                    />
                    <InputField
                        label="Precio"
                        type="text"
                        value={formData.price}
                        onChange={(val) => handleChange('price', val)}
                        required
                        pattern="[0-9]*"
                    />
                </div>

                <div className={styles.formRow}>
                    <InputField
                        label="Km"
                        type="text"
                        value={formData.km}
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
                        onChange={(val) => handleChange('features', val)}
                        maxLength={200}
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.fileUploaderWrapper}>
                        <label className={styles.fileLabel}>Imágenes del vehículo</label>
                        <FileUploader files={files} setFiles={setFiles} maxFiles={5} />
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

export default AddVehicleModal;