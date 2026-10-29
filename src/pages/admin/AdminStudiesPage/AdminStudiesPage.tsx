import styles from './AdminStudiesPage.module.css';
import type { CreditApplication } from '../../../types/credit';
import { subscribeToCreditApplications, deleteCreditApplication, updateCreditApplication } from '../../../services/creditService';
import Button from '../../../components/common/Button/Button';
import { Eye, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import ConfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import StudyDetailModal from '../../../components/admin/StudyDetailModal/StudyDetailModal';
import NegacionModal from '../../../components/admin/NegacionModal/NegacionModal';

const AdminStudiesPage = () => {
    const [applications, setApplications] = useState<CreditApplication[]>([]);

        useEffect(() => {
            const unsubscribe = subscribeToCreditApplications((data) => {
                setApplications(data);
            });
            return () => unsubscribe();
        }, []);

    const [deletingApplication, setDeletingApplication] = useState<string | number | null>(null);
    const [viewingApplication, setViewingApplication] = useState<string | number | null>(null);
    const [negatingApplication, setNegatingApplication] = useState<string | number | null>(null);

    const solicitudesNuevas = applications.filter(
        (app) => app.estado === 'Inicial' || app.estado === 'En estudio'
    );

    const solicitudesGestionadas = applications.filter(
        (app) => app.estado === 'Aprobado' || app.estado === 'Negado'
    );

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

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Procesos de Crédito</h1>
                <Button size="medium" onClick={() => window.history.back()}>
                    Volver
                </Button>
            </div>

            {/* Tabla 1: Solicitudes nuevas y en estudio */}
            <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Solicitudes por revisar</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Celular</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudesNuevas.map((app) => (
                            <tr key={app.id}>
                                <td data-label="Nombre">{app.nombres}</td>
                                <td data-label="Cédula">{app.cedula}</td>
                                <td data-label="Celular">{app.celular}</td>
                                <td data-label="Estado">
                                    <select 
                                        value={app.estado}
                                        onChange={(e) => handleChangeEstado(app.id, e.target.value as CreditApplication['estado'])}
                                        className={`${styles.estadoSelect} ${styles[`estado${app.estado.replace(' ', '')}`]}`}
                                    >
                                        <option value="Inicial">Inicial</option>
                                        <option value="En estudio">En estudio</option>
                                        <option value="Aprobado">Aprobado</option>
                                        <option value="Negado">Negado</option>
                                    </select>
                                </td>
                                <td data-label="Fecha">{new Date(app.createdAt).toLocaleDateString()}</td>
                                <td className={styles.actionsCell} data-label="Acciones">
                                    <div className={styles.actionsButtons}>
                                        <button 
                                            className={styles.viewBtn} 
                                            title="Ver detalle"
                                            onClick={() => setViewingApplication(app.id)}
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button 
                                            className={styles.deleteBtn} 
                                            title="Eliminar solicitud"
                                            onClick={() => setDeletingApplication(app.id)}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tabla 2: Solicitudes aprobadas o negadas */}
            <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Solicitudes gestionadas</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Celular</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudesGestionadas.map((app) => (
                            <tr key={app.id}>
                                <td data-label="Nombre">{app.nombres}</td>
                                <td data-label="Cédula">{app.cedula}</td>
                                <td data-label="Celular">{app.celular}</td>
                                <td data-label="Estado">
                                    <select 
                                        value={app.estado}
                                        onChange={(e) => handleChangeEstado(app.id, e.target.value as CreditApplication['estado'])}
                                        className={`${styles.estadoSelect} ${styles[`estado${app.estado.replace(' ', '')}`]}`}
                                    >
                                        <option value="Inicial">Inicial</option>
                                        <option value="En estudio">En estudio</option>
                                        <option value="Aprobado">Aprobado</option>
                                        <option value="Negado">Negado</option>
                                    </select>
                                </td>
                                <td data-label="Fecha">{new Date(app.updatedAt).toLocaleDateString()}</td>
                                <td className={styles.actionsCell} data-label="Acciones">
                                    <div className={styles.actionsButtons}>
                                        <button 
                                            className={styles.viewBtn} 
                                            title="Ver detalle"
                                            onClick={() => setViewingApplication(app.id)}
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button 
                                            className={styles.deleteBtn} 
                                            title="Eliminar solicitud"
                                            onClick={() => setDeletingApplication(app.id)}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            { /* Modal de detalle de solicitud */ }
            {viewingApplication !== null && (
                <StudyDetailModal
                    application={applications.find(a => a.id === viewingApplication)!}
                    onClose={() => setViewingApplication(null)}
                />
            )}

            { /* Modal de confirmación */ }
            {deletingApplication !== null && (
                <ConfirmModal
                    message={`¿Estás seguro de que quieres eliminar la solicitud de ${applications.find(a => a.id === deletingApplication)?.nombres}?`}
                    onConfirm={async () => {
                        if (deletingApplication !== null) {
                            try {
                                await deleteCreditApplication(deletingApplication);                                
                                setDeletingApplication(null);
                            } catch (error) {
                                console.error("Error al eliminar la solicitud:", error);
                            }
                        }
                    }}
                    onCancel={() => setDeletingApplication(null)}
                />
            )}

            { /* Modal de negación */ }
            {negatingApplication !== null && (
                <NegacionModal
                    onConfirm={handleConfirmNegacion}
                    onCancel={() => setNegatingApplication(null)}
                />
            )}
        </div>
    );
};

export default AdminStudiesPage;