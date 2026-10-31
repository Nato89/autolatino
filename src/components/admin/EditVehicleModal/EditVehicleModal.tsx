import { PlusCircle } from 'lucide-react';
import styles from './EditVehicleModal.module.css';
import Button from '../../common/Button/Button';
import InputField from '../../common/InputField/InputField';
import { useVehicleEditor } from '../../../hooks/useVehicleEditor';
import type { Vehicle } from '../../../types/vehicle';

interface EditVehicleModalProps {
    vehicle: Vehicle;
    onClose: () => void;
}

const EditVehicleModal = ({ vehicle, onClose }: EditVehicleModalProps) => {
    const {
        formData,
        handleChange,
        existingImages,
        handleRemoveExistingImage,
        handleAddImages,
        fileInputRef,
        loading,
        saveError,
        handleSave
    } = useVehicleEditor(vehicle, onClose);    
       
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
                                        disabled={loading}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {existingImages.length < 5 && (
                                <button 
                                    className={styles.addImageBtn}
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={loading}
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

                {saveError && <p role="alert">{saveError}</p>}

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
