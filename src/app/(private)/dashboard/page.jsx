"use client";

import Link from "next/link";
import {
    FolderPlus, Compass, BadgeCheck,
    ArrowRight, ExternalLink, Edit,
    Lightbulb, Users} from "lucide-react";

// ── change this import to match your auth context ──
import { useAuth } from "@/context/AuthContext";

const CARD = {
    base: {
        height: "100%",
        padding: "32px",
        borderRadius: "12px",
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
    },
};

export default function DashboardOverview() {
    const { user } = useAuth();
    const firstName =
        user?.displayName?.split(" ")[0] ||
        user?.email?.split("@")[0] ||
        "Developer";

    return (
        <div style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#0b1326" }}>

            {/* ─────────────── HERO ─────────────── */}
            <section style={{
                position: "relative",
                paddingTop: "96px",
                paddingBottom: "64px",
                paddingLeft: "48px",
                paddingRight: "48px",
                overflow: "hidden",
            }}>
                {/* glow 1 */}
                <div style={{
                    position: "absolute", top: "-256px", right: "-256px",
                    width: "500px", height: "500px",
                    background: "rgba(173,198,255,0.08)",
                    filter: "blur(120px)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }} />
                {/* glow 2 */}
                <div style={{
                    position: "absolute", bottom: "-128px", left: "-128px",
                    width: "300px", height: "300px",
                    background: "rgba(76,215,246,0.05)",
                    filter: "blur(80px)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 10, maxWidth: "896px" }}>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "48px",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        color: "#dae2fd",
                        marginBottom: "16px",
                        marginTop: 0,
                    }}>
                        Welcome to the Hub,{" "}
                        <span style={{ color: "#adc6ff" }}>{firstName}.</span>
                    </h2>
                    <p style={{
                        fontSize: "18px",
                        lineHeight: 1.6,
                        color: "rgba(194,198,214,0.8)",
                        maxWidth: "672px",
                        margin: 0,
                    }}>
                        Your journey as a developer collaborator starts here. Let&apos;s build
                        something incredible. Connect with elite engineers, join
                        cutting-edge missions, and manifest your code into reality.
                    </p>
                </div>
            </section>

            {/* ─────────────── BENTO GRID ─────────────── */}
            <section style={{ padding: "0 48px", marginBottom: "64px" }}>
                <h3 style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#adc6ff",
                    marginBottom: "24px",
                    marginTop: "24px",
                }}>
                    Initialize Your Journey
                </h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: "16px",
                }}>

                    {/* ── Large CREATE card (8 cols) ── */}
                    <div style={{ gridColumn: "span 8", minHeight: "360px" }}>
                        <style>{`
        @keyframes dmShineA {
            0% { transform: translateX(-220%) skewX(-15deg); }
            55%, 100% { transform: translateX(420%) skewX(-15deg); }
        }
        @keyframes dmShineB {
            0%, 22% { transform: translateX(-220%) skewX(-15deg); }
            78%, 100% { transform: translateX(420%) skewX(-15deg); }
        }
        @keyframes dmAurora1 {
            0%, 100% { transform: translate(0%, 0%) scale(1); }
            35%  { transform: translate(6%, -6%) scale(1.12); }
            70%  { transform: translate(-4%, 5%) scale(0.94); }
        }
        @keyframes dmAurora2 {
            0%, 100% { transform: translate(0%, 0%) scale(1); }
            40%  { transform: translate(-7%, 4%) scale(1.1); }
            75%  { transform: translate(5%, -5%) scale(0.9); }
        }
        @keyframes dmBorderGlow {
            0%, 100% { border-color: rgba(173,198,255,0.12); box-shadow: 0 0 12px rgba(173,198,255,0.06); }
            50%       { border-color: rgba(173,198,255,0.38); box-shadow: 0 0 32px rgba(173,198,255,0.18), 0 0 64px rgba(173,198,255,0.06); }
        }
        @keyframes dmIconPulse {
            0%, 100% { box-shadow: 0 0 0px 0px rgba(173,198,255,0); }
            50%       { box-shadow: 0 0 22px 4px rgba(173,198,255,0.32); }
        }
        @keyframes dmBadgePulse {
            0%, 100% { background: rgba(173,198,255,0.15); box-shadow: 0 0 6px rgba(173,198,255,0.15); }
            50%       { background: rgba(173,198,255,0.30); box-shadow: 0 0 14px rgba(173,198,255,0.45); }
        }
        @keyframes dmSparkle {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            20%       { opacity: 1; transform: scale(1) rotate(15deg); }
            80%       { opacity: 0.6; transform: scale(0.8) rotate(-10deg); }
        }
        @keyframes dmArrow {
            0%, 100% { transform: translateX(0px); }
            50%       { transform: translateX(5px); }
        }
        .dm-feat-card {
            animation: dmBorderGlow 4.5s ease-in-out infinite;
        }
        .dm-feat-card:hover {
            animation: none !important;
            border-color: rgba(173,198,255,0.6) !important;
            box-shadow: 0 0 44px rgba(173,198,255,0.32), 0 0 90px rgba(173,198,255,0.1) !important;
        }
        .dm-cta-link:hover .dm-arrow-icon {
            animation: dmArrow 0.65s ease-in-out infinite;
        }
        .dm-cta-link:hover {
            opacity: 0.8;
        }
    `}</style>

                        <div
                            className="dm-feat-card"
                            style={{
                                ...CARD.base,
                                border: "1px solid rgba(173,198,255,0.12)",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            {/* Aurora blobs */}
                            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: "inherit" }}>
                                <div style={{
                                    position: "absolute",
                                    width: "75%", height: "75%",
                                    top: "-25%", left: "-8%",
                                    background: "radial-gradient(ellipse, rgba(173,198,255,0.09) 0%, transparent 68%)",
                                    animation: "dmAurora1 10s ease-in-out infinite",
                                }} />
                                <div style={{
                                    position: "absolute",
                                    width: "55%", height: "55%",
                                    bottom: "-15%", right: "0%",
                                    background: "radial-gradient(ellipse, rgba(100,130,255,0.08) 0%, transparent 68%)",
                                    animation: "dmAurora2 13s ease-in-out infinite",
                                }} />
                            </div>

                            {/* Shine streaks */}
                            <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit", pointerEvents: "none" }}>
                                {/* Wide soft streak */}
                                <div style={{
                                    position: "absolute", top: 0, left: 0,
                                    width: "42%", height: "100%",
                                    background: "linear-gradient(90deg, transparent 0%, rgba(173,198,255,0.09) 50%, transparent 100%)",
                                    animation: "dmShineA 5s ease-in-out infinite",
                                }} />
                                {/* Narrow bright streak, slightly delayed */}
                                <div style={{
                                    position: "absolute", top: 0, left: 0,
                                    width: "16%", height: "100%",
                                    background: "linear-gradient(90deg, transparent 0%, rgba(220,235,255,0.24) 50%, transparent 100%)",
                                    animation: "dmShineB 5s ease-in-out infinite",
                                }} />
                            </div>

                            {/* Sparkle dots */}
                            {[
                                { top: "12%", right: "14%", delay: "0s", size: 4 },
                                { top: "22%", right: "26%", delay: "1.2s", size: 3 },
                                { top: "8%", right: "9%", delay: "2.3s", size: 3 },
                                { top: "38%", right: "7%", delay: "0.7s", size: 4 },
                                { top: "18%", right: "38%", delay: "1.8s", size: 2 },
                            ].map((dot, i) => (
                                <div key={i} style={{
                                    position: "absolute",
                                    top: dot.top, right: dot.right,
                                    width: `${dot.size}px`, height: `${dot.size}px`,
                                    borderRadius: "50%",
                                    background: "rgba(200,220,255,0.85)",
                                    animation: `dmSparkle 4s ease-in-out ${dot.delay} infinite`,
                                    pointerEvents: "none",
                                    zIndex: 1,
                                }} />
                            ))}

                            {/* Header row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
                                <div style={{
                                    padding: "16px",
                                    borderRadius: "12px",
                                    background: "rgba(173,198,255,0.1)",
                                    border: "1px solid rgba(173,198,255,0.2)",
                                    animation: "dmIconPulse 3.5s ease-in-out infinite",
                                }}>
                                    <FolderPlus size={36} color="#adc6ff" />
                                </div>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                    padding: "4px 12px",
                                    borderRadius: "9999px",
                                    color: "#adc6ff",
                                    animation: "dmBadgePulse 3.5s ease-in-out infinite",
                                }}>
                                    RECOMMENDED
                                </span>
                            </div>

                            {/* Body */}
                            <div style={{ marginTop: "48px", position: "relative", zIndex: 2 }}>
                                <h4 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "32px",
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    color: "#dae2fd",
                                    marginBottom: "12px",
                                    marginTop: 0,
                                }}>
                                    Create Your First Project
                                </h4>
                                <p style={{ fontSize: "16px", lineHeight: 1.5, color: "#c2c6d6", maxWidth: "448px", margin: 0 }}>
                                    Launch your own vision and recruit the best talent on DevMatch.
                                    Set your stack, define your goals, and start building.
                                </p>
                            </div>

                            {/* CTA */}
                            <Link href="/dashboard/projects/create" className="dm-cta-link" style={{ textDecoration: "none", position: "relative", zIndex: 2 }}>
                                <div style={{
                                    marginTop: "32px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#adc6ff",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    cursor: "pointer",
                                    transition: "opacity 0.2s ease",
                                }}>
                                    <span>Get Started</span>
                                    <span className="dm-arrow-icon" style={{ display: "flex" }}>
                                        <ArrowRight size={18} />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* ── EXPLORE card (4 cols) ── */}
                    <div style={{ gridColumn: "span 4", minHeight: "360px" }}>
                        <div
                            style={{
                                ...CARD.base,
                                border: "1px solid rgba(76,215,246,0.12)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = "0 0 28px rgba(76,215,246,0.2)";
                                e.currentTarget.style.borderColor = "rgba(76,215,246,0.4)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.borderColor = "rgba(76,215,246,0.12)";
                            }}
                        >
                            <div style={{
                                padding: "16px",
                                borderRadius: "12px",
                                background: "rgba(76,215,246,0.1)",
                                border: "1px solid rgba(76,215,246,0.2)",
                                width: "fit-content",
                            }}>
                                <Compass size={28} color="#4cd7f6" />
                            </div>

                            <div>
                                <h4 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "20px",
                                    fontWeight: 500,
                                    color: "#dae2fd",
                                    marginBottom: "8px",
                                    marginTop: 0,
                                }}>
                                    Explore Active Missions
                                </h4>
                                <p style={{ fontSize: "14px", lineHeight: 1.5, color: "#c2c6d6", margin: 0 }}>
                                    Find projects that match your tech stack and join existing teams.
                                </p>
                            </div>

                            <Link href="/explore" style={{ textDecoration: "none" }}>
                                <div style={{
                                    marginTop: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#4cd7f6",
                                    fontWeight: 700,
                                }}>
                                    <span style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "12px",
                                        letterSpacing: "0.1em",
                                    }}>
                                        Find Projects
                                    </span>
                                    <ExternalLink size={14} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* ── PROFILE card (4 cols) ── */}
                    <div style={{ gridColumn: "span 4", minHeight: "280px" }}>
                        <div
                            style={{
                                ...CARD.base,
                                border: "1px solid rgba(208,188,255,0.12)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = "0 0 28px rgba(208,188,255,0.15)";
                                e.currentTarget.style.borderColor = "rgba(208,188,255,0.35)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.borderColor = "rgba(208,188,255,0.12)";
                            }}
                        >
                            <div style={{
                                padding: "16px",
                                borderRadius: "12px",
                                background: "rgba(208,188,255,0.1)",
                                border: "1px solid rgba(208,188,255,0.2)",
                                width: "fit-content",
                            }}>
                                <BadgeCheck size={28} color="#d0bcff" />
                            </div>

                            <div>
                                <h4 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "20px",
                                    fontWeight: 500,
                                    color: "#dae2fd",
                                    marginBottom: "8px",
                                    marginTop: 0,
                                }}>
                                    Complete Your Profile
                                </h4>
                                <p style={{ fontSize: "14px", lineHeight: 1.5, color: "#c2c6d6", margin: 0 }}>
                                    Showcase your skills and experience to get recruited for top missions.
                                </p>
                            </div>

                            <Link href="/dashboard/profile" style={{ textDecoration: "none" }}>
                                <div style={{
                                    marginTop: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#d0bcff",
                                    fontWeight: 700,
                                }}>
                                    <span style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "12px",
                                        letterSpacing: "0.1em",
                                    }}>
                                        Update Skills
                                    </span>
                                    <Edit size={14} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* ── COLLABORATION quote card (8 cols) ── */}
                    <div style={{ gridColumn: "span 8", minHeight: "200px" }}>
                        <div style={{
                            height: "100%",
                            padding: "32px",
                            borderRadius: "12px",
                            background: "rgba(15, 23, 42, 0.5)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            border: "2px dashed rgba(66,71,84,0.35)",
                            display: "flex",
                            alignItems: "center",
                            gap: "32px",
                        }}>
                            <div>
                                <h4 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "20px",
                                    fontWeight: 500,
                                    color: "#c2c6d6",
                                    marginBottom: "8px",
                                    marginTop: 0,
                                }}>
                                    Collaboration is the Core
                                </h4>
                                <p style={{
                                    fontSize: "14px",
                                    lineHeight: 1.6,
                                    color: "rgba(194,198,214,0.7)",
                                    fontStyle: "italic",
                                    margin: 0,
                                }}>
                                    &quot;The best software isn&apos;t built alone. It&apos;s forged in the fires of
                                    collective intelligence and diverse perspective.&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ─────────────── TIPS + COMMUNITY ─────────────── */}
            <section style={{ padding: "0 48px", marginBottom: "80px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>

                    {/* Quick Tips */}
                    <div>
                        <h3 style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#d0bcff",
                            marginBottom: "24px",
                            marginTop: 0,
                        }}>
                            Quick Tips
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {[
                                {
                                    icon: <Lightbulb size={20} color="#adc6ff" />,
                                    bg: "rgba(173,198,255,0.06)",
                                    title: "Optimize your tech stack",
                                    body: "Tags help the algorithm match you with relevant projects.",
                                },
                                {
                                    icon: <Users size={20} color="#4cd7f6" />,
                                    bg: "rgba(76,215,246,0.06)",
                                    title: "Engage in Community",
                                    body: "Join the #general channel to introduce yourself to other devs.",
                                },
                            ].map(({ icon, bg, title, body }) => (
                                <div key={title} style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "16px",
                                    padding: "16px",
                                    borderRadius: "8px",
                                    background: "rgba(19,27,46,0.5)",
                                    border: "1px solid rgba(66,71,84,0.12)",
                                }}>
                                    <span style={{
                                        padding: "8px",
                                        borderRadius: "50%",
                                        background: bg,
                                        flexShrink: 0,
                                        display: "flex",
                                    }}>
                                        {icon}
                                    </span>
                                    <div>
                                        <p style={{ fontWeight: 700, color: "#dae2fd", marginBottom: "4px", marginTop: 0 }}>
                                            {title}
                                        </p>
                                        <p style={{ fontSize: "14px", color: "#c2c6d6", margin: 0 }}>{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Community Highlights */}
                    <div>
                        <h3 style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#adc6ff",
                            marginBottom: "24px",
                            marginTop: 0,
                        }}>
                            Community Highlights
                        </h3>
                        <div style={{
                            borderRadius: "12px",
                            padding: "24px",
                            background: "rgba(15,23,42,0.65)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(173,198,255,0.1)",
                            position: "relative",
                            overflow: "hidden",
                        }}>
                            <div style={{
                                position: "absolute", top: "-40px", right: "-40px",
                                width: "128px", height: "128px",
                                background: "rgba(173,198,255,0.15)",
                                filter: "blur(48px)",
                                borderRadius: "50%",
                                pointerEvents: "none",
                            }} />
                            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                                <div style={{
                                    width: "40px", height: "40px",
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    border: "1px solid rgba(173,198,255,0.3)",
                                    background: "rgba(173,198,255,0.2)",
                                    color: "#adc6ff",
                                }}>
                                    S
                                </div>
                                <div>
                                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#dae2fd", margin: "0 0 2px 0" }}>
                                        Sarah just launched{" "}
                                        <span style={{ color: "#adc6ff" }}>&quot;NeuralFlow AI&quot;</span>
                                    </p>
                                    <p style={{ fontSize: "11px", color: "#c2c6d6", margin: 0 }}>
                                        Looking for: Rust Developers, UX Designers
                                    </p>
                                </div>
                            </div>
                            <button
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    color: "#adc6ff",
                                    border: "1px solid rgba(173,198,255,0.3)",
                                    background: "transparent",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(173,198,255,0.1)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                                View Mission Details
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* ─────────────── FOOTER ─────────────── */}
            <footer style={{
                borderTop: "1px solid rgba(66,71,84,0.2)",
                background: "#060e20",
                padding: "48px 24px",
            }}>
                <div style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                }}>
                    <div>
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "32px",
                            fontWeight: 600,
                            color: "#adc6ff",
                            marginBottom: "8px",
                            marginTop: 0,
                        }}>
                            DevMatch
                        </h2>
                        <p style={{ fontSize: "14px", color: "#c2c6d6", margin: 0 }}>
                            © 2024 DevMatch.<br />Engineering the Future.
                        </p>
                    </div>

                    {[
                        { title: "Product", links: ["About", "Docs"] },
                        { title: "Legal", links: ["Privacy", "Terms"] },
                    ].map(({ title, links }) => (
                        <div key={title} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <h4 style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "12px",
                                letterSpacing: "0.1em",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                color: "#dae2fd",
                                marginBottom: "8px",
                                marginTop: 0,
                            }}>
                                {title}
                            </h4>
                            {links.map(l => (
                                <a
                                    key={l}
                                    href="#"
                                    style={{ fontSize: "14px", color: "#c2c6d6", textDecoration: "none", transition: "color 0.2s" }}
                                    onMouseEnter={e => e.currentTarget.style.color = "#d0bcff"}
                                    onMouseLeave={e => e.currentTarget.style.color = "#c2c6d6"}
                                >
                                    {l}
                                </a>
                            ))}
                        </div>
                    ))}

                    <div>
                        <h4 style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            letterSpacing: "0.1em",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: "#dae2fd",
                            marginBottom: "16px",
                            marginTop: 0,
                        }}>
                            Social
                        </h4>
                        <div style={{ display: "flex", gap: "16px" }}>
                            {["facebook", "LinkedIn", "Twitter"].map(s => (
                                <span
                                    key={s}
                                    style={{ fontSize: "14px", color: "#c2c6d6", cursor: "pointer", transition: "color 0.2s" }}
                                    onMouseEnter={e => e.currentTarget.style.color = "#adc6ff"}
                                    onMouseLeave={e => e.currentTarget.style.color = "#c2c6d6"}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </footer >

        </div >
    );
}