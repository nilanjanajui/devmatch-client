"use client";

import { motion } from "framer-motion";

const categories = [
    { icon: "⬜", label: "Frontend", desc: "React, Vue, WebGL, Experts", color: "#3B82F6" },
    { icon: "🗄️", label: "Backend", desc: "Go, Node.js, Systems Arch", color: "#8B5CF6" },
    { icon: "🤖", label: "AI / ML", desc: "PyTorch, LLMs, Computer Vision", color: "#06B6D4" },
    { icon: "⚙️", label: "DevOps", desc: "AWS, Kubernetes, CI/CD", color: "#F59E0B" },
    { icon: "🎨", label: "UI / UX", desc: "Figma, Prototyping, Design Sys", color: "#EC4899" },
];

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TalentSection() {
    return (
        <section style={{ padding: "80px 24px" }}>
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
                    Top Specialized Talent
                </motion.h2>

                {/* Cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}
                >
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.label}
                            variants={cardVariant}
                            whileHover={{
                                y: -8,
                                borderColor: `${cat.color}60`,
                                boxShadow: `0 20px 40px ${cat.color}18`,
                                transition: { duration: 0.2 },
                            }}
                            style={{
                                background: "#0a0e1e",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 14, padding: "28px 16px",
                                textAlign: "center", cursor: "pointer",
                            }}
                        >
                            {/* Icon box */}
                            <motion.div
                                whileHover={{ scale: 1.15, rotate: 6 }}
                                transition={{ type: "spring", stiffness: 280, damping: 14 }}
                                style={{
                                    width: 48, height: 48, borderRadius: 12, margin: "0 auto 16px",
                                    background: `${cat.color}15`, border: `1.5px solid ${cat.color}35`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 22,
                                }}
                            >
                                {cat.icon}
                            </motion.div>

                            <div style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6,
                            }}>
                                {cat.label}
                            </div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                                {cat.desc}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}