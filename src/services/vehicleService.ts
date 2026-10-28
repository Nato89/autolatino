import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { Vehicle } from "../types/vehicle";

export const addVehicle = async (vehicleData: Vehicle) => {
  try {
    const vehiclesRef = collection(db, "vehicles");
    const docRef = await addDoc(vehiclesRef, vehicleData);

    console.log("Vehículo guardado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar el vehículo:", error);
    throw error;
  }
};

export const updateVehicle = async (id: string | number, vehicleData: Partial<Vehicle>) => {
  try {
    const vehicleRef = doc(db, "vehicles", String(id));
    await updateDoc(vehicleRef, vehicleData);
    console.log("Vehículo actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el vehículo:", error);
    throw error;
  }
};

export const deleteVehicle = async (id: string | number) => {
  try {
    const vehicleRef = doc(db, "vehicles", String(id));
    await deleteDoc(vehicleRef);
    console.log("Vehículo eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
    throw error;
  }
};

export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const vehiclesRef = collection(db, "vehicles");
    const querySnapshot = await getDocs(vehiclesRef);

    const vehiclesList: Vehicle[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as any; 
      return {
        id: doc.id, 
        brand: data.brand,
        model: data.model,
        year: data.year,
        price: data.price,
        km: data.km,
        transmission: data.transmission,
        features: data.features,
        images: data.images || []
      };
    });

    return vehiclesList;
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
    throw error;
  }
};

export const subscribeToVehicles = (callback: (vehicles: Vehicle[]) => void) => {
  const vehiclesRef = collection(db, "vehicles");
  
  return onSnapshot(vehiclesRef, (snapshot) => {
    const vehiclesList: Vehicle[] = snapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        brand: data.brand,
        model: data.model,
        year: data.year,
        price: data.price,
        km: data.km,
        transmission: data.transmission,
        features: data.features,
        images: data.images || []
      };
    });
    callback(vehiclesList);
  });
};