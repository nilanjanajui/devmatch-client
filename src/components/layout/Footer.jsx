import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
    { icon: Github,   href: "#", label: "GitHub"   },
    { icon: Twitter,  href: "#", label: "Twitter"  },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube,  href: "#", label: "YouTube"  },
];

export default function Footer() {
    return (
        <footer style={{ background: "#060816", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px 24px 32px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: 48, marginBottom: 48 }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: "50%",
                                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 13, fontWeight: 700, color: "#fff",
                            }}>D</div>
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: "#fff" }}>
                                DevMatch
                            </span>
                        </div>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 220, marginBottom: 24 }}>
                            Engineering the future of developer collaboration. Find your team, ship your vision.
                        </p>

                        {/* Social Icons */}
                        <div style={{ display: "flex", gap: 8 }}>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "rgba(255,255,255,0.5)",
                                        textDecoration: "none",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = "rgba(99,102,241,0.2)";
                                        e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                                        e.currentTarget.style.color = "#fff";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                                    }}
                                >
                                    <Icon size={15} strokeWidth={1.75} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 20 }}>
                            Platform
                        </p>
                        {["About", "Docs", "Explore", "Community"].map((item) => (
                            <Link key={item} href="#" style={{
                                display: "block", fontSize: 14, color: "rgba(255,255,255,0.6)",
                                textDecoration: "none", marginBottom: 12,
                                transition: "color 0.2s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                            >{item}</Link>
                        ))}
                    </div>

                    {/* Legal */}
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 20 }}>
                            Legal
                        </p>
                        {["Privacy", "Terms", "Cookie Policy"].map((item) => (
                            <Link key={item} href="#" style={{
                                display: "block", fontSize: 14, color: "rgba(255,255,255,0.6)",
                                textDecoration: "none", marginBottom: 12,
                                transition: "color 0.2s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                            >{item}</Link>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 20 }}>
                            Newsletter
                        </p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
                            Weekly updates on top projects.
                        </p>
                        <div style={{ display: "flex", gap: 0 }}>
                            <input
                                type="email"
                                placeholder="Email address"
                                style={{
                                    flex: 1, padding: "10px 14px", fontSize: 13,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRight: "none",
                                    borderRadius: "8px 0 0 8px",
                                    color: "#fff", outline: "none",
                                }}
                            />
                            <button style={{
                                padding: "10px 14px",
                                background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                                border: "none", borderRadius: "0 8px 8px 0",
                                cursor: "pointer", color: "#fff", fontSize: 16,
                            }}>→</button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                }}>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>
                        © 2024 DevMatch: Engineering the Future.
                    </p>

                    {/* Repeat social icons in bottom bar (smaller) */}
                    <div style={{ display: "flex", gap: 16 }}>
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                style={{
                                    color: "rgba(255,255,255,0.25)",
                                    textDecoration: "none",
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
                            >
                                <Icon size={14} strokeWidth={1.75} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}