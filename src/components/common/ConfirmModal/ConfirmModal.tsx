import styles from './ConfirmModal.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void | Promise<void>; // Acepta funciones asíncronas
    onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm(); // Espera a que termine el borrado en Firestore/Cloudinary
        } finally {
            setIsDeleting(false); // Pase lo que pase, se quita el estado de carga
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Confirmar acción</h2>
                <p className={styles.modalMessage}>{message}</p>
                <div className={styles.buttonsContainer}>
                    <Button size="medium" onClick={handleConfirm} disabled={isDeleting}>
                        {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
                    </Button>
                    <Button size="medium" onClick={onCancel} disabled={isDeleting}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;