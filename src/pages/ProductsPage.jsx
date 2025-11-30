// src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const snapshot = await getDocs(collection(db, "products"));
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setProducts(data);
            setLoading(false);
        })();
    }, []);

    return (
        <section className="py-20" dir="rtl">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-center text-gold mb-12">منتجاتنا</h1>

                {loading ? (
                    <p className="text-center text-gray-600">جار التحميل…</p>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-600">لا توجد منتجات حالياً.</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-10">
                        {products.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                            >
                                {p.imageUrl && (
                                    <img src={p.imageUrl} className="w-full h-56 object-cover" alt={p.title} />
                                )}

                                <div className="p-5">
                                    <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                                    <p className="text-gray-600 line-clamp-2">{p.description}</p>

                                    <p className="text-gold font-bold mt-3">{p.price} جنيه</p>

                                    <Link
                                        to={`/product/${p.id}`}
                                        className="block bg-gold text-center py-2 mt-4 rounded font-bold"
                                    >
                                        عرض التفاصيل
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
