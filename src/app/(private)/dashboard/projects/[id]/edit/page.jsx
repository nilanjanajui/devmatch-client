"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { useProject } from "@/hooks/useProjects";
import { useAuth } from "@/context/AuthContext";

const CATEGORIES = ["Web Systems", "Mobile App", "AI / ML", "DevTools", "Blockchain", "Game Dev", "Data / Analytics", "Other"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Hard", "Expert"];
const COMMON_ROLES = ["Frontend Dev", "Backend Dev", "Full-Stack Dev", "UI/UX Designer", "DevOps", "Data Scientist", "Mobile Dev", "QA Engineer"];

const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    color: "#e2e8f0",
    fontSize: 14,
    padding: "11px 14px",
    outline: "none",
    fontFamily: "monospace",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
};

const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#475569",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 6,
    fontFamily: "monospace",
};

// yyyy-mm-dd for <input type="date">
function toDateInputValue(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
}

function Spinner() {
    return (
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "2px solid rgba(96,165,250,0.15)",
                borderTopColor: "#3B82F6",
                animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default function EditProjectPage() {
    const { id } = useParams();
    const router = useRouter();
    const qc = useQueryClient();
    const { user, isLoading: authLoading } = useAuth();
    const { data: project, isLoading: projectLoading, isError } = useProject(id);

    const [formState, setFormState] = useState(null);
    const [techInput, setTechInput] = useState("");
    const [roleInput, setRoleInput] = useState("");

    const initialForm = project ? {
        title: project.title ?? "",
        tagline: project.tagline ?? "",
        description: project.description ?? "",
        category: project.category ?? "Web Systems",
        difficulty: project.difficulty ?? "Intermediate",
        teamSize: project.teamSize ?? 3,
        techStack: project.techStack ?? [],
        rolesNeeded: project.rolesNeeded ?? [],
        estimatedDuration: project.estimatedDuration ?? "",
        image: project.image ?? "",
        deadline: toDateInputValue(project.deadline),
    } : null;
    const form = formState ?? initialForm;

    const { mutate: saveProject, isPending } = useMutation({
        mutationFn: (data) => axiosInstance.patch(`/projects/${id}`, data).then(r => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["project", id] });
            qc.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project updated!");
            router.push("/dashboard/projects");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to update project.");
        },
    });

    const set = (key, val) => setFormState(f => ({ ...(f ?? initialForm), [key]: val }));

    const addTech = () => {
        const t = techInput.trim();
        if (t && !form.techStack.includes(t)) set("techStack", [...form.techStack, t]);
        setTechInput("");
    };

    const addRole = (role) => {
        if (role && !form.rolesNeeded.includes(role)) set("rolesNeeded", [...form.rolesNeeded, role]);
        setRoleInput("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return toast.error("Title is required.");
        if (!form.description.trim()) return toast.error("Description is required.");
        saveProject({
            ...form,
            deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
        });
    };

    // ── Loading / auth / not-found states ──
    if (authLoading || projectLoading || !form) return <Spinner />;

    if (isError || !project) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: 16 }}>
                    Project not found.
                </p>
                <Link href="/dashboard/projects" style={{ color: "#3B82F6", fontSize: 14, textDecoration: "none", fontFamily: "monospace" }}>
                    ← Back to My Projects
                </Link>
            </div>
        );
    }

    if (user && project.ownerId && project.ownerId !== user.id) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: 16 }}>
                    You don&apos;t have permission to edit this project.
                </p>
                <Link href="/dashboard/projects" style={{ color: "#3B82F6", fontSize: 14, textDecoration: "none", fontFamily: "monospace" }}>
                    ← Back to My Projects
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <Link href="/dashboard/projects" style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none",
                    fontFamily: "monospace", marginBottom: 16,
                    transition: "color 0.2s",
                }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                >
                    <ArrowLeft size={14} /> Back to Projects
                </Link>
                <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, fontFamily: "monospace", margin: 0 }}>
                    Edit Project
                </h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "monospace", marginTop: 6 }}>
                    Update your project details and keep recruiting the right teammates.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Title */}
                <div>
                    <label style={labelStyle}>Project Title *</label>
                    <input
                        style={inputStyle}
                        placeholder="e.g. AI-powered code reviewer"
                        value={form.title}
                        onChange={e => set("title", e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        required
                    />
                </div>

                {/* Tagline */}
                <div>
                    <label style={labelStyle}>Tagline</label>
                    <input
                        style={inputStyle}
                        placeholder="One-line pitch — make it punchy"
                        value={form.tagline}
                        onChange={e => set("tagline", e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                </div>

                {/* Description */}
                <div>
                    <label style={labelStyle}>Description *</label>
                    <textarea
                        style={{ ...inputStyle, minHeight: 120, resize: "vertical", lineHeight: 1.6 }}
                        placeholder="What are you building? What problem does it solve? What's the vision?"
                        value={form.description}
                        onChange={e => set("description", e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        required
                    />
                </div>

                {/* Category + Difficulty row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <select
                            style={{ ...inputStyle, cursor: "pointer" }}
                            value={form.category}
                            onChange={e => set("category", e.target.value)}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        >
                            {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#0a0f1a" }}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Difficulty</label>
                        <select
                            style={{ ...inputStyle, cursor: "pointer" }}
                            value={form.difficulty}
                            onChange={e => set("difficulty", e.target.value)}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        >
                            {DIFFICULTIES.map(d => <option key={d} value={d} style={{ background: "#0a0f1a" }}>{d}</option>)}
                        </select>
                    </div>
                </div>

                {/* Team Size + Deadline row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Team Size</label>
                        <input
                            type="number" min={1} max={20}
                            style={inputStyle}
                            value={form.teamSize}
                            onChange={e => set("teamSize", parseInt(e.target.value) || 1)}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Deadline</label>
                        <input
                            type="date"
                            style={{ ...inputStyle, colorScheme: "dark" }}
                            value={form.deadline}
                            onChange={e => set("deadline", e.target.value)}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                    </div>
                </div>

                {/* Estimated Duration */}
                <div>
                    <label style={labelStyle}>Estimated Duration</label>
                    <input
                        style={inputStyle}
                        placeholder="e.g. 3 months"
                        value={form.estimatedDuration}
                        onChange={e => set("estimatedDuration", e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                </div>

                {/* Tech Stack */}
                <div>
                    <label style={labelStyle}>Tech Stack</label>
                    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                        <input
                            style={{ ...inputStyle, flex: 1 }}
                            placeholder="e.g. React, Node.js, MongoDB"
                            value={techInput}
                            onChange={e => setTechInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                        <button
                            type="button" onClick={addTech}
                            style={{
                                background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
                                borderRadius: 10, color: "#60a5fa", padding: "0 16px", cursor: "pointer",
                                fontSize: 13, fontFamily: "monospace", whiteSpace: "nowrap",
                            }}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    {form.techStack.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {form.techStack.map(t => (
                                <span key={t} style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)",
                                    borderRadius: 6, padding: "3px 10px", fontSize: 12,
                                    color: "#00e5ff", fontFamily: "monospace",
                                }}>
                                    {t}
                                    <X size={11} style={{ cursor: "pointer", opacity: 0.6 }}
                                        onClick={() => set("techStack", form.techStack.filter(x => x !== t))} />
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Roles Needed */}
                <div>
                    <label style={labelStyle}>Roles Needed</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                        {COMMON_ROLES.map(r => (
                            <button
                                key={r} type="button"
                                onClick={() => addRole(r)}
                                style={{
                                    background: form.rolesNeeded.includes(r) ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${form.rolesNeeded.includes(r) ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.1)"}`,
                                    borderRadius: 6, padding: "5px 12px",
                                    color: form.rolesNeeded.includes(r) ? "#a78bfa" : "rgba(255,255,255,0.5)",
                                    fontSize: 12, fontFamily: "monospace", cursor: "pointer",
                                    transition: "all 0.15s",
                                }}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <input
                            style={{ ...inputStyle, flex: 1 }}
                            placeholder="Or type a custom role..."
                            value={roleInput}
                            onChange={e => setRoleInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addRole(roleInput.trim()); } }}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                        <button
                            type="button" onClick={() => addRole(roleInput.trim())}
                            style={{
                                background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
                                borderRadius: 10, color: "#a78bfa", padding: "0 16px", cursor: "pointer",
                                fontSize: 13, fontFamily: "monospace",
                            }}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    {form.rolesNeeded.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                            {form.rolesNeeded.map(r => (
                                <span key={r} style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
                                    borderRadius: 6, padding: "3px 10px", fontSize: 12,
                                    color: "#a78bfa", fontFamily: "monospace",
                                }}>
                                    {r}
                                    <X size={11} style={{ cursor: "pointer", opacity: 0.6 }}
                                        onClick={() => set("rolesNeeded", form.rolesNeeded.filter(x => x !== r))} />
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cover / Banner Image URL */}
                <div>
                    <label style={labelStyle}>Banner Image URL <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span></label>
                    <input
                        style={inputStyle}
                        placeholder="https://images.unsplash.com/..."
                        value={form.image}
                        onChange={e => set("image", e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                    {form.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={form.image}
                            alt="Banner preview"
                            style={{ marginTop: 10, width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)" }}
                            onError={e => { e.currentTarget.style.display = "none"; }}
                        />
                    )}
                </div>

                {/* Submit */}
                <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
                    <button
                        type="submit"
                        disabled={isPending}
                        style={{
                            flex: 1,
                            background: isPending ? "rgba(59,130,246,0.3)" : "linear-gradient(135deg, #3B82F6, #6366F1)",
                            border: "none", borderRadius: 10, color: "#fff",
                            fontSize: 15, fontWeight: 600, fontFamily: "monospace",
                            padding: "14px", cursor: isPending ? "not-allowed" : "pointer",
                            boxShadow: isPending ? "none" : "0 0 20px rgba(59,130,246,0.3)",
                            transition: "all 0.2s",
                        }}
                    >
                        {isPending ? "Saving..." : "Save Changes"}
                    </button>
                    <Link href="/dashboard/projects" style={{
                        padding: "14px 24px", borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)", fontSize: 14,
                        fontFamily: "monospace", textDecoration: "none",
                        display: "flex", alignItems: "center",
                        transition: "all 0.2s",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}