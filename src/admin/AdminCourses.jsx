import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
import {uploadFile} from "../../utils/upload.js";


export default function AdminCourses() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [pdf, setPDF] = useState("");
    const [courses, setCourses] = useState([]);

    // ------------- تحميل الكورسات -------------
    useEffect(() => {
        const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setCourses(data);
        });
        return () => unsub();
    }, []);

    // ------------- رفع صورة الغلاف -------------
    const handleUploadImage = async () => {
        const url = await uploadFile();
        if (!url) {
            alert("لم يتم اختيار صورة");
            return;
        }
        setImage(url);
    };

    // ------------- رفع PDF -------------
    const handleUploadPDF = async () => {
        const url = await uploadFile();
        if (!url) {
            alert("لم يتم اختيار ملف PDF");
            return;
        }
        setPDF(url);
    };

    // ------------- إضافة كورس -------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !desc || !image || !pdf) {
            return alert("⚠️ يرجى إدخال جميع البيانات ورفع الملفات");
        }

        await addDoc(collection(db, "courses"), {
            title,
            description: desc,
            imageURL: image,
            pdfURL: pdf,
            createdAt: new Date()
        });

        setTitle("");
        setDesc("");
        setImage("");
        setPDF("");

        alert("✅ تم رفع الكورس بنجاح");
    };

    // ------------- حذف كورس -------------
    const deleteCourse = async (id) => {
        if (!confirm("هل تريد حذف هذا الكورس؟")) return;
        await deleteDoc(doc(db, "courses", id));
    };

    return (
        <div className="flex-1 p-10" dir="rtl">
            <h1 className="text-3xl font-bold text-gold mb-6">📚 إدارة الكورسات</h1>

            {/* ===== نموذج الإضافة ===== */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl"
            >
                <input
                    type="text"
                    placeholder="عنوان الكورس"
                    className="w-full border p-3 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="وصف الكورس"
                    className="w-full border p-3 rounded"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />

                {/* زر رفع صورة */}
                <button
                    type="button"
                    onClick={handleUploadImage}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    رفع صورة الغلاف
                </button>
                {image && <p className="text-green-600">✔ تم رفع الصورة</p>}

                {/* زر رفع PDF */}
                <button
                    type="button"
                    onClick={handleUploadPDF}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    رفع ملف PDF
                </button>
                {pdf && <p className="text-green-600">✔ تم رفع ملف PDF</p>}

                <button className="bg-gold px-6 py-3 rounded font-bold w-full">
                    إضافة الكورس
                </button>
            </form>

            <hr className="my-10" />

            {/* ===== عرض الكورسات ===== */}
            <h2 className="text-2xl font-bold mb-4">📘 الكورسات الحالية</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((c) => (
                    <div key={c.id} className="bg-white shadow p-4 rounded-xl">
                        <img
                            src={c.imageURL}
                            className="w-full h-40 object-cover rounded"
                        />

                        <h3 className="text-xl font-bold mt-3">{c.title}</h3>

                        <a
                            href={c.pdfURL}
                            target="_blank"
                            className="text-blue-600 underline block mt-2"
                        >
                            تحميل PDF
                        </a>

                        <button
                            onClick={() => deleteCourse(c.id)}
                            className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
                        >
                            حذف
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
