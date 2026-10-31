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
    
    // 1. Buscamos los datos del vehículo para obtener sus imágenes
    const vehicleDoc = await getDocs(collection(db, "vehicles"));
    const vehicleData = vehicleDoc.docs.find(d => d.id === String(id))?.data();
    
    // 2. Si tiene imágenes, las borramos a través del backend
    if (vehicleData && vehicleData.images && vehicleData.images.length > 0) {
      const API_URL = import.meta.env.VITE_API_URL;
      
      for (const imageUrl of vehicleData.images) {
        // Le mandamos la URL COMPLETA al backend
        await fetch(`${API_URL}/api/delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: imageUrl })
        });
      }
    }

    // 3. Finalmente, borramos el documento de Firestore
    await deleteDoc(vehicleRef);
    console.log("Vehículo eliminado con éxito y fotos borradas de Cloudinary");
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