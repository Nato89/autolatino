import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../../components/common/Button/Button';
import styles from './AdminDashboard.module.css';
import { useAuth } from '../../../context/AuthContext';

const AdminDashboard = () => {
    const navigate = useNavigate();    
    const { isLoggedIn, adminName, logout, loading } = useAuth();   
    
    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, loading, navigate]);

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Panel de Administración - AutoLatino</h1>
                <Button 
                    size="medium" 
                    onClick={async () => { await logout(); navigate('/'); }}                   
                >
                    Cerrar Sesión
                </Button>
            </div>
            
            {/* Tarjeta de bienvenida original */}
            <div className={styles.contentCard}>
                <h2 className={styles.welcomeTitle}>Bienvenido, {adminName || 'Asesor'}</h2>
                <p className={styles.description}>
                    Este es el panel de control. Próximamente aquí podrás ver y gestionar las solicitudes de crédito de los clientes y administrar el catálogo de vehículos.
                </p>
            </div>

            {/* Nueva sección con las 3 tarjetas organizadas en horizontal */}
            <div className={styles.cardsGrid}>
                {/* Tarjeta Izquierda */}
                <div 
                    className={styles.actionCard}
                    onClick={() => navigate('/admin/vehiculos')}
                    style={{ cursor: 'pointer' }}
                >
                    <h3 className={styles.cardTitle}>Gestionar vehículos</h3>
                    <p className={styles.cardDescription}>
                        Administra el catálogo, agrega nuevos vehículos, edita especificaciones y controla la disponibilidad.
                    </p>
                </div>

                {/* Tarjeta Centro */}
                <div 
                    className={styles.actionCard}
                    onClick={() => navigate('/admin/estudios')}
                    style={{ cursor: 'pointer' }}
                >
                    <h3 className={styles.cardTitle}>Procesos de crédito</h3>
                    <p className={styles.cardDescription}>
                        Revisa el estado de las solicitudes de financiamiento y haz seguimiento a los expedientes.
                    </p>
                </div>

                {/* Tarjeta Derecha */}
                <div 
                    className={styles.actionCard}
                    onClick={() => navigate('/admin/clientes-contacto')}
                    style={{ cursor: 'pointer' }}
                >
                    <h3 className={styles.cardTitle}>Clientes para contactar</h3>
                    <p className={styles.cardDescription}>
                        Visualiza la lista de leads y clientes interesados que requieren seguimiento comercial.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;