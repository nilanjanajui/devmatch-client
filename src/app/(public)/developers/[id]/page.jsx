"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Globe, Calendar, Layers,
    ArrowUpRight, ChevronRight, Code2,
    MapPin, Briefcase, Quote,
} from "lucide-react";
import { useDeveloper } from "@/hooks/useDeveloper";

// ── helpers ────────────────────────────────────────────────────────────────

function formatJoinDate(iso) {
    if (!iso) return "Unknown";
    return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function difficultyColor(d) {
    const map = {
        beginner:     { color: "#4ade80",  bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)"  },
        intermediate: { color: "#facc15",  bg: "rgba(250,204,21,0.1)",  border: "rgba(250,204,21,0.25)"  },
        hard:         { color: "#fb923c",  bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.25)"  },
        expert:       { color: "#f87171",  bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
    };
    return map[d?.toLowerCase()] ?? map.beginner;
}

const levelColor = {
    Beginner:     "#6ee7b7",
    Intermediate: "#3b82f6",
    Advanced:     "#00e5ff",
    Expert:       "#7c3aed",
};

// ── SVG icons ──────────────────────────────────────────────────────────────

function GithubIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.22.81 2.415 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function LinkedInIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

// ── sub-components ─────────────────────────────────────────────────────────

function Avatar({ user, size = 96 }) {
    if (user?.image) {
        return (
            <Image
                src={user.image}
                alt={user.name}
                width={size}
                height={size}
                style={{
                    width: size, height: size,
                    borderRadius: "50%", objectFit: "cover",
                    border: "2px solid rgba(0,229,255,0.3)",
                    flexShrink: 0, display: "block",
                }}
            />
        );
    }
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%",
            background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#0a0f1a", fontWeight: 700,
            fontSize: Math.round(size * 0.35), fontFamily: "monospace",
            border: "2px solid rgba(0,229,255,0.3)", flexShrink: 0,
        }}>
            {(user?.name ?? "?").charAt(0).toUpperCase()}
        </div>
    );
}

function SkillChip({ skill }) {
    const color = levelColor[skill.level] ?? "#00e5ff";
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999, padding: "8px 16px",
            transition: "border-color 0.2s",
        }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontFamily: "monospace", fontWeight: 500 }}>
                {skill.name}
            </span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "monospace" }}>
                {skill.level}
            </span>
        </div>
    );
}

function StatPill({ label, value }) {
    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: "16px 24px",
        }}>
            <span style={{ color: "#fff", fontWeight: 700, fontFamily: "monospace", fontSize: 22 }}>
                {value}
            </span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace", marginTop: 4 }}>
                {label}
            </span>
        </div>
    );
}

function LinkButton({ href, icon: Icon, label }) {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: "flex", alignItems: "center", gap: 6,
                color: "rgba(255,255,255,0.4)", fontSize: 12,
                fontFamily: "monospace", textDecoration: "none",
                transition: "color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#00e5ff"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
            <Icon size={13} />
            {label}
            <ArrowUpRight size={11} />
        </a>
    );
}

// ── skeleton ───────────────────────────────────────────────────────────────

function Pulse({ style }) {
    return (
        <div style={{
            background: "rgba(255,255,255,0.05)", borderRadius: 8,
            animation: "pulse 1.5s ease-in-out infinite",
            ...style,
        }} />
    );
}

function ProfileSkeleton() {
    return (
        <div style={{ maxWidth: 896, margin: "0 auto", padding: "48px 24px" }}>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
            <div style={{ background: "#0d1421", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 32, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 24 }}>
                    <Pulse style={{ width: 96, height: 96, borderRadius: "50%", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <Pulse style={{ height: 28, width: 200, marginBottom: 12 }} />
                        <Pulse style={{ height: 16, width: 140, marginBottom: 12 }} />
                        <Pulse style={{ height: 14, width: "90%", marginBottom: 8 }} />
                        <Pulse style={{ height: 14, width: "70%" }} />
                    </div>
                </div>
            </div>
            <Pulse style={{ height: 96, borderRadius: 16, marginBottom: 16 }} />
            <Pulse style={{ height: 200, borderRadius: 16 }} />
        </div>
    );
}

// ── card shell ─────────────────────────────────────────────────────────────

const CARD = {
    background: "#0d1421",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 24,
};

// ── main page ──────────────────────────────────────────────────────────────

export default function DeveloperProfile() {
    const { id } = useParams();
    const { data: developer, isLoading, isError } = useDeveloper(id);

    if (isLoading) return <ProfileSkeleton />;

    if (isError || !developer) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <Code2 size={40} style={{ color: "rgba(255,255,255,0.2)" }} />
                <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: 14 }}>
                    Developer not found.
                </p>
                <Link href="/explore">
                    <button style={{
                        color: "#00e5ff", fontSize: 13, fontFamily: "monospace",
                        border: "1px solid rgba(0,229,255,0.2)", borderRadius: 999,
                        padding: "8px 16px", background: "transparent", cursor: "pointer",
                    }}>
                        ← Back to Explore
                    </button>
                </Link>
            </div>
        );
    }

    const hasExp          = developer.experienceEntries?.length > 0;
    const hasTestimonials = developer.testimonials?.length > 0;
    const hasSkills       = developer.skills?.length > 0;
    const hasProjects     = developer.projects?.length > 0;
    const skillCount      = developer.skills?.length ?? 0;
    const projectCount    = developer.projects?.length ?? 0;

    return (
        <div style={{ maxWidth: 896, margin: "0 auto", padding: "48px 24px" }}>

            {/* ── Hero Card ───────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ ...CARD, position: "relative", overflow: "hidden", marginBottom: 12 }}
            >
                {/* Glow blobs */}
                <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, background: "rgba(0,229,255,0.05)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -80, left: -80, width: 260, height: 260, background: "rgba(124,58,237,0.05)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

                <div style={{ position: "relative", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                    {/* Avatar */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                    >
                        <Avatar user={developer} size={96} />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ flex: 1, minWidth: 220 }}
                    >
                        {/* Name */}
                        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, fontFamily: "monospace", margin: 0 }}>
                            {developer.name}
                        </h1>

                        {/* Title */}
                        <p style={{ color: "#00e5ff", fontSize: 14, fontFamily: "monospace", marginTop: 4, marginBottom: 0 }}>
                            {developer.title ||
                                (developer.skills?.[0]
                                    ? `${developer.skills[0].level} ${developer.skills[0].name} Developer`
                                    : "Full-Stack Developer")}
                        </p>

                        {/* Location */}
                        {developer.location && (
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                                <MapPin size={12} style={{ color: "rgba(255,255,255,0.35)" }} />
                                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "monospace" }}>
                                    {developer.location}
                                </span>
                            </div>
                        )}

                        {/* Bio */}
                        {developer.bio && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.28 }}
                                style={{
                                    color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "monospace",
                                    marginTop: 12, lineHeight: 1.7, maxWidth: 540,
                                }}
                            >
                                {developer.bio}
                            </motion.p>
                        )}

                        {/* Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16, alignItems: "center" }}
                        >
                            {developer.github   && <LinkButton href={developer.github}    icon={GithubIcon}   label="GitHub"    />}
                            {developer.linkedin  && <LinkButton href={developer.linkedin}   icon={LinkedInIcon} label="LinkedIn"  />}
                            {developer.portfolio && <LinkButton href={developer.portfolio}  icon={Globe}        label="Portfolio" />}
                            <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "monospace" }}>
                                <Calendar size={13} />
                                Joined {formatJoinDate(developer.createdAt)}
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Stats Row ───────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}
            >
                <StatPill label="Projects" value={projectCount} />
                <StatPill label="Skills"   value={skillCount}   />
                <StatPill label="Joined"   value={formatJoinDate(developer.createdAt).split(" ")[1]} />
            </motion.div>

            {/* ── Tech Stack ──────────────────────────────────── */}
            {hasSkills && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    style={{ ...CARD, marginBottom: 12 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                        <Layers size={15} style={{ color: "#00e5ff" }} />
                        <h2 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 14, margin: 0 }}>
                            Tech Stack
                        </h2>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                        {developer.skills.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.05 }}
                            >
                                <SkillChip skill={skill} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Experience Timeline ─────────────────────────── */}
            {hasExp && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    style={{ ...CARD, marginBottom: 12 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                        <Briefcase size={15} style={{ color: "#00e5ff" }} />
                        <h2 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 14, margin: 0 }}>
                            Experience
                        </h2>
                    </div>

                    {/* Timeline */}
                    <div style={{ position: "relative", paddingLeft: 24 }}>
                        {/* Vertical line */}
                        <div style={{
                            position: "absolute", left: 5, top: 8, bottom: 8,
                            width: 1, background: "rgba(255,255,255,0.08)",
                        }} />

                        {developer.experienceEntries.map((entry, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.07 }}
                                style={{
                                    position: "relative",
                                    marginBottom: i < developer.experienceEntries.length - 1 ? 28 : 0,
                                }}
                            >
                                {/* Dot */}
                                <div style={{
                                    position: "absolute", left: -20, top: 5,
                                    width: 12, height: 12, borderRadius: "50%",
                                    border: "2px solid rgba(0,229,255,0.6)",
                                    background: "#0d1421",
                                }} />

                                <h3 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 14, margin: "0 0 4px" }}>
                                    {entry.role}
                                </h3>
                                <p style={{ color: "#00e5ff", fontSize: 12, fontFamily: "monospace", margin: "0 0 6px" }}>
                                    {[entry.company, entry.period].filter(Boolean).join(" · ")}
                                </p>
                                {entry.description && (
                                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "monospace", lineHeight: 1.65, margin: 0 }}>
                                        {entry.description}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Testimonials ────────────────────────────────── */}
            {hasTestimonials && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ ...CARD, marginBottom: 12 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                        <Quote size={15} style={{ color: "#00e5ff" }} />
                        <h2 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 14, margin: 0 }}>
                            Testimonials
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                        {developer.testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 + i * 0.07 }}
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: 16, padding: 20,
                                }}
                            >
                                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "monospace", fontStyle: "italic", lineHeight: 1.75, margin: "0 0 16px" }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                        background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#0a0f1a", fontWeight: 700, fontSize: 11, fontFamily: "monospace",
                                    }}>
                                        {(t.authorName ?? "?").charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "monospace", fontWeight: 600, margin: 0, lineHeight: 1 }}>
                                            {t.authorName}
                                        </p>
                                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace", margin: "4px 0 0" }}>
                                            {t.authorRole}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Projects ────────────────────────────────────── */}
            {hasProjects && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    style={CARD}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Code2 size={15} style={{ color: "#00e5ff" }} />
                            <h2 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 14, margin: 0 }}>
                                Projects
                            </h2>
                        </div>
                        <Link href={`/explore?owner=${id}`} style={{ textDecoration: "none" }}>
                            <span style={{
                                display: "flex", alignItems: "center", gap: 4,
                                color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "monospace",
                                transition: "color 0.2s",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.color = "#00e5ff"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
                            >
                                View all <ChevronRight size={13} />
                            </span>
                        </Link>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                        {developer.projects.map((project, i) => {
                            const dc = difficultyColor(project.difficulty);
                            return (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.07 }}
                                >
                                    <Link href={`/projects/${project._id}`} style={{ textDecoration: "none" }}>
                                        <div
                                            style={{
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.07)",
                                                borderRadius: 16, padding: 20,
                                                cursor: "pointer",
                                                transition: "border-color 0.25s",
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)"; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                                    <span style={{ color: "#00e5ff", fontSize: 11, fontFamily: "monospace", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 999, padding: "2px 10px" }}>
                                                        {project.category}
                                                    </span>
                                                    <span style={{ color: dc.color, fontSize: 11, fontFamily: "monospace", background: dc.bg, border: `1px solid ${dc.border}`, borderRadius: 999, padding: "2px 10px" }}>
                                                        {project.difficulty}
                                                    </span>
                                                </div>
                                                <ArrowUpRight size={15} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                                            </div>
                                            <h3 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 13, margin: "0 0 6px" }}>
                                                {project.title}
                                            </h3>
                                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace", margin: "0 0 16px", lineHeight: 1.55, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                                                {project.tagline}
                                            </p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                                {project.techStack?.slice(0, 4).map(tech => (
                                                    <span key={tech} style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "monospace", background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "2px 8px" }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack?.length > 4 && (
                                                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace" }}>
                                                        +{project.techStack.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* ── Empty state ─────────────────────────────────── */}
            {!hasSkills && !hasProjects && !hasExp && !hasTestimonials && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ ...CARD, textAlign: "center", padding: "64px 24px" }}
                >
                    <p style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace", fontSize: 14 }}>
                        This developer hasn&apos;t added any details yet.
                    </p>
                </motion.div>
            )}
        </div>
    );
}