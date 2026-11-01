import styles from './StudyDetailModal.module.css';
import Button from '../../common/Button/Button';
import type { CreditApplication } from '../../../types/credit';
import { Download } from 'lucide-react';
import { useStudyDocuments } from '../../../hooks/useStudyDocuments';

interface StudyDetailModalProps {
    application: CreditApplication;
    onClose: () => void;
}

const StudyDetailModal = ({ application, onClose }: StudyDetailModalProps) => {
    const {
        fullImage,
        setFullImage,
        signedUrls,
        handleEnviarWhatsApp
    } = useStudyDocuments(application);       

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
                                        href={`${import.meta.env.VITE_API_URL}/api/download/${encodeURIComponent(publicId)}`}
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