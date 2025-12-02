import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ProjectsPage from "../pages/ProjectsPage";
import ServicesPage from "../pages/ServicesPage";
import QuotePage from "../pages/QuotePage";

import ProductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";

import AdminLogin from "../pages/AdminLogin";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../admin/AdminOrders";
import AdminQuotes from "../admin/AdminQuotes";
import AdminProjects from "../admin/AdminProjects";
import DashboardHome from "../admin/DashboardHome";

import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import AdminIndex from "../pages/AdminIndex";

// ⭐ حل المشكلة الأساسي
import AdminLayout from "../admin/AdminLayout";
import ProjectDetails from "../pages/ProjectDetails";
export default function AppRouter() {
    return (
        <Routes>
            {/* صفحات عامة */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quote" element={<QuotePage />} />

            {/* متجر العملاء */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* الأدمن */}
            <Route path="/admin" element={<AdminIndex />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* صفحة مشروع منفرد */}
            <Route path="/project/:id" element={<ProjectDetails />} />  {/*

            {/* Dashboard Home */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout>
                            <DashboardHome />
                        </AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            {/* Orders */}
            <Route
                path="/admin/orders"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout>
                            <AdminOrders />
                        </AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            {/* Quotes */}
            <Route
                path="/admin/quotes"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout>
                            <AdminQuotes />
                        </AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            {/* Products */}
            <Route
                path="/admin/products"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout>
                            <AdminProducts />
                        </AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            {/* Projects */}
            <Route
                path="/admin/projects"
                element={
                    <ProtectedAdminRoute>
                        <AdminLayout>
                            <AdminProjects />
                        </AdminLayout>
                    </ProtectedAdminRoute>
                }
            />

            {/* 404 */}
            <Route
                path="*"
                element={<p className="text-center p-10">الصفحة غير موجودة</p>}
            />
        </Routes>
    );
}
