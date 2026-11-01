import styles from './StatusModal.module.css';
import { useCreditStatus } from '../../../hooks/useCreditStatus';

export interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;   
}

export const StatusModal = ({ isOpen, onClose }: StatusModalProps) => {
        const {
        cedulaInput,
        setCedulaInput,
        foundApp,
        errorMsg,
        handleBuscar,
        handleCloseModal,
        getStatusClass
    } = useCreditStatus(onClose);  

    if (!isOpen) return null;
    
    const estadoNormalizado = foundApp ? foundApp.estado.toLowerCase().trim() : '';

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleCloseModal}>
                    &times;
                </button>

                <h2>Consultar Estado del Proceso</h2>
                <p>Ingresa tu número de documento sin espacios ni signos de puntuación para consultar el estado actual de tu solicitud de crédito.</p>

                <form onSubmit={handleBuscar}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Número de cédula"
                        value={cedulaInput}
                        onChange={(e) => setCedulaInput(e.target.value)}
                    />
                    <button type="submit" className={styles.submitButton}>
                        Consultar
                    </button>
                </form>

                {errorMsg && <div className={styles.error}>{errorMsg}</div>}

                {foundApp && (
                    <div className={styles.resultBox}>
                        <p><strong>Solicitante:</strong> {foundApp.nombres}</p>
                        
                        <p>
                            <strong>Estado actual:</strong>{' '}
                            <span className={`${styles.statusText} ${styles[getStatusClass(foundApp.estado) as keyof typeof styles] || ''}`}>
                                {foundApp.estado}
                            </span>
                        </p>

                        {estadoNormalizado === 'aprobado' && (
                            <p className={styles.successMessage}>
                                ¡Felicidades! Un asesor se contactará contigo lo más pronto posible.
                            </p>
                        )}

                        {estadoNormalizado === 'negado' && foundApp.razonNegacion?.trim() && (
                            <p>
                                <strong>Motivo:</strong> {foundApp.razonNegacion.trim()}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
