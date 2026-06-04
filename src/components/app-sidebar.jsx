"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard, FolderKanban, MessageSquare,
    BarChart2, Settings, Plus,
} from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function AppSidebar({ ...props }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const initial = (user?.name ?? "A").charAt(0);

    return (
        <Sidebar collapsible="icon" {...props}>

            {/* ── Brand ─────────────────────────────────── */}
            <SidebarHeader className="border-b border-sidebar-border px-5 py-5">
                <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    {/* Icon-only logo shown in collapsed state */}
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 text-[#0a0f1a]"
                        style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                    >
                        D
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden overflow-hidden">
                        <p className="text-white font-bold text-base tracking-tight leading-none font-mono">
                            DevMatch
                        </p>
                        <p className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-mono mt-0.5">
                            Engineering the Future
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            {/* ── User ──────────────────────────────────── */}
            <div className="px-4 py-3 border-b border-sidebar-border">
                <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <div className="relative shrink-0">
                        {user?.image ? (
                            <Image
                                src={user.image} alt={user?.name ?? "User"}
                                width={32} height={32}
                                className="rounded-full object-cover w-8 h-8"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#0a0f1a] font-bold text-xs"
                                style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                            >
                                {initial}
                            </div>
                        )}
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-[#0d1421]" />
                    </div>
                    <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-white text-sm font-semibold font-mono truncate leading-tight">
                            {user?.name ?? "Developer"}
                        </p>
                        <span className="text-[#06B6D4] text-[10px] font-mono uppercase tracking-widest">
                            Pro Account
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Nav ───────────────────────────────────── */}
            <SidebarContent className="px-3 py-4">
                <SidebarMenu>
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const active =
                            pathname === href ||
                            (href !== "/dashboard" && pathname.startsWith(href));
                        return (
                            <SidebarMenuItem key={href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={active}
                                    tooltip={label}
                                    className={`font-mono text-sm rounded-lg transition-colors
                                        ${active
                                            ? "bg-[#00e5ff]/10 !text-[#00e5ff] border-l-2 border-[#00e5ff] pl-[10px]"
                                            : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                        }`}
                                >
                                    <Link href={href}>
                                        <Icon size={16} />
                                        <span>{label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            {/* ── New Project button ─────────────────────── */}
            <SidebarFooter className="p-3 border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="New Project"
                            className="bg-[#00e5ff] !text-[#0a0f1a] font-bold font-mono
                                hover:bg-[#00e5ff]/90 justify-center rounded-xl transition-colors"
                        >
                            <Link href="/dashboard/projects/new">
                                <Plus size={16} />
                                <span>New Project</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            {/* Collapse rail — hover on the edge to collapse */}
            <SidebarRail />
        </Sidebar>
    );
}