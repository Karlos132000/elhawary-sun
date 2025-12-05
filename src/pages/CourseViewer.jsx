import { useSearchParams } from "react-router-dom";

export default function CourseViewer() {
    const [params] = useSearchParams();
    const pdf = params.get("pdf");

    if (!pdf) return <h1>لا يوجد ملف PDF للعرض</h1>;

    return (
        <section className="min-h-screen p-10 bg-gray-100" dir="rtl">
            <h1 className="text-4xl font-bold text-center mb-6">📘 عرض الكورس</h1>

            <iframe
                src={pdf}
                width="100%"
                height="900px"
                style={{ border: "none" }}
            ></iframe>
        </section>
    );
}
