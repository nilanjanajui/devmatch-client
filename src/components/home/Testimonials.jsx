const testimonials = [
    {
        quote: "I found my co-founder and lead engineer on DevMatch in just 48 hours. We shipped our MVP three weeks later and just closed our seed round. The quality of talent here is unmatched.",
        name: "Jordan Chen",
        role: "FOUNDER, LUNA AI",
        initials: "JC",
        color: "#3B82F6",
    },
    {
        quote: "The project discovery on this platform is elite. I was able to build a high-performance team building a decentralized web hosting service. It's the GitHub of networking for developers.",
        name: "Aisha M.",
        role: "SENIOR BACKEND ENGINEER",
        initials: "AM",
        color: "#8B5CF6",
    },
    {
        quote: "As a designer, it's often hard to find devs who appreciate UI polish. On DevMatch, everyone is on the same page about quality. It's transformed how I approach side projects.",
        name: "Liam Foster",
        role: "PRODUCT DESIGNER",
        initials: "LF",
        color: "#06B6D4",
    },
];

export default function TestimonialsSection() {
    return (
        <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.01)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <h2 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 32, fontWeight: 700, color: "#fff",
                    textAlign: "center", marginBottom: 48,
                }}>
                    Success Stories
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                    {testimonials.map((t) => (
                        <div key={t.name} style={{
                            background: "#0a0e1e",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 16, padding: 32,
                            position: "relative",
                        }}>
                            {/* Quote mark */}
                            <div style={{
                                fontSize: 60, fontFamily: "Georgia, serif",
                                color: "rgba(59,130,246,0.3)",
                                position: "absolute", top: 16, left: 24,
                                lineHeight: 1,
                            }}>
                                &ldquo;
                            </div>
                            <p style={{
                                fontSize: 14, color: "rgba(255,255,255,0.65)",
                                lineHeight: 1.75, marginBottom: 28,
                                marginTop: 20,
                            }}>
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: "50%",
                                    background: `${t.color}20`, border: `1.5px solid ${t.color}50`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 12, fontWeight: 700, color: t.color,
                                }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}