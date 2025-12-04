import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function QuotePage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [system, setSystem] = useState("");
    const [sent, setSent] = useState(false);

    const sendQuote = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "quotes"), {
            name,
            phone,
            city,
            system,
            done: false,
            createdAt: serverTimestamp(),
        });

        setSent(true);
    };

    return (
        <section className="min-h-screen bg-gray-50 py-20 px-4" dir="rtl">
            <h2 className="text-center text-4xl font-bold text-gold mb-10">
                اطلب عرض سعر
            </h2>

            {sent ? (
                <div className="text-center text-2xl text-green-600 font-bold">
                    ✅ تم إرسال الطلب بنجاح! سيتم التواصل معك قريبًا.
                </div>
            ) : (
                <form
                    onSubmit={sendQuote}
                    className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl space-y-6"
                >
                    <input
                        type="text"
                        placeholder="الاسم"
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-4"
                    />

                    <input
                        type="text"
                        placeholder="رقم الهاتف"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-4"
                    />

                    <input
                        type="text"
                        placeholder="المحافظة"
                        required
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-4"
                    />

                    <textarea
                        placeholder="نوع النظام المطلوب (محطة – سخان – بطاريات…)"
                        required
                        onChange={(e) => setSystem(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-4 h-32"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:scale-105 transition"
                    >
                        إرسال الطلب
                    </button>
                </form>
            )}
        </section>
    );
}
