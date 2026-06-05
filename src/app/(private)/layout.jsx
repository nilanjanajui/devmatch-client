"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function PrivateLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "#0b1326",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{
                    width: "40px",
                    height: "40px",
                    border: "3px solid rgba(173,198,255,0.1)",
                    borderTop: "3px solid #4cd7f6",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!user) return null;

    const fullName =
        user?.displayName ||
        user?.email?.split("@")[0] ||
        "Developer";

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            minHeight: "100vh",
            background: "#0b1326",
        }}>

            {/* Sidebar + its own spacer div are returned together from Sidebar.jsx */}
            <Sidebar user={user} />

            {/* Main area — no marginLeft, spacer from Sidebar handles offset */}
            <div style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                position: "relative",
            }}>

                {/* ── Top-right user bar ── */}
                <div style={{
                    position: "fixed",
                    top: "16px",
                    right: "28px",
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}>

                    {/* Name + role */}
                    <div style={{ textAlign: "right" }}>
                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#dae2fd",
                            margin: 0,
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                        }}>
                            {fullName}
                        </p>
                        <p style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px",
                            color: "#4cd7f6",
                            margin: 0,
                            marginTop: "2px",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                        }}>
                            {user?.role || "Developer"}
                        </p>
                    </div>

                    {/* Avatar + green dot */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "2px solid rgba(76,215,246,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(173,198,255,0.15)",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#adc6ff",
                            position: "relative",
                        }}>
                            {user?.photoURL ? (
                                <Image
                                    src={user.photoURL}
                                    alt="avatar"
                                    fill
                                    sizes="40px"
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                (
                                    user?.displayName?.charAt(0) ||
                                    user?.email?.charAt(0) ||
                                    "D"
                                ).toUpperCase()
                            )}
                        </div>

                        {/* Online dot */}
                        <div style={{
                            position: "absolute",
                            bottom: "1px",
                            right: "1px",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            border: "2px solid #0b1326",
                            zIndex: 1,
                        }} />
                    </div>
                </div>

                {/* Page content — no padding here, each page manages its own */}
                <main style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}>
                    {children}
                </main>

            </div>
        </div>
    );
}