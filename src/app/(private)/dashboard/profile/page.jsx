"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Plus, X, Save, Briefcase, Quote } from "lucide-react";
import { toast } from "sonner";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

function ProfileForm({ profile }) {
    const { user } = useAuth();
    const qc = useQueryClient();

    const [form, setForm] = useState({
        bio:               profile?.bio               ?? "",
        title:             profile?.title             ?? "",
        location:          profile?.location          ?? "",
        github:            profile?.github            ?? "",
        linkedin:          profile?.linkedin          ?? "",
        portfolio:         profile?.portfolio         ?? "",
        skills:            profile?.skills            ?? [],
        experienceEntries: profile?.experienceEntries ?? [],
        testimonials:      profile?.testimonials      ?? [],
    });

    const [newSkill,       setNewSkill]       = useState({ name: "", level: "Intermediate" });
    const [newExp,         setNewExp]         = useState({ role: "", company: "", period: "", description: "" });
    const [newTestimonial, setNewTestimonial] = useState({ quote: "", authorName: "", authorRole: "" });
    const [saved,          setSaved]          = useState(false);

    const { mutate: saveProfile, isPending } = useMutation({
        mutationFn: () => axiosInstance.patch("/users/profile", form),
        onSuccess: () => {
            qc.invalidateQueries(["profile", user?.id]);
            toast.success("Profile saved.");
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        },
        onError: () => toast.error("Failed to save profile."),
    });

    // ── skill helpers
    const addSkill = () => {
        if (!newSkill.name.trim()) return;
        setForm(f => ({ ...f, skills: [...f.skills, { ...newSkill }] }));
        setNewSkill({ name: "", level: "Intermediate" });
    };
    const removeSkill = (i) =>
        setForm(f => ({ ...f, skills: f.skills.filter((_, idx) => idx !== i) }));

    // ── experience helpers
    const addExp = () => {
        if (!newExp.role.trim()) return;
        setForm(f => ({ ...f, experienceEntries: [...f.experienceEntries, { ...newExp }] }));
        setNewExp({ role: "", company: "", period: "", description: "" });
    };
    const removeExp = (i) =>
        setForm(f => ({ ...f, experienceEntries: f.experienceEntries.filter((_, idx) => idx !== i) }));

    // ── testimonial helpers
    const addTestimonial = () => {
        if (!newTestimonial.quote.trim()) return;
        setForm(f => ({ ...f, testimonials: [...f.testimonials, { ...newTestimonial }] }));
        setNewTestimonial({ quote: "", authorName: "", authorRole: "" });
    };
    const removeTestimonial = (i) =>
        setForm(f => ({ ...f, testimonials: f.testimonials.filter((_, idx) => idx !== i) }));

    // ── reusable text field
    const field = (label, key, placeholder, type = "text") => (
        <div>
            <label className="text-white/40 text-xs font-mono uppercase tracking-widest block mb-2">
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 resize-none transition-colors"
                />
            ) : (
                <input
                    type="text"
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                />
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#0d1421] border border-white/5 rounded-2xl p-6 space-y-6"
        >
            {/* ── Avatar row */}
            <div className="flex items-center gap-4">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-[#0a0f1a] font-bold text-2xl shrink-0"
                    style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                >
                    {(user?.name ?? "A").charAt(0)}
                </div>
                <div>
                    <p className="text-white font-mono font-semibold">{user?.name}</p>
                    <p className="text-white/30 text-xs font-mono">{user?.email}</p>
                </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* ── Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field("Job Title", "title",    "e.g. Full-Stack Engineer")}
                {field("Location",  "location", "e.g. San Francisco")}
            </div>
            {field("Bio", "bio", "Tell the community about yourself…", "textarea")}

            <div className="h-px bg-white/5" />

            {/* ── Links */}
            {field("GitHub URL",    "github",    "https://github.com/yourusername")}
            {field("LinkedIn URL",  "linkedin",  "https://linkedin.com/in/yourprofile")}
            {field("Portfolio URL", "portfolio", "https://yourportfolio.dev")}

            <div className="h-px bg-white/5" />

            {/* ── Skills */}
            <div>
                <label className="text-white/40 text-xs font-mono uppercase tracking-widest block mb-3">
                    Skills
                </label>

                <div className="flex flex-wrap gap-2 mb-4">
                    {form.skills.map((s, i) => (
                        <motion.div
                            key={i} layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1,   opacity: 1 }}
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

            <div className="h-px bg-white/5" />

            {/* ── Experience */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={14} className="text-[#00e5ff]" />
                    <label className="text-white/40 text-xs font-mono uppercase tracking-widest">
                        Experience
                    </label>
                </div>

                {/* Existing entries */}
                <div className="space-y-3 mb-4">
                    {form.experienceEntries.map((e, i) => (
                        <motion.div
                            key={i} layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-3"
                        >
                            <div className="min-w-0">
                                <p className="text-white/90 text-sm font-mono font-semibold">{e.role}</p>
                                <p className="text-[#00e5ff] text-xs font-mono">{e.company} · {e.period}</p>
                                {e.description && (
                                    <p className="text-white/40 text-xs font-mono mt-1 line-clamp-2">{e.description}</p>
                                )}
                            </div>
                            <button onClick={() => removeExp(i)} className="text-white/20 hover:text-red-400 transition-colors shrink-0 mt-0.5">
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Add new entry */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            value={newExp.role}
                            onChange={e => setNewExp(x => ({ ...x, role: e.target.value }))}
                            placeholder="Role (e.g. Senior Engineer)"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                        />
                        <input
                            value={newExp.company}
                            onChange={e => setNewExp(x => ({ ...x, company: e.target.value }))}
                            placeholder="Company"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                        />
                    </div>
                    <input
                        value={newExp.period}
                        onChange={e => setNewExp(x => ({ ...x, period: e.target.value }))}
                        placeholder="Period (e.g. 2021 — Present)"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                    />
                    <textarea
                        value={newExp.description}
                        onChange={e => setNewExp(x => ({ ...x, description: e.target.value }))}
                        placeholder="Brief description of your role…"
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 resize-none transition-colors"
                    />
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={addExp}
                        className="flex items-center gap-2 text-[#00e5ff] text-xs font-mono border border-[#00e5ff]/20 rounded-lg px-3 py-2 hover:bg-[#00e5ff]/10 transition-colors"
                    >
                        <Plus size={13} />
                        Add Entry
                    </motion.button>
                </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* ── Testimonials */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Quote size={14} className="text-[#00e5ff]" />
                    <label className="text-white/40 text-xs font-mono uppercase tracking-widest">
                        Testimonials
                    </label>
                </div>

                <div className="space-y-3 mb-4">
                    {form.testimonials.map((t, i) => (
                        <motion.div
                            key={i} layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-3"
                        >
                            <div className="min-w-0">
                                <p className="text-white/60 text-xs font-mono italic line-clamp-2">&quot;{t.quote}&quot;</p>
                                <p className="text-white/30 text-xs font-mono mt-1">— {t.authorName}, {t.authorRole}</p>
                            </div>
                            <button onClick={() => removeTestimonial(i)} className="text-white/20 hover:text-red-400 transition-colors shrink-0 mt-0.5">
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <textarea
                        value={newTestimonial.quote}
                        onChange={e => setNewTestimonial(x => ({ ...x, quote: e.target.value }))}
                        placeholder="What they said about you…"
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 resize-none transition-colors"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            value={newTestimonial.authorName}
                            onChange={e => setNewTestimonial(x => ({ ...x, authorName: e.target.value }))}
                            placeholder="Author name"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                        />
                        <input
                            value={newTestimonial.authorRole}
                            onChange={e => setNewTestimonial(x => ({ ...x, authorRole: e.target.value }))}
                            placeholder="Their role / company"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#00e5ff]/40 transition-colors"
                        />
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={addTestimonial}
                        className="flex items-center gap-2 text-[#00e5ff] text-xs font-mono border border-[#00e5ff]/20 rounded-lg px-3 py-2 hover:bg-[#00e5ff]/10 transition-colors"
                    >
                        <Plus size={13} />
                        Add Testimonial
                    </motion.button>
                </div>
            </div>

            {/* ── Save */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => saveProfile()}
                disabled={isPending}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold font-mono text-sm transition-all ${
                    saved
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-[#00e5ff] text-[#0a0f1a]"
                }`}
            >
                <Save size={15} />
                {saved ? "Saved!" : isPending ? "Saving…" : "Save Changes"}
            </motion.button>
        </motion.div>
    );
}

export default function ProfilePage() {
    const { user } = useAuth();

    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile", user?.id],
        queryFn: () => axiosInstance.get(`/users/${user.id}`).then(r => r.data),
        enabled: !!user?.id,
    });

    return (
        <div className="max-w-2xl mx-auto pt-10 md:pt-0">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-white font-mono mb-2"
            >
                Edit Profile
            </motion.h1>
            <p className="text-white/30 text-sm font-mono mb-8">
                How others see you on DevMatch.
            </p>

            {isLoading ? (
                <div className="bg-[#0d1421] border border-white/5 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse shrink-0" />
                        <div className="space-y-2 flex-1">
                            <div className="h-4 w-32 bg-white/5 rounded-lg animate-pulse" />
                            <div className="h-3 w-48 bg-white/5 rounded-lg animate-pulse" />
                        </div>
                    </div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                    <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
                    <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
                </div>
            ) : (
                <ProfileForm key={profile?._id} profile={profile} />
            )}
        </div>
    );
}