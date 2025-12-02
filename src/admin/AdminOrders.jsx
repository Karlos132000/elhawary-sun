import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setOrders(data);
        });
        return () => unsub();
    }, []);

    const markDone = async (id) => {
        await updateDoc(doc(db, "orders", id), { done: true });
    };

    const deleteOrder = async (id) => {
        if (!confirm("هل تريد حذف هذا الطلب؟")) return;
        await deleteDoc(doc(db, "orders", id));
    };

    const filteredOrders =
        filter === "all"
            ? orders
            : orders.filter((o) => (filter === "done" ? o.done === true : o.done !== true));

    return (
        <div className="flex-1 p-10 bg-gray-50 min-h-screen" dir="rtl">
            <h1 className="text-3xl font-bold mb-6 text-gold">📦 الطلبات الواردة</h1>

            {/* فلترة */}
            <div className="flex gap-3 mb-5">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg ${
                        filter === "all" ? "bg-gold text-black" : "bg-white shadow"
                    }`}
                >
                    الكل
                </button>

                <button
                    onClick={() => setFilter("new")}
                    className={`px-4 py-2 rounded-lg ${
                        filter === "new" ? "bg-gold text-black" : "bg-white shadow"
                    }`}
                >
                    الجديدة
                </button>

                <button
                    onClick={() => setFilter("done")}
                    className={`px-4 py-2 rounded-lg ${
                        filter === "done" ? "bg-gold text-black" : "bg-white shadow"
                    }`}
                >
                    المكتملة
                </button>
            </div>

            {/* جدول */}
            <div className="overflow-x-auto bg-white shadow rounded-xl p-6">
                {filteredOrders.length === 0 ? (
                    <p className="text-gray-600 text-center">لا توجد طلبات.</p>
                ) : (
                    <table className="w-full text-center border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">التاريخ</th>
                            <th className="p-3 border">المنتج</th>
                            <th className="p-3 border">الاسم</th>
                            <th className="p-3 border">الهاتف</th>
                            <th className="p-3 border">الحالة</th>
                            <th className="p-3 border">إجراءات</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredOrders.map((o) => (
                            <tr key={o.id} className="border hover:bg-gray-50">
                                <td className="p-3 border">
                                    {o.createdAt?.toDate
                                        ? o.createdAt.toDate().toLocaleString()
                                        : "—"}
                                </td>

                                <td className="p-3 border">{o.product}</td>

                                <td className="p-3 border">{o.name}</td>

                                <td className="p-3 border">{o.phone}</td>

                                <td className="p-3 border">
                                    {o.done ? (
                                        <span className="text-green-600 font-bold">✔ مكتمل</span>
                                    ) : (
                                        <span className="text-yellow-600">⏳ جديد</span>
                                    )}
                                </td>

                                <td className="p-3 border flex justify-center gap-2">
                                    {!o.done && (
                                        <button
                                            onClick={() => markDone(o.id)}
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
                )}
            </div>
        </div>
    );
}
