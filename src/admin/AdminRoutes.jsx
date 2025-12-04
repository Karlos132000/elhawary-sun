import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./AdminLogin.jsx";
import AdminLayout from "./AdminLayout.jsx";

import DashboardHome from "./DashboardHome.jsx";
import AdminProducts from "./AdminProducts.jsx";
import AdminProjects from "./AdminProjects.jsx";
import AdminOrders from "./AdminOrders.jsx";
import AdminQuotes from "./AdminQuotes.jsx";

import ProtectedAdminRoute from "../components/ProtectedAdminRoute.jsx";

export default function AdminRoutes() {
    return (
        <Routes>

            {/* لو كتب /admin من غير حاجة → يروح للوغن */}
            <Route path="/" element={<Navigate to="login" replace />} />

            {/* صفحة تسجيل الدخول */}
            <Route path="login" element={<AdminLogin />} />

            {/* لوحة التحكم */}
            <Route
                path="dashboard"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout><DashboardHome /></AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            <Route
                path="products"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout><AdminProducts /></AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            <Route
                path="projects"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout><AdminProjects /></AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            <Route
                path="orders"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout><AdminOrders /></AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            <Route
                path="quotes"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout><AdminQuotes /></AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

        </Routes>
    );
}
