// src/App.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        let buffer = ""; // ⭐ متغير داخلي بدون state (لن يُسبب ESLint warnings)

        const handler = (e) => {
            buffer += e.key; // إضافة المفتاح المكتوب للبافر

            // ⭐ الكود السري للدخول إلى لوحة الإدارة
            if (buffer.includes("2004")) {
                const ok = confirm("🔐 هل تريد الدخول إلى لوحة الإدارة؟");
                if (ok) navigate("/admin/login");
                buffer = ""; // تصفير البافر بعد التنفيذ
            }

            // الاحتفاظ بآخر 10 أحرف فقط
            buffer = buffer.slice(-10);
        };

        window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler);
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen">

            {/* NAVBAR */}
            <header>
                <Navbar />
            </header>

            {/* محتوى الصفحات */}
            <main className="flex-grow pt-20">
                <AppRouter />
            </main>

            {/* FOOTER */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
