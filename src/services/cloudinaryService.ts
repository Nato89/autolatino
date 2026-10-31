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

export const uploadPublicImage = async (file: File): Promise<string> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/upload/vehiculo`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Error al subir la imagen');
    const data = await response.json();
    return data.secure_url; 
};