"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Clock } from "lucide-react";
import axiosInstance from "@/lib/axios";

const BADGE = {
    "Project Launch": { label: "PROJECT LAUNCH", bg: "rgba(59,130,246,0.85)", border: "rgba(59,130,246,0.4)" },
    "Collab Request": { label: "SEEKING COLLAB", bg: "rgba(139,92,246,0.85)", border: "rgba(139,92,246,0.4)" },
    "Discussion": { label: "HOT DEBATE", bg: "rgba(249,115,22,0.85)", border: "rgba(249,115,22,0.4)" },
    "Showcase": { label: "SHOWCASE", bg: "rgba(16,185,129,0.85)", border: "rgba(16,185,129,0.4)" },
};

const ACTION = {
    "Project Launch": "READ DISCUSSION",
    "Collab Request": "APPLY TO COLLAB",
    "Discussion": "JOIN DEBATE",
    "Showcase": "VIEW SHOWCASE",
};

const STACK_COLOR = {
    React: { bg: "rgba(97,218,251,0.12)", color: "#61DAFB" },
    Rust: { bg: "rgba(240,147,43,0.12)", color: "#F0932B" },
    Wasm: { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
    Go: { bg: "rgba(0,212,255,0.12)", color: "#00D4FF" },
    Python: { bg: "rgba(255,212,59,0.12)", color: "#FFD43B" },
    TypeScript: { bg: "rgba(49,120,198,0.15)", color: "#3178C6" },
    "Node.js": { bg: "rgba(68,189,50,0.12)", color: "#44BD32" },
    gRPC: { bg: "rgba(59,130,246,0.12)", color: "#3B82F6" },
    AI: { bg: "rgba(139,92,246,0.12)", color: "#8B5CF6" },
    LLM: { bg: "rgba(59,130,246,0.12)", color: "#3B82F6" },
    Bun: { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" },
    DevOps: { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" },
    API: { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" },
};

function timeAgo(date) {
    const s = (Date.now() - new Date(date)) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)} min ago`;
    if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
    return `${Math.floor(s / 86400)}d ago`;
}

export default function PostCard({ post, index }) {
    const [likes, setLikes] = useState(post.likes ?? 0);
    const [liked, setLiked] = useState(false);

    const badge = BADGE[post.type] ?? BADGE["Discussion"];
    const action = ACTION[post.type] ?? "VIEW POST";
    const fallback = `https://placehold.co/600x280/0b1326/3B82F6?text=${encodeURIComponent(post.type ?? "Post")}`;

    const handleLike = async (e) => {
        e.stopPropagation();
        if (liked) return;
        setLiked(true);
        setLikes((n) => n + 1);
        try { await axiosInstance.patch(`/posts/${post._id}/like`); } catch { /* optimistic */ }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
            whileHover={{ y: -4, boxShadow: "0 20px 56px rgba(0,0,0,0.45)" }}
            style={{
                background: "rgba(10,14,30,0.92)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, overflow: "hidden",
                display: "flex", flexDirection: "column",
                transition: "box-shadow 0.25s",
            }}
        >
            {/* Banner */}
            <div style={{ position: "relative", height: 200, flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.image || fallback}
                    alt={post.title}
                    onError={(e) => { e.target.src = fallback; }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,14,30,0.65) 0%, transparent 60%)" }} />
                <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: badge.bg, backdropFilter: "blur(8px)",
                    border: `1px solid ${badge.border}`,
                    borderRadius: 6, padding: "3px 9px",
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#fff",
                }}>
                    {badge.label}
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>

                {/* Stack tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    {(post.techStack ?? []).slice(0, 4).map((s) => {
                        const sc = STACK_COLOR[s] ?? { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" };
                        return (
                            <span key={s} style={{
                                padding: "3px 8px", borderRadius: 5,
                                background: sc.bg, color: sc.color,
                                fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
                            }}>
                                {s.toUpperCase()}
                            </span>
                        );
                    })}
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: 16, fontWeight: 700, color: "#fff",
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1.35, marginBottom: 8,
                }}>
                    {post.title}
                </h3>

                {/* Content preview */}
                <p style={{
                    fontSize: 13, color: "rgba(255,255,255,0.48)",
                    lineHeight: 1.65, marginBottom: 16, flex: 1,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                    {post.content}
                </p>

                {/* Author row */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    {post.authorAvatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.authorAvatar} alt={post.authorName} referrerPolicy="no-referrer"
                            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(255,255,255,0.12)", flexShrink: 0 }}
                        />
                    ) : (
                        <div style={{
                            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, fontWeight: 700, color: "#fff",
                        }}>
                            {(post.authorName ?? "?").charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {post.authorName}
                        </p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                            <Clock size={10} />{timeAgo(post.createdAt)}
                        </p>
                    </div>

                    {/* Likes + Comments */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                        <button onClick={handleLike} style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                            background: "none", border: "none", cursor: liked ? "default" : "pointer", padding: 0,
                        }}>
                            <Heart size={14} style={{ color: liked ? "#f43f5e" : "rgba(255,255,255,0.35)", fill: liked ? "#f43f5e" : "none", transition: "color 0.2s" }} />
                            <span style={{ fontSize: 10, fontWeight: 700, color: liked ? "#f43f5e" : "rgba(255,255,255,0.4)", lineHeight: 1 }}>{likes}</span>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <MessageSquare size={14} style={{ color: "rgba(255,255,255,0.35)" }} />
                            <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", lineHeight: 1 }}>{post.comments ?? 0}</span>
                        </div>
                    </div>
                </div>

                {/* CTA button */}
                <motion.button
                    whileHover={{ background: "rgba(59,130,246,0.18)", borderColor: "rgba(59,130,246,0.45)" }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        width: "100%", padding: "10px 0",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10, fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)",
                        cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
                    }}
                >
                    {action}
                </motion.button>
            </div>
        </motion.div>
    );
}