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
                    width: "40px", height: "40px",
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

    const firstName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Developer";
    const fullName = user?.displayName || user?.email?.split("@")[0] || "Developer";

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#0b1326" }}>

            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main area */}
            <div style={{
                marginLeft: "250px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                position: "relative",
            }}>

                {/* ── Top Right User Bar ── */}
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "32px",
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                }}>
                    {/* Name + Role */}
                    <div style={{ textAlign: "right" }}>
                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#dae2fd",
                            margin: 0,
                            lineHeight: 1.2,
                        }}>
                            {fullName}
                        </p>
                        <p style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "11px",
                            color: "#4cd7f6",
                            margin: 0,
                            marginTop: "2px",
                            letterSpacing: "0.05em",
                        }}>
                            {user?.role || "Developer"}
                        </p>
                    </div>

                    {/* Avatar with green dot */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                        <div style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "2px solid rgba(76,215,246,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(173,198,255,0.15)",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "16px",
                            color: "#adc6ff",
                        }}>
                            {user?.photoURL
                                ? <Image
                                    src={user.photoURL}
                                    alt="avatar"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    onError={e => { e.target.style.display = "none"; }}
                                />
                                : (user?.displayName?.charAt(0) || user?.email?.charAt(0) || "D").toUpperCase()
                            }
                        </div>

                        {/* Green online dot */}
                        <div style={{
                            position: "absolute",
                            bottom: "1px",
                            right: "1px",
                            width: "11px",
                            height: "11px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            border: "2px solid #0b1326",
                        }} />
                    </div>
                </div>

                {/* Page content */}
                <main className="flex flex-1 flex-col min-h-[calc(100vh-3.5rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
}