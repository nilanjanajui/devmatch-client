"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

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

export default function CreateProjectPage() {
    const router = useRouter();
    const qc = useQueryClient();

    const [form, setForm] = useState({
        title: "",
        tagline: "",
        description: "",
        category: "Web Systems",
        difficulty: "Intermediate",
        teamSize: 3,
        techStack: [],
        rolesNeeded: [],
        estimatedDuration: "",
        image: "",
    });

    const [techInput, setTechInput] = useState("");
    const [roleInput, setRoleInput] = useState("");

    const { mutate: createProject, isPending } = useMutation({
        mutationFn: (data) => axiosInstance.post("/projects", data).then(r => r.data),
        onSuccess: (project) => {
            qc.invalidateQueries(["my-projects"]);
            toast.success("Project created!");
            router.push("/dashboard/projects");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to create project.");
        },
    });

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

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
        createProject(form);
    };

    return (
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
                    Create a New Project
                </h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "monospace", marginTop: 6 }}>
                    Describe your idea and find the right teammates.
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

                {/* Team Size + Duration row */}
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

                {/* Cover Image URL */}
                <div>
                    <label style={labelStyle}>Cover Image URL <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span></label>
                    <input
                        style={inputStyle}
                        placeholder="https://images.unsplash.com/..."
                        value={form.image}
                        onChange={e => set("image", e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
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
                        {isPending ? "Creating..." : "Create Project"}
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