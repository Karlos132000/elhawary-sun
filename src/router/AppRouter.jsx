import { Routes, Route } from "react-router-dom";

// صفحات المستخدم العامة
import Home from "../pages/Home.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";
import QuotePage from "../pages/QuotePage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import ProjectDetails from "../pages/ProjectDetails.jsx";
import CoursesPage from "./../pages/CoursesPage.jsx";
import CourseViewer from "../pages/CourseViewer";

// مسارات الأدمن
import AdminRoutes from "../admin/AdminRoutes.jsx";

export default function AppRouter() {
    return (
        <Routes>

            {/* صفحات عامة */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course-viewer" element={<CourseViewer />} />




            {/* متجر العملاء */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* ⭐ إدخال كل مسارات الأدمن هنا */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* 404 */}
            <Route path="*" element={<p className="text-center p-10">الصفحة غير موجودة</p>} />
        </Routes>
    );
}
