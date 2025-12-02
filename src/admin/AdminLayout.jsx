import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex">
            {/* الشريط الجانبي */}
            <AdminSidebar />

            {/* محتوى الصفحات */}
            <div
                className="flex-1 mr-64 p-10 bg-gray-50 min-h-screen"
                dir="rtl"
            >
                {children}
            </div>
        </div>
    );
}
