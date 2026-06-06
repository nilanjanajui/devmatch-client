"use client";
import { motion } from "framer-motion";

const CATEGORIES = ["Trending", "Discussion", "Showcase", "Collab Requests"];
const LEVELS = ["Beginner", "Professional", "Expert"];
const STACKS = ["Rust", "TypeScript", "Go", "Python", "React", "Node.js", "Wasm", "AI"];

const sectionAnim = {
    hidden: { opacity: 0, x: -16 },
    show: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.07 } }),
};

export default function CommunityFilterSidebar({ filters, onChange, onReset }) {
    const toggle = (key, val) => {
        const list = filters[key] ?? [];
        onChange({ ...filters, [key]: list.includes(val) ? list.filter((v) => v !== val) : [...list, val] });
    };

    return (
        <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                width: 230, flexShrink: 0,
                background: "rgba(10,14,30,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, padding: "20px",
                position: "sticky", top: 84,
                height: "fit-content",
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.38)" }}>FILTERS</span>
                <motion.button
                    onClick={onReset}
                    whileHover={{ color: "#60A5FA" }} whileTap={{ scale: 0.95 }}
                    style={{ fontSize: 11, fontWeight: 600, color: "#3B82F6", background: "none", border: "none", cursor: "pointer" }}
                >
                    RESET ALL
                </motion.button>
            </div>

            {/* Category */}
            <motion.div custom={0} variants={sectionAnim} initial="hidden" animate="show" style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Category</div>
                {CATEGORIES.map((cat) => {
                    const active = (filters.categories ?? []).includes(cat);
                    return (
                        <motion.div key={cat} onClick={() => toggle("categories", cat)} whileTap={{ scale: 0.98 }}
                            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, cursor: "pointer" }}
                        >
                            <motion.div
                                animate={{ background: active ? "#3B82F6" : "transparent", borderColor: active ? "#3B82F6" : "rgba(255,255,255,0.2)" }}
                                transition={{ duration: 0.15 }}
                                style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, border: "1.5px solid", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                {active && <span style={{ fontSize: 10, color: "#fff", lineHeight: 1 }}>✓</span>}
                            </motion.div>
                            <span style={{ fontSize: 13, color: active ? "#fff" : "rgba(255,255,255,0.58)", transition: "color 0.15s" }}>{cat}</span>
                        </motion.div>
                    );
                })}
            </motion.div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 22 }} />

            {/* Experience Level */}
            <motion.div custom={1} variants={sectionAnim} initial="hidden" animate="show" style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Experience Level</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {LEVELS.map((lv) => {
                        const active = (filters.levels ?? []).includes(lv);
                        return (
                            <motion.button key={lv} onClick={() => toggle("levels", lv)} whileTap={{ scale: 0.93 }}
                                animate={{ background: active ? "#3B82F6" : "rgba(255,255,255,0.05)", borderColor: active ? "#3B82F6" : "rgba(255,255,255,0.12)", color: active ? "#fff" : "rgba(255,255,255,0.5)" }}
                                transition={{ duration: 0.15 }}
                                style={{ padding: "5px 11px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer", border: "1px solid" }}
                            >
                                {lv.toUpperCase()}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 22 }} />

            {/* Tech Stack */}
            <motion.div custom={2} variants={sectionAnim} initial="hidden" animate="show" style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Tech Stack</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {STACKS.map((s) => {
                        const active = (filters.stacks ?? []).includes(s);
                        return (
                            <motion.button key={s} onClick={() => toggle("stacks", s)} whileTap={{ scale: 0.93 }}
                                animate={{ background: active ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.04)", borderColor: active ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.1)", color: active ? "#06B6D4" : "rgba(255,255,255,0.45)" }}
                                transition={{ duration: 0.15 }}
                                style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "1px solid" }}
                            >
                                {s}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Have a Build? CTA */}
            <motion.div custom={3} variants={sectionAnim} initial="hidden" animate="show"
                style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 12, padding: "18px 16px" }}
            >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Have a Build?</div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.65, marginBottom: 14 }}>
                    Share your progress and get feedback from the elite community.
                </p>
                <motion.button
                    whileHover={{ background: "rgba(59,130,246,0.22)", borderColor: "rgba(59,130,246,0.5)" }} whileTap={{ scale: 0.97 }}
                    style={{ width: "100%", padding: "9px 0", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#fff", cursor: "pointer" }}
                >
                    CREATE POST
                </motion.button>
            </motion.div>
        </motion.aside>
    );
}