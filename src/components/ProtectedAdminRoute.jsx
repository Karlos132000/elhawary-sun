// src/components/ProtectedAdminRoute.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ADMIN_EMAIL = "karlosashraf80@gmail.com";

export default function ProtectedAdminRoute({ children }) {
    const [state, setState] = useState({ loading: true, allow: false });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            const allow = !!user && user.emailVerified && user.email === ADMIN_EMAIL;
            setState({ loading: false, allow });
        });
        return () => unsub();
    }, []);

    if (state.loading) return <div className="p-10">جارِ التحميل…</div>;
    if (!state.allow) return <Navigate to="/admin/login" replace />;
    return children;
}
