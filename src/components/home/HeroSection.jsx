import Link from "next/link";

export default function HeroSection() {
    return (
        <section
            style={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                alignItems: "center",
                padding: "80px 24px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background glow blobs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{
                    position: "absolute", top: "10%", left: "-5%",
                    width: 500, height: 500, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
                }} />
                <div style={{
                    position: "absolute", bottom: "10%", right: "10%",
                    width: 400, height: 400, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                }} />
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative" }}>

                {/* Left */}
                <div>
                    {/* Badge */}
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.25)",
                        borderRadius: 20, padding: "6px 14px",
                        marginBottom: 28,
                    }}>
                        <span style={{ color: "#3B82F6", fontSize: 12 }}>#</span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                            Build Startup Teams Faster
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 52,
                        fontWeight: 700,
                        lineHeight: 1.15,
                        marginBottom: 24,
                        color: "#fff",
                    }}>
                        Find Developers.<br />
                        <span className="text-gradient-cyan">Build Products.</span><br />
                        Launch Startups.
                    </h1>

                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 40, maxWidth: 420 }}>
                        The premier platform for developer collaboration and startup formation. Connect with elite engineers, join visionary teams, and ship code that matters.
                    </p>

                    <div style={{ display: "flex", gap: 16 }}>
                        <Link href="/explore" style={{
                            padding: "13px 28px", borderRadius: 10,
                            border: "1.5px solid rgba(59,130,246,0.5)",
                            color: "#fff", textDecoration: "none",
                            fontSize: 15, fontWeight: 600,
                            background: "rgba(59,130,246,0.08)",
                            transition: "all 0.2s",
                        }}>
                            Explore Projects
                        </Link>
                        <Link href="/dashboard/projects/create" style={{
                            padding: "13px 28px", borderRadius: 10,
                            background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                            color: "#fff", textDecoration: "none",
                            fontSize: 15, fontWeight: 600,
                            boxShadow: "0 0 24px rgba(59,130,246,0.35)",
                            transition: "opacity 0.2s",
                        }}>
                            Create Project
                        </Link>
                    </div>
                </div>

                {/* Right — Mock Dashboard */}
                <div style={{ position: "relative" }}>
                    {/* Fit Score Badge */}
                    <div style={{
                        position: "absolute", top: -16, right: -8, zIndex: 10,
                        background: "rgba(15,23,42,0.95)",
                        border: "1px solid rgba(6,182,212,0.35)",
                        borderRadius: 10, padding: "10px 16px",
                        display: "flex", alignItems: "center", gap: 10,
                        boxShadow: "0 0 20px rgba(6,182,212,0.2)",
                    }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: "50%",
                            background: "rgba(6,182,212,0.15)",
                            border: "1.5px solid #06B6D4",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <span style={{ fontSize: 12, color: "#06B6D4" }}>✓</span>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>PAIR MATCH</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#06B6D4" }}>98% Fit Score</div>
                        </div>
                    </div>

                    {/* Dashboard Mockup */}
                    <div style={{
                        background: "rgba(10,14,30,0.9)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                    }}>
                        {/* Window chrome */}
                        <div style={{
                            background: "rgba(15,23,42,0.8)",
                            padding: "12px 16px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            display: "flex", alignItems: "center", gap: 8,
                        }}>
                            {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
                                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                            ))}
                            <div style={{
                                flex: 1, margin: "0 12px", background: "rgba(255,255,255,0.05)",
                                borderRadius: 6, padding: "4px 12px",
                                fontSize: 11, color: "rgba(255,255,255,0.3)",
                            }}>
                                devmatch.io/dashboard
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: 24 }}>
                            {/* Top stats */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                                {[
                                    { label: "Active Projects", value: "12k", color: "#3B82F6" },
                                    { label: "Match Score", value: "98%", color: "#06B6D4" },
                                    { label: "Teams Formed", value: "850+", color: "#8B5CF6" },
                                ].map((s) => (
                                    <div key={s.label} style={{
                                        background: "rgba(255,255,255,0.04)",
                                        borderRadius: 10, padding: "14px 12px",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}>
                                        <div style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
                                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Bar chart */}
                            <div style={{
                                background: "rgba(255,255,255,0.03)",
                                borderRadius: 12, padding: 16,
                                border: "1px solid rgba(255,255,255,0.05)",
                            }}>
                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>Project Activity</div>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                                        <div key={i} style={{
                                            flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0",
                                            background: i === 10 || i === 11
                                                ? "linear-gradient(180deg, #06B6D4, #3B82F6)"
                                                : "rgba(59,130,246,0.25)",
                                        }} />
                                    ))}
                                </div>
                            </div>

                            {/* Dev cards */}
                            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                                {[
                                    { name: "Alex Rivera", role: "Rust / Systems", match: "97%", color: "#06B6D4" },
                                    { name: "Sarah Chen", role: "AI / ML Engineer", match: "95%", color: "#8B5CF6" },
                                ].map((dev) => (
                                    <div key={dev.name} style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        background: "rgba(255,255,255,0.04)",
                                        borderRadius: 10, padding: "10px 14px",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{
                                                width: 28, height: 28, borderRadius: "50%",
                                                background: `${dev.color}25`,
                                                border: `1.5px solid ${dev.color}60`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 11, fontWeight: 700, color: dev.color,
                                            }}>
                                                {dev.name[0]}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{dev.name}</div>
                                                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{dev.role}</div>
                                            </div>
                                        </div>
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, color: dev.color,
                                            background: `${dev.color}15`,
                                            padding: "3px 8px", borderRadius: 6,
                                        }}>{dev.match}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}