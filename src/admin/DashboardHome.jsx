import { db } from "../firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function DashboardHome() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        (async () => {
            const ordersCount = await getCountFromServer(collection(db, "orders"));
            const productsCount = await getCountFromServer(collection(db, "products"));
            const quotesCount = await getCountFromServer(collection(db, "quotes"));

            setStats({
                orders: ordersCount.data().count,
                products: productsCount.data().count,
                quotes: quotesCount.data().count,
            });
        })();
    }, []);

    if (!stats) return <p className="p-10">جار التحميل…</p>;

    return (
        <div className="p-10" dir="rtl">
            <h1 className="text-3xl font-bold mb-6">📊 إحصائيات عامة</h1>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <h2 className="text-xl font-bold text-gold">إجمالي الطلبات</h2>
                    <p className="text-4xl mt-2">{stats.orders}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <h2 className="text-xl font-bold text-gold">المنتجات</h2>
                    <p className="text-4xl mt-2">{stats.products}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <h2 className="text-xl font-bold text-gold">طلبات عرض سعر</h2>
                    <p className="text-4xl mt-2">{stats.quotes}</p>
                </div>
            </div>
        </div>
    );
}
