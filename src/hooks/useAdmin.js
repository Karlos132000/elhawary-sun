// src/hooks/useAdmin.js
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function useAdmin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL?.trim();

    useEffect(() => {
        if (!ADMIN_EMAIL) {
            // مش بيفشل التشغيل، بس بيفيدك أثناء التطوير
            console.warn(
                "VITE_ADMIN_EMAIL is not set. Admin checks will always be false."
            );
        }
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, [ADMIN_EMAIL]);

    const isAdmin = useMemo(() => {
        if (!user || !ADMIN_EMAIL) return false;
        const emailOk =
            user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        // لو عايز تتأكد إن الإيميل متحقق (اختياري)
        // const verifiedOk = user.emailVerified === true;
        return emailOk; // && verifiedOk
    }, [user, ADMIN_EMAIL]);

    return { user, isAdmin, loading };
}
