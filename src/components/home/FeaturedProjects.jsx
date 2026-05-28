import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Nexus Protocol",
        description: "Decentralized computing layer for AI model training. We're looking for Rust and Go engineers to help optimize our P2P networking stack.",
        tags: ["RUST", "KUBERNETES", "MQTT"],
        applicants: 45,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        size: "large",
        slots: null,
    },
    {
        id: 2,
        title: "Vigilant OS",
        description: "Hardened Linux distribution focused on privacy and developer productivity.",
        tags: ["C/C++", "KERNEL"],
        applicants: null,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        size: "small",
        slots: 12,
    },
    {
        id: 3,
        title: "Designify",
        description: "AI-driven UI generation tool for Figma components.",
        tags: [],
        image: null,
        size: "mini",
        lead: "Elena S.",
        icon: "🎨",
    },
    {
        id: 4,
        title: "QuantDB",
        description: "Next-gen vector database for massive scale AI apps.",
        tags: [],
        image: null,
        size: "mini",
        lead: "Marcus K.",
        icon: "🗄️",
    },
];

const Tag = ({ label }) => (
    <span style={{
        fontSize: 10, fontWeight: 700,
        color: "rgba(255,255,255,0.6)",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 4, padding: "3px 8px",
        letterSpacing: "0.05em",
    }}>
        {label}
    </span>
);

export default function FeaturedProjects() {
    return (
        <section style={{ padding: "80px 24px", position: "relative" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
                    <div>
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8,
                        }}>
                            Featured Projects
                        </h2>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>
                            Join high-impact missions led by world-class developers.
                        </p>
                    </div>
                    <Link href="/explore" style={{
                        fontSize: 14, fontWeight: 500, color: "#3B82F6",
                        textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
                        whiteSpace: "nowrap",
                    }}>
                        View All Projects →
                    </Link>
                </div>

                {/* Top row: Large + Small */}
                <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 20, marginBottom: 20 }}>

                    {/* Large Card — Nexus Protocol */}
                    <div style={{
                        background: "#0a0e1e",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16, overflow: "hidden",
                        position: "relative",
                    }}>
                        {/* Image */}
                        <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                            <Image
                                src={projects[0].image}
                                alt={projects[0].title}
                                fill
                                style={{ objectFit: "cover", opacity: 0.75 }}
                            />
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to bottom, transparent 40%, rgba(10,14,30,0.95) 100%)",
                            }} />
                            <div style={{
                                position: "absolute", top: 16, left: 16,
                                background: "rgba(59,130,246,0.9)",
                                borderRadius: 6, padding: "3px 10px",
                                fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em",
                            }}>
                                TRENDING
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: "20px 24px 24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>
                                    {projects[0].title}
                                </h3>
                                <div style={{ display: "flex", gap: 6 }}>
                                    {["R", "G"].map((l) => (
                                        <div key={l} style={{
                                            width: 26, height: 26, borderRadius: "50%",
                                            background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.4)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 10, fontWeight: 700, color: "#3B82F6",
                                        }}>{l}</div>
                                    ))}
                                    <div style={{
                                        width: 26, height: 26, borderRadius: "50%",
                                        background: "rgba(255,255,255,0.08)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 10, color: "rgba(255,255,255,0.5)",
                                    }}>+18</div>
                                </div>
                            </div>

                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: 14 }}>
                                {projects[0].description}
                            </p>

                            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                                {projects[0].tags.map((t) => <Tag key={t} label={t} />)}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontSize: 15 }}>👥</span> {projects[0].applicants} Applicants
                                </span>
                                <button style={{
                                    padding: "8px 20px", borderRadius: 8,
                                    background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                                    border: "none", color: "#fff", fontSize: 13, fontWeight: 600,
                                    cursor: "pointer", boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                                }}>
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Small Card — Vigilant OS */}
                    <div style={{
                        background: "#0a0e1e",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16, overflow: "hidden",
                    }}>
                        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                            <Image
                                src={projects[1].image}
                                alt={projects[1].title}
                                fill
                                style={{ objectFit: "cover", opacity: 0.7 }}
                            />
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to bottom, transparent 30%, rgba(10,14,30,0.97) 100%)",
                            }} />
                        </div>
                        <div style={{ padding: "16px 20px 20px" }}>
                            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                                {projects[1].title}
                            </h3>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 12 }}>
                                {projects[1].description}
                            </p>
                            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                                {projects[1].tags.map((t) => <Tag key={t} label={t} />)}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                                    {projects[1].slots} Slots left
                                </span>
                                <div style={{
                                    width: 28, height: 28, borderRadius: "50%",
                                    background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 12, color: "#8B5CF6", cursor: "pointer",
                                }}>→</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row: Mini cards + CTA */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                    {projects.slice(2).map((p) => (
                        <div key={p.id} style={{
                            background: "#0a0e1e",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 14, padding: "20px 20px",
                            display: "flex", alignItems: "flex-start", gap: 14,
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                            }}>
                                {p.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                                    {p.title}
                                </h4>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginBottom: 10 }}>
                                    {p.description}
                                </p>
                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                                    LEAD: {p.lead}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Your Project CTA */}
                    <div style={{
                        background: "rgba(59,130,246,0.04)",
                        border: "1.5px dashed rgba(59,130,246,0.25)",
                        borderRadius: 14, padding: "20px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 8, cursor: "pointer", textAlign: "center",
                    }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: "50%",
                            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20, color: "#3B82F6",
                        }}>+</div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Your Project Here</p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Post a project and start building.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}