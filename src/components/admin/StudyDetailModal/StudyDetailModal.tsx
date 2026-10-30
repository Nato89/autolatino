import styles from './StudyDetailModal.module.css';
import Button from '../../common/Button/Button';
import type { CreditApplication } from '../../../types/credit';
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StudyDetailModalProps {
    application: CreditApplication;
    onClose: () => void;
}

const StudyDetailModal = ({ application, onClose }: StudyDetailModalProps) => {
    const [fullImage, setFullImage] = useState<string | null>(null);
    
    // Estado para guardar las URLs firmadas que nos devuelve el backend
    const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
    const API_URL = import.meta.env.VITE_API_URL;

    // useEffect para pedirle las URLs al backend al abrir el modal
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

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>

                <h2 className={styles.modalTitle}>Detalle de la solicitud</h2>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Datos personales</h3>
                    <p><strong>Nombres:</strong> {application.nombres}</p>
                    <p><strong>Cédula:</strong> {application.cedula}</p>
                    <p><strong>Celular:</strong> {application.celular}</p>
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Ocupación:</strong> {application.ocupacion}</p>
                    <p><strong>Ingresos:</strong> {application.ingresos}</p>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Referencias</h3>
                    <p><strong>Personal:</strong> {application.refPersonalNombre} - {application.refPersonalTel}</p>
                    <p><strong>Familiar:</strong> {application.refFamiliarNombre} - {application.refFamiliarTel}</p>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Archivos de cédula</h3>
                    <div className={styles.archivosContainer}>
                        {application.archivos.map((publicId, index) => {
                            const signedUrl = signedUrls[publicId]; // Buscamos la URL firmada
                            const isPdf = publicId.toLowerCase().endsWith('.pdf');

                            if (!signedUrl) {
                                return <p key={index}>Cargando archivo...</p>;
                            }

                            return (
                                <div key={index} className={styles.archivoItem}>
                                    {isPdf ? (
                                        <div className={styles.pdfIcon}>PDF</div>
                                    ) : (
                                        <img 
                                            src={signedUrl} 
                                            alt={`Cédula ${index + 1}`} 
                                            className={styles.archivoThumbnail}
                                            onClick={() => setFullImage(signedUrl)}
                                        />
                                    )}
                                    
                                    {/* Enlace de descarga apuntando al backend */}
                                    <a 
                                        href={`${API_URL}/api/download/${encodeURIComponent(publicId)}`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={styles.downloadBtn}
                                        title="Descargar archivo"
                                    >
                                        <Download size={20} />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {application.estado === 'Negado' && application.razonNegacion && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Razón de negación</h3>
                        <p>{application.razonNegacion}</p>
                    </div>
                )}

                <div className={styles.buttonsContainer}>
                    <Button size="medium" onClick={handleEnviarWhatsApp}>
                        Enviar al asesor bancario
                    </Button>
                    <Button size="medium" onClick={onClose}>
                        Cerrar
                    </Button>
                </div>
            </div>

            {fullImage && (
                <div className={styles.fullImageOverlay} onClick={() => setFullImage(null)}>
                    <img src={fullImage} alt="Cédula ampliada" className={styles.fullImage} />
                </div>
            )}
        </div>
    );
};

export default StudyDetailModal;