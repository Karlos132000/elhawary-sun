import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
    const { pathname } = useLocation();

    const linkClass = (path) =>
        `block py-3 px-5 rounded-lg text-lg font-semibold transition ${
            pathname === path
                ? "bg-gold text-black"
                : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <aside
            className="w-64 bg-white shadow-lg h-screen fixed top-0 right-0 p-6"
            dir="rtl"
        >
            <h2 className="text-2xl font-bold text-gold mb-8">لوحة التحكم</h2>

            <nav className="flex flex-col gap-3">
                <Link className={linkClass("/admin/dashboard")} to="/admin/dashboard">
                    الرئيسية
                </Link>
                <Link className={linkClass("/admin/orders")} to="/admin/orders">
                    الطلبات
                </Link>
                <Link className={linkClass("/admin/quotes")} to="/admin/quotes">
                    عروض السعر
                </Link>
                <Link className={linkClass("/admin/products")} to="/admin/products">
                    المنتجات
                </Link>
                <Link className={linkClass("/admin/projects")} to="/admin/projects">
                    المشاريع
                </Link>

                <Link
                    className="mt-10 text-red-500 font-bold"
                    to="/admin/logout"
                >
                    تسجيل الخروج
                </Link>
            </nav>
        </aside>
    );
}
