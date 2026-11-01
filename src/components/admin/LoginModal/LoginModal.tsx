import styles from './LoginModal.module.css';
import avatarIcon from '../../../assets/images/Iconos/avatar.svg';
import Button from '../../common/Button/Button';
import { useAdminLogin } from '../../../hooks/useAdminLogin';

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
        const {
        usuario,
        setUsuario,
        password,
        setPassword,
        error,
        handleLogin
    } = useAdminLogin(onClose);      

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>

                <img src={avatarIcon} alt="Empleado" className={styles.avatar} />

                <div className={styles.field}>
                    <label>Usuario</label>
                    <input
                        type="text"
                        placeholder="JuanPerez"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="*****"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* AQUÍ AGREGAMOS ESTO: Si hay un error, lo mostramos en rojo */}
                {error && <p style={{ color: '#DC2626', fontSize: '0.85rem', textAlign: 'center', margin: '0.5rem 0' }}>{error}</p>}

                <div className={styles.loginBtnWrapper}>
                    <Button size="medium" onClick={handleLogin}>
                        Log in
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;