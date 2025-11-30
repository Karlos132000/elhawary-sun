// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// الأدمن
import useAdmin from "../hooks/useAdmin";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { isAdmin } = useAdmin(); // هل المستخدم الحالي أدمن؟

    return (
        <>
            {/* NAVBAR */}
            <header className="bg-white/90 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-row-reverse">
                    {/* الشعار + الاسم */}
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
                        <span className="text-2xl font-bold text-gold">الهواري صن</span>
                    </div>

                    {/* قائمة الديسكتوب */}
                    <nav className="hidden md:flex">
                        <ul className="flex gap-8 text-lg font-semibold text-black">
                            <li><Link to="/">الرئيسية</Link></li>
                            <li><Link to="/products">منتجاتنا</Link></li>
                            <li><Link to="/about">من نحن</Link></li>
                            <li><Link to="/services">خدماتنا</Link></li>
                            <li><Link to="/projects">مشاريعنا</Link></li>
                            <li><Link to="/contact">تواصل معنا</Link></li>
                            <li><Link to="/quote">عرض سعر</Link></li>

                            {/* عناصر الأدمن */}
                            {!isAdmin ? (
                                <li>
                                    <Link to="/admin/login" className="text-blue-600">
                                        دخول الأدمن
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/admin/products" className="text-emerald-700">
                                            لوحة الأدمن
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => signOut(auth)}
                                            className="text-red-600"
                                        >
                                            تسجيل الخروج
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>

                    {/* زر قائمة الموبايل */}
                    <button
                        className="md:hidden text-3xl"
                        onClick={() => setOpen(!open)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>
                </div>
            </header>

            {/* قائمة الموبايل المنزلقة */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6 flex flex-col gap-6 text-xl font-semibold">
                    <button
                        className="text-3xl self-end"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>

                    <Link to="/" onClick={() => setOpen(false)}>الرئيسية</Link>
                    <Link to="/products" onClick={() => setOpen(false)}>منتجاتنا</Link>
                    <Link to="/about" onClick={() => setOpen(false)}>من نحن</Link>
                    <Link to="/services" onClick={() => setOpen(false)}>خدماتنا</Link>
                    <Link to="/projects" onClick={() => setOpen(false)}>مشاريعنا</Link>
                    <Link to="/contact" onClick={() => setOpen(false)}>تواصل معنا</Link>
                    <Link to="/quote" onClick={() => setOpen(false)}>عرض سعر</Link>

                    {/* عناصر الأدمن للموبايل */}
                    {!isAdmin ? (
                        <Link to="/admin/login" onClick={() => setOpen(false)} className="text-blue-600">
                            دخول الأدمن
                        </Link>
                    ) : (
                        <>
                            <Link to="/admin/products" onClick={() => setOpen(false)} className="text-emerald-700">
                                لوحة الأدمن
                            </Link>
                            <button
                                onClick={() => {
                                    signOut(auth);
                                    setOpen(false);
                                }}
                                className="text-red-600 text-left"
                            >
                                تسجيل الخروج
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Overlay عند فتح القائمة في الموبايل */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
