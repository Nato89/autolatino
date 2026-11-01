import { useState, useEffect } from 'react';
import { subscribeToContacts, deleteContact } from '../services/clientService';
import type { Contact } from '../types/contact';

export const useAdminContacts = () => {
    // 1. Aquí van los estados
    const [clientList, setClientList] = useState<Contact[]>([]);
    const [deletingContactId, setDeletingContactId] = useState<number | string | null>(null);

    // 2. Aquí va el useEffect
    useEffect(() => {
        const unsubscribe = subscribeToContacts((data) => {
            setClientList(data);
        });
        return () => unsubscribe();
    }, []);

    // 3. Aquí va la función handleDelete (como hicimos en AdminVehiclesPage)
        const handleDelete = async () => {
        if (deletingContactId !== null) {
            try {
                await deleteContact(deletingContactId);
                setDeletingContactId(null);
            } catch (error) {
                console.error("Error al eliminar el contacto:", error);
            }
        }
    };

    // 4. Aquí va el return
    return {
        clientList,
        deletingContactId,
        setDeletingContactId,
        handleDelete
    };
};