const stats = [
    { value: "25k", label: "THOUSAND DEVELOPERS" },
    { value: "12k", label: "ACTIVE PROJECTS" },
    { value: "850+", label: "TEAMS FORMED" },
    { value: "95k", label: "SUCCESS RATE %" },
];

export default function StatsSection() {
    return (
        <section style={{
            padding: "64px 24px",
            background: "rgba(255,255,255,0.01)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
            <div style={{
                maxWidth: 1200, margin: "0 auto",
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
            }}>
                {stats.map((s, i) => (
                    <div key={i} style={{ textAlign: "center", padding: "12px 0" }}>
                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 44, fontWeight: 700,
                            background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginBottom: 8,
                            lineHeight: 1,
                        }}>
                            {s.value}
                        </div>
                        <div style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                            color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
                        }}>
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}