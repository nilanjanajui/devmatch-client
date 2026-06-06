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
        beginner:     "text-green-400  border-green-500/20  bg-green-500/10",
        intermediate: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
        advanced:     "text-orange-400 border-orange-500/20 bg-orange-500/10",
        expert:       "text-red-400    border-red-500/20    bg-red-500/10",
    };
    return map[d?.toLowerCase()] ?? map.beginner;
}

const levelColor = {
    Beginner:     "#6ee7b7",
    Intermediate: "#2196f3",
    Advanced:     "#00bcd4",
    Senior:       "#7c3aed",
    Expert:       "#00e5ff",
};

// ── SVG icons ──────────────────────────────────────────────────────────────

function GithubIcon({ size = 16, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.22.81 2.415 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function LinkedInIcon({ size = 16, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

// ── sub-components ─────────────────────────────────────────────────────────

function Avatar({ user, size = "lg" }) {
    const dim = size === "lg" ? "w-24 h-24 text-3xl" : "w-10 h-10 text-sm";
    const dimensions = size === "lg" ? { width: 96, height: 96 } : { width: 40, height: 40 };
    if (user?.image) {
        return (
            <Image
                src={user.image}
                alt={user.name}
                width={dimensions.width}
                height={dimensions.height}
                className={`${dim} rounded-full object-cover ring-2 ring-[#00e5ff]/30`}
            />
        );
    }
    return (
        <div
            className={`${dim} rounded-full flex items-center justify-center font-bold font-mono ring-2 ring-[#00e5ff]/30`}
            style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)", color: "#0a0f1a" }}
        >
            {(user?.name ?? "?").charAt(0)}
        </div>
    );
}

function SkillChip({ skill }) {
    const color = levelColor[skill.level] ?? "#00e5ff";
    return (
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 transition-colors">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="text-white/90 text-xs font-mono font-medium">{skill.name}</span>
            <span className="text-white/35 text-xs font-mono">{skill.level}</span>
        </div>
    );
}

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.07 }}
        >
            <Link href={`/projects/${project._id}`}>
                <div className="group bg-[#0d1421] border border-white/5 rounded-2xl p-5 hover:border-[#00e5ff]/20 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[#00e5ff] text-xs font-mono bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-full px-2.5 py-0.5">
                                {project.category}
                            </span>
                            <span className={`text-xs font-mono border rounded-full px-2.5 py-0.5 ${difficultyColor(project.difficulty)}`}>
                                {project.difficulty}
                            </span>
                        </div>
                        <ArrowUpRight size={16} className="text-white/20 group-hover:text-[#00e5ff] transition-colors shrink-0 mt-0.5" />
                    </div>
                    <h3 className="text-white font-mono font-semibold text-sm mb-1 group-hover:text-[#00e5ff] transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-white/40 text-xs font-mono line-clamp-2 mb-4">{project.tagline}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {project.techStack?.slice(0, 4).map(tech => (
                            <span key={tech} className="text-white/50 text-xs font-mono bg-white/5 rounded-md px-2 py-0.5">
                                {tech}
                            </span>
                        ))}
                        {project.techStack?.length > 4 && (
                            <span className="text-white/30 text-xs font-mono px-1">
                                +{project.techStack.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function StatPill({ label, value }) {
    return (
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <span className="text-white font-bold font-mono text-2xl">{value}</span>
            <span className="text-white/40 text-xs font-mono mt-1">{label}</span>
        </div>
    );
}

function Skeleton({ className }) {
    return <div className={`bg-white/5 rounded-xl animate-pulse ${className}`} />;
}

function ProfileSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
            <div className="bg-[#0d1421] border border-white/5 rounded-3xl p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <Skeleton className="w-24 h-24 rounded-full shrink-0" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-full max-w-md" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
    );
}

// ── main page ──────────────────────────────────────────────────────────────

export default function DeveloperProfile() {
    const { id } = useParams();
    const { data: developer, isLoading, isError } = useDeveloper(id);

    if (isLoading) return <ProfileSkeleton />;

    if (isError || !developer) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Code2 size={40} className="text-white/20" />
                <p className="text-white/40 font-mono text-sm">Developer not found.</p>
                <Link href="/explore">
                    <button className="text-[#00e5ff] text-xs font-mono border border-[#00e5ff]/20 rounded-full px-4 py-2 hover:bg-[#00e5ff]/10 transition-colors">
                        ← Back to Explore
                    </button>
                </Link>
            </div>
        );
    }

    const skillCount   = developer.skills?.length ?? 0;
    const projectCount = developer.projects?.length ?? 0;
    const hasExp       = developer.experienceEntries?.length > 0;
    const hasTestimonials = developer.testimonials?.length > 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-5">

            {/* ── Hero Card ───────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0d1421] border border-white/5 rounded-3xl p-8 relative overflow-hidden"
            >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex flex-col sm:flex-row gap-6 items-start">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="shrink-0"
                    >
                        <Avatar user={developer} size="lg" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-white text-2xl font-bold font-mono">
                                {developer.name}
                            </h1>

                            {/* Title */}
                            <p className="text-[#00e5ff] text-sm font-mono mt-0.5">
                                {developer.title ||
                                    (developer.skills?.[0]
                                        ? `${developer.skills[0].level} ${developer.skills[0].name} Developer`
                                        : "Full-Stack Engineer")}
                            </p>

                            {/* Location */}
                            {developer.location && (
                                <p className="flex items-center gap-1.5 text-white/40 text-xs font-mono mt-1">
                                    <MapPin size={12} />
                                    {developer.location}
                                </p>
                            )}
                        </motion.div>

                        {/* Bio */}
                        {developer.bio && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.28 }}
                                className="text-white/50 text-sm font-mono mt-3 leading-relaxed max-w-xl"
                            >
                                {developer.bio}
                            </motion.p>
                        )}

                        {/* Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="flex flex-wrap items-center gap-4 mt-4"
                        >
                            {developer.github && (
                                <Link
                                    href={developer.github}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <a className="flex items-center gap-1.5 text-white/40 hover:text-[#00e5ff] text-xs font-mono transition-colors">
                                        <GithubIcon size={14} />
                                        GitHub
                                        <ArrowUpRight size={11} />
                                    </a>
                                </Link>
                            )}
                            {developer.linkedin && (
                                <Link
                                    href={developer.linkedin}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <a className="flex items-center gap-1.5 text-white/40 hover:text-[#00e5ff] text-xs font-mono transition-colors">
                                        <LinkedInIcon size={14} />
                                        LinkedIn
                                        <ArrowUpRight size={11} />
                                    </a>
                                </Link>
                            )}
                            {developer.portfolio && (
                                <Link
                                    href={developer.portfolio}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <a className="flex items-center gap-1.5 text-white/40 hover:text-[#00e5ff] text-xs font-mono transition-colors">
                                        <Globe size={14} />
                                        Portfolio
                                        <ArrowUpRight size={11} />
                                    </a>
                                </Link>
                            )}
                            <span className="flex items-center gap-1.5 text-white/30 text-xs font-mono">
                                <Calendar size={13} />
                                Joined {formatJoinDate(developer.createdAt)}
                            </span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── Stats row ───────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="flex flex-wrap gap-3"
            >
                <StatPill label="Projects" value={projectCount} />
                <StatPill label="Skills"   value={skillCount} />
                <StatPill label="Joined"   value={formatJoinDate(developer.createdAt).split(" ")[1]} />
            </motion.div>

            {/* ── Tech Stack ──────────────────────────────────────── */}
            {developer.skills?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-[#0d1421] border border-white/5 rounded-3xl p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Layers size={15} className="text-[#00e5ff]" />
                        <h2 className="text-white font-mono font-semibold text-sm">Tech Stack</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
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

            {/* ── Experience Timeline ─────────────────────────────── */}
            {hasExp && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="bg-[#0d1421] border border-white/5 rounded-3xl p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Briefcase size={15} className="text-[#00e5ff]" />
                        <h2 className="text-white font-mono font-semibold text-sm">Experience</h2>
                    </div>

                    <div className="relative pl-6 space-y-7">
                        {/* Vertical line */}
                        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-white/10" />

                        {developer.experienceEntries.map((entry, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.07 }}
                                className="relative"
                            >
                                {/* Dot */}
                                <div className="absolute -left-5.25 top-1.5 w-3 h-3 rounded-full border-2 border-[#00e5ff]/60 bg-[#0d1421]" />

                                <h3 className="text-white font-mono font-semibold text-sm">{entry.role}</h3>
                                <p className="text-[#00e5ff] text-xs font-mono mt-0.5">
                                    {entry.company}
                                    {entry.company && entry.period ? " · " : ""}
                                    {entry.period}
                                </p>
                                {entry.description && (
                                    <p className="text-white/50 text-xs font-mono mt-2 leading-relaxed">
                                        {entry.description}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Testimonials ────────────────────────────────────── */}
            {hasTestimonials && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#0d1421] border border-white/5 rounded-3xl p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Quote size={15} className="text-[#00e5ff]" />
                        <h2 className="text-white font-mono font-semibold text-sm">Testimonials</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {developer.testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 + i * 0.07 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5"
                            >
                                <p className="text-white/60 text-xs font-mono italic leading-relaxed">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-2 mt-4">
                                    <div
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#0a0f1a] font-bold text-xs shrink-0"
                                        style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                                    >
                                        {(t.authorName ?? "?").charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-xs font-mono font-semibold leading-none">
                                            {t.authorName}
                                        </p>
                                        <p className="text-white/30 text-xs font-mono mt-0.5">
                                            {t.authorRole}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Projects ────────────────────────────────────────── */}
            {developer.projects?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="bg-[#0d1421] border border-white/5 rounded-3xl p-6"
                >
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Code2 size={15} className="text-[#00e5ff]" />
                            <h2 className="text-white font-mono font-semibold text-sm">Projects</h2>
                        </div>
                        <Link href={`/explore?owner=${id}`}>
                            <span className="flex items-center gap-1 text-white/30 text-xs font-mono hover:text-[#00e5ff] transition-colors">
                                View all <ChevronRight size={13} />
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {developer.projects.map((project, i) => (
                            <ProjectCard key={project._id} project={project} index={i} />
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Empty state ─────────────────────────────────────── */}
            {!developer.skills?.length && !developer.projects?.length &&
             !hasExp && !hasTestimonials && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#0d1421] border border-white/5 rounded-3xl p-12 text-center"
                >
                    <p className="text-white/20 font-mono text-sm">
                        This developer hasn&apos;t added any details yet.
                    </p>
                </motion.div>
            )}
        </div>
    );
}