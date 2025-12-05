import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    return (
        <section className="min-h-screen p-10 bg-gray-50" dir="rtl">
            <h1 className="text-4xl font-bold text-gold mb-8 text-center">
                📚 الكورسات التعليمية
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {courses.map((c) => (
                    <div key={c.id} className="bg-white shadow rounded-xl p-4">
                        <img
                            src={c.imageURL}
                            className="w-full h-48 object-cover rounded"
                        />

                        <h3 className="text-2xl font-bold mt-3">{c.title}</h3>
                        <p className="text-gray-600 mt-2">{c.description}</p>

                        <a
                            href={c.pdfURL}
                            target="_blank"
                            className="bg-gold block mt-4 text-center py-2 rounded font-bold"
                        >
                            تحميل الكورس PDF
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
