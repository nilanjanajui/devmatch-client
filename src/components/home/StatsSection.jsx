"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { label: "THOUSAND DEVELOPERS", num: 25, suffix: "k" },
    { label: "ACTIVE PROJECTS",     num: 12, suffix: "k" },
    { label: "TEAMS FORMED",        num: 850, suffix: "+" },
    { label: "SUCCESS RATE %",      num: 95, suffix: "k" },
];

function CountUp({ target, suffix, trigger }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!trigger) return;
        let val = 0;
        const steps = 1800 / 16;
        const inc = target / steps;
        const timer = setInterval(() => {
            val += inc;
            if (val >= target) { setDisplay(target); clearInterval(timer); }
            else setDisplay(Math.floor(val));
        }, 16);
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
            }}>
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                        style={{
                            textAlign: "center", padding: "12px 0",
                            position: "relative",  /* ← fix: needed for divider */
                            borderLeft: i !== 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        }}
                    >
                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 44, fontWeight: 700,
                            background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginBottom: 8, lineHeight: 1,
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