import Link from "next/link";

export default function CTASection() {
    return (
        <section style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.12) 100%)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 24, padding: "80px 40px",
                    textAlign: "center", position: "relative", overflow: "hidden",
                }}>
                    {/* Background glow */}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600, height: 300,
                        background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 44, fontWeight: 700, color: "#fff",
                        marginBottom: 16, position: "relative",
                    }}>
                        Ready to Build the Future?
                    </h2>
                    <p style={{
                        fontSize: 16, color: "rgba(255,255,255,0.55)",
                        marginBottom: 40, position: "relative",
                    }}>
                        Join over 25,000 developers building the next generation of software.
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: 16, position: "relative" }}>
                        <Link href="/register" style={{
                            padding: "14px 32px", borderRadius: 10,
                            background: "#fff", color: "#0a0e1e",
                            textDecoration: "none", fontSize: 15, fontWeight: 700,
                            boxShadow: "0 4px 24px rgba(255,255,255,0.2)",
                            transition: "opacity 0.2s",
                        }}>
                            Join DevMatch Now
                        </Link>
                        <Link href="/explore" style={{
                            padding: "14px 32px", borderRadius: 10,
                            border: "1.5px solid rgba(255,255,255,0.25)",
                            color: "#fff", textDecoration: "none",
                            fontSize: 15, fontWeight: 600,
                            background: "rgba(255,255,255,0.04)",
                            transition: "all 0.2s",
                        }}>
                            View Open Teams
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}