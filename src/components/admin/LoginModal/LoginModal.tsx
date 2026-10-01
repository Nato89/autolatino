import styles from './LoginModal.module.css';
import avatarIcon from '../../../assets/images/Iconos/avatar.svg';
import { useState } from 'react';
import Button from '../../common/Button/Button';

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
    const [usuario, setUsuario ] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log('Usuario:', usuario);
        console.log('Contraseña:', password);
    };

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