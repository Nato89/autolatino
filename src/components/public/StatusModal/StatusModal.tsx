import { useState } from 'react';
import styles from './StatusModal.module.css';
import type { CreditApplication } from '../../../types/credit';

export interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    creditApplications: CreditApplication[];
}

export const StatusModal = ({ isOpen, onClose, creditApplications }: StatusModalProps) => {
    const [cedulaInput, setCedulaInput] = useState('');
    const [foundApp, setFoundApp] = useState<CreditApplication | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleBuscar = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg('');
        setFoundApp(null);

        const trimmedCedula = cedulaInput.trim();
        if (!trimmedCedula) {
            setErrorMsg('Por favor ingresa un número de documento válido.');
            return;
        }

        const match = creditApplications.find(app => app.cedula === trimmedCedula);

        if (match) {
            setFoundApp(match);
        } else {
            setErrorMsg('No se encontró ninguna solicitud registrada con este número de cédula.');
        }
    };

    const handleCloseModal = () => {
        setCedulaInput('');
        setFoundApp(null);
        setErrorMsg('');
        onClose();
    };

    // Retorna clase solo si es aprobado o negado; deja el color original para los demás
    const getStatusClass = (estado: string) => {
        const est = estado.toLowerCase().trim();
        if (est === 'aprobado') return styles.statusAprobado;
        if (est === 'negado') return styles.statusNegado;
        return ''; 
    };

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
                            <span className={`${styles.statusText} ${getStatusClass(foundApp.estado)}`}>
                                {foundApp.estado}
                            </span>
                        </p>

                        {estadoNormalizado === 'aprobado' && (
                            <p className={styles.successMessage}>
                                ¡Felicidades! Un asesor se contactará contigo lo más pronto posible.
                            </p>
                        )}

                        {foundApp.razonNegacion && (
                            <p>
                                <strong>Motivo:</strong> {foundApp.razonNegacion}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};