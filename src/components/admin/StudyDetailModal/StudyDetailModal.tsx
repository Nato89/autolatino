import styles from './StudyDetailModal.module.css';
import Button from '../../common/Button/Button';
import type { CreditApplication } from '../../../types/credit';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface StudyDetailModalProps {
    application: CreditApplication;
    onClose: () => void;
}

const StudyDetailModal = ({ application, onClose }: StudyDetailModalProps) => {
    const [fullImage, setFullImage] = useState<string | null>(null);

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
                            {application.archivos.map((archivo, index) => (
                                <div key={index} className={styles.archivoItem}>
                                    {archivo.endsWith('.pdf') ? (
                                        <div className={styles.pdfIcon}>PDF</div>
                                    ) : (
                                        <img 
                                            src={archivo} 
                                            alt={`Cédula ${index + 1}`} 
                                            className={styles.archivoThumbnail}
                                            onClick={() => setFullImage(archivo)}
                                        />
                                    )}
                                    <a 
                                        href={archivo} 
                                        download 
                                        className={styles.downloadBtn}
                                        title="Descargar archivo"
                                    >
                                        <Download size={20} />
                                    </a>
                                </div>
                            ))}
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