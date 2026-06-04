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
        <aside
            className="h-screen w-64 fixed left-0 top-0 z-40 flex flex-col py-6"
            style={{
                background: "rgba(23, 31, 51, 0.6)",
                backdropFilter: "blur(20px)",
                borderRight: "1px solid rgba(76, 215, 246, 0.2)",
                boxShadow: "5px 0 15px rgba(76, 215, 246, 0.05)",
            }}
        >
            {/* Brand */}
            <div className="px-6 mb-10">
                <h1
                    className="font-bold tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", color: "#adc6ff" }}
                >
                    DevMatch
                </h1>
                <p
                    className="mt-1 uppercase"
                    style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: "rgba(194, 198, 214, 0.6)",
                    }}
                >
                    Engineering the Future
                </p>
            </div>

            {/* User */}
            <div className="px-6 mb-8 flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full shrink-0 overflow-hidden flex items-center justify-center font-bold"
                    style={{
                        border: "1px solid rgba(76, 215, 246, 0.3)",
                        background: "rgba(173, 198, 255, 0.15)",
                        color: "#adc6ff",
                    }}
                >
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                        (user?.displayName?.charAt(0) || user?.email?.charAt(0) || "D").toUpperCase()
                    )}
                </div>
                <div>
                    <p
                        className="font-bold"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", color: "#dae2fd" }}
                    >
                        {user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Developer"}
                    </p>
                    <p
                        className="uppercase"
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px",
                            letterSpacing: "0.1em",
                            color: "#4cd7f6",
                        }}
                    >
                        Pro Account
                    </p>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive =
                        pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 px-6 py-3 transition-all duration-300"
                            style={
                                isActive
                                    ? {
                                        background: "rgba(76, 215, 246, 0.1)",
                                        color: "#4cd7f6",
                                        borderRight: "4px solid #4cd7f6",
                                    }
                                    : { color: "#c2c6d6" }
                            }
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "rgba(45, 52, 73, 0.4)";
                                    e.currentTarget.style.color = "#dae2fd";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#c2c6d6";
                                }
                            }}
                        >
                            <Icon size={20} />
                            <span
                                className="uppercase font-semibold"
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "12px",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* New Project Button */}
            <div className="px-6 mt-auto">
                <Link href="/dashboard/projects/create">
                    <button
                        className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 uppercase transition-all active:scale-95"
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            letterSpacing: "0.1em",
                            background: "#4cd7f6",
                            color: "#003640",
                            boxShadow: "0 0 15px rgba(76, 215, 246, 0.4)",
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