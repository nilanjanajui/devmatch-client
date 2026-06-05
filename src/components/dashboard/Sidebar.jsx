"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, FolderKanban, MessageSquare,
    BarChart2, Settings, Plus, Home, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const COLLAPSED_WIDTH = "60px";
const EXPANDED_WIDTH = "250px";

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("sidebar_collapsed") === "true";
    });

    const toggle = () => {
        setCollapsed(prev => {
            localStorage.setItem("sidebar_collapsed", String(!prev));
            return !prev;
        });
    };

    const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

    return (
        <>
            {/* ── Sidebar ── */}
            <aside style={{
                height: "100vh",
                width,
                minWidth: width,
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
                transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)",
                overflow: "hidden",
            }}>

                {/* ── Brand row ── */}
                <div style={{
                    padding: collapsed ? "0 0" : "0 20px",
                    marginBottom: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between",
                    gap: "8px",
                    transition: "padding 0.25s ease",
                }}>
                    {/* Brand link — hidden when collapsed */}
                    {!collapsed && (
                        <Link
                            href="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                textDecoration: "none",
                                borderRadius: "6px",
                                padding: "6px 8px",
                                margin: "-6px -8px",
                                transition: "background 0.2s ease",
                                flex: 1,
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(76,215,246,0.08)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                            <Home size={16} color="#4cd7f6" strokeWidth={2} style={{ flexShrink: 0 }} />
                            <div>
                                <h1 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "17px",
                                    fontWeight: 700,
                                    color: "#4cd7f6",
                                    margin: 0,
                                    letterSpacing: "-0.01em",
                                    whiteSpace: "nowrap",
                                }}>
                                    Dev Console
                                </h1>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "11px",
                                    color: "rgba(255,255,255,0.35)",
                                    margin: 0,
                                    whiteSpace: "nowrap",
                                }}>
                                    Pro Account
                                </p>
                            </div>
                        </Link>
                    )}

                    {/* Collapse toggle button */}
                    <button
                        onClick={toggle}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "rgba(255,255,255,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "6px",
                            borderRadius: "6px",
                            transition: "all 0.2s ease",
                            flexShrink: 0,
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.color = "#4cd7f6";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                        }}
                    >
                        {collapsed
                            ? <PanelLeftOpen size={18} />
                            : <PanelLeftClose size={18} />
                        }
                    </button>
                </div>

                {/* ── Nav Items ── */}
                <nav style={{ flex: 1 }}>
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive =
                            pathname === href ||
                            (href !== "/dashboard" && pathname.startsWith(href));

                        return (
                            <Link
                                key={href}
                                href={href}
                                title={collapsed ? label : undefined}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    gap: collapsed ? 0 : "10px",
                                    padding: collapsed ? "12px 0" : "10px 20px",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                    borderRight: isActive ? "3px solid #4cd7f6" : "3px solid transparent",
                                    background: isActive ? "rgba(76,215,246,0.08)" : "transparent",
                                    color: isActive ? "#4cd7f6" : "rgba(255,255,255,0.55)",
                                    marginBottom: "2px",
                                    position: "relative",
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
                                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} style={{ flexShrink: 0 }} />

                                {/* Label — slides out when collapsed */}
                                <span style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "14px",
                                    fontWeight: isActive ? 600 : 400,
                                    letterSpacing: "0.01em",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    maxWidth: collapsed ? "0px" : "140px",
                                    opacity: collapsed ? 0 : 1,
                                    transition: "max-width 0.25s ease, opacity 0.2s ease",
                                    marginLeft: collapsed ? 0 : undefined,
                                }}>
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── New Project Button ── */}
                <div style={{
                    padding: collapsed ? "0 8px" : "0 16px",
                    marginTop: "auto",
                    transition: "padding 0.25s ease",
                }}>
                    <Link href="/dashboard/projects/create" style={{ textDecoration: "none" }}>
                        <button
                            title={collapsed ? "New Project" : undefined}
                            style={{
                                width: "100%",
                                padding: collapsed ? "11px 0" : "11px",
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
                                gap: collapsed ? 0 : "6px",
                                boxShadow: "0 0 18px rgba(76,215,246,0.35)",
                                transition: "all 0.2s ease",
                                overflow: "hidden",
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
                            <Plus size={16} style={{ flexShrink: 0 }} />
                            <span style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                maxWidth: collapsed ? "0px" : "120px",
                                opacity: collapsed ? 0 : 1,
                                transition: "max-width 0.25s ease, opacity 0.15s ease",
                            }}>
                                New Project
                            </span>
                        </button>
                    </Link>
                </div>
            </aside>

            {/* ── Spacer so main content shifts with sidebar ── */}
            <div style={{
                width,
                minWidth: width,
                flexShrink: 0,
                transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)",
            }} />
        </>
    );
}