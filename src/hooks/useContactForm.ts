import { useState } from 'react';
import { addContact } from '../services/clientService';

export const useContactForm = () => {
    // 1. Aquí van los estados (showModal, enviando, formData)
    const [showModal, setShowModal] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',        
        celular: '',
        email: '',
        asunto: '',
        mensaje: '',
    });    

    // 2. Aquí va la función handleChange
    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // 3. Aquí va la función handleSubmit (la que estaba en el onSubmit del HTML)
        const handleSubmit = async (e: any) => {
            e.preventDefault();
            setEnviando(true);
            try {
                await addContact({
                    nombre: formData.nombre,
                    celular: formData.celular,
                    email: formData.email,
                    asunto: formData.asunto,
                    mensaje: formData.mensaje,
                });
                setShowModal(true); 
                setFormData({
                    nombre: '',
                    celular: '',
                    email: '',
                    asunto: '',
                    mensaje: '',
                });
            } catch (error) {
                console.error("Error al enviar el contacto:", error);
                alert("Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.");
            } finally {
                setEnviando(false);
            }
        };
    

    // 4. Aquí va el return
    return {
        formData,
        handleChange,
        handleSubmit,
        showModal,
        setShowModal,
        enviando
    };
};