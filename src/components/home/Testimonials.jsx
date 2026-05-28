"use client";

import { motion } from "framer-motion";

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

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function TestimonialsSection() {
    return (
        <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.01)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 32, fontWeight: 700, color: "#fff",
                        textAlign: "center", marginBottom: 48,
                    }}
                >
                    Success Stories
                </motion.h2>

                {/* Cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
                >
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.name}
                            variants={cardVariant}
                            whileHover={{
                                y: -6,
                                borderColor: `${t.color}40`,
                                boxShadow: `0 24px 48px ${t.color}12`,
                                transition: { duration: 0.2 },
                            }}
                            style={{
                                background: "#0a0e1e",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 16, padding: 32,
                                position: "relative", cursor: "default",
                            }}
                        >
                            {/* Animated quote mark */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                style={{
                                    fontSize: 60, fontFamily: "Georgia, serif",
                                    color: `${t.color}40`,
                                    position: "absolute", top: 16, left: 24,
                                    lineHeight: 1,
                                }}
                            >
                                &ldquo;
                            </motion.div>

                            <p style={{
                                fontSize: 14, color: "rgba(255,255,255,0.65)",
                                lineHeight: 1.75, marginBottom: 28,
                                marginTop: 20,
                            }}>
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Avatar + name */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <motion.div
                                    whileHover={{ scale: 1.12 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    style={{
                                        width: 36, height: 36, borderRadius: "50%",
                                        background: `${t.color}20`, border: `1.5px solid ${t.color}50`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 12, fontWeight: 700, color: t.color,
                                        flexShrink: 0,
                                    }}
                                >
                                    {t.initials}
                                </motion.div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}