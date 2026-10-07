import styles from './ConfirmModal.module.css';
import Button from '../Button/Button';

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Confirmar acción</h2>
                <p className={styles.modalMessage}>{message}</p>
                <div className={styles.buttonsContainer}>
                    <Button size="medium" onClick={onConfirm}>
                        Sí, eliminar
                    </Button>
                    <Button size="medium" onClick={onCancel}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;