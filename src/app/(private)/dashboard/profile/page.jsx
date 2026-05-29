"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Plus, X, Save } from "lucide-react";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function ProfilePage() {
    const { user } = useAuth();
    const qc = useQueryClient();

    const { data: profile } = useQuery({
        queryKey: ["profile", user?.id],
        queryFn: () => axiosInstance.get(`/users/${user.id}`).then(r => r.data),
        enabled: !!user?.id,
    });

    const [form, setForm] = useState({
        bio: profile?.bio ?? "",
        github: profile?.github ?? "",
        portfolio: profile?.portfolio ?? "",
        skills: profile?.skills ?? [],
    });
    const [newSkill, setNewSkill] = useState({ name: "", level: "Intermediate" });
    const [saved, setSaved] = useState(false);

    const { mutate: saveProfile, isPending } = useMutation({
        mutationFn: () => axiosInstance.patch("/users/profile", form),
        onSuccess: () => {
            qc.invalidateQueries(["profile", user?.id]);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        },
    });

    const addSkill = () => {
        if (!newSkill.name.trim()) return;
        setForm(f => ({ ...f, skills: [...f.skills, { ...newSkill }] }));
        setNewSkill({ name: "", level: "Intermediate" });
    };

    const removeSkill = (i) => {
        setForm(f => ({ ...f, skills: f.skills.filter((_, idx) => idx !== i) }));
    };

    const field = (label, key, placeholder, type = "text") => (
        <div>
            <label className="text-white/40 text-xs font-mono uppercase tracking-widest block mb-2">{label}</label>
            {key === "bio" ? (
                <textarea
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 resize-none transition-colors"
                />
            ) : (
                <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                />
            )}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto pt-10 md:pt-0">
            <motion.h1
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-white font-mono mb-2"
            >
                Edit Profile
            </motion.h1>
            <p className="text-white/30 text-sm font-mono mb-8">How others see you on DevMatch.</p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[#0d1421] border border-white/5 rounded-2xl p-6 space-y-6"
            >
                {/* Avatar row */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#00e5ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-2xl">
                        {(user?.name ?? "A").charAt(0)}
                    </div>
                    <div>
                        <p className="text-white font-mono font-semibold">{user?.name}</p>
                        <p className="text-white/30 text-xs font-mono">{user?.email}</p>
                    </div>
                </div>

                <div className="h-px bg-white/5" />

                {field("Bio", "bio", "Tell the community about yourself…")}
                {field("GitHub URL", "github", "https://github.com/yourusername")}
                {field("Portfolio URL", "portfolio", "https://yourportfolio.dev")}

                <div className="h-px bg-white/5" />

                {/* Skills */}
                <div>
                    <label className="text-white/40 text-xs font-mono uppercase tracking-widest block mb-3">Skills</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {form.skills.map((s, i) => (
                            <motion.div
                                key={i}
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                            >
                                <span className="text-white/80 text-xs font-mono">{s.name}</span>
                                <span className="text-white/30 text-xs font-mono">{s.level}</span>
                                <button onClick={() => removeSkill(i)} className="text-white/20 hover:text-red-400 transition-colors">
                                    <X size={12} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={newSkill.name}
                            onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))}
                            onKeyDown={e => e.key === "Enter" && addSkill()}
                            placeholder="e.g. React"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                        />
                        <select
                            value={newSkill.level}
                            onChange={e => setNewSkill(s => ({ ...s, level: e.target.value }))}
                            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                        >
                            {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={addSkill}
                            className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-center justify-center text-[#00e5ff] hover:bg-[#00e5ff]/20 transition-colors shrink-0"
                        >
                            <Plus size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Save */}
                <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => saveProfile()}
                    disabled={isPending}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold font-mono text-sm transition-all ${saved
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-[#00e5ff] text-[#0a0f1a]"
                        }`}
                >
                    <Save size={15} />
                    {saved ? "Saved!" : isPending ? "Saving…" : "Save Changes"}
                </motion.button>
            </motion.div>
        </div>
    );
}