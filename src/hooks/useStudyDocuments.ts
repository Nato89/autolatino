import { useState, useEffect } from 'react';
import type { CreditApplication } from '../types/credit';

export const useStudyDocuments = (application: CreditApplication) => {
    const API_URL = import.meta.env.VITE_API_URL;

    // 1. Aquí van los estados
    const [fullImage, setFullImage] = useState<string | null>(null); 
    const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});    

    // 2. Aquí va el useEffect
    useEffect(() => {
        const fetchUrls = async () => {
            const urls: Record<string, string> = {};
            for (const publicId of application.archivos) {
                try {
                    const res = await fetch(`${API_URL}/api/cedula-url/${encodeURIComponent(publicId)}`);
                    if (res.ok) {
                        const data = await res.json();
                        urls[publicId] = data.url;
                    }
                } catch (error) {
                    console.error("Error obteniendo URL firmada:", error);
                }
            }
            setSignedUrls(urls);
        };

        if (application.archivos && application.archivos.length > 0) {
            fetchUrls();
        }
    }, [application.archivos, API_URL]);

    // 3. Aquí van las funciones (handleEnviarWhatsApp)
    const handleEnviarWhatsApp = () => {
        const message = `
            Solicitud de crédito:
            Nombre: ${application.nombres}
            Cédula: ${application.cedula}
            Celular: ${application.celular}
            Email: ${application.email}
            Ocupación: ${application.ocupacion}
            Ingresos: ${application.ingresos}
            Ref. Personal: ${application.refPersonalNombre} - ${application.refPersonalTel}
            Ref. Familiar: ${application.refFamiliarNombre} - ${application.refFamiliarTel}
        `.trim();

        window.open(`https://wa.me/573162489745?text=${encodeURIComponent(message)}`, '_blank');
    };

    // 4. Aquí va el return
        return {
        fullImage,
        setFullImage,
        signedUrls,
        handleEnviarWhatsApp
    };
};