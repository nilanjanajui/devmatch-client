"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, FolderKanban, MessageSquare,
    BarChart2, Settings, Plus,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            height: "100vh",
            width: "196px",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            paddingTop: "28px",
            paddingBottom: "24px",
            background: "#0d1421",
            borderRight: "1px solid rgba(255,255,255,0.05)",
        }}>

            {/* Brand — "Dev Console / Pro Account" */}
            <div style={{ padding: "0 20px", marginBottom: "36px" }}>
                <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#4cd7f6",
                    margin: 0,
                    letterSpacing: "-0.01em",
                }}>
                    Dev Console
                </h1>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "3px",
                    marginBottom: 0,
                }}>
                    Pro Account
                </p>
            </div>

            {/* Nav Items */}
            <nav style={{ flex: 1 }}>
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive =
                        pathname === href ||
                        (href !== "/dashboard" && pathname.startsWith(href));

                    return (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 20px",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                borderRight: isActive ? "3px solid #4cd7f6" : "3px solid transparent",
                                background: isActive ? "rgba(76,215,246,0.08)" : "transparent",
                                color: isActive ? "#4cd7f6" : "rgba(255,255,255,0.55)",
                                marginBottom: "2px",
                            }}
                            onMouseEnter={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                                }
                            }}
                        >
                            <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "14px",
                                fontWeight: isActive ? 600 : 400,
                                letterSpacing: "0.01em",
                            }}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* New Project Button */}
            <div style={{ padding: "0 16px", marginTop: "auto" }}>
                <Link href="/dashboard/projects/create" style={{ textDecoration: "none" }}>
                    <button
                        style={{
                            width: "100%",
                            padding: "11px",
                            borderRadius: "8px",
                            background: "#4cd7f6",
                            color: "#002a33",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                            fontWeight: 700,
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            boxShadow: "0 0 18px rgba(76,215,246,0.35)",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#7de8f8";
                            e.currentTarget.style.boxShadow = "0 0 28px rgba(76,215,246,0.55)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "#4cd7f6";
                            e.currentTarget.style.boxShadow = "0 0 18px rgba(76,215,246,0.35)";
                        }}
                    >
                        <Plus size={16} />
                        New Project
                    </button>
                </Link>
            </div>
        </aside>
    );
}