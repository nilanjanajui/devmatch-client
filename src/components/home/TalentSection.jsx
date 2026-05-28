const categories = [
    {
        icon: "⬜",
        label: "Frontend",
        desc: "React, Vue, WebGL, Experts",
        color: "#3B82F6",
    },
    {
        icon: "🗄️",
        label: "Backend",
        desc: "Go, Node.js, Systems Arch",
        color: "#8B5CF6",
    },
    {
        icon: "🤖",
        label: "AI / ML",
        desc: "PyTorch, LLMs, Computer Vision",
        color: "#06B6D4",
    },
    {
        icon: "⚙️",
        label: "DevOps",
        desc: "AWS, Kubernetes, CI/CD",
        color: "#F59E0B",
    },
    {
        icon: "🎨",
        label: "UI / UX",
        desc: "Figma, Prototyping, Design Sys",
        color: "#EC4899",
    },
];

export default function TalentSection() {
    return (
        <section style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <h2 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 32, fontWeight: 700, color: "#fff",
                    textAlign: "center", marginBottom: 48,
                }}>
                    Top Specialized Talent
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
                    {categories.map((cat) => (
                        <div key={cat.label} style={{
                            background: "#0a0e1e",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 14, padding: "28px 16px",
                            textAlign: "center", cursor: "pointer",
                            transition: "border-color 0.2s, transform 0.2s",
                        }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 12, margin: "0 auto 16px",
                                background: `${cat.color}15`, border: `1.5px solid ${cat.color}30`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 22,
                            }}>
                                {cat.icon}
                            </div>
                            <div style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6,
                            }}>
                                {cat.label}
                            </div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                                {cat.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}