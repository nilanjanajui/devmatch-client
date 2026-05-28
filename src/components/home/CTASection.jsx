"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    style={{
                        background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.12) 100%)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        borderRadius: 24, padding: "80px 40px",
                        textAlign: "center", position: "relative", overflow: "hidden",
                    }}
                >
                    {/* Ambient glow — pulses slowly */}
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 600, height: 300,
                            background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.15 }}
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 44, fontWeight: 700, color: "#fff",
                            marginBottom: 16, position: "relative",
                        }}
                    >
                        Ready to Build the Future?
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        style={{
                            fontSize: 16, color: "rgba(255,255,255,0.55)",
                            marginBottom: 40, position: "relative",
                        }}
                    >
                        Join over 25,000 developers building the next generation of software.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        style={{ display: "flex", justifyContent: "center", gap: 16, position: "relative" }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(255,255,255,0.25)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link href="/register" style={{
                                display: "block",
                                padding: "14px 32px", borderRadius: 10,
                                background: "#fff", color: "#0a0e1e",
                                textDecoration: "none", fontSize: 15, fontWeight: 700,
                                boxShadow: "0 4px 24px rgba(255,255,255,0.2)",
                            }}>
                                Join DevMatch Now
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link href="/explore" style={{
                                display: "block",
                                padding: "14px 32px", borderRadius: 10,
                                border: "1.5px solid rgba(255,255,255,0.25)",
                                color: "#fff", textDecoration: "none",
                                fontSize: 15, fontWeight: 600,
                                background: "rgba(255,255,255,0.04)",
                            }}>
                                View Open Teams
                            </Link>
                        </motion.div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}