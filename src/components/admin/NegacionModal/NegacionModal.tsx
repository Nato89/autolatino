import styles from './NegacionModal.module.css';
import Button from '../../common/Button/Button';
import { useState } from 'react';

interface NegacionModalProps {
    onConfirm: (razon: string) => void;
    onCancel: () => void;
}

const NegacionModal = ({ onConfirm, onCancel }: NegacionModalProps) => {
    const [razon, setRazon] = useState('');

    const handleConfirm = () => {
        if (razon.trim() === '') {
            alert('Por favor escribe una razón');
            return;
        }
        onConfirm(razon);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Razón de negación</h2>
                <p className={styles.modalMessage}>
                    Escribe la razón por la que se niega la solicitud
                </p>

                <textarea
                    className={styles.textarea}
                    placeholder="Ej: El cliente no cumple con los ingresos mínimos requeridos."
                    value={razon}
                    onChange={(e) => {
                        if (e.target.value.length <= 200) {
                            setRazon(e.target.value);
                        }
                    }}
                    maxLength={200}
                />

                <p className={styles.charCount}>{razon.length} / 200</p>

                <div className={styles.buttonsContainer}>
                    <Button size="medium" onClick={handleConfirm}>
                        Guardar
                    </Button>
                    <Button size="medium" onClick={onCancel}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NegacionModal;