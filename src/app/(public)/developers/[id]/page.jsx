"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Calendar, MapPin, ArrowUpRight, Briefcase, Code2 } from "lucide-react";
import { useDeveloper } from "@/hooks/useDeveloper";

// ── helpers ────────────────────────────────────────────────────────────────

function joinDate(iso) {
    if (!iso) return "Unknown";
    return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function fmtFollowers(n) {
    if (!n) return "0";
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}

function ordinal(n) {
    if (n === undefined || n === null || n === 0) return "—";
    const s = ["th","st","nd","rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ── icons ──────────────────────────────────────────────────────────────────

function GithubIcon({ size = 15 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.22.81 2.415 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
    );
}

function LinkedInIcon({ size = 15 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
    );
}

// ── atoms ──────────────────────────────────────────────────────────────────

function Avatar({ user, size = 110 }) {
    if (user?.image) {
        return (
            <Image src={user.image} alt={user.name} width={size} height={size}
                style={{ width: size, height: size, borderRadius: 14, objectFit: "cover", border: "2px solid rgba(0,229,255,0.25)", flexShrink: 0, display: "block" }} />
        );
    }
    return (
        <div style={{ width: size, height: size, borderRadius: 14, flexShrink: 0,
            background: "linear-gradient(135deg,#00e5ff,#7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#0a0f1a", fontWeight: 700, fontSize: Math.round(size * 0.38), fontFamily: "monospace",
            border: "2px solid rgba(0,229,255,0.25)" }}>
            {(user?.name ?? "?").charAt(0).toUpperCase()}
        </div>
    );
}

function Pill({ style: s }) {
    return <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, animation: "pulse 1.5s infinite", ...s }} />;
}

function ProfileSkeleton() {
    return (
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 24px" }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
            <Pill style={{ height: 165, borderRadius: 20, marginBottom: 12 }} />
            <Pill style={{ height: 100, borderRadius: 16, marginBottom: 12 }} />
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 12 }}>
                <div><Pill style={{ height: 220, borderRadius: 16, marginBottom: 12 }} /><Pill style={{ height: 260, borderRadius: 16 }} /></div>
                <div><Pill style={{ height: 280, borderRadius: 16, marginBottom: 12 }} /><Pill style={{ height: 360, borderRadius: 16 }} /></div>
            </div>
        </div>
    );
}

const CARD = { background: "#0d1421", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 22 };

function SectionTitle({ icon: Icon, label }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            {Icon && <Icon size={14} style={{ color: "#00e5ff" }} />}
            <span style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 14 }}>{label}</span>
        </div>
    );
}

function LinkBtn({ href, icon: Icon, label }) {
    if (!href) return null;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#00e5ff"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
            <Icon size={13} />{label}<ArrowUpRight size={11} />
        </a>
    );
}

// ── main ───────────────────────────────────────────────────────────────────

import { useState } from "react";

export default function DeveloperProfile() {
    const { id } = useParams();
    const { data: dev, isLoading, isError } = useDeveloper(id);

    if (isLoading) return <ProfileSkeleton />;
    if (isError || !dev) return (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <Code2 size={40} style={{ color: "rgba(255,255,255,0.15)" }} />
            <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace", fontSize: 14 }}>Developer not found.</p>
            <Link href="/explore">
                <button style={{ color: "#00e5ff", fontSize: 12, fontFamily: "monospace", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 99, padding: "8px 18px", background: "transparent", cursor: "pointer" }}>
                    ← Back to Explore
                </button>
            </Link>
        </div>
    );

    const stats    = dev.stats ?? {};
    const barSkills = (dev.skillProficiency ?? []).slice(0, 3);
    const tagSkills = dev.skillTags ?? [];
    const hasExp    = dev.experience?.length > 0;
    const hasTesti  = dev.testimonials?.length > 0;
    const hasProj   = dev.featuredProjects?.length > 0;

    return (
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 24px 80px" }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>

            {/* ══ HERO ══ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                style={{ ...CARD, borderRadius: 20, padding: "28px 32px", position: "relative", overflow: "hidden", marginBottom: 12 }}>

                <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, background: "rgba(0,229,255,0.05)", borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, background: "rgba(124,58,237,0.05)", borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none" }} />

                <div style={{ position: "relative", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                    <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Avatar user={dev} size={110} />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} style={{ flex: 1, minWidth: 200 }}>

                        {/* Name + PRO badge */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 700, fontFamily: "monospace", margin: 0 }}>{dev.name}</h1>
                            {dev.isPro && (
                                <span style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "3px 10px", color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em", fontWeight: 600 }}>
                                    PRO ACCOUNT
                                </span>
                            )}
                        </div>

                        {/* Title | Location */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                            <span style={{ color: "#00e5ff", fontSize: 14, fontFamily: "monospace" }}>
                                {dev.title || "Full-Stack Developer"}
                            </span>
                            {dev.location && (
                                <>
                                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>|</span>
                                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "monospace" }}>
                                        <MapPin size={13} />{dev.location}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Connect + Hire Me */}
                        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                            <button style={{ padding: "9px 22px", borderRadius: 8, fontSize: 13, fontFamily: "monospace", fontWeight: 600, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", transition: "all 0.2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.5)"; e.currentTarget.style.color = "#00e5ff"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}>
                                Connect
                            </button>
                            {dev.portfolio && (
                                <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                    <button style={{ padding: "9px 22px", borderRadius: 8, fontSize: 13, fontFamily: "monospace", fontWeight: 600, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.3)", color: "#00e5ff", cursor: "pointer", transition: "all 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.15)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,229,255,0.08)"; }}>
                                        Hire Me
                                    </button>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ══ STATS ══ */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12 }}>
                {[
                    { label: "Projects Completed", value: stats.projectsCompleted ?? 0 },
                    { label: "Collaborations",      value: stats.collaborations    ?? 0 },
                    { label: "Contribution Score",  value: ordinal(stats.contributionScore) },
                    { label: "Followers",           value: fmtFollowers(stats.followers) },
                ].map(({ label, value }) => (
                    <div key={label} style={{ ...CARD, textAlign: "center", padding: "16px 10px" }}>
                        <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>{label}</p>
                        <p style={{ color: "#fff", fontSize: 28, fontWeight: 700, fontFamily: "monospace", margin: 0 }}>{value}</p>
                    </div>
                ))}
            </motion.div>

            {/* ══ TWO-COLUMN ══ */}
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 12, alignItems: "start" }}>

                {/* ── LEFT ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                    {/* About */}
                    <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
                        style={CARD}>
                        <SectionTitle label="About" />
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: "monospace", lineHeight: 1.85, margin: "0 0 18px" }}>
                            {dev.bio || "No bio yet."}
                        </p>
                        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                            <LinkBtn href={dev.github}    icon={GithubIcon}   label="GitHub"   />
                            <LinkBtn href={dev.linkedin}  icon={LinkedInIcon} label="LinkedIn" />
                            <LinkBtn href={dev.portfolio} icon={Globe}        label="Portfolio"/>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, color: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "monospace" }}>
                            <Calendar size={12} />{joinDate(dev.createdAt)}
                        </div>
                    </motion.div>

                    {/* Tech Stack */}
                    {(barSkills.length > 0 || tagSkills.length > 0) && (
                        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.42 }}
                            style={CARD}>
                            <SectionTitle label="Tech Stack" />

                            {/* Progress bars */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: tagSkills.length > 0 ? 20 : 0 }}>
                                {barSkills.map((skill, i) => (
                                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 + i * 0.06 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                                            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontFamily: "monospace" }}>{skill.name}</span>
                                            <span style={{ color: "#00e5ff", fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{skill.proficiency}%</span>
                                        </div>
                                        <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.proficiency}%` }}
                                                transition={{ duration: 1, delay: 0.55 + i * 0.1, ease: "easeOut" }}
                                                style={{ height: "100%", background: "linear-gradient(90deg,#00e5ff,#7c3aed)", borderRadius: 99 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Tag chips */}
                            {tagSkills.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                                    {tagSkills.map((tag, i) => (
                                        <span key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 10px", color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "monospace" }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* ── RIGHT ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                    {/* Featured Projects */}
                    {hasProj && (
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
                            style={CARD}>
                            <SectionTitle label="Featured Projects" />
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {dev.featuredProjects.map((proj, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 + i * 0.07 }}
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s", cursor: "default" }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>

                                        {/* Banner */}
                                        {proj.image ? (
                                            <div style={{ height: 115, position: "relative", overflow: "hidden" }}>
                                                <Image src={proj.image} alt={proj.title} fill sizes="240px" style={{ objectFit: "cover" }} />
                                            </div>
                                        ) : (
                                            <div style={{ height: 115, background: "linear-gradient(135deg,rgba(0,229,255,0.07),rgba(124,58,237,0.07))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Code2 size={28} style={{ color: "rgba(255,255,255,0.1)" }} />
                                            </div>
                                        )}

                                        <div style={{ padding: "14px 14px 16px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                                                <h3 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 13, margin: 0, lineHeight: 1.3 }}>{proj.title}</h3>
                                                <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                                            </div>
                                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace", margin: "0 0 10px", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                                                {proj.description}
                                            </p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                                {(proj.tags ?? []).map((tag, ti) => (
                                                    <span key={ti} style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace", background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "2px 7px", letterSpacing: "0.04em" }}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Experience + Testimonials */}
                    {(hasExp || hasTesti) && (
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
                            style={CARD}>

                            {/* Experience timeline */}
                            {hasExp && (
                                <>
                                    <SectionTitle icon={Briefcase} label="Experience" />
                                    <div style={{ position: "relative", paddingLeft: 24, marginBottom: hasTesti ? 28 : 0 }}>
                                        <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 1, background: "rgba(255,255,255,0.08)" }} />
                                        {dev.experience.map((e, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                                                style={{ position: "relative", marginBottom: i < dev.experience.length - 1 ? 28 : 0 }}>
                                                <div style={{ position: "absolute", left: -20, top: 5, width: 12, height: 12, borderRadius: "50%", border: "2px solid rgba(0,229,255,0.5)", background: "#0d1421" }} />
                                                <h3 style={{ color: "#fff", fontFamily: "monospace", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{e.role}</h3>
                                                <p style={{ color: "#00e5ff", fontSize: 11, fontFamily: "monospace", margin: "0 0 7px", letterSpacing: "0.03em" }}>
                                                    {[e.company, e.period].filter(Boolean).join(" • ")}
                                                </p>
                                                {e.description && (
                                                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "monospace", lineHeight: 1.75, margin: 0 }}>{e.description}</p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Divider */}
                            {hasExp && hasTesti && (
                                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                            )}

                            {/* Testimonials */}
                            {hasTesti && (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: hasExp ? 0 : 0 }}>
                                    {dev.testimonials.map((t, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.07 }}
                                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 18 }}>
                                            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "monospace", fontStyle: "italic", lineHeight: 1.8, margin: "0 0 14px" }}>
                                                &ldquo;{t.quote}&rdquo;
                                            </p>
                                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#00e5ff,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a0f1a", fontWeight: 700, fontSize: 11, fontFamily: "monospace" }}>
                                                    {t.avatar || (t.author ?? "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "monospace", fontWeight: 600, margin: 0, lineHeight: 1 }}>{t.author}</p>
                                                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace", margin: "3px 0 0", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.role}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Empty state */}
                    {!hasProj && !hasExp && !hasTesti && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            style={{ ...CARD, textAlign: "center", padding: "60px 24px" }}>
                            <p style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace", fontSize: 13, margin: 0 }}>
                                This developer hasn&apos;t added any details yet.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}