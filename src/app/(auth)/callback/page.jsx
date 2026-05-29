"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        document.cookie = "auth_status=1; path=/; max-age=604800; SameSite=Lax; Secure";
        router.replace("/dashboard");
    }, [router]);

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