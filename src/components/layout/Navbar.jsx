"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Community", href: "/community" },
    { label: "Teams", href: "/teams" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav
            className="glass sticky top-0 z-50"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 24px",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#fff",
                        }}
                    >
                        D
                    </div>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>
                        DevMatch
                    </span>
                </Link>

                {/* Nav Links */}
                <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: active ? "#3B82F6" : "rgba(255,255,255,0.65)",
                                    textDecoration: "none",
                                    borderBottom: active ? "2px solid #3B82F6" : "2px solid transparent",
                                    paddingBottom: 2,
                                    transition: "color 0.2s",
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Auth Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link
                        href="/login"
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.75)",
                            textDecoration: "none",
                            padding: "8px 16px",
                            borderRadius: 8,
                            transition: "color 0.2s",
                        }}
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#fff",
                            textDecoration: "none",
                            padding: "8px 18px",
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                            boxShadow: "0 0 16px rgba(59,130,246,0.35)",
                            transition: "opacity 0.2s",
                        }}
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}