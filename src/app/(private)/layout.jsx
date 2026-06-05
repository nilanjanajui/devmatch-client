"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

function hasAuthCookie() {
    if (typeof document === "undefined") return false;
    return document.cookie.split(";").some(c => c.trim().startsWith("auth_status=1"));
}

export default function PrivateLayout({ children }) {
    const { user, isLoggedIn, isLoading } = useAuth();
    const router = useRouter();
    const authed = hasAuthCookie();

    useEffect(() => {
        if (!authed) {
            router.push("/login");
        }
    }, [authed, isLoggedIn, isLoading, router]);

    if (!authed) {
        return (
            <div className="flex min-h-screen bg-[#0a0f1a] items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const fullName = user?.displayName || user?.email?.split("@")[0] || "Developer";

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#0a0f1a]">

                {/* ── Top Bar ── */}
                <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center
          bg-[#0a0f1a] border-b border-white/5 px-4
          transition-[width,height] ease-linear
          group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">

                    {/* Left — trigger + label */}
                    <div className="flex items-center gap-2 flex-1">
                        <SidebarTrigger
                            className="-ml-1 text-white/40 hover:text-white
                hover:bg-white/5 rounded-lg transition-colors"
                        />
                        <Separator
                            orientation="vertical"
                            className="mr-2 bg-white/10 data-[orientation=vertical]:h-4"
                        />
                        <p className="text-white/30 text-xs font-mono tracking-wide">Dev Console</p>
                    </div>

                    {/* Right — user info + avatar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                        {/* Name + role */}
                        <div style={{ textAlign: "right" }}>
                            <p style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#dae2fd",
                                margin: 0,
                                lineHeight: 1.2,
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
                            }}>
                                {user?.role || "Full-Stack Engineer"}
                            </p>
                        </div>

                        {/* Avatar + green dot */}
                        <div style={{ position: "relative", flexShrink: 0 }}>
                            <div style={{
                                width: "38px",
                                height: "38px",
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
                                flexShrink: 0,
                            }}>
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="avatar"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        onError={e => { e.target.style.display = "none"; }}
                                    />
                                ) : (
                                    (user?.displayName?.charAt(0) || user?.email?.charAt(0) || "D").toUpperCase()
                                )}
                            </div>

                            {/* Online dot */}
                            <div style={{
                                position: "absolute",
                                bottom: "0px",
                                right: "0px",
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#22c55e",
                                border: "2px solid #0a0f1a",
                            }} />
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex flex-1 flex-col p-6 md:p-8 min-h-[calc(100vh-3.5rem)]">
                    {children}
                </main>

            </SidebarInset>
        </SidebarProvider>
    );
}