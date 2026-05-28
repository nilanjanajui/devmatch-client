"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BADGE = (index) => {
    if (index % 4 === 0) return "ACTIVE";
    if (index % 4 === 1) return "HOT";
    return null;
};

const Tag = ({ label }) => (
    <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.55)",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 4, padding: "2px 7px",
    }}>
        {label.toUpperCase()}
    </span>
);

export default function ProjectCard({ project, index }) {
    const badge = BADGE(index);
    const showDeadline = index % 2 !== 0 && project.deadline;
    const daysLeft = project.deadline
        ? Math.max(0, Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
        : null;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={{ y: -6, boxShadow: "0 28px 56px rgba(0,0,0,0.4)", borderColor: "rgba(59,130,246,0.25)" }}
            style={{
                background: "#0a0e1e",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, overflow: "hidden",
                display: "flex", flexDirection: "column",
            }}
        >
            {/* Image */}
            <div style={{ position: "relative", height: 190, flexShrink: 0 }}>
                <Image
                    src={project.image || `https://picsum.photos/seed/${project._id}/800/400`}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover", opacity: 0.82 }}
                />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 40%, rgba(10,14,30,0.95) 100%)",
                }} />
                {badge && (
                    <div style={{
                        position: "absolute", top: 12, right: 12,
                        padding: "4px 11px", borderRadius: 6,
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                        ...(badge === "ACTIVE"
                            ? { background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.45)", color: "#06B6D4" }
                            : { background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.45)", color: "#F97316" }
                        ),
                    }}>
                        {badge}
                    </div>
                )}
            </div>

            {/* Body */}
            <div style={{ padding: "16px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>

                {/* Tech Stack Tags */}
                <div style={{ display: "flex", gap: 6, marginBottom: 11, flexWrap: "wrap" }}>
                    {(project.techStack || []).slice(0, 3).map((t) => <Tag key={t} label={t} />)}
                </div>

                {/* Title */}
                <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.3,
                }}>
                    {project.title}
                </h3>

                {/* Description */}
                <p style={{
                    fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
                    marginBottom: 16, flex: 1,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                    {project.description}
                </p>

                {/* Lead + Stat */}
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: 14,
                }}>
                    {/* Owner */}
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: "rgba(59,130,246,0.18)", border: "1.5px solid rgba(59,130,246,0.35)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12, fontWeight: 700, color: "#3B82F6", flexShrink: 0,
                        }}>
                            {project.ownerName?.[0] ?? "D"}
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.3 }}>
                                {project.ownerName}
                            </div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                                {project.rolesNeeded?.[0] ?? "Project Lead"}
                            </div>
                        </div>
                    </div>

                    {/* Applicants or Deadline */}
                    <div style={{ textAlign: "right" }}>
                        {showDeadline && daysLeft !== null ? (
                            <>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>
                                    DEADLINE
                                </div>
                                <div style={{
                                    fontSize: 14, fontWeight: 700,
                                    color: daysLeft <= 7 ? "#F97316" : "#F59E0B",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                }}>
                                    {daysLeft} DAYS
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>
                                    APPLICANTS
                                </div>
                                <div style={{
                                    fontSize: 14, fontWeight: 700, color: "#06B6D4",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                }}>
                                    {project.application_count ?? 0} / {project.teamSize ?? 5}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* View Details Button */}
                <Link href={`/projects/${project._id}`} style={{ textDecoration: "none" }}>
                    <motion.div
                        whileHover={{ borderColor: "rgba(59,130,246,0.45)", background: "rgba(59,130,246,0.07)" }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            textAlign: "center", padding: "10px 0", borderRadius: 8,
                            border: "1px solid rgba(255,255,255,0.1)",
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                            color: "rgba(255,255,255,0.7)",
                            background: "rgba(255,255,255,0.03)",
                            cursor: "pointer",
                        }}
                    >
                        VIEW DETAILS
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
}