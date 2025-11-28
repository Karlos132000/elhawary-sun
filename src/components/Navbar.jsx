import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* NAVBAR */}
            <header className="bg-white/90 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-row-reverse">

                    {/* LEFT SIDE — LOGO + NAME (لكن بعد عكس الاتجاه هيروح للشمال) */}
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
                        <span className="text-2xl font-bold text-gold">الهواري صن</span>
                    </div>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex">
                        <ul className="flex gap-8 text-lg font-semibold text-black">
                            <li><Link to="/">الرئيسية</Link></li>
                            <li><Link to="/about">من نحن</Link></li>
                            <li><Link to="/services">خدماتنا</Link></li>
                            <li><Link to="/projects">مشاريعنا</Link></li>
                            <li><Link to="/contact">تواصل معنا</Link></li>
                            <li><Link to="/quote">عرض سعر</Link></li>
                        </ul>
                    </nav>

                    {/* MOBILE BUTTON */}
                    <button
                        className="md:hidden text-3xl"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>

                </div>
            </header>

            {/* MOBILE SLIDING MENU */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
         ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-6 flex flex-col gap-6 text-xl font-semibold">

                    <button
                        className="text-3xl self-end"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </button>

                    <Link to="/" onClick={() => setOpen(false)}>الرئيسية</Link>
                    <Link to="/about" onClick={() => setOpen(false)}>من نحن</Link>
                    <Link to="/services" onClick={() => setOpen(false)}>خدماتنا</Link>
                    <Link to="/projects" onClick={() => setOpen(false)}>مشاريعنا</Link>
                    <Link to="/contact" onClick={() => setOpen(false)}>تواصل معنا</Link>
                    <Link to="/quote" onClick={() => setOpen(false)}>عرض سعر</Link>

                </div>
            </div>

            {/* OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
}
