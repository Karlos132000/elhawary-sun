// src/components/ProductOrderForm.jsx
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function ProductOrderForm({ product }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            await addDoc(collection(db, "orders"), {
                product: product.title,
                productId: product.id,
                name,
                phone,
                done: false,
                createdAt: Timestamp.now(),
            });
            alert("✔️ تم تسجيل طلبك بنجاح!");
            setName("");
            setPhone("");
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-bold mb-2">اطلب: {product.title}</h2>

            <input
                type="text"
                placeholder="اسمك"
                className="w-full p-3 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="tel"
                placeholder="رقم الهاتف"
                className="w-full p-3 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />

            <button disabled={sending} className="bg-gold text-black font-bold w-full py-2 rounded">
                {sending ? "جارِ الإرسال…" : "إرسال الطلب"}
            </button>
        </form>
    );
}
