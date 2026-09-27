import styles from './Contacto.module.css';
import { useState } from 'react';
import InputField from '../../common/InputField/InputField';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombres: '',        
        celular: '',
        email: '',
        asunto: '',
        mensaje: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <section className={styles.Contacto}>
            <div className={styles.left}>
                <h1 className={styles.titulo}>Contacto</h1>
                <p>Hablemos de tu próximo <span className={styles.gold}>vehículo</span></p>
                <p>Nuestros asesores se contactarán para el proceso de compra, venta, financiación o duda que tengas.</p>
            </div>

            <form className={styles.right} onSubmit={(e) => { 
                e.preventDefault(); 
                setShowModal(true); 
                setFormData({
                    nombres: '',
                    celular: '',
                    email: '',
                    asunto: '',
                    mensaje: '',
                });
            }}>

                {/* Fila 1: Nombres */}
                <div className={styles.formRow}>
                    <InputField
                            label="Nombres"
                            type="text"
                            placeholder="Juan Pérez"
                            value={formData.nombres}
                            onChange={(val) => handleChange('nombres', val)}
                            required
                        />                    
                </div>

                {/* Fila 2: Celular + Email  */}
                <div className={styles.formRow}>
                    <div className={styles.formCol}>
                        <InputField
                            label="Celular"
                            type="tel"
                            placeholder="0000000000"
                            value={formData.celular}
                            onChange={(val) => handleChange('celular', val)}
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                        />
                    </div>
                    <div className={styles.formCol}>
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="juanperez@correo.com"
                            value={formData.email}
                            onChange={(val) => handleChange('email', val)}
                            required
                        />
                    </div>
                </div>

                {/* Fila 3: Asunto  */} 
                <div className={styles.formRow}>
                    <InputField
                            label="Asunto"
                            type="select"
                            value={formData.asunto}
                            onChange={(val) => handleChange('asunto', val)}
                            required
                            options={[
                                { value: 'deseo vender mi vehiculo', label: 'Deseo vender mi vehículo' },
                                { value: 'deseo comprar vehiculo', label: 'Deseo comprar vehículo' },
                                { value: 'asesoría de credito', label: 'Asesoría de crédito' },
                                { value: 'deseo que un asesor me contacte', label: 'Deseo que un asesor me contacte' },
                            ]}
                        />
                </div>

                <div className={styles.formRow}>
                        <InputField
                            label="Mensaje (Opcional)"
                            type="textarea"
                            placeholder="ej. Deseo asesoría para compra de vehículo y crédito"
                            value={formData.mensaje}
                            onChange={(val) => handleChange('mensaje', val)}                            
                        />
                </div>

                <button type="submit" className={styles.enviarBtn}>
                            Enviar
                </button>
            </form>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Gracias por tu mensaje</h2>
                        <p className={styles.modalText}>En breve un asesor se pondrá en contacto contigo</p>
                        <button className={styles.modalBtn} onClick={() => setShowModal(false)}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contacto;