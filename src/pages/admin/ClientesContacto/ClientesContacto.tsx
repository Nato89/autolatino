import styles from './ClientesContacto.module.css';
import Button from '../../../components/common/Button/Button';
import { Trash2 } from 'lucide-react';
import ConfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import { useAdminContacts } from '../../../hooks/useAdminContacts';


const ClientesContacto = () => {        
        const {
        clientList,
        deletingContactId,
        setDeletingContactId,
        handleDelete
    } = useAdminContacts();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Clientes para contactar</h1>
                <Button size="medium" onClick={() => window.history.back()}>
                    Volver
                </Button>
            </div>

             {/* Tabla: Clientes a contactar */}
            <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Clientes para contactar</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>                            
                            <th>Celular</th>
                            <th>Email</th>
                            <th>Asunto</th>
                            <th>Mensaje</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                    {clientList.map((contact) => (
                        <tr key={contact.id}>
                            <td data-label="Nombre">{contact.nombre}</td>
                            <td data-label="Celular">
                                <a 
                                    href={`https://wa.me/${contact.celular}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'underline' }}
                                >
                                    {contact.celular}
                                </a>
                            </td>
                            <td data-label="Email">{contact.email}</td>
                            <td data-label="Asunto">{contact.asunto}</td>
                            <td data-label="Mensaje">{contact.mensaje || 'N/A'}</td>
                            <td className={styles.actionsCell} data-label="Acciones">
                                    <div className={styles.actionsButtons}>                                        
                                        <button 
                                            className={styles.deleteBtn} 
                                            title="Eliminar solicitud"
                                            onClick={() => setDeletingContactId(contact.id)}
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
            
            { /* Modal de confirmación */ }
            {deletingContactId !== null && (
                <ConfirmModal
                    message={`¿Estás seguro de que quieres eliminar el contacto de ${clientList.find(c => c.id === deletingContactId)?.nombre}?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeletingContactId(null)}
                />
            )}
        </div>
    );
}

export default ClientesContacto;