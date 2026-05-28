"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: "25k", label: "THOUSAND DEVELOPERS", num: 25, suffix: "k" },
    { value: "12k", label: "ACTIVE PROJECTS", num: 12, suffix: "k" },
    { value: "850+", label: "TEAMS FORMED", num: 850, suffix: "+" },
    { value: "95k", label: "SUCCESS RATE %", num: 95, suffix: "k" },
];

// Counts up from 0 to target once triggered
function CountUp({ target, suffix, trigger }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const duration = 1800;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setDisplay(target);
                clearInterval(timer);
            } else {
                setDisplay(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [trigger, target]);

    return <>{display}{suffix}</>;
}

export default function StatsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });

    return (
        <section
            ref={ref}
            style={{
                padding: "64px 24px",
                background: "rgba(255,255,255,0.01)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <div style={{
                maxWidth: 1200, margin: "0 auto",
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
            }}>
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                        style={{ textAlign: "center", padding: "12px 0" }}
                    >
                        {/* Divider line that grows in */}
                        {i !== 0 && (
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={inView ? { scaleY: 1 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                style={{
                                    position: "absolute",
                                    left: 0, top: "20%", height: "60%", width: 1,
                                    background: "rgba(255,255,255,0.06)",
                                    transformOrigin: "top",
                                }}
                            />
                        )}

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
                            <CountUp target={s.num} suffix={s.suffix} trigger={inView} />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.1 + 0.4 }}
                            style={{
                                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                                color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
                            }}
                        >
                            {s.label}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}