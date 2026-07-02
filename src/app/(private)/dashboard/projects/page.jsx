"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderPlus, Plus, Pencil, Trash2, Users, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext"; // adjust to your auth path

/* ── Delete confirmation modal ── */
function DeleteConfirmModal({ project, onCancel, onConfirm, deleting }) {
    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(11,19,38,0.75)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        }}>
            <div style={{
                width: "100%", maxWidth: "420px",
                background: "#0d1421", border: "1px solid rgba(255,100,100,0.2)",
                borderRadius: "16px", padding: "28px",
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{
                        width: "44px", height: "44px", borderRadius: "12px",
                        background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <AlertTriangle size={20} color="#ff7878" />
                    </div>
                    <button
                        onClick={onCancel}
                        style={{ background: "none", border: "none", color: "#c2c6d6", cursor: "pointer", padding: 0 }}
                    >
                        <X size={18} />
                    </button>
                </div>

                <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700,
                    color: "#dae2fd", margin: "0 0 8px",
                }}>
                    Delete &ldquo;{project.title}&rdquo;?
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(194,198,214,0.7)", lineHeight: 1.6, margin: "0 0 24px" }}>
                    This will permanently delete the project and cannot be undone. Applicants will lose access to it.
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={onCancel}
                        disabled={deleting}
                        style={{
                            flex: 1, padding: "10px 0", borderRadius: "8px",
                            background: "rgba(173,198,255,0.08)", border: "1px solid rgba(173,198,255,0.15)",
                            color: "#adc6ff", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={deleting}
                        style={{
                            flex: 1, padding: "10px 0", borderRadius: "8px",
                            background: "#ef4444", border: "none",
                            color: "#fff", fontSize: "13px", fontWeight: 700, cursor: deleting ? "wait" : "pointer",
                        }}
                    >
                        {deleting ? "Deleting…" : "Delete Project"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MyProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchProjects = async () => {
        try {
            const { data } = await axiosInstance.get("/projects", {
                params: { mine: true, limit: 100 },
            });
            setProjects(Array.isArray(data) ? data : data.projects || data.data || []);
        } catch (err) {
            console.error(err);
            toast.error("Couldn't load your projects. Please try again.");
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;

        const timer = setTimeout(() => {
            fetchProjects();
        }, 0);

        return () => clearTimeout(timer);
    }, [user]);

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        setDeleting(true);
        try {
            await axiosInstance.delete(`/projects/${pendingDelete._id}`);
            setProjects((prev) => prev.filter((p) => p._id !== pendingDelete._id));
            toast.success(`"${pendingDelete.title}" was deleted.`);
            setPendingDelete(null);
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to delete project.");
        } finally {
            setDeleting(false);
        }
    };

    // ── Loading ──
    if (loading) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0b1326",
            }}>
                <div style={{
                    width: "40px", height: "40px",
                    border: "3px solid rgba(173,198,255,0.1)",
                    borderTop: "3px solid #adc6ff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ── Empty State ──
    if (projects.length === 0) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "#0b1326",
                padding: "96px 48px 48px",
                fontFamily: "'Inter', sans-serif",
            }}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "64px",
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "#dae2fd",
                            margin: 0,
                        }}>
                            My Projects
                        </h1>
                        <p style={{ fontSize: "14px", color: "#c2c6d6", marginTop: "6px", marginBottom: 0 }}>
                            Projects you create will appear here.
                        </p>
                    </div>
                    <Link href="/dashboard/projects/create" style={{ textDecoration: "none" }}>
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            background: "#4cd7f6",
                            color: "#003640",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 0 15px rgba(76,215,246,0.35)",
                            transition: "all 0.2s ease",
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "#7de8f8";
                                e.currentTarget.style.boxShadow = "0 0 25px rgba(76,215,246,0.55)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "#4cd7f6";
                                e.currentTarget.style.boxShadow = "0 0 15px rgba(76,215,246,0.35)";
                            }}>
                            <Plus size={16} />
                            New Project
                        </button>
                    </Link>
                </div>

                {/* Empty State Card */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 48px",
                    borderRadius: "16px",
                    background: "rgba(15,23,42,0.55)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "2px dashed rgba(173,198,255,0.15)",
                    textAlign: "center",
                    maxWidth: "560px",
                    margin: "0 auto",
                }}>
                    {/* Icon */}
                    <div style={{
                        width: "80px", height: "80px",
                        borderRadius: "20px",
                        background: "rgba(173,198,255,0.06)",
                        border: "1px solid rgba(173,198,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "28px",
                    }}>
                        <FolderPlus size={36} color="rgba(173,198,255,0.4)" />
                    </div>

                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "24px",
                        fontWeight: 600,
                        color: "#dae2fd",
                        marginBottom: "12px",
                        marginTop: 0,
                    }}>
                        No projects yet
                    </h2>
                    <p style={{
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: "rgba(194,198,214,0.65)",
                        marginBottom: "36px",
                        marginTop: 0,
                        maxWidth: "380px",
                    }}>
                        Start by creating your first project. Define your idea, set your
                        tech stack, and start recruiting the right teammates.
                    </p>

                    <Link href="/dashboard/projects/create" style={{ textDecoration: "none" }}>
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "14px 32px",
                            borderRadius: "10px",
                            background: "rgba(173,198,255,0.1)",
                            border: "1px solid rgba(173,198,255,0.25)",
                            color: "#adc6ff",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "13px",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(173,198,255,0.18)";
                                e.currentTarget.style.borderColor = "rgba(173,198,255,0.45)";
                                e.currentTarget.style.boxShadow = "0 0 20px rgba(173,198,255,0.15)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "rgba(173,198,255,0.1)";
                                e.currentTarget.style.borderColor = "rgba(173,198,255,0.25)";
                                e.currentTarget.style.boxShadow = "none";
                            }}>
                            <Plus size={18} />
                            Create Your First Project
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // ── Has Projects ──
    return (
        <div style={{
            minHeight: "100vh",
            background: "#0b1326",
            padding: "96px 48px 48px",
            fontFamily: "'Inter', sans-serif",
        }}>
            {pendingDelete && (
                <DeleteConfirmModal
                    project={pendingDelete}
                    deleting={deleting}
                    onCancel={() => setPendingDelete(null)}
                    onConfirm={handleConfirmDelete}
                />
            )}

            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
            }}>
                <div>
                    <h1 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "#dae2fd",
                        margin: 0,
                    }}>
                        My Projects
                    </h1>
                    <p style={{ fontSize: "14px", color: "#c2c6d6", marginTop: "6px", marginBottom: 0 }}>
                        {projects.length} project{projects.length !== 1 ? "s" : ""} created
                    </p>
                </div>
                <Link href="/dashboard/projects/create" style={{ textDecoration: "none" }}>
                    <button style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        background: "#4cd7f6",
                        color: "#003640",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 0 15px rgba(76,215,246,0.35)",
                        transition: "all 0.2s ease",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#7de8f8";
                            e.currentTarget.style.boxShadow = "0 0 25px rgba(76,215,246,0.55)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "#4cd7f6";
                            e.currentTarget.style.boxShadow = "0 0 15px rgba(76,215,246,0.35)";
                        }}>
                        <Plus size={16} />
                        New Project
                    </button>
                </Link>
            </div>

            {/* Project Cards Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "16px",
            }}>
                {projects.map((project) => (
                    <div
                        key={project._id}
                        style={{
                            padding: "24px",
                            borderRadius: "12px",
                            background: "rgba(15,23,42,0.65)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(173,198,255,0.1)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            transition: "all 0.25s ease",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = "rgba(173,198,255,0.25)";
                            e.currentTarget.style.boxShadow = "0 0 24px rgba(173,198,255,0.08)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = "rgba(173,198,255,0.1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {/* Title + Difficulty */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <h3 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#dae2fd",
                                margin: 0,
                                flex: 1,
                                paddingRight: "12px",
                            }}>
                                {project.title}
                            </h3>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                padding: "3px 10px",
                                borderRadius: "9999px",
                                background: project.difficulty === "Beginner"
                                    ? "rgba(76,215,246,0.12)"
                                    : project.difficulty === "Advanced"
                                        ? "rgba(208,188,255,0.12)"
                                        : "rgba(173,198,255,0.12)",
                                color: project.difficulty === "Beginner"
                                    ? "#4cd7f6"
                                    : project.difficulty === "Advanced"
                                        ? "#d0bcff"
                                        : "#adc6ff",
                                flexShrink: 0,
                            }}>
                                {project.difficulty || "Intermediate"}
                            </span>
                        </div>

                        {/* Tech Stack */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {(Array.isArray(project.techStack) ? project.techStack : []).slice(0, 4).map((tech) => (
                                <span key={tech} style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "11px",
                                    padding: "3px 8px",
                                    borderRadius: "4px",
                                    background: "rgba(173,198,255,0.06)",
                                    border: "1px solid rgba(173,198,255,0.12)",
                                    color: "#c2c6d6",
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Application Count */}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Users size={14} color="#4cd7f6" />
                            <span style={{ fontSize: "13px", color: "#c2c6d6" }}>
                                {project.application_count || 0} application{project.application_count !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* Actions */}
                        <div style={{
                            display: "flex",
                            gap: "8px",
                            paddingTop: "8px",
                            borderTop: "1px solid rgba(173,198,255,0.07)",
                        }}>
                            <Link
                                href={`/dashboard/projects/${project._id}/edit`}
                                style={{ flex: 1, textDecoration: "none" }}
                            >
                                <button style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    background: "rgba(173,198,255,0.07)",
                                    border: "1px solid rgba(173,198,255,0.12)",
                                    color: "#adc6ff",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(173,198,255,0.14)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(173,198,255,0.07)"}>
                                    <Pencil size={13} />
                                    Edit
                                </button>
                            </Link>

                            <Link
                                href={`/dashboard/projects/${project._id}/applicants`}
                                style={{ flex: 1, textDecoration: "none" }}
                            >
                                <button style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    background: "rgba(76,215,246,0.07)",
                                    border: "1px solid rgba(76,215,246,0.12)",
                                    color: "#4cd7f6",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(76,215,246,0.14)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(76,215,246,0.07)"}>
                                    <Users size={13} />
                                    Applicants
                                </button>
                            </Link>

                            <button
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    background: "rgba(255,100,100,0.07)",
                                    border: "1px solid rgba(255,100,100,0.12)",
                                    color: "rgba(255,120,120,0.8)",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,100,100,0.15)"}
                                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,100,100,0.07)"}
                                onClick={() => setPendingDelete(project)}
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}