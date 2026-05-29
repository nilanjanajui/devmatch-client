"use client";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Pending" },
    accepted: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10  border-green-500/20", label: "Accepted" },
    rejected: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10    border-red-500/20", label: "Rejected" },
};

export default function MyApplications() {
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["my-applications"],
        queryFn: () => axiosInstance.get("/applications").then(r => r.data),
    });

    return (
        <div className="max-w-4xl mx-auto pt-10 md:pt-0">
            <motion.h1
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-white font-mono mb-2"
            >
                My Applications
            </motion.h1>
            <p className="text-white/30 text-sm font-mono mb-8">Track the status of projects you&apos;ve applied to.</p>

            {isLoading ? (
                <p className="text-white/30 font-mono text-sm">Loading…</p>
            ) : applications.length === 0 ? (
                <div className="text-center py-20 text-white/20 font-mono">
                    <p className="text-lg">No applications yet.</p>
                    <p className="text-sm mt-2">Explore projects and apply to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {applications.map((app, i) => {
                        const cfg = statusConfig[app.status] ?? statusConfig.pending;
                        const Icon = cfg.icon;
                        return (
                            <motion.div
                                key={app._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                className="bg-[#0d1421] border border-white/5 rounded-2xl px-5 py-4 flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-white font-mono text-sm font-semibold">{app.projectTitle ?? app.projectId}</p>
                                    <p className="text-white/30 text-xs font-mono mt-0.5">
                                        {app.role} · {app.seniority} · Applied {new Date(app.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={`flex items-center gap-2 text-xs font-mono border rounded-full px-3 py-1.5 ${cfg.bg} ${cfg.color}`}>
                                    <Icon size={12} />
                                    {cfg.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}