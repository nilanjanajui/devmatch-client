"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const CATEGORIES = ["Web Systems", "Mobile / Native", "AI & ML Research", "Cybersecurity", "DevOps & Infrastructure"];
const LEVELS = ["Beginner", "Intermediate", "Hard", "Expert"];
const STACKS = ["Rust", "TypeScript", "Go", "Python", "Docker", "React", "Next.js", "PostgreSQL"];

const sectionVariant = {
    hidden: { opacity: 0, x: -16 },
    show: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" } }),
};

export default function FilterSidebar({ filters, onChange, onReset }) {

    const toggle = (key, value) => {
        const list = filters[key];
        onChange({
            ...filters,
            [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
        });
    };

    return (
        <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                width: 230, flexShrink: 0,
                background: "rgba(10,14,30,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, padding: "20px",
                height: "fit-content",
                position: "sticky", top: 84,
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.38)" }}>
                    FILTERS
                </span>
                <motion.button
                    onClick={onReset}
                    whileHover={{ color: "#60A5FA" }} whileTap={{ scale: 0.95 }}
                    style={{ fontSize: 11, fontWeight: 600, color: "#3B82F6", background: "none", border: "none", cursor: "pointer" }}
                >
                    RESET ALL
                </motion.button>
            </div>

            {/* ── Category ── */}
            <motion.div custom={0} variants={sectionVariant} initial="hidden" animate="show" style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Category</div>
                {CATEGORIES.map((cat) => {
                    const active = filters.categories.includes(cat);
                    return (
                        <motion.div
                            key={cat}
                            onClick={() => toggle("categories", cat)}
                            whileTap={{ scale: 0.98 }}
                            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, cursor: "pointer" }}
                        >
                            <motion.div
                                animate={{
                                    background: active ? "#3B82F6" : "transparent",
                                    borderColor: active ? "#3B82F6" : "rgba(255,255,255,0.2)",
                                }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                                    border: "1.5px solid",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}
                            >
                                {active && <span style={{ fontSize: 10, color: "#fff", lineHeight: 1 }}>✓</span>}
                            </motion.div>
                            <span style={{ fontSize: 13, color: active ? "#fff" : "rgba(255,255,255,0.58)", transition: "color 0.15s" }}>
                                {cat}
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 22 }} />

            {/* ── Experience Level ── */}
            <motion.div custom={1} variants={sectionVariant} initial="hidden" animate="show" style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Experience Level</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {LEVELS.map((level) => {
                        const active = filters.levels.includes(level);
                        return (
                            <motion.button
                                key={level}
                                onClick={() => toggle("levels", level)}
                                whileTap={{ scale: 0.93 }}
                                animate={{
                                    background: active ? "#3B82F6" : "rgba(255,255,255,0.05)",
                                    borderColor: active ? "#3B82F6" : "rgba(255,255,255,0.12)",
                                    color: active ? "#fff" : "rgba(255,255,255,0.5)",
                                }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    padding: "5px 11px", borderRadius: 20, fontSize: 10,
                                    fontWeight: 700, letterSpacing: "0.06em",
                                    cursor: "pointer", border: "1px solid",
                                }}
                            >
                                {level.toUpperCase()}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 22 }} />

            {/* ── Team Size ── */}
            <motion.div custom={2} variants={sectionVariant} initial="hidden" animate="show" style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Team Size</div>
                <input
                    type="range" min={1} max={10} value={filters.teamSize}
                    onChange={(e) => onChange({ ...filters, teamSize: Number(e.target.value) })}
                    style={{ width: "100%", accentColor: "#3B82F6", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.32)" }}>1 DEV</span>
                    <span style={{ fontSize: 10, color: "#06B6D4", fontWeight: 600 }}>{filters.teamSize} DEV{filters.teamSize > 1 ? "S" : ""}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.32)" }}>10+ DEVS</span>
                </div>
            </motion.div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 22 }} />

            {/* ── Tech Stack ── */}
            <motion.div custom={3} variants={sectionVariant} initial="hidden" animate="show" style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Tech Stack</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {STACKS.map((stack) => {
                        const active = filters.stacks.includes(stack);
                        return (
                            <motion.button
                                key={stack}
                                onClick={() => toggle("stacks", stack)}
                                whileTap={{ scale: 0.93 }}
                                animate={{
                                    background: active ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.04)",
                                    borderColor: active ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.1)",
                                    color: active ? "#06B6D4" : "rgba(255,255,255,0.45)",
                                }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    padding: "4px 10px", borderRadius: 6,
                                    fontSize: 11, fontWeight: 600,
                                    cursor: "pointer", border: "1px solid",
                                }}
                            >
                                {stack}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* ── Need a Team CTA ── */}
            <motion.div
                custom={4} variants={sectionVariant} initial="hidden" animate="show"
                style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 12, padding: "16px",
                }}
            >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Need a Team?</div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", lineHeight: 1.65, marginBottom: 12 }}>
                    Get matched with engineers based on your Git history.
                </p>
                <motion.button
                    whileHover={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                        width: "100%", padding: "8px 0",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        borderRadius: 8, fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.1em", color: "#fff", cursor: "pointer",
                    }}
                >
                    SYNC GITHUB
                </motion.button>
            </motion.div>
        </motion.aside>
    );
}