import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function createOrder(orderData) {
    try {
        await addDoc(collection(db, "orders"), {
            ...orderData,
            createdAt: Timestamp.now()
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating order: ", error);
        return { success: false, error };
    }
}
