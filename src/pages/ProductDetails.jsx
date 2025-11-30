// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductOrderForm from "../components/ProductOrderForm";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        (async () => {
            const ref = doc(db, "products", id);
            const snap = await getDoc(ref);
            if (snap.exists()) setProduct({ id: snap.id, ...snap.data() });
        })();
    }, [id]);

    if (!product) return <p className="p-10">جار تحميل المنتج…</p>;

    return (
        <section className="py-20" dir="rtl">
            <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                {product.imageUrl && (
                    <img src={product.imageUrl} className="w-full rounded-xl shadow" alt={product.title} />
                )}

                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <p className="text-gold text-3xl font-bold mb-6">{product.price} جنيه</p>

                    <ProductOrderForm product={product} />
                </div>
            </div>
        </section>
    );
}
