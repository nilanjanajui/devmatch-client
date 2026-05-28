"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/authClient";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signIn.email({ email, password, callbackURL: "/dashboard" });
            router.push("/dashboard");
        } catch {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: "radial-gradient(ellipse at 60% 40%, #0d1b3e 0%, #060816 50%, #0a0d1a 100%)" }}
        >
            {/* Subtle glow orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full opacity-15"
                    style={{ background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)" }} />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">

                {/* Logo */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span className="text-white">Dev</span>
                        <span style={{ color: "#60a5fa" }}>Match</span>
                    </h1>
                    <p className="text-slate-400 mt-3 text-sm tracking-widest">
                        Engineering the future of collaboration.
                    </p>
                </div>

                {/* Card */}
                <div
                    className="w-full rounded-2xl p-8"
                    style={{
                        maxWidth: "460px",
                        background: "rgba(15, 23, 42, 0.75)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 0 60px rgba(59,130,246,0.08), 0 25px 50px rgba(0,0,0,0.5)",
                    }}
                >
                    <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Welcome Back
                    </h2>
                    <p className="text-slate-400 text-sm mb-7">Access your developer dashboard.</p>

                    {error && (
                        <div className="text-red-400 text-sm rounded-xl px-4 py-3 mb-5 border border-red-500/20"
                            style={{ background: "rgba(239,68,68,0.08)" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 tracking-widest uppercase mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">@</span>
                                <input
                                    type="email"
                                    placeholder="dev@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full text-white placeholder-slate-600 text-sm rounded-xl pl-9 pr-4 py-3.5 focus:outline-none transition-colors"
                                    style={{
                                        background: "rgba(30, 41, 59, 0.8)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                    onFocus={(e) => e.target.style.border = "1px solid rgba(96,165,250,0.5)"}
                                    onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
                                    Password
                                </label>
                                <Link href="#" className="text-xs font-mono transition-colors" style={{ color: "#22d3ee" }}
                                    onMouseEnter={(e) => e.target.style.color = "#67e8f9"}
                                    onMouseLeave={(e) => e.target.style.color = "#22d3ee"}>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔒</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full text-white placeholder-slate-600 text-sm rounded-xl pl-9 pr-12 py-3.5 focus:outline-none transition-colors"
                                    style={{
                                        background: "rgba(30, 41, 59, 0.8)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                    onFocus={(e) => e.target.style.border = "1px solid rgba(96,165,250,0.5)"}
                                    onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-sm">
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm"
                            style={{
                                background: loading ? "rgba(165,180,252,0.5)" : "rgba(165,180,252,0.85)",
                                color: "#1e1b4b",
                                boxShadow: loading ? "none" : "0 0 30px rgba(165,180,252,0.2)",
                            }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                        <span className="text-xs text-slate-600 tracking-widest uppercase font-mono">
                            or continue with
                        </span>
                        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => signIn.social({ provider: "google", callbackURL: "/dashboard" })}
                            className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm text-white font-medium transition-all"
                            style={{
                                background: "rgba(30,41,59,0.6)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)"}
                            onMouseLeave={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"}
                        >
                            <span className="font-bold text-base" style={{ color: "#4285f4" }}>G</span>
                            Google
                        </button>
                        <button
                            onClick={() => signIn.social({ provider: "github", callbackURL: "/dashboard" })}
                            className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm text-white font-medium transition-all"
                            style={{
                                background: "rgba(30,41,59,0.6)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)"}
                            onMouseLeave={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>

                {/* Register link */}
                <p className="mt-7 text-slate-400 text-sm">
                    New to DevMatch?{" "}
                    <Link href="/register" className="font-bold transition-colors" style={{ color: "#60a5fa" }}
                        onMouseEnter={(e) => e.target.style.color = "#93c5fd"}
                        onMouseLeave={(e) => e.target.style.color = "#60a5fa"}>
                        Register
                    </Link>
                </p>
            </div>

            {/* Bottom footer */}
            <div className="relative z-10 flex justify-between items-center px-8 py-5">
                <p className="text-xs text-slate-600">© 2024 DevMatch. Engineering the Future.</p>
                <div className="flex gap-6">
                    {["Docs", "Privacy", "Terms"].map((item) => (
                        <Link key={item} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                            style={{ color: "#60a5fa" }}
                            onMouseEnter={(e) => e.target.style.color = "#93c5fd"}
                            onMouseLeave={(e) => e.target.style.color = "#60a5fa"}>
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}