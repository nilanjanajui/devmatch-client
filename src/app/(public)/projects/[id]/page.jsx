"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useProject } from "@/hooks/useProjects";
import axiosInstance from "@/lib/axios";
import ApplyModal from "@/components/projects/ApplyModal";
import { useAuth } from "@/context/AuthContext";
import MessageButton from "@/components/messaging/MessageButton";

/* ─── Helpers ─────────────────────────────────── */

function daysUntil(dateStr) {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
}

function difficultyStyle(difficulty) {
    const map = {
        Beginner: { color: "#22C55E", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)" },
        Intermediate: { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" },
        Hard: { color: "#9CA3AF", bg: "rgba(156,163,175,0.08)", border: "rgba(156,163,175,0.2)" },
        Expert: { color: "#EF4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)" },
    };
    return map[difficulty] || map.Hard;
}

/* ─── Sub-components ─────────────────────────────────── */

function Spinner() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "2px solid rgba(6,182,212,0.15)",
                borderTopColor: "#06B6D4",
                animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

function TechBadge({ label }) {
    return (
        <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.7)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 6, padding: "4px 10px",
            whiteSpace: "nowrap",
        }}>
            {label}
        </span>
    );
}

function SectionCard({ children, style }) {
    return (
        <div style={{
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: "28px 28px",
            ...style,
        }}>
            {children}
        </div>
    );
}

function SectionHeading({ icon, children }) {
    return (
        <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 20, fontWeight: 700, color: "#fff",
            display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
        }}>
            <span style={{ opacity: 0.7, fontSize: 20 }}>{icon}</span>
            {children}
        </h2>
    );
}

/* ─── Main Page ─────────────────────────────────── */

export default function ProjectDetailsPage() {
    // ── 1. All hooks first — no exceptions ──────────────
    const { id } = useParams();
    const router = useRouter();
    const { isLoggedIn, isLoading: authLoading } = useAuth();
    const { data: project, isLoading: projectLoading, isError } = useProject(id);
    const [owner, setOwner] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            router.push(`/login?from=/projects/${id}`);
        }
    }, [isLoggedIn, authLoading, id, router]);

    // Fetch owner profile once project loads
    useEffect(() => {
        if (project?.ownerId) {
            axiosInstance.get(`/users/${project.ownerId}`)
                .then(({ data }) => setOwner(data))
                .catch(() => { });
        }
    }, [project?.ownerId]);

    // ── 2. Conditional returns AFTER all hooks ──────────

    // Auth resolving or not logged in → show spinner (redirect is in flight)
    if (authLoading || !isLoggedIn) return <Spinner />;

    // Project fetching
    if (projectLoading) return <Spinner />;

    // Project error or missing
    if (isError || !project) return (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 18 }}>
                Project not found.
            </p>
            <Link href="/explore" style={{ color: "#3B82F6", fontSize: 14, textDecoration: "none" }}>
                ← Back to Explore
            </Link>
        </div>
    );

    // ── 3. Derived values ───────────────────────────────
    const days = daysUntil(project.deadline);
    const diff = difficultyStyle(project.difficulty);

    // ── 4. Render ───────────────────────────────────────
    return (
        <>
            {showModal && <ApplyModal project={project} onClose={() => setShowModal(false)} />}

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>

                {/* ── Badges + Title ── */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                        <span style={{
                            fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                            color: "#22C55E", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)",
                        }}>
                            {project.category || "Active Startup"}
                        </span>
                        <span style={{
                            fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20,
                            letterSpacing: "0.06em",
                            color: diff.color, background: diff.bg, border: `1px solid ${diff.border}`,
                        }}>
                            {project.difficulty?.toUpperCase()} DIFFICULTY
                        </span>
                    </div>

                    <h1 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800,
                        color: "#fff", lineHeight: 1.15, marginBottom: 14,
                    }}>
                        {project.title}
                    </h1>

                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.6, maxWidth: 560 }}>
                        {project.tagline || project.description?.slice(0, 140)}
                    </p>
                </div>

                {/* ── Two-column layout ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

                    {/* ══ LEFT COLUMN ══ */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                        {/* Project Vision */}
                        <SectionCard>
                            <SectionHeading icon="📄">Project Vision</SectionHeading>
                            {project.description?.split("\n\n").map((para, i, arr) => (
                                <p key={i} style={{
                                    color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.85,
                                    marginBottom: i < arr.length - 1 ? 16 : 0,
                                }}>
                                    {para}
                                </p>
                            ))}
                        </SectionCard>

                        {/* Core Goals + Timeline */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

                            <SectionCard>
                                <SectionHeading icon="🚩">Core Goals</SectionHeading>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                                    {(project.rolesNeeded?.length
                                        ? [
                                            `Build for ${project.rolesNeeded[0]} track`,
                                            `Ship in ${project.estimatedDuration || "3 months"}`,
                                            `Assemble a team of ${project.teamSize}`,
                                        ]
                                        : [
                                            "Ship high-quality product",
                                            `Assemble a team of ${project.teamSize}`,
                                            `Complete within ${project.estimatedDuration || "timeline"}`,
                                        ]
                                    ).map((goal) => (
                                        <li key={goal} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                                                <circle cx="9" cy="9" r="8" stroke="#06B6D4" strokeWidth="1.2" opacity="0.4" />
                                                <path d="M5.5 9l2.5 2.5 4-4" stroke="#06B6D4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6 }}>{goal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </SectionCard>

                            <SectionCard>
                                <SectionHeading icon="🕐">Timeline</SectionHeading>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {[
                                        { phase: "Phase 1: Kickoff", target: "Immediate", active: true },
                                        { phase: "Phase 2: MVP", target: project.estimatedDuration || "TBD", active: false },
                                        ...(project.deadline ? [{
                                            phase: "Phase 3: Launch",
                                            target: new Date(project.deadline).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                                            active: false,
                                        }] : []),
                                    ].map((item) => (
                                        <div key={item.phase} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                            <div style={{
                                                width: 10, height: 10, borderRadius: "50%", marginTop: 4, flexShrink: 0,
                                                background: item.active ? "#3B82F6" : "rgba(255,255,255,0.15)",
                                                boxShadow: item.active ? "0 0 8px rgba(59,130,246,0.5)" : "none",
                                            }} />
                                            <div>
                                                <p style={{
                                                    fontFamily: "'Space Grotesk',sans-serif",
                                                    fontSize: 13, fontWeight: item.active ? 700 : 500,
                                                    color: item.active ? "#fff" : "rgba(255,255,255,0.55)",
                                                }}>
                                                    {item.phase}
                                                </p>
                                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                                                    Target: {item.target}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        {/* Open Roles */}
                        {project.rolesNeeded?.length > 0 && (
                            <SectionCard>
                                <SectionHeading icon="👥">Open Roles</SectionHeading>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                                    {project.rolesNeeded.map((role, i) => {
                                        const [roleName, techStr] = role.includes(":") ? role.split(":") : [role, ""];
                                        const techs = techStr ? techStr.split(",").map(t => t.trim()).filter(Boolean) : [];
                                        return (
                                            <div key={i} style={{
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                borderRadius: 12, padding: "16px 18px",
                                            }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                    <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                                                        {roleName.trim()}
                                                    </h4>
                                                    <span style={{
                                                        fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                                                        color: "#06B6D4", background: "rgba(6,182,212,0.1)",
                                                        border: "1px solid rgba(6,182,212,0.2)",
                                                        borderRadius: 4, padding: "3px 7px",
                                                    }}>
                                                        1 SLOT
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: techs.length ? 12 : 0 }}>
                                                    {`Looking for an experienced ${roleName.trim()} to join the core team.`}
                                                </p>
                                                {techs.length > 0 && (
                                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                                        {techs.map(t => <TechBadge key={t} label={t} />)}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </SectionCard>
                        )}
                    </div>

                    {/* ══ RIGHT SIDEBAR ══ */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 88 }}>

                        {/* Apply card */}
                        <div style={{
                            background: "rgba(15,23,42,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 16, padding: 20,
                        }}>
                            <button
                                onClick={() => setShowModal(true)}
                                style={{
                                    width: "100%", padding: "14px 0", borderRadius: 10,
                                    background: "linear-gradient(135deg, #2563EB, #3B82F6)",
                                    color: "#fff", fontFamily: "'Space Grotesk',sans-serif",
                                    fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
                                    boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
                                    transition: "opacity 0.2s",
                                }}
                                onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
                                onMouseOut={e => e.currentTarget.style.opacity = "1"}
                            >
                                Apply for Project
                            </button>

                            {/* Stats */}
                            <div style={{
                                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginTop: 16,
                                background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden",
                            }}>
                                <div style={{ padding: "14px 16px", background: "rgba(15,23,42,0.8)", textAlign: "center" }}>
                                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                                        {project.application_count ?? 0}
                                    </p>
                                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: "0.05em" }}>Applicants</p>
                                </div>
                                <div style={{ padding: "14px 16px", background: "rgba(15,23,42,0.8)", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                                        {days !== null ? `${String(days).padStart(2, "0")}d` : "—"}
                                    </p>
                                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: "0.05em" }}>Until Deadline</p>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            {project.techStack?.length > 0 && (
                                <div style={{ marginTop: 20 }}>
                                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>
                                        TECHNOLOGY STACK
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                        {project.techStack.map(t => <TechBadge key={t} label={t} />)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Project Lead */}
                        <div style={{
                            background: "rgba(15,23,42,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 16, padding: 20,
                        }}>
                            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>
                                PROJECT LEAD
                            </p>

                            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                                {owner?.image ? (
                                    <Image
                                        src={owner.image}
                                        alt={project.ownerName}
                                        width={52} height={52}
                                        style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                                    />
                                ) : (
                                    <div style={{
                                        width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                                        background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "#fff",
                                    }}>
                                        {project.ownerName?.[0] ?? "D"}
                                    </div>
                                )}
                                <div>
                                    <Link href={`/developers/${project.ownerId}`}>
                                        <span className="text-[#00e5ff] hover:underline font-mono text-sm cursor-pointer">
                                            {project.ownerName}
                                        </span>
                                    </Link>
                                    <p style={{ fontSize: 12, color: "#06B6D4", marginTop: 2 }}>
                                        {owner?.experienceLevel ? `${owner.experienceLevel} Engineer` : "Project Lead"}
                                    </p>
                                </div>
                            </div>

                            {owner?.bio && (
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontStyle: "italic" }}>
                                    &ldquo;{owner.bio}&rdquo;
                                </p>
                            )}

                            {(owner?.github || owner?.portfolio) && (
                                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                                    {owner.github && (
                                        <a href={owner.github} target="_blank" rel="noreferrer" style={{
                                            padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                                            color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none",
                                        }}>
                                            GitHub →
                                        </a>
                                    )}
                                    {owner.portfolio && (
                                        <a href={owner.portfolio} target="_blank" rel="noreferrer" style={{
                                            padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                                            color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none",
                                        }}>
                                            Portfolio →
                                        </a>
                                    )}
                                </div>
                            )}

                            <MessageButton
                                recipientId={project.ownerId}
                                projectId={project._id}
                                style={{
                                    width: "100%", marginTop: 16, padding: "10px 0", borderRadius: 10,
                                    background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)",
                                    color: "#06B6D4", fontFamily: "'Space Grotesk',sans-serif",
                                    fontSize: 13, fontWeight: 700, transition: "all 0.2s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.15)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,0.08)"; }}
                            >
                                Message Project Lead
                            </MessageButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}