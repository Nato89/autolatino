import styles from './Credito.module.css';
import { useState, useRef } from 'react';
import Button from '../../common/Button/Button';
import InputField from '../../common/InputField/InputField';
import uploadIcon from '../../../assets/images/Iconos/upload.svg';
import paperclipIcon from '../../../assets/images/Iconos/paperclip.svg';


const Credito = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        cedula: '',
        celular: '',
        email: '',
        ocupacion: '',
        ingresos: '',
        refPersonalNombre: '',
        refPersonalTel: '',
        refFamiliarNombre: '',
        refFamiliarTel: '',
        aceptaTerminos: false,
    });
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <section className={styles.credito}>
            <div className={styles.left}>
                <h1 className={styles.titulo}>Crédito</h1>
                <p className={styles.texto}>Regálanos tus datos y foto de cédula por ambos lados.</p>
                <p className={styles.texto}>De 1 a 2 días hábiles te daremos una respuesta</p>
                <div className={styles.buttonsContainer}>
                    <div className={styles.revisarWrapper}>
                        <Button size="large">Revisar proceso</Button>
                    </div>
                    <div className={`${styles.dudaWrapper} ${styles.dudaWrapperRelative}`}>
                        <Button size="large">
                            Tienes alguna duda?
                            <img 
                                src="/src/assets/images/Iconos/wa.png" 
                                alt="WhatsApp" 
                                className={styles.whatsappIconFloat}
                            />
                        </Button>
                    </div>
                </div>
            </div>
            <form className={styles.right} onSubmit={(e) => { 
                e.preventDefault(); 
                if (!file) {
                    alert('Por favor adjunta la foto de tu cédula');
                    return;
                }
                setShowModal(true); 
            }}>
                {/* Fila 1: Nombres + Cédula */}
                <div className={styles.formRow}>
                    <div className={styles.formCol}>
                        <InputField
                            label="Nombres"
                            type="text"
                            placeholder="Juan Pérez"
                            value={formData.nombres}
                            onChange={(val) => handleChange('nombres', val)}
                            required
                        />
                    </div>
                    <div className={styles.formCol}>
                        <InputField
                            label="Cédula"
                            type="text"
                            placeholder="1020000000"
                            value={formData.cedula}
                            onChange={(val) => handleChange('cedula', val)}
                            required
                            pattern="[0-9]{10,12}"
                            maxLength={12}
                        />
                    </div>
                </div>

                {/* Fila 2: Celular + Email */}
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

                {/* Fila 3: Ocupación + Ingresos */}
                <div className={styles.formRow}>
                    <div className={styles.formCol}>
                        <InputField
                            label="Ocupación"
                            type="select"
                            value={formData.ocupacion}
                            onChange={(val) => handleChange('ocupacion', val)}
                            required
                            options={[
                                { value: 'empleado', label: 'Empleado' },
                                { value: 'independiente', label: 'Independiente' },
                                { value: 'ambas', label: 'Ambas' },
                            ]}
                        />
                    </div>
                    <div className={styles.formCol}>
                        <InputField
                            label="Ingresos mensuales"
                            type="select"
                            value={formData.ingresos}
                            onChange={(val) => handleChange('ingresos', val)}
                            required
                            options={[
                                { value: '2-3', label: "2'000.000 a 3'000.000" },
                                { value: '3-5', label: "3'000.000 a 5'000.000" },
                                { value: '5+', label: "5'000.000 o más" },
                            ]}
                        />
                    </div>
                </div>

                {/* Fila 4: Referencia personal + Referencia familiar */}
                <div className={styles.formRow}>
                    {/* Columna izquierda: Referencia personal */}
                    <div className={styles.formCol}>
                        <InputField
                            label="Referencia personal"
                            type="text"
                            placeholder="Nombre y apellidos"
                            value={formData.refPersonalNombre}
                            onChange={(val) => handleChange('refPersonalNombre', val)}
                            required
                        />
                        <InputField
                            label=""
                            type="tel"
                            placeholder="Número de contacto"
                            value={formData.refPersonalTel}
                            onChange={(val) => handleChange('refPersonalTel', val)}
                            required
                            pattern="[0-9]*"
                            maxLength={10}
                        />
                    </div>

                    {/* Columna derecha: Referencia familiar */}
                    <div className={styles.formCol}>
                        <InputField
                            label="Referencia familiar"
                            type="text"
                            placeholder="Nombre y apellidos"
                            value={formData.refFamiliarNombre}
                            onChange={(val) => handleChange('refFamiliarNombre', val)}
                            required
                        />
                        <InputField
                            label=""
                            type="tel"
                            placeholder="Número de contacto"
                            value={formData.refFamiliarTel}
                            onChange={(val) => handleChange('refFamiliarTel', val)}
                            required
                            pattern="[0-9]*"
                            maxLength={10}
                        />
                    </div>
                </div>
                {/* Fila 5: Drag & Drop + Checkbox + Enviar */}
                <div className={styles.formRow}>
                    {/* Columna izquierda: texto, checkbox y botón enviar */}
                    <div className={`${styles.formCol} ${styles.centeredCol}`}>
                        <p className={styles.fileText}>Adjuntamos la foto de tu cédula por ambos lados.</p>
                        
                        <div className={styles.checkboxRow}>
                            <label htmlFor="aceptaTerminos">
                                Acepto que se use esta información para la viabilidad de crédito
                            </label>
                            <input 
                                type="checkbox" 
                                id="aceptaTerminos"
                                checked={formData.aceptaTerminos}
                                onChange={(e) => handleChange('aceptaTerminos', e.target.checked)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.enviarBtn}>
                            Enviar
                        </button>
                    </div>

                    {/* Columna derecha: zona de drag & drop */}
                    <div className={styles.formCol}>
                        <div 
                        className={styles.dropZone}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img src={uploadIcon} alt="Subir" className={styles.uploadIcon} />
                        <p>{file ? file.name : 'Arrastra la foto aquí'}</p>
                        <img src={paperclipIcon} alt="Buscar archivo" className={styles.paperclipIcon} />
                        {file && (
                            <button 
                                className={styles.removeFileBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile();
                                }}
                            >
                                ✕
                            </button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            style={{ display: 'none' }}
                        />
                    </div>
                    </div>
                </div>
            </form>
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>¡Gracias por tu solicitud!</h2>
                        <p className={styles.modalText}>En 1-2 días hábiles te estaremos dando respuesta</p>
                        <button className={styles.modalBtn} onClick={() => setShowModal(false)}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Credito;