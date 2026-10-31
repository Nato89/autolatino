import { useState, useEffect } from 'react';
import type { CreditApplication } from '../types/credit';
import { subscribeToCreditApplications, deleteCreditApplication, updateCreditApplication } from '../services/creditService';

export const useAdminCreditApplications = () => {
    // 1. Aquí van los estados
    const [applications, setApplications] = useState<CreditApplication[]>([]);
    const [deletingApplication, setDeletingApplication] = useState<string | number | null>(null);
    const [viewingApplication, setViewingApplication] = useState<string | number | null>(null);
    const [negatingApplication, setNegatingApplication] = useState<string | number | null>(null);

    // 2. Aquí va la lógica derivada (los filter)
    const solicitudesNuevas = applications.filter(
        (app) => app.estado === 'Inicial' || app.estado === 'En estudio'
    );

    const solicitudesGestionadas = applications.filter(
        (app) => app.estado === 'Aprobado' || app.estado === 'Negado'
    );

    // 3. Aquí van los useEffect y las funciones
    useEffect(() => {
        const unsubscribe = subscribeToCreditApplications((data) => {
            setApplications(data);
        });
        return () => unsubscribe();
    }, []);

    const handleChangeEstado = async (id: string | number, nuevoEstado: CreditApplication['estado']) => {
        if (nuevoEstado === 'Negado') {
            setNegatingApplication(id);
            return;
        }

        try {
            await updateCreditApplication(id, { 
                estado: nuevoEstado, 
                updatedAt: new Date().toISOString() 
            });
            
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
        }
    };

    const handleConfirmNegacion = async (razon: string) => {
        if (negatingApplication === null) return;

        try {
            await updateCreditApplication(negatingApplication, {
                estado: 'Negado',
                razonNegacion: razon,
                updatedAt: new Date().toISOString()
            });            
            setNegatingApplication(null);
        } catch (error) {
            console.error("Error al negar la solicitud:", error);
        }
    };

    // 4. Aquí va el return
        return {
        solicitudesNuevas,
        solicitudesGestionadas,
        applications,
        deletingApplication,
        setDeletingApplication,
        viewingApplication,
        setViewingApplication,
        negatingApplication,
        setNegatingApplication,
        handleChangeEstado,
        handleConfirmNegacion,
        deleteCreditApplication
    };
};