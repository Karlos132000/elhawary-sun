// src/pages/AdminProducts.jsx
import { useEffect, useState, useCallback } from "react";
import { db, storage } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        const snap = await getDocs(collection(db, "products"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProducts(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const uploadImage = async (file) => {
        const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            let imageUrl = editProduct?.imageUrl || "";

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            if (editProduct) {
                await updateDoc(doc(db, "products", editProduct.id), {
                    title,
                    price,
                    description: desc,
                    imageUrl,
                    updatedAt: Timestamp.now(),
                });
            } else {
                await addDoc(collection(db, "products"), {
                    title,
                    price,
                    description: desc,
                    imageUrl,
                    createdAt: Timestamp.now(),
                });
            }

            resetForm();
            await loadProducts();
            // مفيش alerts مزعجة — خلّي التجربة نظيفة
        } finally {
            setSaving(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm("هل تريد حذف المنتج؟")) return;
        await deleteDoc(doc(db, "products", id));
        await loadProducts();
    };

    const startEdit = (p) => {
        setEditProduct(p);
        setTitle(p.title);
        setPrice(p.price);
        setDesc(p.description);
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetForm = () => {
        setEditProduct(null);
        setTitle("");
        setPrice("");
        setDesc("");
        setImageFile(null);
    };

    const handleLogout = async () => {
        await signOut(auth);
        location.assign("/admin/login");
    };

    return (
        <div className="p-6 md:p-10" dir="rtl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gold">إدارة المنتجات</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    تسجيل الخروج
                </button>
            </div>

            {/* form */}
            <form
                onSubmit={handleSave}
                className="bg-white p-6 rounded-xl shadow-lg mb-10 space-y-4 max-w-xl"
            >
                <h2 className="text-xl font-bold">
                    {editProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
                </h2>

                <input
                    type="text"
                    placeholder="اسم المنتج"
                    className="w-full p-3 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="السعر"
                    className="w-full p-3 border rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <textarea
                    placeholder="الوصف"
                    className="w-full p-3 border rounded"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />

                <input
                    type="file"
                    className="w-full p-2"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    accept="image/*"
                />

                <div className="flex gap-3">
                    <button
                        disabled={saving}
                        className="bg-gold px-4 py-2 rounded font-bold disabled:opacity-60"
                    >
                        {editProduct ? "حفظ التعديل" : "إضافة المنتج"}
                    </button>
                    {editProduct && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 rounded border"
                        >
                            إلغاء التعديل
                        </button>
                    )}
                </div>
            </form>

            {/* list */}
            {loading ? (
                <div className="text-gray-600">جار تحميل المنتجات…</div>
            ) : products.length === 0 ? (
                <p className="text-gray-600">لا توجد منتجات حالياً.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div key={p.id} className="bg-white shadow rounded-xl overflow-hidden">
                            {p.imageUrl && (
                                <img src={p.imageUrl} className="h-48 w-full object-cover" alt={p.title} />
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-bold">{p.title}</h3>
                                <p className="text-gray-700">{p.description}</p>
                                <p className="text-gold font-bold mt-2">{p.price} جنيه</p>

                                <div className="flex justify-between mt-3">
                                    <button
                                        onClick={() => startEdit(p)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(p.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
