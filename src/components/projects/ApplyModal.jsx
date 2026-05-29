"use client";
import { useState } from "react";
import { useApply } from "@/hooks/useProjects";
import { toast } from "sonner";

/* ── Cyan monospace label ── */
const CyanLabel = ({ children }) => (
    <p style={{
        fontFamily: "monospace",
        fontSize: 12, fontWeight: 600,
        color: "#06B6D4",
        letterSpacing: "0.1em",
        marginBottom: 12,
    }}>
        {children}
    </p>
);

/* ── Role card ── */
function RoleCard({ role, subtitle, icon, selected, onSelect }) {
    return (
        <button
            onClick={onSelect}
            style={{
                flex: 1, display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                background: selected ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.03)",
                border: selected ? "1px solid rgba(6,182,212,0.45)" : "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.2s",
                textAlign: "left",
            }}
        >
            {/* Icon */}
            <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: "rgba(6,182,212,0.15)",
                border: "1px solid rgba(6,182,212,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
            }}>
                {icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                    {role}
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                    {subtitle}
                </p>
            </div>

            {/* Radio */}
            <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                border: selected ? "5px solid #06B6D4" : "1.5px solid rgba(255,255,255,0.2)",
                background: selected ? "#fff" : "transparent",
                transition: "all 0.2s",
            }} />
        </button>
    );
}

/* ── Main Modal ── */
export default function ApplyModal({ project, onClose }) {
    const [selectedRole, setSelectedRole] = useState(null);
    const [seniority, setSeniority] = useState("INTERMEDIATE");
    const [github, setGithub] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { mutate: apply, isPending } = useApply();

    const levels = ["JUNIOR", "INTERMEDIATE", "SENIOR", "EXPERT"];

    // Build role cards from rolesNeeded — parse "Role: tech1, tech2" or plain "Role"
    const roleCards = (project.rolesNeeded || []).map((r, i) => {
        const [roleName, techStr] = r.includes(":") ? r.split(":") : [r, ""];
        const icons = ["🧠", "⚙️", "🖥️", "🔧", "🚀", "🎨", "🗄️", "🔒"];
        const subtitles = ["Core AI Modeling", "Hardware Interface", "Systems Layer", "Backend Core",
            "Frontend Interface", "Design Systems", "Data Layer", "Security Layer"];
        return {
            role: roleName.trim(),
            subtitle: techStr?.trim() || subtitles[i % subtitles.length],
            icon: icons[i % icons.length],
        };
    });

    // Fallback if no roles
    if (roleCards.length === 0) {
        roleCards.push({ role: "General Application", subtitle: "Open contribution", icon: "🚀" });
    }

    const handleSubmit = () => {
        if (!selectedRole || !message) return;
        apply(
            {
                projectId: project._id,
                role: selectedRole,
                seniority,
                github,
                portfolio,
                message,
            },
            {
                onSuccess: () => {
                    toast.success("Application submitted!");
                    setShowModal(false);
                },
                onError: () => toast.error("Failed to submit application."),


            }
        );
    };

    return (
        <>
            {/* Keyframes injected once */}
            <style>{`
                @keyframes modalShine {
                    0%   { transform: translateX(-100%) rotate(25deg); }
                    100% { transform: translateX(300%) rotate(25deg); }
                }
                @keyframes fadeInModal {
                    from { opacity: 0; transform: scale(0.96) translateY(8px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .apply-modal-role-card:hover {
                    border-color: rgba(6,182,212,0.3) !important;
                    background: rgba(6,182,212,0.05) !important;
                }
                .apply-input:focus {
                    outline: none;
                    border-color: rgba(6,182,212,0.5) !important;
                }
            `}</style>

            {/* Backdrop */}
            <div
                onClick={(e) => e.target === e.currentTarget && onClose()}
                style={{
                    position: "fixed", inset: 0, zIndex: 100,
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(8px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "16px",
                }}
            >
                {/* Modal card */}
                <div style={{
                    width: "100%", maxWidth: 640,
                    borderRadius: 20,
                    background: "linear-gradient(160deg, #0d1f3c 0%, #0a1628 40%, #071020 100%)",
                    border: "1px solid rgba(6,182,212,0.2)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(6,182,212,0.06)",
                    overflow: "hidden",
                    position: "relative",
                    animation: "fadeInModal 0.25s ease-out",
                }}>

                    {/* ── Moving shiny sweep ── */}
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden",
                    }}>
                        <div style={{
                            position: "absolute", top: "-50%", left: "-20%",
                            width: "35%", height: "200%",
                            background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.045), rgba(255,255,255,0.06), rgba(6,182,212,0.045), transparent)",
                            animation: "modalShine 3.5s ease-in-out infinite",
                            animationDelay: "0.8s",
                        }} />
                    </div>

                    {/* ── Subtle top-edge glow ── */}
                    <div style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: "70%", height: 1,
                        background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)",
                        zIndex: 1,
                    }} />

                    {submitted ? (
                        /* ── Success state ── */
                        <div style={{ position: "relative", zIndex: 2, padding: "60px 40px", textAlign: "center" }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: "50%",
                                background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                margin: "0 auto 20px",
                            }}>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M5 14l6 6L23 8" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 10 }}>
                                Application Sent!
                            </h3>
                            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                                The project lead will review your profile and reach out soon.
                            </p>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: "12px 32px", borderRadius: 10, border: "none", cursor: "pointer",
                                    background: "linear-gradient(135deg, #06B6D4, #0EA5E9)",
                                    color: "#fff", fontFamily: "'Space Grotesk',sans-serif",
                                    fontSize: 14, fontWeight: 700,
                                }}
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <div style={{ position: "relative", zIndex: 2 }}>

                            {/* ── Header ── */}
                            <div style={{
                                padding: "28px 28px 22px",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <h2 style={{
                                            fontFamily: "'Space Grotesk',sans-serif",
                                            fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6,
                                        }}>
                                            Apply to Join Team
                                        </h2>
                                        <p style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                                            <span>🚀</span>
                                            {project.title}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        style={{
                                            width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
                                            background: "rgba(255,255,255,0.04)", cursor: "pointer",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1,
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            {/* ── Body ── */}
                            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 22 }}>

                                {/* Select Desired Role */}
                                <div>
                                    <CyanLabel>Select Desired Role</CyanLabel>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                        {roleCards.map((rc) => (
                                            <div key={rc.role} style={{ flex: "1 1 200px" }}>
                                                <RoleCard
                                                    {...rc}
                                                    selected={selectedRole === rc.role}
                                                    onSelect={() => setSelectedRole(rc.role)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Seniority Level */}
                                <div>
                                    <CyanLabel>Seniority Level</CyanLabel>
                                    <div style={{
                                        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: 10, overflow: "hidden",
                                    }}>
                                        {levels.map((lvl) => (
                                            <button
                                                key={lvl}
                                                onClick={() => setSeniority(lvl)}
                                                style={{
                                                    padding: "11px 0", border: "none", cursor: "pointer",
                                                    fontFamily: "'Space Grotesk',sans-serif",
                                                    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                                                    transition: "all 0.2s",
                                                    background: seniority === lvl
                                                        ? "rgba(6,182,212,0.15)"
                                                        : "transparent",
                                                    color: seniority === lvl ? "#06B6D4" : "rgba(255,255,255,0.35)",
                                                    borderRight: lvl !== "EXPERT" ? "1px solid rgba(255,255,255,0.06)" : "none",
                                                }}
                                            >
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* GitHub + Portfolio */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                    <div>
                                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, fontWeight: 500 }}>
                                            GitHub Profile URL
                                        </p>
                                        <div style={{ position: "relative" }}>
                                            <div style={{
                                                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                                                color: "rgba(255,255,255,0.25)",
                                            }}>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <path d="M8 4.5l-4 5M6 4.5h2.5V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                    <rect x="1" y="1" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.2" />
                                                </svg>
                                            </div>
                                            <input
                                                className="apply-input"
                                                type="url"
                                                placeholder="github.com/username"
                                                value={github}
                                                onChange={(e) => setGithub(e.target.value)}
                                                style={{
                                                    width: "100%", paddingLeft: 34, paddingRight: 12,
                                                    paddingTop: 10, paddingBottom: 10,
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    borderRadius: 8, color: "#fff", fontSize: 13,
                                                    transition: "border-color 0.2s",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, fontWeight: 500 }}>
                                            Portfolio/Website URL
                                        </p>
                                        <div style={{ position: "relative" }}>
                                            <div style={{
                                                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                                                color: "rgba(255,255,255,0.25)",
                                            }}>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                                                    <path d="M1 7h12M7 1c-1.5 1.5-2.5 3.5-2.5 6S5.5 11.5 7 13c1.5-1.5 2.5-3.5 2.5-6S8.5 2.5 7 1z" stroke="currentColor" strokeWidth="1.2" />
                                                </svg>
                                            </div>
                                            <input
                                                className="apply-input"
                                                type="url"
                                                placeholder="https://portfolio.dev"
                                                value={portfolio}
                                                onChange={(e) => setPortfolio(e.target.value)}
                                                style={{
                                                    width: "100%", paddingLeft: 34, paddingRight: 12,
                                                    paddingTop: 10, paddingBottom: 10,
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    borderRadius: 8, color: "#fff", fontSize: 13,
                                                    transition: "border-color 0.2s",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <CyanLabel>Why do you want to join this project?</CyanLabel>
                                    <textarea
                                        className="apply-input"
                                        rows={4}
                                        placeholder={`Briefly describe your passion for ${project.title} and what value you bring…`}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        style={{
                                            width: "100%", padding: "12px 14px",
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: 10, color: "#fff", fontSize: 13,
                                            lineHeight: 1.7, resize: "none",
                                            transition: "border-color 0.2s",
                                            fontFamily: "inherit",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* ── Footer ── */}
                            <div style={{
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                                padding: "18px 28px",
                                display: "flex", flexDirection: "column", gap: 16,
                            }}>
                                {/* Buttons */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <button
                                        onClick={onClose}
                                        style={{
                                            padding: "11px 24px", borderRadius: 10, border: "none",
                                            background: "transparent", color: "rgba(255,255,255,0.45)",
                                            fontSize: 14, fontWeight: 600, cursor: "pointer",
                                            transition: "color 0.2s",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isPending || !selectedRole || !message}
                                        style={{
                                            padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer",
                                            background: (!selectedRole || !message || isPending)
                                                ? "rgba(6,182,212,0.25)"
                                                : "linear-gradient(135deg, #06B6D4, #0EA5E9)",
                                            color: (!selectedRole || !message || isPending) ? "rgba(255,255,255,0.4)" : "#fff",
                                            fontFamily: "'Space Grotesk',sans-serif",
                                            fontSize: 14, fontWeight: 700,
                                            display: "flex", alignItems: "center", gap: 9,
                                            boxShadow: (!selectedRole || !message || isPending)
                                                ? "none"
                                                : "0 4px 20px rgba(6,182,212,0.35)",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {/* Arrow icon */}
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {isPending ? "Submitting…" : "Submit Application"}
                                    </button>
                                </div>

                                {/* Social proof strip */}
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    {/* Stacked avatars */}
                                    <div style={{ display: "flex" }}>
                                        {["🧑‍💻", "👩‍💻", "🧑‍🔬"].map((emoji, i) => (
                                            <div key={i} style={{
                                                width: 28, height: 28, borderRadius: "50%",
                                                background: `hsl(${200 + i * 30},60%,30%)`,
                                                border: "2px solid #0a1628",
                                                marginLeft: i === 0 ? 0 : -8,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 13,
                                            }}>
                                                {emoji}
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                                        Join {project.application_count ?? 12} others already on this project
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}