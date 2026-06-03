"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, User, LogOut, ChevronDown, Bell } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Community", href: "/community" },
    { label: "Teams", href: "/teams" },
];

function useIsClient() {
    return useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );
}

function UserAvatar({ user, size = 36 }) {
    const avatarSrc = user?.image || user?.picture || user?.avatar || "";

    if (avatarSrc) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={avatarSrc}
                alt={user?.name ?? "avatar"}
                referrerPolicy="no-referrer"
                style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(0,229,255,0.35)",
                    flexShrink: 0,
                    display: "block",
                }}
            />
        );
    }

    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0a0f1a",
                fontWeight: 700,
                fontSize: Math.round(size * 0.38),
                border: "2px solid rgba(0,229,255,0.35)",
                flexShrink: 0,
            }}
        >
            {(user?.name ?? "?").charAt(0).toUpperCase()}
        </div>
    );
}

function ProfileDropdown({ user, logout, onClose }) {
    const router = useRouter();

    const items = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            onClick: () => { router.push("/dashboard"); onClose(); },
        },
        {
            icon: User,
            label: "My Profile",
            onClick: () => { router.push(`/developers/${user?.id}`); onClose(); },
        },
        {
            icon: LogOut,
            label: "Logout",
            danger: true,
            onClick: () => { onClose(); logout(); },
        },
    ];

    return (
        <div
            style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                right: 0,
                width: 210,
                background: "rgba(8, 15, 35, 0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 14,
                boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.06)",
                padding: "6px",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    padding: "10px 12px 12px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <UserAvatar user={user} size={32} />
                <div style={{ minWidth: 0 }}>
                    <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "monospace", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {user?.name ?? "Developer"}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "monospace", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {user?.email ?? ""}
                    </p>
                </div>
            </div>

            {items.map(({ icon: Icon, label, onClick, danger }) => (
                <button
                    key={label}
                    onClick={onClick}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "9px 12px",
                        borderRadius: 9,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: danger ? "#f87171" : "rgba(255,255,255,0.7)",
                        fontSize: 13,
                        fontFamily: "monospace",
                        transition: "background 0.15s, color 0.15s",
                        textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = danger ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.06)";
                        e.currentTarget.style.color = danger ? "#fca5a5" : "#fff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = danger ? "#f87171" : "rgba(255,255,255,0.7)";
                    }}
                >
                    <Icon size={14} />
                    {label}
                </button>
            ))}
        </div>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const { user, isLoggedIn, isLoading, logout } = useAuth();
    const isClient = useIsClient();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [authReady, setAuthReady] = useState(false);
    const dropdownRef = useRef(null);

    // After 2s, stop blocking on isLoading — show buttons regardless
    useEffect(() => {
        const t = setTimeout(() => setAuthReady(true), 2000);
        return () => clearTimeout(t);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        if (!dropdownOpen) return;
        function handleClick(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [dropdownOpen]);

    const renderAuth = () => {
        if (!isClient || (isLoading && !authReady)) {
            return (
                <div style={{ width: 80, height: 36, borderRadius: 99, background: "rgba(255,255,255,0.05)" }} />
            );
        }

        if (isLoggedIn && user) {
            return (
                <>
                    <button
                        style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "rgba(255,255,255,0.55)",
                            transition: "border-color 0.2s, color 0.2s", flexShrink: 0,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                    >
                        <Bell size={15} />
                    </button>

                    <Link
                        href="/dashboard"
                        style={{
                            fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)",
                            textDecoration: "none", padding: "7px 16px", borderRadius: 8,
                            border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)",
                            transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                    >
                        Dashboard
                    </Link>

                    <div ref={dropdownRef} style={{ position: "relative" }}>
                        <button
                            onClick={() => setDropdownOpen((v) => !v)}
                            style={{
                                display: "flex", alignItems: "center", gap: 8,
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.09)",
                                borderRadius: 99, padding: "4px 10px 4px 4px",
                                cursor: "pointer", transition: "border-color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
                        >
                            <UserAvatar user={user} size={28} />
                            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontFamily: "monospace", fontWeight: 500, maxWidth: 96, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {user?.name?.split(" ")[0] ?? "Me"}
                            </span>
                            <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.4)", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                        </button>

                        {dropdownOpen && (
                            <ProfileDropdown user={user} logout={logout} onClose={() => setDropdownOpen(false)} />
                        )}
                    </div>
                </>
            );
        }

        return (
            <>
                <Link
                    href="/login"
                    style={{
                        fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.75)",
                        textDecoration: "none", padding: "8px 16px",
                        borderRadius: 8, transition: "color 0.2s",
                    }}
                >
                    Login
                </Link>
                <Link
                    href="/register"
                    style={{
                        fontSize: 14, fontWeight: 600, color: "#fff",
                        textDecoration: "none", padding: "8px 18px", borderRadius: 8,
                        background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                        boxShadow: "0 0 16px rgba(59,130,246,0.35)", transition: "opacity 0.2s",
                    }}
                >
                    Register
                </Link>
            </>
        );
    };

    return (
        <nav className="glass sticky top-0 z-50" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                        D
                    </div>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>
                        DevMatch
                    </span>
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setDropdownOpen(false)}
                                style={{
                                    fontSize: 14, fontWeight: 500,
                                    color: active ? "#3B82F6" : "rgba(255,255,255,0.65)",
                                    textDecoration: "none",
                                    borderBottom: active ? "2px solid #3B82F6" : "2px solid transparent",
                                    paddingBottom: 2, transition: "color 0.2s",
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {renderAuth()}
                </div>
            </div>
        </nav>
    );
}