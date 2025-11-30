import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            navigate("/admin"); // لوحة الإدارة
        } catch {
            alert("❌ البيانات غير صحيحة");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={login} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center mb-4">تسجيل دخول الأدمن</h2>
                <input type="email" className="w-full p-3 border rounded" placeholder="البريد الإلكتروني"
                       onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" className="w-full p-3 border rounded" placeholder="كلمة السر"
                       onChange={(e) => setPass(e.target.value)} required/>
                <button className="bg-gold w-full py-2 rounded font-bold">دخول</button>
            </form>
        </div>
    );
}
