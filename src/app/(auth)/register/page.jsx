"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/authClient";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getStrength = () => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strengthColors = ["", "#ef4444", "#eab308", "#3b82f6", "#22c55e"];
    const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
    const strength = getStrength();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) return setError("Please agree to the Terms of Service.");
        if (password.length < 8) return setError("Password must be at least 8 characters.");
        setLoading(true);
        setError("");
        try {
            await signUp.email({ name, email, password, callbackURL: "/dashboard" });
            router.push("/dashboard");
        } catch {
            setError("Registration failed. This email may already be in use.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div
                className="w-full overflow-hidden rounded-2xl flex"
                style={{ maxWidth: "1000px", height: "620px" }}
            >
                {/* ── LEFT PANEL — Futuristic City ─────────── */}
                <div
                    className="hidden lg:flex w-[45%] shrink-0 flex-col justify-between p-10 relative overflow-hidden"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(135deg, rgba(6,8,22,0.85) 0%, rgba(10,22,40,0.75) 50%, rgba(6,8,22,0.9) 100%)" }} />

                    {/* Cyan glow overlay */}
                    <div className="absolute inset-0"
                        style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(6,182,212,0.12) 0%, transparent 60%)" }} />

                    {/* Version badge */}
                    <div className="relative z-10">
                        <span
                            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-mono"
                            style={{
                                background: "rgba(15,23,42,0.7)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#94a3b8",
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22d3ee" }} />
                            v2.0 STABLE RELEASE
                        </span>
                    </div>

                    {/* Bottom content */}
                    <div className="relative z-10">
                        <h2
                            className="text-4xl font-black leading-tight mb-4"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            <span className="text-white">Join the future of</span>
                            <br />
                            <span style={{ color: "#22d3ee" }}>engineering</span>
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8" style={{ maxWidth: "320px" }}>
                            Connect with high-performance engineering teams, showcase your
                            architecture, and build the next generation of software in a
                            deep-focus ecosystem.
                        </p>

                        {/* Code snippet */}
                        <div
                            className="rounded-xl p-4 font-mono text-xs"
                            style={{
                                background: "rgba(10,15,30,0.85)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="flex gap-1.5 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.7)" }} />
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(234,179,8,0.7)" }} />
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.7)" }} />
                            </div>
                            <p>
                                <span style={{ color: "#60a5fa" }}>const </span>
                                <span className="text-white">dev</span>
                                <span className="text-slate-500"> = new </span>
                                <span style={{ color: "#22d3ee" }}>DevMatch</span>
                                <span className="text-slate-500">{"({"}</span>
                            </p>
                            <p className="pl-4">
                                <span className="text-slate-400">role: </span>
                                <span style={{ color: "#86efac" }}>&apos;Architect&apos;</span>
                                <span className="text-slate-500">,</span>
                            </p>
                            <p className="pl-4">
                                <span className="text-slate-400">focus: </span>
                                <span style={{ color: "#86efac" }}>&apos;Deep Space UI&apos;</span>
                                <span className="text-slate-500">,</span>
                            </p>
                            <p className="pl-4">
                                <span className="text-slate-400">status: </span>
                                <span style={{ color: "#86efac" }}>&apos;Hiring&apos;</span>
                            </p>
                            <p className="text-slate-500">{"});"}</p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL — Form ────────────────────── */}
                <div
                    className="flex-1 flex flex-col justify-center px-10 py-10"
                    style={{ background: "#0d1117" }}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-8">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <circle cx="5" cy="12" r="2" fill="#60a5fa" />
                                <circle cx="19" cy="12" r="2" fill="#60a5fa" />
                                <circle cx="12" cy="5" r="2" fill="#60a5fa" />
                                <circle cx="12" cy="19" r="2" fill="#60a5fa" />
                                <line x1="7" y1="12" x2="17" y2="12" stroke="#60a5fa" strokeWidth="1.5" />
                                <line x1="12" y1="7" x2="12" y2="17" stroke="#60a5fa" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            DevMatch
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Create your account
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Already have an account?{" "}
                        <Link href="/login" style={{ color: "#60a5fa" }} className="hover:underline transition-colors">
                            Sign in
                        </Link>
                    </p>

                    {error && (
                        <div className="text-red-400 text-sm rounded-xl px-4 py-3 mb-4 border border-red-500/20"
                            style={{ background: "rgba(239,68,68,0.08)" }}>
                            {error}
                        </div>
                    )}

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <button
                            onClick={() => signIn.social({ provider: "google", callbackURL: "/dashboard" })}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white font-medium transition-all"
                            style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                            onMouseEnter={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.2)"}
                            onMouseLeave={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"}
                        >
                            <span className="font-bold" style={{ color: "#4285f4" }}>G</span> Google
                        </button>
                        <button
                            onClick={() => signIn.social({ provider: "github", callbackURL: "/dashboard" })}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white font-medium transition-all"
                            style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                            onMouseEnter={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.2)"}
                            onMouseLeave={(e) => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                        <span className="text-xs text-slate-600 tracking-widest uppercase font-mono">or continue with email</span>
                        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Linus Torvalds"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full text-white placeholder-slate-600 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none transition-colors"
                                    style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    onFocus={(e) => e.target.style.border = "1px solid rgba(96,165,250,0.4)"}
                                    onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">👤</span>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="engineer@devmatch.io"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full text-white placeholder-slate-600 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none transition-colors"
                                    style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    onFocus={(e) => e.target.style.border = "1px solid rgba(96,165,250,0.4)"}
                                    onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">✉️</span>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full text-white placeholder-slate-600 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none transition-colors"
                                    style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    onFocus={(e) => e.target.style.border = "1px solid rgba(96,165,250,0.4)"}
                                    onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">🔒</span>
                            </div>

                            {/* Strength bar */}
                            <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-0.5 flex-1 rounded-full transition-all duration-300"
                                        style={{
                                            background: password.length > 0 && i <= strength
                                                ? strengthColors[strength]
                                                : "rgba(255,255,255,0.1)",
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="text-xs mt-1.5" style={{ color: "#64748b" }}>
                                Minimum 8 characters with at least one special character.
                                {password.length > 0 && strength > 0 && (
                                    <span className="ml-1 font-semibold" style={{ color: strengthColors[strength] }}>
                                        {strengthLabels[strength]}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded accent-blue-500 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#94a3b8" }}>
                                I agree to the{" "}
                                <Link href="#" style={{ color: "#22d3ee" }} className="hover:underline">Terms of Service</Link>
                                {" "}and{" "}
                                <Link href="#" style={{ color: "#22d3ee" }} className="hover:underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
                            style={{
                                background: loading ? "rgba(241,245,249,0.7)" : "#f1f5f9",
                                color: "#0f172a",
                                boxShadow: loading ? "none" : "0 0 30px rgba(241,245,249,0.1)",
                            }}
                        >
                            {loading ? "Creating account..." : "Create Account →"}
                        </button>
                    </form>

                    <p className="text-center text-xs mt-6" style={{ color: "#334155" }}>
                        © 2024 DevMatch. Engineering the Future.
                    </p>
                </div>
            </div>
        </div>
    );
}