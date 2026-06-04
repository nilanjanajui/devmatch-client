"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard, FolderKanban, MessageSquare,
    BarChart2, Settings, Plus, Menu, X
} from "lucide-react";

const navItems = [
    { label: "Overview",  href: "/dashboard",           icon: LayoutDashboard },
    { label: "Projects",  href: "/dashboard/projects",  icon: FolderKanban    },
    { label: "Messages",  href: "/dashboard/messages",  icon: MessageSquare   },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2       },
    { label: "Settings",  href: "/dashboard/settings",  icon: Settings        },
];

function SidebarContent({ pathname, onNavClick, user }) {
    const initial = (user?.name ?? "A").charAt(0);

    return (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="px-6 pt-6 pb-5 border-b border-white/5">
                <p className="text-white font-bold text-xl font-heading tracking-tight">DevMatch</p>
                <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] font-mono mt-0.5">
                    Engineering the Future
                </p>
            </div>

            {/* User section */}
            <div className="px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                        {user?.image ? (
                            <Image
                                src={user.image} alt={user.name ?? "User"}
                                width={36} height={36}
                                className="rounded-full object-cover w-9 h-9"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[#0a0f1a] font-bold text-sm"
                                style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                            >
                                {initial}
                            </div>
                        )}
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-[#0d1421]" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-white text-sm font-semibold font-mono truncate leading-tight">
                            {user?.name ?? "Developer"}
                        </p>
                        <span className="text-cyan text-[10px] font-mono uppercase tracking-widest">
                            Pro Account
                        </span>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-5 space-y-0.5">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active =
                        pathname === href ||
                        (href !== "/dashboard" && pathname.startsWith(href));
                    return (
                        <Link key={href} href={href} onClick={onNavClick}>
                            <motion.div
                                whileHover={{ x: 2 }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-colors ${
                                    active
                                        ? "bg-[#00e5ff]/10 text-[#00e5ff] border-l-2 border-[#00e5ff]"
                                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                }`}
                            >
                                <Icon size={16} />
                                <span>{label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* New Project */}
            <div className="p-4">
                <Link href="/dashboard/projects/new" onClick={onNavClick}>
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 bg-[#00e5ff] text-[#0a0f1a] font-bold font-mono text-sm py-3 rounded-xl hover:bg-[#00e5ff]/90 transition-colors"
                    >
                        <Plus size={16} /> New Project
                    </motion.button>
                </Link>
            </div>
        </div>
    );
}

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useAuth();

    return (
        <>
            <aside className="hidden md:flex fixed left-0 top-0 h-full w-50 bg-[#0d1421] border-r border-white/5 flex-col z-30">
                <SidebarContent pathname={pathname} onNavClick={() => {}} user={user} />
            </aside>

            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#0d1421] border border-white/10 rounded-lg text-white/70"
            >
                <Menu size={20} />
            </button>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -200 }} animate={{ x: 0 }} exit={{ x: -200 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-50 bg-[#0d1421] border-r border-white/5 z-50 md:hidden"
                        >
                            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
                                <X size={18} />
                            </button>
                            <SidebarContent pathname={pathname} onNavClick={() => setMobileOpen(false)} user={user} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}