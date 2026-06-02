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
    const [photoUrl, setPhotoUrl] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getStrength = () => {
        let s = 0;
        if (password.length >= 8) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[0-9]/.test(password)) s++;
        if (/[^A-Za-z0-9]/.test(password)) s++;
        return s;
    };
    const strengthColors = ["", "#ef4444", "#eab308", "#3b82f6", "#22c55e"];
    const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
    const strength = getStrength();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) return setError("Please agree to the Terms of Service.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        if (!/[A-Z]/.test(password)) return setError("Password must include at least one uppercase letter.");
        if (!/[a-z]/.test(password)) return setError("Password must include at least one lowercase letter.");
        setLoading(true);
        setError("");
        try {
            const result = await signUp.email({
                name,
                email,
                password,
                image: photoUrl.trim() || undefined,
            });
            if (result?.error) {
                setError(result.error.message || "Registration failed. This email may already be in use.");
                return;
            }
            router.push("/login");
        } catch {
            setError("Registration failed. This email may already be in use.");
        } finally {
            setLoading(false);
        }
    };

    const inputBase = {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(255,255,255,0.1)",
        color: "#e2e8f0",
        borderRadius: "10px",
        fontSize: "13px",
        padding: "11px 40px 11px 14px",
        outline: "none",
        transition: "border-color 0.2s, background-color 0.2s",
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
        }}>
            <div style={{
                width: "100%", maxWidth: 1020,
                height: 640,
                display: "flex",
                borderRadius: "18px",
                overflow: "hidden",
            }}>
                {/* ── LEFT PANEL ── */}
                <div style={{
                    width: "44%",
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 40,
                }}>
                    {/* Dark overlay */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(150deg, rgba(6,8,22,0.9) 0%, rgba(10,22,42,0.75) 45%, rgba(6,8,22,0.92) 100%)",
                    }} />
                    {/* Cyan glow */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse at 30% 65%, rgba(6,182,212,0.15) 0%, transparent 55%)",
                    }} />

                    {/* Badge */}
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            fontSize: "11px", padding: "6px 12px", borderRadius: "999px",
                            fontFamily: "monospace", color: "#94a3b8",
                            backgroundColor: "rgba(10,18,35,0.8)",
                            borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)",
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22d3ee", display: "inline-block" }} />
                            v2.0 STABLE RELEASE
                        </span>
                    </div>

                    {/* Bottom content */}
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h2 style={{
                            fontSize: "2.2rem", fontWeight: 900, lineHeight: 1.2,
                            fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16,
                        }}>
                            <span style={{ color: "#fff" }}>Join the future of</span>
                            <br />
                            <span style={{ color: "#22d3ee" }}>engineering</span>
                        </h2>
                        <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.7, marginBottom: 28, maxWidth: 300 }}>
                            Connect with high-performance engineering teams,
                            showcase your architecture, and build the next
                            generation of software in a deep-focus ecosystem.
                        </p>

                        {/* Code snippet */}
                        <div style={{
                            borderRadius: "12px", padding: "16px",
                            fontFamily: "monospace", fontSize: "12px",
                            backgroundColor: "rgba(8,13,28,0.9)",
                            borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.07)",
                        }}>
                            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(239,68,68,0.75)" }} />
                                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(234,179,8,0.75)" }} />
                                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(34,197,94,0.75)" }} />
                            </div>
                            <p><span style={{ color: "#60a5fa" }}>const </span><span style={{ color: "#fff" }}>dev</span><span style={{ color: "#64748b" }}> = new </span><span style={{ color: "#22d3ee" }}>DevMatch</span><span style={{ color: "#64748b" }}>{`({`}</span></p>
                            <p style={{ paddingLeft: 16 }}><span style={{ color: "#94a3b8" }}>role: </span><span style={{ color: "#86efac" }}>&apos;Architect&apos;</span><span style={{ color: "#64748b" }}>,</span></p>
                            <p style={{ paddingLeft: 16 }}><span style={{ color: "#94a3b8" }}>focus: </span><span style={{ color: "#86efac" }}>&apos;Deep Space UI&apos;</span><span style={{ color: "#64748b" }}>,</span></p>
                            <p style={{ paddingLeft: 16 }}><span style={{ color: "#94a3b8" }}>status: </span><span style={{ color: "#86efac" }}>&apos;Hiring&apos;</span></p>
                            <p style={{ color: "#64748b" }}>{`});`}</p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div style={{
                    flex: 1,
                    backgroundColor: "#0d1117",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "40px 40px",
                    overflowY: "auto",
                }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backgroundColor: "rgba(59,130,246,0.18)",
                            borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(59,130,246,0.3)",
                        }}>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                                <circle cx="5" cy="12" r="2" fill="#60a5fa"/>
                                <circle cx="19" cy="12" r="2" fill="#60a5fa"/>
                                <circle cx="12" cy="5" r="2" fill="#60a5fa"/>
                                <circle cx="12" cy="19" r="2" fill="#60a5fa"/>
                                <line x1="7" y1="12" x2="17" y2="12" stroke="#60a5fa" strokeWidth="1.5"/>
                                <line x1="12" y1="7" x2="12" y2="17" stroke="#60a5fa" strokeWidth="1.5"/>
                            </svg>
                        </div>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: "17px", fontFamily: "'Space Grotesk', sans-serif" }}>
                            DevMatch
                        </span>
                    </div>

                    <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
                        Create your account
                    </h2>
                    <p style={{ color: "#475569", fontSize: "13px", marginBottom: 20 }}>
                        Already have an account?{" "}
                        <Link href="/login" style={{ color: "#60a5fa" }}>Sign in</Link>
                    </p>

                    {error && (
                        <div style={{
                            color: "#f87171", fontSize: "13px", borderRadius: "10px",
                            padding: "10px 16px", marginBottom: 16,
                            backgroundColor: "rgba(239,68,68,0.08)",
                            borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(239,68,68,0.2)",
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Social */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                        {[
                            {
                                label: "Google", provider: "google",
                                icon: (
                                    <svg width="15" height="15" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                )
                            },
                            {
                                label: "GitHub", provider: "github",
                                icon: (
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                )
                            },
                        ].map(({ label, provider, icon }) => (
                            <button
                                key={provider}
                                onClick={() => signIn.social({ provider, callbackURL: "/callback?next=/" })}
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                    padding: "10px", borderRadius: "10px", cursor: "pointer",
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.09)",
                                    color: "#fff", fontSize: "13px", fontWeight: 500, transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                            >
                                {icon} {label}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                        <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.07)" }} />
                        <span style={{ fontSize: "11px", color: "#1e293b", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace" }}>
                            or continue with email
                        </span>
                        <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.07)" }} />
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {/* Full Name */}
                        <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                                Full Name
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="text" placeholder="Linus Torvalds"
                                    value={name} onChange={(e) => setName(e.target.value)} required
                                    style={inputBase}
                                    onFocus={(e) => { e.target.style.borderColor = "rgba(96,165,250,0.45)"; e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                                />
                                <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#334155" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                                Email Address
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="email" placeholder="engineer@devmatch.io"
                                    value={email} onChange={(e) => setEmail(e.target.value)} required
                                    style={inputBase}
                                    onFocus={(e) => { e.target.style.borderColor = "rgba(96,165,250,0.45)"; e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                                />
                                <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#334155" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                                Photo URL <span style={{ color: "#334155", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="url" placeholder="https://example.com/avatar.jpg"
                                    value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
                                    style={inputBase}
                                    onFocus={(e) => { e.target.style.borderColor = "rgba(96,165,250,0.45)"; e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                                />
                                <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#334155" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="password" placeholder="••••••••"
                                    value={password} onChange={(e) => setPassword(e.target.value)} required
                                    style={inputBase}
                                    onFocus={(e) => { e.target.style.borderColor = "rgba(96,165,250,0.45)"; e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                                />
                                <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#334155" }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                                    </svg>
                                </span>
                            </div>
                            {/* Strength bar */}
                            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                                {[1,2,3,4].map((i) => (
                                    <div key={i} style={{
                                        flex: 1, height: 3, borderRadius: 999, transition: "background 0.3s",
                                        backgroundColor: password.length > 0 && i <= strength ? strengthColors[strength] : "rgba(255,255,255,0.08)",
                                    }} />
                                ))}
                            </div>
                            <p style={{ fontSize: "11px", marginTop: 6, color: "#334155" }}>
                                Min 6 characters, must include uppercase and lowercase.
                                {password.length > 0 && strength > 0 && (
                                    <span style={{ marginLeft: 6, fontWeight: 600, color: strengthColors[strength] }}>
                                        {strengthLabels[strength]}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Terms */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <input
                                type="checkbox" id="terms" checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                style={{ marginTop: 2, width: 14, height: 14, cursor: "pointer", accentColor: "#3b82f6" }}
                            />
                            <label htmlFor="terms" style={{ fontSize: "12px", color: "#475569", lineHeight: 1.6, cursor: "pointer" }}>
                                I agree to the{" "}
                                <Link href="#" style={{ color: "#22d3ee" }}>Terms of Service</Link>
                                {" "}and{" "}
                                <Link href="#" style={{ color: "#22d3ee" }}>Privacy Policy</Link>.
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit" disabled={loading}
                            style={{
                                width: "100%", padding: "13px", borderRadius: "10px",
                                border: "none", cursor: "pointer",
                                backgroundColor: loading ? "rgba(241,245,249,0.6)" : "#f1f5f9",
                                color: "#0f172a", fontWeight: 600, fontSize: "14px",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                transition: "all 0.2s",
                            }}
                        >
                            {loading ? "Creating account…" : "Create Account →"}
                        </button>
                    </form>

                    <p style={{ textAlign: "center", fontSize: "11px", marginTop: 20, color: "#1e293b" }}>
                        © 2024 DevMatch. Engineering the Future.
                    </p>
                </div>
            </div>
        </div>
    );
}