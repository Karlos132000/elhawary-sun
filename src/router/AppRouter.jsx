import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ProjectsPage from "../pages/ProjectsPage";
import ServicesPage from "../pages/ServicesPage";
import QuotePage from "../pages/QuotePage";

import AdminLogin from "../pages/AdminLogin";
import AdminProducts from "../pages/AdminProducts";
import ProductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";

import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import AdminIndex from "../pages/AdminIndex"; // 👈 جديد

export default function AppRouter() {
    return (
        <Routes>
            {/* عام */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quote" element={<QuotePage />} />

            {/* المتجر للزوار */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* الأدمن */}
            <Route path="/admin" element={<AdminIndex />} />          {/* 👈 حل صفحة فاضية */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
                path="/admin/products"
                element={
                    <ProtectedAdminRoute>
                        <AdminProducts />
                    </ProtectedAdminRoute>
                }
            />
        </Routes>
    );
}
