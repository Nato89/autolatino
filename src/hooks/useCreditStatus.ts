import { useState, useEffect } from 'react';
import { subscribeToCreditApplications } from '../services/creditService';
import type { CreditApplication } from '../types/credit';

export const useCreditStatus = (onClose: () => void) => {
    // 1. Aquí van los estados
    const [applications, setApplications] = useState<CreditApplication[]>([]);
    const [cedulaInput, setCedulaInput] = useState('');
    const [foundApp, setFoundApp] = useState<CreditApplication | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    // 2. Aquí van los efectos (useEffect)
    useEffect(() => {
        const unsubscribe = subscribeToCreditApplications((data) => {
            setApplications(data);
            setFoundApp((current) => (
                current ? data.find((application) => application.id === current.id) ?? null : null
            ));
        });
        return () => unsubscribe();
    }, []);

    // 3. Aquí van las funciones
    const handleBuscar = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg('');
        setFoundApp(null);

        const trimmedCedula = cedulaInput.trim();
        if (!trimmedCedula) {
            setErrorMsg('Por favor ingresa un número de documento válido.');
            return;
        }

        const match = applications.find(app => app.cedula === trimmedCedula);

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
        if (est === 'aprobado') return 'statusAprobado'; 
        if (est === 'negado') return 'statusNegado';     
        return ''; 
    };

    // 4. Aquí va el return
    return {
        applications,
        cedulaInput,
        setCedulaInput,
        foundApp,
        errorMsg,
        handleBuscar,
        handleCloseModal,
        getStatusClass,        
    };    
}