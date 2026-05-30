"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/authClient";

export default function AuthCallback() {
    const router = useRouter();
    const search = useSearchParams();
    const next = search.get("next") || "/";
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (isPending) return;
        if (session?.user) {
            document.cookie = "auth_status=1; path=/; max-age=604800; SameSite=Lax; Secure";
            router.replace(next);
        } else {
            router.replace("/login");
        }
    }, [isPending, session, router, next]);




    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0f1a",
        }}>
            <div style={{
                width: 32, height: 32,
                border: "2px solid #00e5ff",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}