import { useState } from "react";
import { uploadImage } from "../services/cloudinaryService";
import { addCreditApplication } from '../services/creditService';

export const useCreditForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState<File[]>([]);     
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [enviando, setEnviando] = useState(false); 

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
    
    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: any) => { 
        e.preventDefault(); 
        
        if (files.length === 0) {
            alert('Por favor adjunta la foto de tu cédula');
            return;
        }

        setEnviando(true);

        try {
            // 1. Subir las fotos de la cédula a Cloudinary
            const fileIds: string[] = [];
            for (const file of files) {
                const publicId = await uploadImage(file);
                fileIds.push(publicId);
            }

            // 2. Preparar los datos de la solicitud
            const applicationData = {
                nombres: formData.nombres,
                cedula: formData.cedula,
                celular: formData.celular,
                email: formData.email,
                ocupacion: formData.ocupacion,
                ingresos: formData.ingresos,
                refPersonalNombre: formData.refPersonalNombre,
                refPersonalTel: formData.refPersonalTel,
                refFamiliarNombre: formData.refFamiliarNombre,
                refFamiliarTel: formData.refFamiliarTel,
                archivos: fileIds,
                estado: 'Inicial' as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // 3. Guardar en Firestore
            await addCreditApplication(applicationData);

            // 4. Mostrar mensaje de éxito y limpiar
            setShowModal(true);
            setFiles([]); 
            setFormData({
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

        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.");
        } finally {
            setEnviando(false);
        }
    };

    return {
        showModal,
        setShowModal,
        files,
        setFiles,
        isStatusModalOpen,
        setIsStatusModalOpen,
        enviando,
        formData,
        handleChange,
        handleSubmit,
    };
};