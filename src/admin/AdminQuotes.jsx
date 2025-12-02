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

export default function AdminQuotes() {
    const [quotes, setQuotes] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setQuotes(data);
        });
        return () => unsub();
    }, []);

    const markDone = async (id) => {
        await updateDoc(doc(db, "quotes", id), { done: true });
    };

    const deleteQuote = async (id) => {
        if (!confirm("هل تريد حذف هذا الطلب؟")) return;
        await deleteDoc(doc(db, "quotes", id));
    };

    const filtered =
        filter === "all"
            ? quotes
            : quotes.filter((q) => (filter === "done" ? q.done : !q.done));

    return (
        <div className="flex-1 p-10 bg-gray-50 min-h-screen" dir="rtl">
            <h1 className="text-3xl font-bold mb-6 text-gold">📨 طلبات عرض السعر</h1>

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

            <div className="overflow-x-auto bg-white shadow rounded-xl p-6">
                {filtered.length === 0 ? (
                    <p className="text-gray-600 text-center">لا توجد طلبات.</p>
                ) : (
                    <table className="w-full text-center border-collapse">
                        <thead>
                        <tr className="bg-gray-100 text-lg">
                            <th className="p-3 border">التاريخ</th>
                            <th className="p-3 border">الاسم</th>
                            <th className="p-3 border">الهاتف</th>
                            <th className="p-3 border">المحافظة</th>
                            <th className="p-3 border">النظام المطلوب</th>
                            <th className="p-3 border">الحالة</th>
                            <th className="p-3 border">إجراءات</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filtered.map((q) => (
                            <tr key={q.id} className="border hover:bg-gray-50">
                                <td className="p-3 border">
                                    {q.createdAt?.toDate
                                        ? q.createdAt.toDate().toLocaleString()
                                        : "—"}
                                </td>
                                <td className="p-3 border">{q.name}</td>
                                <td className="p-3 border">{q.phone}</td>
                                <td className="p-3 border">{q.city}</td>
                                <td className="p-3 border">{q.system}</td>

                                <td className="p-3 border">
                                    {q.done ? (
                                        <span className="text-green-600 font-bold">✔ مكتمل</span>
                                    ) : (
                                        <span className="text-yellow-600">⏳ جديد</span>
                                    )}
                                </td>

                                <td className="p-3 border flex justify-center gap-2">
                                    {!q.done && (
                                        <button
                                            onClick={() => markDone(q.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            تم
                                        </button>
                                    )}

                                    <button
                                        onClick={() => deleteQuote(q.id)}
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
