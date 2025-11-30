import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

export default function AdminIndex() {
    const { loading, isAdmin } = useAdmin();

    if (loading) {
        return (
            <div className="min-h-[50vh] grid place-items-center text-gray-600">
                جارِ التحميل…
            </div>
        );
    }
    return <Navigate to={isAdmin ? "/admin/products" : "/admin/login"} replace />;
}
