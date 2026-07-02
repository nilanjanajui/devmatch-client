"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, MessageSquare, FolderKanban } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

// ── shared design tokens (matches dashboard/page.jsx) ──
const CARD_BG = "rgba(15, 23, 42, 0.65)";
const BORDER = "rgba(173, 198, 255, 0.1)";
const ACCENT = "#adc6ff";
const CYAN = "#4cd7f6";
const MUTED = "rgba(194, 198, 214, 0.7)";

function getInitials(name) {
    if (!name) return "?";
    return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function timeAgo(dateStr) {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    return new Date(dateStr).toLocaleDateString();
}

function Avatar({ name, image, size = 42 }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%", flexShrink: 0,
            background: "rgba(173,198,255,0.15)", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: size * 0.36, color: ACCENT,
        }}>
            {image ? (
                <Image
                    src={image}
                    alt={name}
                    width={size}
                    height={size}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
            ) : getInitials(name)}
        </div>
    );
}

function MessagesInner() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState(searchParams.get("conversationId"));
    const [draft, setDraft] = useState("");
    const scrollRef = useRef(null);

    const { data: conversations = [], isLoading: loadingConvos } = useQuery({
        queryKey: ["conversations"],
        queryFn: () => axiosInstance.get("/conversations").then((r) => r.data),
        refetchInterval: 15000,
    });

    const { data: messages = [], isLoading: loadingMessages } = useQuery({
        queryKey: ["messages", selectedId],
        queryFn: () => axiosInstance.get(`/conversations/${selectedId}/messages`).then((r) => r.data),
        enabled: !!selectedId,
        refetchInterval: 4000,
    });

    const sendMutation = useMutation({
        mutationFn: (text) => axiosInstance.post(`/conversations/${selectedId}/messages`, { text }),
        onSuccess: () => {
            setDraft("");
            queryClient.invalidateQueries({ queryKey: ["messages", selectedId] });
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
    });

    const selectedConvo = useMemo(
        () => conversations.find((c) => c.id === selectedId),
        [conversations, selectedId]
    );

    useEffect(() => {
        if (!selectedId && conversations.length > 0) {
            // avoid synchronous setState inside effect to prevent cascading renders/lint warning
            const t = setTimeout(() => setSelectedId(conversations[0].id), 0);
            return () => clearTimeout(t);
        }
    }, [conversations, selectedId]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const text = draft.trim();
        if (!text || sendMutation.isPending) return;
        sendMutation.mutate(text);
    };

    return (
        <div style={{ padding: "96px 32px 32px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
            <style>{`
                .dm-back-btn { display: none; }
                @media (max-width: 768px) {
                    .dm-list-panel.dm-hide-mobile { display: none; }
                    .dm-thread-panel.dm-hide-mobile { display: none; }
                    .dm-back-btn { display: flex !important; }
                }
            `}</style>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "20px" }}>
                <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px",
                    fontWeight: 700, color: "#dae2fd", margin: 0,
                }}>
                    Messages
                </h1>
                <p style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
                    color: MUTED, marginTop: "4px",
                }}>
                    Conversations with your collaborators.
                </p>
            </motion.div>

            <div style={{
                display: "flex", gap: "16px", flex: 1, minHeight: 0,
                height: "calc(100vh - 200px)",
            }}>
                {/* ── Conversation list ── */}
                <div
                    className={`dm-list-panel${selectedId ? " dm-hide-mobile" : ""}`}
                    style={{
                        width: "320px", flexShrink: 0,
                        background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: "16px",
                        overflowY: "auto",
                    }}
                >
                    {loadingConvos ? (
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "12px", padding: "20px" }}>
                            Loading…
                        </p>
                    ) : conversations.length === 0 ? (
                        <div style={{ padding: "40px 20px", textAlign: "center" }}>
                            <MessageSquare size={24} color={ACCENT} style={{ marginBottom: "10px" }} />
                            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#dae2fd", fontSize: "13px", marginBottom: "6px" }}>
                                No conversations yet
                            </p>
                            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "11px" }}>
                                Message a project owner or applicant to start one.
                            </p>
                        </div>
                    ) : (
                        conversations.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedId(c.id)}
                                style={{
                                    width: "100%", display: "flex", gap: "12px", alignItems: "flex-start",
                                    padding: "14px 16px", background: selectedId === c.id ? "rgba(173,198,255,0.08)" : "transparent",
                                    border: "none", borderBottom: `1px solid ${BORDER}`, cursor: "pointer", textAlign: "left",
                                }}
                            >
                                <Avatar name={c.otherUser?.name} image={c.otherUser?.image} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                                        <span style={{
                                            fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px",
                                            fontWeight: 600, color: "#dae2fd", whiteSpace: "nowrap",
                                            overflow: "hidden", textOverflow: "ellipsis",
                                        }}>
                                            {c.otherUser?.name || "Developer"}
                                        </span>
                                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: MUTED, flexShrink: 0 }}>
                                            {timeAgo(c.lastMessage?.createdAt || c.updatedAt)}
                                        </span>
                                    </div>
                                    {c.projectTitle && (
                                        <div style={{
                                            display: "inline-flex", alignItems: "center", gap: "4px",
                                            fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                                            color: CYAN, marginTop: "3px",
                                        }}>
                                            <FolderKanban size={10} /> {c.projectTitle}
                                        </div>
                                    )}
                                    <p style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: "12px", color: MUTED,
                                        margin: "4px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                    }}>
                                        {c.lastMessage?.text || "No messages yet"}
                                    </p>
                                </div>
                                {c.unreadCount > 0 && (
                                    <span style={{
                                        minWidth: "18px", height: "18px", borderRadius: "9px", padding: "0 5px",
                                        background: CYAN, color: "#0b1326", fontSize: "10px", fontWeight: 700,
                                        fontFamily: "'JetBrains Mono', monospace", display: "flex",
                                        alignItems: "center", justifyContent: "center", flexShrink: 0,
                                    }}>
                                        {c.unreadCount}
                                    </span>
                                )}
                            </button>
                        ))
                    )}
                </div>

                {/* ── Thread panel ── */}
                <div
                    className={`dm-thread-panel${!selectedId ? " dm-hide-mobile" : ""}`}
                    style={{
                        flex: 1, minWidth: 0,
                        background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: "16px",
                        display: "flex", flexDirection: "column", overflow: "hidden",
                    }}
                >
                    {!selectedConvo ? (
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "12px" }}>
                                Select a conversation to view messages.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Thread header */}
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px",
                                padding: "14px 18px", borderBottom: `1px solid ${BORDER}`,
                            }}>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="dm-back-btn"
                                    style={{
                                        alignItems: "center", justifyContent: "center",
                                        background: "none", border: "none", cursor: "pointer",
                                        color: MUTED, padding: 0,
                                    }}
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <Avatar name={selectedConvo.otherUser?.name} image={selectedConvo.otherUser?.image} size={36} />
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#dae2fd", margin: 0 }}>
                                        {selectedConvo.otherUser?.name || "Developer"}
                                    </p>
                                    {selectedConvo.projectTitle && (
                                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: CYAN, margin: 0 }}>
                                            re: {selectedConvo.projectTitle}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Messages */}
                            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                {loadingMessages ? (
                                    <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "12px" }}>Loading…</p>
                                ) : messages.length === 0 ? (
                                    <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "12px", textAlign: "center", marginTop: "40px" }}>
                                        Say hello 👋
                                    </p>
                                ) : (
                                    <AnimatePresence initial={false}>
                                        {messages.map((m) => {
                                            const isMe = m.senderId === user?.id;
                                            return (
                                                <motion.div
                                                    key={m._id}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}
                                                >
                                                    <div style={{
                                                        maxWidth: "70%", padding: "10px 14px", borderRadius: "14px",
                                                        background: isMe ? `linear-gradient(135deg, ${ACCENT}, ${CYAN})` : "rgba(255,255,255,0.05)",
                                                        border: isMe ? "none" : `1px solid ${BORDER}`,
                                                    }}>
                                                        <p style={{
                                                            fontFamily: "'Inter', sans-serif", fontSize: "13px",
                                                            color: isMe ? "#0b1326" : "#dae2fd", margin: 0,
                                                            wordBreak: "break-word",
                                                        }}>
                                                            {m.text}
                                                        </p>
                                                        <p style={{
                                                            fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                                                            color: isMe ? "rgba(11,19,38,0.6)" : MUTED, margin: 0, marginTop: "4px",
                                                            textAlign: "right",
                                                        }}>
                                                            {timeAgo(m.createdAt)}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                )}
                            </div>

                            {/* Composer */}
                            <div style={{ display: "flex", gap: "10px", padding: "14px 18px", borderTop: `1px solid ${BORDER}` }}>
                                <input
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                                    placeholder="Write a message…"
                                    style={{
                                        flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`,
                                        borderRadius: "10px", padding: "10px 14px", color: "#dae2fd",
                                        fontFamily: "'Inter', sans-serif", fontSize: "13px", outline: "none",
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!draft.trim() || sendMutation.isPending}
                                    style={{
                                        width: "40px", height: "40px", borderRadius: "10px", border: "none",
                                        background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        cursor: draft.trim() ? "pointer" : "not-allowed",
                                        opacity: draft.trim() ? 1 : 0.5, flexShrink: 0,
                                    }}
                                >
                                    <Send size={16} color="#0b1326" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MessagesPage() {
    return (
        <Suspense fallback={null}>
            <MessagesInner />
        </Suspense>
    );
}