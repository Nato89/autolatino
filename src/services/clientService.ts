import { collection, addDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { Contact } from './../types/contact';

export const addContact = async (contactData: Omit<Contact, 'id'>) => {
    try {
        const contactsRef = collection(db, "contacts");
        const docRef = await addDoc(contactsRef, contactData);
        console.log("Contacto guardado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al guardar el contacto:", error);
        throw error;
    }
};

export const subscribeToContacts = (callback: (contacts: Contact[]) => void) => {
    const contactsRef = collection(db, "contacts");
    return onSnapshot(contactsRef, (snapshot) => {
        const contactsList: Contact[] = snapshot.docs.map((doc) => {
            const data = doc.data() as any;
            return {
                id: doc.id,
                nombre: data.nombre,                
                celular: data.celular,
                email: data.email,
                asunto: data.asunto,                
                mensaje: data.mensaje,                             
            };
        });
        callback(contactsList);
    });
};

export const deleteContact = async (id: string | number) => {
    try {
        const contactRef = doc(db, "contacts", String(id));
        await deleteDoc(contactRef);
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        throw error;
    }
};