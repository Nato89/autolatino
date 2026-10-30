const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = async (file: File): Promise<string> => {
    if (!API_URL) throw new Error('Falta la URL del backend en el .env');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/upload/cedula`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Error al subir el archivo al backend');
    const data = await response.json();
    return data.publicId; 
};

export const uploadPublicImage = async (file: File, folder: string): Promise<string> => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) throw new Error('Falta configuración de Cloudinary');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Error al subir la imagen pública');
    const data = await response.json();
    return data.secure_url; 
};