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

export default function Sidebar({ user }) {
    const pathname = usePathname();

    return (
        <aside style={{
            height: "100vh",
            width: "256px",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            paddingTop: "24px",
            paddingBottom: "24px",
            background: "rgba(23, 31, 51, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRight: "1px solid rgba(76, 215, 246, 0.15)",
            boxShadow: "5px 0 15px rgba(76, 215, 246, 0.05)",
        }}>

            {/* Brand */}
            <div style={{ padding: "0 24px", marginBottom: "40px" }}>
                <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#adc6ff",
                    margin: 0,
                }}>
                    DevMatch
                </h1>
                <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(194,198,214,0.5)",
                    marginTop: "4px",
                    marginBottom: 0,
                }}>
                    Engineering the Future
                </p>
            </div>

            {/* User */}
            <div style={{
                padding: "0 24px",
                marginBottom: "32px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
            }}>
                <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                    border: "1px solid rgba(76,215,246,0.3)",
                    background: "rgba(173,198,255,0.15)",
                    color: "#adc6ff",
                }}>
                    {user?.photoURL
                        ? <img src={user.photoURL} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : (user?.displayName?.charAt(0) || user?.email?.charAt(0) || "D").toUpperCase()
                    }
                </div>
                <div>
                    <p style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#dae2fd",
                        margin: 0,
                    }}>
                        {user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Developer"}
                    </p>
                    <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#4cd7f6",
                        margin: 0,
                    }}>
                        Pro Account
                    </p>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1 }}>
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive =
                        pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

                    return (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 24px",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                borderRight: isActive ? "4px solid #4cd7f6" : "4px solid transparent",
                                background: isActive ? "rgba(76,215,246,0.1)" : "transparent",
                                color: isActive ? "#4cd7f6" : "#c2c6d6",
                            }}
                            onMouseEnter={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "rgba(45,52,73,0.4)";
                                    e.currentTarget.style.color = "#dae2fd";
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#c2c6d6";
                                }
                            }}
                        >
                            <Icon size={20} />
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "12px",
                                letterSpacing: "0.1em",
                                fontWeight: 600,
                                textTransform: "uppercase",
                            }}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* New Project */}
            <div style={{ padding: "0 24px", marginTop: "auto" }}>
                <Link href="/dashboard/projects/create" style={{ textDecoration: "none" }}>
                    <button
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            background: "#4cd7f6",
                            color: "#003640",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            letterSpacing: "0.1em",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            boxShadow: "0 0 15px rgba(76,215,246,0.4)",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#7de8f8";
                            e.currentTarget.style.boxShadow = "0 0 25px rgba(76,215,246,0.6)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "#4cd7f6";
                            e.currentTarget.style.boxShadow = "0 0 15px rgba(76,215,246,0.4)";
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