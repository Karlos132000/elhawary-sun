import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";

// اختياري: صورة افتراضية لو المنتج بدون صورة
const PLACEHOLDER =
    "https://via.placeholder.com/800x400?text=%D8%A8%D8%AF%D9%88%D9%86+%D8%B5%D9%88%D8%B1%D8%A9";

// ✅ دالة رفع الصورة على Imgbb
async function uploadImageToImgbb(file) {
    const apiKey = "8db50b841379d1a0048725467724bf21"; // API KEY من Imgbb

    const form = new FormData();
    form.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: form,
    });

    const data = await res.json();

    if (!data.success) {
        console.error("Imgbb error:", data);
        throw new Error("فشل رفع الصورة على Imgbb");
    }

    // رابط الصورة النهائي
    return data.data.url;
}

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    // نموذج
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // ليف ستريم للمنتجات
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setProducts(data);
        });
        return () => unsub();
    }, []);

    const resetForm = () => {
        setEditProduct(null);
        setTitle("");
        setPrice("");
        setDesc("");
        setImageFile(null);
        setUploading(false);
    };

    const startEdit = (p) => {
        setEditProduct(p);
        setTitle(p.title || "");
        setPrice(String(p.price ?? ""));
        setDesc(p.description || "");
        setImageFile(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // ✳️ لو في صورة جديدة ارفعها على Imgbb
            let imageUrl = editProduct?.imageUrl || "";
            if (imageFile) {
                imageUrl = await uploadImageToImgbb(imageFile);
            }

            if (editProduct) {
                // تعديل
                const payload = {
                    title: title.trim(),
                    price: Number(price) || 0,
                    description: desc.trim(),
                    imageUrl: imageUrl || editProduct.imageUrl || "",
                    updatedAt: serverTimestamp(),
                };
                await updateDoc(doc(db, "products", editProduct.id), payload);
            } else {
                // إضافة
                const payload = {
                    title: title.trim(),
                    price: Number(price) || 0,
                    description: desc.trim(),
                    imageUrl: imageUrl || "",
                    createdAt: serverTimestamp(),
                };
                await addDoc(collection(db, "products"), payload);
            }

            resetForm();
        } catch (err) {
            console.error(err);
            alert("❌ حصل خطأ أثناء الحفظ / رفع الصورة.");
            setUploading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm("هل تريد حذف هذا المنتج؟")) return;
        await deleteDoc(doc(db, "products", id));
    };

    return (
        <div className="p-6" dir="rtl">
            <h1 className="text-3xl font-bold text-gold mb-6">إدارة المنتجات</h1>

            {/* فورم إضافة/تعديل */}
            <form
                onSubmit={handleSave}
                className="bg-white p-6 rounded-xl shadow-lg mb-10 space-y-3 max-w-sm ml-auto"
            >
                <h2 className="text-xl font-bold mb-2">
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
                    rows={3}
                    required
                />

                <input
                    type="file"
                    className="w-full p-2"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    accept="image/*"
                />

                <button
                    className="bg-gray-600 text-white w-full py-2 rounded font-bold disabled:opacity-60"
                    disabled={uploading}
                    title={uploading ? "جار الرفع…" : ""}
                >
                    {uploading ? "جار الرفع والحفظ…" : "حفظ"}
                </button>

                {editProduct && (
                    <button
                        type="button"
                        className="w-full py-2 rounded font-bold border mt-2"
                        onClick={resetForm}
                    >
                        إلغاء التعديل
                    </button>
                )}
            </form>

            {/* عرض المنتجات */}
            <div className="grid md:grid-cols-2 gap-8">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-xl shadow overflow-hidden"
                    >
                        <div className="h-64 bg-gray-100 flex items-center justify-center">
                            {/* صورة أو Placeholder */}
                            {p.imageUrl ? (
                                <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    className="w-full h-64 object-cover"
                                />
                            ) : (
                                <img
                                    src={PLACEHOLDER}
                                    alt="no-image"
                                    className="w-full h-64 object-cover"
                                />
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="text-xl font-bold">{p.title}</h3>
                            <p className="text-gray-600">{p.description}</p>
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
                {products.length === 0 && (
                    <p className="text-gray-600">لا توجد منتجات حالياً.</p>
                )}
            </div>
        </div>
    );
}
