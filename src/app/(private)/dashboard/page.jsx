"use client";

import Link from "next/link";
import {
    FolderPlus, Compass, BadgeCheck,
    ArrowRight, ExternalLink, Edit, Lightbulb, Users,
} from "lucide-react";

// ── swap this import path to match your auth context ──
import { useAuth } from "@/context/AuthContext";

export default function DashboardOverview() {
    const { user } = useAuth();
    const firstName =
        user?.displayName?.split(" ")[0] ||
        user?.email?.split("@")[0] ||
        "Developer";

    return (
        <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* ── Hero ── */}
            <section className="relative pt-24 pb-16 px-12 overflow-hidden">
                {/* ambient glows */}
                <div
                    className="absolute top-0 right-0 rounded-full pointer-events-none"
                    style={{
                        width: 500, height: 500,
                        background: "rgba(173, 198, 255, 0.1)",
                        filter: "blur(120px)",
                        marginRight: -256, marginTop: -256,
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 rounded-full pointer-events-none"
                    style={{
                        width: 300, height: 300,
                        background: "rgba(76, 215, 246, 0.05)",
                        filter: "blur(80px)",
                        marginLeft: -128, marginBottom: -128,
                    }}
                />

                <div className="relative z-10 max-w-4xl">
                    <h2
                        className="mb-4 font-bold"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "48px",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            color: "#dae2fd",
                        }}
                    >
                        Welcome to the Hub,{" "}
                        <span style={{ color: "#adc6ff" }}>{firstName}.</span>
                    </h2>
                    <p
                        style={{
                            fontSize: "18px",
                            lineHeight: 1.6,
                            color: "rgba(194, 198, 214, 0.8)",
                            maxWidth: 672,
                        }}
                    >
                        Your journey as a developer collaborator starts here. Let's build
                        something incredible. Connect with elite engineers, join
                        cutting-edge missions, and manifest your code into reality.
                    </p>
                </div>
            </section>

            {/* ── Bento Grid ── */}
            <section className="px-12 mb-16">
                <h3
                    className="mb-6 uppercase"
                    style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        letterSpacing: "0.2em",
                        fontWeight: 600,
                        color: "#adc6ff",
                    }}
                >
                    Initialize Your Journey
                </h3>

                <div className="grid grid-cols-12 gap-4">

                    {/* ── Large "Create" card ── */}
                    <div className="col-span-8 group">
                        <div
                            className="glass-card neon-glow-primary shimmer-border h-full p-8 rounded-xl flex flex-col justify-between transition-all duration-500 cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <div
                                    className="p-4 rounded-xl"
                                    style={{
                                        background: "rgba(173, 198, 255, 0.1)",
                                        border: "1px solid rgba(173, 198, 255, 0.2)",
                                    }}
                                >
                                    <FolderPlus size={36} style={{ color: "#adc6ff" }} />
                                </div>
                                <span
                                    className="py-1 px-3 rounded-full"
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "10px",
                                        letterSpacing: "0.1em",
                                        fontWeight: 600,
                                        background: "rgba(173, 198, 255, 0.2)",
                                        color: "#adc6ff",
                                    }}
                                >
                                    RECOMMENDED
                                </span>
                            </div>

                            <div className="mt-12">
                                <h4
                                    className="mb-3"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "32px",
                                        fontWeight: 600,
                                        lineHeight: 1.2,
                                        color: "#dae2fd",
                                    }}
                                >
                                    Create Your First Project
                                </h4>
                                <p style={{ color: "#c2c6d6", maxWidth: 448, fontSize: "16px", lineHeight: 1.5 }}>
                                    Launch your own vision and recruit the best talent on DevMatch.
                                    Set your stack, define your goals, and start building.
                                </p>
                            </div>

                            <Link href="/dashboard/projects/create">
                                <div
                                    className="mt-8 flex items-center gap-2 font-bold group-hover:gap-4 transition-all"
                                    style={{ color: "#adc6ff" }}
                                >
                                    <span>Get Started</span>
                                    <ArrowRight size={18} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* ── Explore Missions card ── */}
                    <div className="col-span-4 group">
                        <div className="glass-card neon-glow-tertiary h-full p-8 rounded-xl flex flex-col justify-between transition-all duration-500 cursor-pointer">
                            <div
                                className="p-4 rounded-xl w-fit"
                                style={{
                                    background: "rgba(76, 215, 246, 0.1)",
                                    border: "1px solid rgba(76, 215, 246, 0.2)",
                                }}
                            >
                                <Compass size={28} style={{ color: "#4cd7f6" }} />
                            </div>

                            <div>
                                <h4
                                    className="mb-2"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "20px",
                                        fontWeight: 500,
                                        color: "#dae2fd",
                                    }}
                                >
                                    Explore Active Missions
                                </h4>
                                <p style={{ color: "#c2c6d6", fontSize: "14px", lineHeight: 1.5 }}>
                                    Find projects that match your tech stack and join existing teams.
                                </p>
                            </div>

                            <Link href="/projects">
                                <div
                                    className="mt-6 flex items-center gap-2 font-bold group-hover:gap-4 transition-all"
                                    style={{ color: "#4cd7f6" }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: "12px",
                                            letterSpacing: "0.1em",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Find Projects
                                    </span>
                                    <ExternalLink size={14} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* ── Complete Profile card ── */}
                    <div className="col-span-4 group">
                        <div className="glass-card neon-glow-primary h-full p-8 rounded-xl flex flex-col justify-between transition-all duration-500 cursor-pointer">
                            <div
                                className="p-4 rounded-xl w-fit"
                                style={{
                                    background: "rgba(208, 188, 255, 0.1)",
                                    border: "1px solid rgba(208, 188, 255, 0.2)",
                                }}
                            >
                                <BadgeCheck size={28} style={{ color: "#d0bcff" }} />
                            </div>

                            <div>
                                <h4
                                    className="mb-2"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "20px",
                                        fontWeight: 500,
                                        color: "#dae2fd",
                                    }}
                                >
                                    Complete Your Profile
                                </h4>
                                <p style={{ color: "#c2c6d6", fontSize: "14px", lineHeight: 1.5 }}>
                                    Showcase your skills and experience to get recruited for top missions.
                                </p>
                            </div>

                            <Link href="/dashboard/profile">
                                <div
                                    className="mt-6 flex items-center gap-2 font-bold group-hover:gap-4 transition-all"
                                    style={{ color: "#d0bcff" }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: "12px",
                                            letterSpacing: "0.1em",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Update Skills
                                    </span>
                                    <Edit size={14} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* ── Collaboration quote card ── */}
                    <div className="col-span-8">
                        <div
                            className="glass-card h-full p-8 rounded-xl flex items-center gap-8"
                            style={{
                                borderStyle: "dashed",
                                borderWidth: "2px",
                                borderColor: "rgba(66, 71, 84, 0.3)",
                            }}
                        >
                            <div className="flex-1">
                                <h4
                                    className="mb-2"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "20px",
                                        fontWeight: 500,
                                        color: "#c2c6d6",
                                    }}
                                >
                                    Collaboration is the Core
                                </h4>
                                <p className="italic" style={{ color: "rgba(194, 198, 214, 0.7)", fontSize: "14px" }}>
                                    "The best software isn't built alone. It's forged in the fires of
                                    collective intelligence and diverse perspective."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── Quick Tips + Community ── */}
            <section className="px-12 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Tips */}
                    <div>
                        <h3
                            className="mb-6 uppercase"
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "12px",
                                letterSpacing: "0.2em",
                                fontWeight: 600,
                                color: "#d0bcff",
                            }}
                        >
                            Quick Tips
                        </h3>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: <Lightbulb size={20} style={{ color: "#adc6ff" }} />,
                                    iconBg: "rgba(173, 198, 255, 0.05)",
                                    title: "Optimize your tech stack",
                                    body: "Tags help the algorithm match you with relevant projects.",
                                },
                                {
                                    icon: <Users size={20} style={{ color: "#4cd7f6" }} />,
                                    iconBg: "rgba(76, 215, 246, 0.05)",
                                    title: "Engage in Community",
                                    body: "Join the #general channel to introduce yourself to other devs.",
                                },
                            ].map(({ icon, iconBg, title, body }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-4 p-4 rounded-lg"
                                    style={{
                                        background: "rgba(19, 27, 46, 0.4)",
                                        border: "1px solid rgba(66, 71, 84, 0.1)",
                                    }}
                                >
                                    <span className="p-2 rounded-full shrink-0" style={{ background: iconBg }}>
                                        {icon}
                                    </span>
                                    <div>
                                        <p className="font-bold" style={{ color: "#dae2fd" }}>{title}</p>
                                        <p style={{ color: "#c2c6d6", fontSize: "14px" }}>{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Community Highlights */}
                    <div>
                        <h3
                            className="mb-6 uppercase"
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "12px",
                                letterSpacing: "0.2em",
                                fontWeight: 600,
                                color: "#adc6ff",
                            }}
                        >
                            Community Highlights
                        </h3>
                        <div className="glass-card rounded-xl p-6 relative overflow-hidden">
                            <div
                                className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none rounded-full"
                                style={{ background: "rgba(173, 198, 255, 0.2)", filter: "blur(48px)" }}
                            />
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-sm"
                                    style={{
                                        border: "1px solid rgba(173, 198, 255, 0.3)",
                                        background: "rgba(173, 198, 255, 0.2)",
                                        color: "#adc6ff",
                                    }}
                                >
                                    S
                                </div>
                                <div>
                                    <p className="text-sm font-bold" style={{ color: "#dae2fd" }}>
                                        Sarah just launched{" "}
                                        <span style={{ color: "#adc6ff" }}>"NeuralFlow AI"</span>
                                    </p>
                                    <p style={{ fontSize: "11px", color: "#c2c6d6" }}>
                                        Looking for: Rust Developers, UX Designers
                                    </p>
                                </div>
                            </div>
                            <button
                                className="text-xs font-semibold px-4 py-2 rounded transition-colors"
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: "#adc6ff",
                                    border: "1px solid rgba(173, 198, 255, 0.3)",
                                    background: "transparent",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(173, 198, 255, 0.1)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                View Mission Details
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── Footer ── */}
            <footer
                className="mt-auto py-12"
                style={{
                    borderTop: "1px solid rgba(66, 71, 84, 0.2)",
                    background: "#060e20",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <h2
                            className="mb-2"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "32px",
                                fontWeight: 600,
                                color: "#adc6ff",
                            }}
                        >
                            DevMatch
                        </h2>
                        <p style={{ fontSize: "14px", color: "#c2c6d6" }}>
                            © 2024 DevMatch. Engineering the Future.
                        </p>
                    </div>
                    {[
                        { title: "Product", links: ["About", "Docs"] },
                        { title: "Legal", links: ["Privacy", "Terms"] },
                    ].map(({ title, links }) => (
                        <div key={title} className="flex flex-col gap-2">
                            <h4
                                className="font-bold mb-2 uppercase"
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "12px",
                                    letterSpacing: "0.1em",
                                    color: "#dae2fd",
                                }}
                            >
                                {title}
                            </h4>
                            {links.map((l) => (
                                <a
                                    key={l}
                                    href="#"
                                    className="transition-colors"
                                    style={{ fontSize: "14px", color: "#c2c6d6" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d0bcff")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#c2c6d6")}
                                >
                                    {l}
                                </a>
                            ))}
                        </div>
                    ))}
                    <div className="flex flex-col gap-2">
                        <h4
                            className="font-bold mb-2 uppercase"
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "12px",
                                letterSpacing: "0.1em",
                                color: "#dae2fd",
                            }}
                        >
                            Social
                        </h4>
                        <div className="flex gap-4" style={{ color: "#c2c6d6", fontSize: "14px" }}>
                            <span className="cursor-pointer hover:text-[#adc6ff] transition-colors">GH</span>
                            <span className="cursor-pointer hover:text-[#adc6ff] transition-colors">LI</span>
                            <span className="cursor-pointer hover:text-[#adc6ff] transition-colors">X</span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}