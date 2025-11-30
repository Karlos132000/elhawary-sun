// src/pages/AdminPage.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
    collection,
    onSnapshot,
    deleteDoc,
    updateDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "karlosashraf80@gmail.com";

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // السماح فقط لحساب الأدمن بالدخول
    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            const isAdmin = !!user && user.email === ADMIN_EMAIL;
            if (!isAdmin) {
                navigate("/admin/login", { replace: true });
                return;
            }
            // live updates للطلبات
            const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            const unsubOrders = onSnapshot(
                q,
                (snap) => {
                    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                    setOrders(data);
                    setLoading(false);
                },
                () => setLoading(false)
            );
            return () => unsubOrders();
        });
        return () => unsubAuth();
    }, [navigate]);

    const deleteOrder = async (id) => {
        await deleteDoc(doc(db, "orders", id));
    };

    const markAsDone = async (id) => {
        await updateDoc(doc(db, "orders", id), { done: true });
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/", { replace: true });
    };

    if (loading) return <p className="p-10">…جار التحميل</p>;

    return (
        <div className="p-6 md:p-10" dir="rtl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gold">📦 الطلبات الواردة</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    تسجيل الخروج
                </button>
            </div>

            {orders.length === 0 ? (
                <p className="text-gray-600">لا يوجد طلبات حتى الآن.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">وقت الإنشاء</th>
                            <th className="border p-2">المنتج</th>
                            <th className="border p-2">الاسم</th>
                            <th className="border p-2">الهاتف</th>
                            <th className="border p-2">الحالة</th>
                            <th className="border p-2">إجراءات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((o) => (
                            <tr key={o.id} className="text-center">
                                <td className="border p-2">
                                    {o.createdAt?.toDate ? o.createdAt.toDate().toLocaleString() : "—"}
                                </td>
                                <td className="border p-2">{o.product}</td>
                                <td className="border p-2">{o.name}</td>
                                <td className="border p-2">{o.phone}</td>
                                <td className="border p-2">{o.done ? "✔️ مكتمل" : "⏳ قيد المراجعة"}</td>
                                <td className="border p-2 flex gap-2 justify-center">
                                    {!o.done && (
                                        <button
                                            onClick={() => markAsDone(o.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            تم
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteOrder(o.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
