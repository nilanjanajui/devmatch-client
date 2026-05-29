"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Plus, ChevronDown, Check, X, Clock } from "lucide-react";
import Link from "next/link";

function StatusBadge({ status }) {
    const map = {
        open: "bg-green-500/10  text-green-400  border-green-500/20",
        closed: "bg-red-500/10    text-red-400    border-red-500/20",
        draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
    return (
        <span className={`text-xs font-mono border rounded-full px-2.5 py-0.5 ${map[status] ?? map.draft}`}>
            {status}
        </span>
    );
}

function ApplicantCard({ app, projectId }) {
    const qc = useQueryClient();
    const { mutate: updateStatus } = useMutation({
        mutationFn: ({ id, status }) =>
            axiosInstance.patch(`/applications/${id}`, { status }),
        onSuccess: () => qc.invalidateQueries(["project-applicants", projectId]),
    });

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-4 py-3"
        >
            <div>
                {/* Name now links to their profile */}
                <Link href={`/developers/${app.applicantId}`}>
                    <p className="text-white text-sm font-mono hover:text-[#00e5ff] transition-colors cursor-pointer">
                        {app.applicantName ?? app.applicantId}
                    </p>
                </Link>
                <p className="text-white/40 text-xs font-mono mt-0.5">
                    {app.role} · {app.seniority}
                </p>
            </div>

            <div className="flex items-center gap-2">
                {app.status === "pending" ? (
                    <>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateStatus({ id: app._id, status: "accepted" })}
                            className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors"
                        >
                            <Check size={14} />
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateStatus({ id: app._id, status: "rejected" })}
                            className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                            <X size={14} />
                        </motion.button>
                    </>
                ) : (
                    <StatusBadge status={app.status} />
                )}
            </div>
        </motion.div>
    );
}

function ProjectRow({ project }) {
    const [open, setOpen] = useState(false);
    const { data: applicants } = useQuery({
        queryKey: ["project-applicants", project._id],
        queryFn: () =>
            axiosInstance.get(`/applications/project/${project._id}`).then(r => r.data),
        enabled: open,
    });

    return (
        <motion.div layout className="bg-[#0d1421] border border-white/5 rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div>
                        <p className="text-white font-mono text-sm font-semibold">{project.title}</p>
                        <p className="text-white/30 text-xs font-mono mt-0.5">{project.category} · {project.difficulty}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status={project.status ?? "open"} />
                    <span className="text-white/30 text-xs font-mono">{project.application_count ?? 0} applicants</span>
                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={16} className="text-white/30" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-3">
                            {!applicants ? (
                                <p className="text-white/30 text-xs font-mono">Loading applicants…</p>
                            ) : applicants.length === 0 ? (
                                <p className="text-white/30 text-xs font-mono">No applicants yet.</p>
                            ) : (
                                applicants.map(app => (
                                    <ApplicantCard key={app._id} app={app} projectId={project._id} />
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function MyProjects() {
    const { data: projects = [], isLoading } = useQuery({
        queryKey: ["my-projects"],
        queryFn: () => axiosInstance.get("/projects?mine=true").then(r => r.data),
    });

    return (
        <div className="max-w-4xl mx-auto pt-10 md:pt-0">
            <div className="flex items-center justify-between mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-bold text-white font-mono"
                >
                    My Projects
                </motion.h1>
                <Link href="/dashboard/projects/new">
                    <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 bg-[#00e5ff] text-[#0a0f1a] font-bold font-mono text-sm px-4 py-2.5 rounded-xl"
                    >
                        <Plus size={15} /> New Project
                    </motion.button>
                </Link>
            </div>

            {isLoading ? (
                <div className="text-white/30 font-mono text-sm">Loading projects…</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 text-white/20 font-mono">
                    <p className="text-lg">No projects yet.</p>
                    <p className="text-sm mt-2">Create your first project to start recruiting.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                        >
                            <ProjectRow project={p} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}