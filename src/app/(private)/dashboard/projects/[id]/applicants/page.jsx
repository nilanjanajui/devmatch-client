"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
    ArrowLeft, Github, Globe, Clock, CheckCircle2, XCircle, Users,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useProject } from "@/hooks/useProjects";
import MessageButton from "@/components/messaging/MessageButton";

const CARD_BG = "rgba(15, 23, 42, 0.65)";
const BORDER = "rgba(173, 198, 255, 0.1)";
const ACCENT = "#adc6ff";
const CYAN = "#4cd7f6";
const MUTED = "rgba(194, 198, 214, 0.7)";

const STATUS_STYLES = {
    pending: { color: "#facc15", bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.3)", icon: Clock },
    accepted: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)", icon: CheckCircle2 },
    rejected: { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", icon: XCircle },
};

function getInitials(name) {
    if (!name) return "?";
    return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function StatusBadge({ status }) {
    const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
    const Icon = s.icon;
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 12px", borderRadius: "20px",
            background: s.bg, border: `1px solid ${s.border}`, color: s.color,
            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
            fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
        }}>
            <Icon size={12} /> {status}
        </span>
    );
}

function ApplicantCard({ app, onUpdateStatus, updating, projectId }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: CARD_BG, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                border: `1px solid ${BORDER}`, borderRadius: "16px", padding: "22px",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: "14px" }}>
                    <div style={{
                        width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
                        background: "rgba(173,198,255,0.15)", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px", color: ACCENT,
                    }}>
                        {getInitials(app.applicantName)}
                    </div>
                    <div>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#dae2fd", margin: 0 }}>
                            {app.applicantName}
                        </p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: CYAN, margin: "4px 0 0" }}>
                            Applying for: {app.role}
                        </p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: MUTED, margin: "4px 0 0" }}>
                            {app.experience && `${app.experience} · `}
                            Applied {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <StatusBadge status={app.status} />
            </div>

            {app.message && (
                <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(218,226,253,0.85)",
                    lineHeight: 1.6, margin: "16px 0 0", padding: "12px 14px",
                    background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: `1px solid ${BORDER}`,
                }}>
                    &ldquo;{app.message}&rdquo;
                </p>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginTop: "18px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                    {app.github && (
                        <a href={app.github} target="_blank" rel="noopener noreferrer" style={{
                            display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px",
                            borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`,
                            color: MUTED, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", textDecoration: "none",
                        }}>
                            <Github size={12} /> GitHub
                        </a>
                    )}
                    {app.portfolio && (
                        <a href={app.portfolio} target="_blank" rel="noopener noreferrer" style={{
                            display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px",
                            borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`,
                            color: MUTED, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", textDecoration: "none",
                        }}>
                            <Globe size={12} /> Portfolio
                        </a>
                    )}
                    <MessageButton
                        recipientId={app.applicantId}
                        projectId={projectId}
                        style={{
                            display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px",
                            borderRadius: "8px", background: "rgba(173,198,255,0.1)", border: `1px solid rgba(173,198,255,0.25)`,
                            color: ACCENT, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                        }}
                    >
                        Message
                    </MessageButton>
                </div>

                {app.status === "pending" && (
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button
                            onClick={() => onUpdateStatus(app._id, "rejected")}
                            disabled={updating}
                            style={{
                                padding: "8px 16px", borderRadius: "8px",
                                background: "transparent", border: "1px solid rgba(248,113,113,0.35)",
                                color: "#f87171", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                                fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                                cursor: updating ? "wait" : "pointer",
                            }}
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => onUpdateStatus(app._id, "accepted")}
                            disabled={updating}
                            style={{
                                padding: "8px 16px", borderRadius: "8px",
                                background: "#4cd7f6", border: "none",
                                color: "#003640", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                                fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                                cursor: updating ? "wait" : "pointer",
                            }}
                        >
                            Accept
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function ApplicantsPage() {
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: project, isLoading: projectLoading } = useProject(id);
    const [filter, setFilter] = useState("all");

    const { data: applicants = [], isLoading: applicantsLoading } = useQuery({
        queryKey: ["applicants", id],
        queryFn: () => axiosInstance.get(`/applications/project/${id}`).then((r) => r.data),
        enabled: !!id,
    });

    const updateStatus = useMutation({
        mutationFn: ({ applicationId, status }) =>
            axiosInstance.patch(`/applications/${applicationId}`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applicants", id] });
        },
    });

    const handleUpdateStatus = (applicationId, status) => {
        updateStatus.mutate({ applicationId, status });
    };

    const filtered = filter === "all" ? applicants : applicants.filter((a) => a.status === filter);
    const counts = {
        all: applicants.length,
        pending: applicants.filter((a) => a.status === "pending").length,
        accepted: applicants.filter((a) => a.status === "accepted").length,
        rejected: applicants.filter((a) => a.status === "rejected").length,
    };

    if (projectLoading || applicantsLoading) {
        return (
            <div style={{ minHeight: "100vh", background: "#0b1326", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                    width: "40px", height: "40px", border: "3px solid rgba(173,198,255,0.1)",
                    borderTop: "3px solid #4cd7f6", borderRadius: "50%", animation: "spin 0.8s linear infinite",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "#0b1326", padding: "96px 48px 48px", fontFamily: "'Inter', sans-serif" }}>
            <button
                onClick={() => router.push("/dashboard/projects")}
                style={{
                    display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none",
                    color: MUTED, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
                    cursor: "pointer", padding: 0, marginBottom: "24px",
                }}
            >
                <ArrowLeft size={14} /> Back to My Projects
            </button>

            <div style={{ marginBottom: "28px" }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "30px", fontWeight: 700, color: "#dae2fd", margin: 0 }}>
                    {project?.title || "Applicants"}
                </h1>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: MUTED, marginTop: "6px" }}>
                    {applicants.length} applicant{applicants.length !== 1 ? "s" : ""} for this project
                </p>
            </div>

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
                {["all", "pending", "accepted", "rejected"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: "8px 16px", borderRadius: "20px",
                            background: filter === f ? "rgba(173,198,255,0.15)" : "transparent",
                            border: `1px solid ${filter === f ? "rgba(173,198,255,0.4)" : BORDER}`,
                            color: filter === f ? ACCENT : MUTED,
                            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                            fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                            cursor: "pointer",
                        }}
                    >
                        {f} ({counts[f]})
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    padding: "80px 24px", borderRadius: "16px", background: "rgba(15,23,42,0.55)",
                    border: "2px dashed rgba(173,198,255,0.15)", textAlign: "center",
                }}>
                    <Users size={32} color="rgba(173,198,255,0.4)" style={{ marginBottom: "16px" }} />
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", color: "#dae2fd", margin: 0 }}>
                        No {filter !== "all" ? filter : ""} applicants yet
                    </p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: MUTED, marginTop: "8px" }}>
                        {filter === "all"
                            ? "Share your project to start receiving applications."
                            : "Try a different filter."}
                    </p>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {filtered.map((app) => (
                        <ApplicantCard
                            key={app._id}
                            app={app}
                            projectId={id}
                            onUpdateStatus={handleUpdateStatus}
                            updating={updateStatus.isPending}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}