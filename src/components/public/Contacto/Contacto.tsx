import styles from './Contacto.module.css';
import InputField from '../../common/InputField/InputField';
import { useContactForm } from '../../../hooks/useContactForm';

const Contacto = () => {
        const {
        formData,
        handleChange,
        handleSubmit,
        showModal,
        setShowModal,
        enviando
    } = useContactForm();        

    return (
        <section className={styles.Contacto}>
            <div className={styles.left}>
                <h1 className={styles.titulo}>Contacto</h1>
                <p>Hablemos de tu próximo <span className={styles.gold}>vehículo</span></p>
                <p>Nuestros asesores se contactarán para el proceso de compra, venta, financiación o duda que tengas.</p>
            </div>

            <form className={styles.right} onSubmit={handleSubmit}>

                {/* Fila 1: Nombre */}
                <div className={styles.formRow}>
                    <InputField
                            label="Nombre"
                            type="text"
                            placeholder="Juan Pérez"
                            value={formData.nombre}
                            onChange={(val) => handleChange('nombre', val)}
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
                
                <button disabled={enviando} className={styles.enviarBtn}>
                    {enviando ? 'Enviando...' : 'Enviar'}
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



// CÓDIGO VIEJO POR SI LAS MOSCAS
// import styles from './Contacto.module.css';
// import { useState } from 'react';
// import InputField from '../../common/InputField/InputField';
// import { addContact } from '../../../services/clientService';

// const Contacto = () => {

//     const [showModal, setShowModal] = useState(false);
//     const [enviando, setEnviando] = useState(false);

//     const [formData, setFormData] = useState({
//         nombre: '',        
//         celular: '',
//         email: '',
//         asunto: '',
//         mensaje: '',
//     });    

//     const handleChange = (field: string, value: string | boolean) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     return (
//         <section className={styles.Contacto}>
//             <div className={styles.left}>
//                 <h1 className={styles.titulo}>Contacto</h1>
//                 <p>Hablemos de tu próximo <span className={styles.gold}>vehículo</span></p>
//                 <p>Nuestros asesores se contactarán para el proceso de compra, venta, financiación o duda que tengas.</p>
//             </div>

//             <form className={styles.right} onSubmit={async (e) => { 
//                 e.preventDefault();
                
//                 setEnviando(true);

//                 try {
//                     await addContact({
//                         nombre: formData.nombre,
//                         celular: formData.celular,
//                         email: formData.email,
//                         asunto: formData.asunto,
//                         mensaje: formData.mensaje,
//                     });

//                     setShowModal(true); 
//                     setFormData({
//                         nombre: '',
//                         celular: '',
//                         email: '',
//                         asunto: '',
//                         mensaje: '',
//                     });
//                 } catch (error) {
//                     console.error("Error al enviar el contacto:", error);
//                     alert("Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.");
//                 } finally {
//                     setEnviando(false);
//                 }
//             }}>

//                 {/* Fila 1: Nombre */}
//                 <div className={styles.formRow}>
//                     <InputField
//                             label="Nombre"
//                             type="text"
//                             placeholder="Juan Pérez"
//                             value={formData.nombre}
//                             onChange={(val) => handleChange('nombre', val)}
//                             required
//                         />                    
//                 </div>

//                 {/* Fila 2: Celular + Email  */}
//                 <div className={styles.formRow}>
//                     <div className={styles.formCol}>
//                         <InputField
//                             label="Celular"
//                             type="tel"
//                             placeholder="0000000000"
//                             value={formData.celular}
//                             onChange={(val) => handleChange('celular', val)}
//                             required
//                             pattern="[0-9]{10}"
//                             maxLength={10}
//                         />
//                     </div>
//                     <div className={styles.formCol}>
//                         <InputField
//                             label="Email"
//                             type="email"
//                             placeholder="juanperez@correo.com"
//                             value={formData.email}
//                             onChange={(val) => handleChange('email', val)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 {/* Fila 3: Asunto  */} 
//                 <div className={styles.formRow}>
//                     <InputField
//                             label="Asunto"
//                             type="select"
//                             value={formData.asunto}
//                             onChange={(val) => handleChange('asunto', val)}
//                             required
//                             options={[
//                                 { value: 'deseo vender mi vehiculo', label: 'Deseo vender mi vehículo' },
//                                 { value: 'deseo comprar vehiculo', label: 'Deseo comprar vehículo' },
//                                 { value: 'asesoría de credito', label: 'Asesoría de crédito' },
//                                 { value: 'deseo que un asesor me contacte', label: 'Deseo que un asesor me contacte' },
//                             ]}
//                         />
//                 </div>

//                 <div className={styles.formRow}>
//                         <InputField
//                             label="Mensaje (Opcional)"
//                             type="textarea"
//                             placeholder="ej. Deseo asesoría para compra de vehículo y crédito"
//                             value={formData.mensaje}
//                             onChange={(val) => handleChange('mensaje', val)}                            
//                         />
//                 </div>
                
//                 <button disabled={enviando} className={styles.enviarBtn}>
//                     {enviando ? 'Enviando...' : 'Enviar'}
//                 </button>
//             </form>

//             {showModal && (
//                 <div className={styles.modalOverlay}>
//                     <div className={styles.modalContent}>
//                         <h2 className={styles.modalTitle}>Gracias por tu mensaje</h2>
//                         <p className={styles.modalText}>En breve un asesor se pondrá en contacto contigo</p>
//                         <button className={styles.modalBtn} onClick={() => setShowModal(false)}>
//                             OK
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };

// export default Contacto;