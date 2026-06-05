"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, FolderKanban, MessageSquare,
    BarChart2, Settings, Plus,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar
            collapsible="icon"
            style={{
                background: "#0d1421",
                borderRight: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            {/* ── Brand ── */}
            <SidebarHeader style={{ padding: "24px 20px 20px" }}>
                <div className="group-data-[collapsible=icon]:hidden">
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
                        color: "rgba(255,255,255,0.4)",
                        marginTop: "3px",
                        marginBottom: 0,
                    }}>
                        Pro Account
                    </p>
                </div>

                {/* Icon-only state — show small diamond */}
                <div
                    className="hidden group-data-[collapsible=icon]:flex"
                    style={{ justifyContent: "center" }}
                >
                    <div style={{
                        width: "28px", height: "28px",
                        borderRadius: "6px",
                        background: "rgba(76,215,246,0.15)",
                        border: "1px solid rgba(76,215,246,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <div style={{
                            width: "8px", height: "8px",
                            borderRadius: "2px",
                            background: "#4cd7f6",
                            transform: "rotate(45deg)",
                        }} />
                    </div>
                </div>
            </SidebarHeader>

            {/* ── Nav ── */}
            <SidebarContent style={{ padding: "4px 0" }}>
                <SidebarMenu>
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive =
                            pathname === href ||
                            (href !== "/dashboard" && pathname.startsWith(href));

                        return (
                            <SidebarMenuItem key={href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={label}
                                    style={{
                                        borderRight: isActive ? "3px solid #4cd7f6" : "3px solid transparent",
                                        background: isActive ? "rgba(76,215,246,0.08)" : "transparent",
                                        color: isActive ? "#4cd7f6" : "rgba(255,255,255,0.5)",
                                        borderRadius: 0,
                                        padding: "10px 20px",
                                        marginBottom: "2px",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Link href={href}>
                                        <Icon
                                            size={18}
                                            strokeWidth={isActive ? 2 : 1.5}
                                        />
                                        <span style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: "14px",
                                            fontWeight: isActive ? 600 : 400,
                                        }}>
                                            {label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            {/* ── New Project Button ── */}
            <SidebarFooter style={{ padding: "16px" }}>
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
                            whiteSpace: "nowrap",
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
                        <span className="group-data-[collapsible=icon]:hidden">
                            New Project
                        </span>
                    </button>
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
}