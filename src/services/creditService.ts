import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { CreditApplication } from "../types/credit";

export const addCreditApplication = async (applicationData: Omit<CreditApplication, 'id'>) => {
    try {
        const applicationsRef = collection(db, "creditApplications");
        const docRef = await addDoc(applicationsRef, applicationData);
        console.log("Solicitud de crédito guardada con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al guardar la solicitud:", error);
        throw error;
    }
};

export const getCreditApplications = async (): Promise<CreditApplication[]> => {
    try {
        const applicationsRef = collection(db, "creditApplications");
        const querySnapshot = await getDocs(applicationsRef);
        const applicationsList: CreditApplication[] = querySnapshot.docs.map((doc) => {
            const data = doc.data() as any;
            return {
                id: doc.id,
                nombres: data.nombres,
                cedula: data.cedula,
                celular: data.celular,
                email: data.email,
                ocupacion: data.ocupacion,
                ingresos: data.ingresos,
                refPersonalNombre: data.refPersonalNombre,
                refPersonalTel: data.refPersonalTel,
                refFamiliarNombre: data.refFamiliarNombre,
                refFamiliarTel: data.refFamiliarTel,
                archivos: data.archivos || [],
                estado: data.estado,
                razonNegacion: data.razonNegacion,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });
        return applicationsList;
    } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        throw error;
    }
};

export const subscribeToCreditApplications = (callback: (applications: CreditApplication[]) => void) => {
    const applicationsRef = collection(db, "creditApplications");
    return onSnapshot(applicationsRef, (snapshot) => {
        const applicationsList: CreditApplication[] = snapshot.docs.map((doc) => {
            const data = doc.data() as any;
            return {
                id: doc.id,
                nombres: data.nombres,
                cedula: data.cedula,
                celular: data.celular,
                email: data.email,
                ocupacion: data.ocupacion,
                ingresos: data.ingresos,
                refPersonalNombre: data.refPersonalNombre,
                refPersonalTel: data.refPersonalTel,
                refFamiliarNombre: data.refFamiliarNombre,
                refFamiliarTel: data.refFamiliarTel,
                archivos: data.archivos || [],
                estado: data.estado,
                razonNegacion: data.razonNegacion,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });
        callback(applicationsList);
    });
};

export const updateCreditApplication = async (id: string | number, applicationData: Partial<CreditApplication>) => {
    try {
        const applicationRef = doc(db, "creditApplications", String(id));
        await updateDoc(applicationRef, applicationData);
    } catch (error) {
        console.error("Error al actualizar la solicitud:", error);
        throw error;
    }
};

export const deleteCreditApplication = async (id: string | number) => {
    try {
        const applicationRef = doc(db, "creditApplications", String(id));
        await deleteDoc(applicationRef);
    } catch (error) {
        console.error("Error al eliminar la solicitud:", error);
        throw error;
    }
};