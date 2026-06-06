"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Plus, X, Save, Briefcase, Quote } from "lucide-react";
import { toast } from "sonner";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
    padding: "10px 16px", color: "#fff", fontSize: 13,
    fontFamily: "monospace", outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
};

const labelStyle = {
    color: "rgba(255,255,255,0.4)", fontSize: 11,
    fontFamily: "monospace", textTransform: "uppercase",
    letterSpacing: "0.1em", display: "block", marginBottom: 8,
};

function Field({ label, children }) {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            {children}
        </div>
    );
}

function TextInput({ value, onChange, placeholder, type = "text" }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
        />
    );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
        />
    );
}

const divider = <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "4px 0" }} />;

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
        collaborations:    profile?.collaborations    ?? 0,
        contributionScore: profile?.contributionScore ?? "",
        followers:         profile?.followers         ?? 0,
        skills:            profile?.skills            ?? [],
        experienceEntries: profile?.experienceEntries ?? [],
        testimonials:      profile?.testimonials      ?? [],
    });

    const [newSkill, setNewSkill] = useState({ name: "", level: "Intermediate", percentage: 80 });
    const [newExp,   setNewExp]   = useState({ role: "", company: "", period: "", description: "" });
    const [newTesti, setNewTesti] = useState({ quote: "", authorName: "", authorRole: "" });
    const [saved,    setSaved]    = useState(false);

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

    const addSkill = () => {
        if (!newSkill.name.trim()) return;
        setForm(f => ({ ...f, skills: [...f.skills, { ...newSkill, percentage: Number(newSkill.percentage) }] }));
        setNewSkill({ name: "", level: "Intermediate", percentage: 80 });
    };
    const removeSkill = (i) => setForm(f => ({ ...f, skills: f.skills.filter((_, idx) => idx !== i) }));

    const addExp = () => {
        if (!newExp.role.trim()) return;
        setForm(f => ({ ...f, experienceEntries: [...f.experienceEntries, { ...newExp }] }));
        setNewExp({ role: "", company: "", period: "", description: "" });
    };
    const removeExp = (i) => setForm(f => ({ ...f, experienceEntries: f.experienceEntries.filter((_, idx) => idx !== i) }));

    const addTesti = () => {
        if (!newTesti.quote.trim()) return;
        setForm(f => ({ ...f, testimonials: [...f.testimonials, { ...newTesti }] }));
        setNewTesti({ quote: "", authorName: "", authorRole: "" });
    };
    const removeTesti = (i) => setForm(f => ({ ...f, testimonials: f.testimonials.filter((_, idx) => idx !== i) }));

    const CARD = {
        background: "#0d1421", border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 16, padding: 24, marginBottom: 16,
        display: "flex", flexDirection: "column", gap: 20,
    };

    const sectionTitle = (label) => (
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
            {label}
        </p>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>

            {/* ── Identity ── */}
            <div style={CARD}>
                {sectionTitle("Identity")}
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "4px 0" }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#0a0f1a", fontWeight: 700, fontSize: 20, fontFamily: "monospace",
                    }}>
                        {(user?.name ?? "A").charAt(0)}
                    </div>
                    <div>
                        <p style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, margin: 0 }}>{user?.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "monospace", margin: "2px 0 0" }}>{user?.email}</p>
                    </div>
                </div>
                {divider}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Job Title">
                        <TextInput value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Full-Stack Engineer" />
                    </Field>
                    <Field label="Location">
                        <TextInput value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. San Francisco" />
                    </Field>
                </div>
                <Field label="Bio">
                    <TextArea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell the community about yourself…" />
                </Field>
            </div>

            {/* ── Links ── */}
            <div style={CARD}>
                {sectionTitle("Links")}
                <Field label="GitHub URL">
                    <TextInput value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} placeholder="https://github.com/username" />
                </Field>
                <Field label="LinkedIn URL">
                    <TextInput value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/profile" />
                </Field>
                <Field label="Portfolio URL">
                    <TextInput value={form.portfolio} onChange={e => setForm(f => ({ ...f, portfolio: e.target.value }))} placeholder="https://yourportfolio.dev" />
                </Field>
            </div>

            {/* ── Stats ── */}
            <div style={CARD}>
                {sectionTitle("Public Stats")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <Field label="Collaborations">
                        <TextInput type="number" value={form.collaborations} onChange={e => setForm(f => ({ ...f, collaborations: Number(e.target.value) }))} placeholder="12" />
                    </Field>
                    <Field label="Contribution Score">
                        <TextInput value={form.contributionScore} onChange={e => setForm(f => ({ ...f, contributionScore: e.target.value }))} placeholder="e.g. 98th" />
                    </Field>
                    <Field label="Followers">
                        <TextInput type="number" value={form.followers} onChange={e => setForm(f => ({ ...f, followers: Number(e.target.value) }))} placeholder="1200" />
                    </Field>
                </div>
            </div>

            {/* ── Skills ── */}
            <div style={CARD}>
                {sectionTitle("Skills")}

                {/* Existing */}
                {form.skills.map((s, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontFamily: "monospace" }}>{s.name}</span>
                                <span style={{ color: "#00e5ff", fontSize: 13, fontFamily: "monospace" }}>{s.percentage}%</span>
                            </div>
                            <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 99 }}>
                                <div style={{ height: "100%", width: `${s.percentage}%`, background: "linear-gradient(90deg, #00e5ff, #7c3aed)", borderRadius: 99 }} />
                            </div>
                            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace" }}>{s.level}</span>
                        </div>
                        <button onClick={() => removeSkill(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)", marginLeft: 12, padding: 4 }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}>
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}

                {/* Add new */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 8 }}>
                        <input value={newSkill.name} onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))}
                            onKeyDown={e => e.key === "Enter" && addSkill()}
                            placeholder="Skill name (e.g. React)" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }}
                            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                        <select value={newSkill.level} onChange={e => setNewSkill(s => ({ ...s, level: e.target.value }))}
                            style={{ ...inputStyle, width: "100%" }}>
                            {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <input type="number" min={0} max={100} value={newSkill.percentage}
                            onChange={e => setNewSkill(s => ({ ...s, percentage: e.target.value }))}
                            placeholder="%" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }}
                            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} onClick={addSkill}
                        style={{ display: "flex", alignItems: "center", gap: 6, color: "#00e5ff", fontSize: 12, fontFamily: "monospace", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 8, padding: "6px 12px", background: "transparent", cursor: "pointer", width: "fit-content" }}>
                        <Plus size={13} /> Add Skill
                    </motion.button>
                </div>
            </div>

            {/* ── Experience ── */}
            <div style={CARD}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Briefcase size={14} style={{ color: "#00e5ff" }} />
                    {sectionTitle("Experience")}
                </div>

                {form.experienceEntries.map((e, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px" }}>
                        <div>
                            <p style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 13, margin: "0 0 2px" }}>{e.role}</p>
                            <p style={{ color: "#00e5ff", fontSize: 12, fontFamily: "monospace", margin: "0 0 4px" }}>{e.company} · {e.period}</p>
                            {e.description && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace", margin: 0, lineHeight: 1.6 }}>{e.description}</p>}
                        </div>
                        <button onClick={() => removeExp(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)", flexShrink: 0 }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}>
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <input value={newExp.role} onChange={e => setNewExp(x => ({ ...x, role: e.target.value }))} placeholder="Role" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                        <input value={newExp.company} onChange={e => setNewExp(x => ({ ...x, company: e.target.value }))} placeholder="Company" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                    </div>
                    <input value={newExp.period} onChange={e => setNewExp(x => ({ ...x, period: e.target.value }))} placeholder="Period (e.g. 2021 — Present)" style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                    <textarea value={newExp.description} onChange={e => setNewExp(x => ({ ...x, description: e.target.value }))} placeholder="Brief description…" rows={2}
                        style={{ ...inputStyle, resize: "none" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                    <motion.button whileTap={{ scale: 0.97 }} onClick={addExp}
                        style={{ display: "flex", alignItems: "center", gap: 6, color: "#00e5ff", fontSize: 12, fontFamily: "monospace", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 8, padding: "6px 12px", background: "transparent", cursor: "pointer", width: "fit-content" }}>
                        <Plus size={13} /> Add Entry
                    </motion.button>
                </div>
            </div>

            {/* ── Testimonials ── */}
            <div style={CARD}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Quote size={14} style={{ color: "#00e5ff" }} />
                    {sectionTitle("Testimonials")}
                </div>

                {form.testimonials.map((t, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px" }}>
                        <div>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "monospace", fontStyle: "italic", margin: "0 0 6px", lineHeight: 1.6 }}>&quot;{t.quote}&quot;</p>
                            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace", margin: 0 }}>— {t.authorName}, {t.authorRole}</p>
                        </div>
                        <button onClick={() => removeTesti(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)", flexShrink: 0 }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}>
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                    <textarea value={newTesti.quote} onChange={e => setNewTesti(x => ({ ...x, quote: e.target.value }))} placeholder="What they said about you…" rows={2}
                        style={{ ...inputStyle, resize: "none" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <input value={newTesti.authorName} onChange={e => setNewTesti(x => ({ ...x, authorName: e.target.value }))} placeholder="Author name" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                        <input value={newTesti.authorRole} onChange={e => setNewTesti(x => ({ ...x, authorRole: e.target.value }))} placeholder="Their role / company" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,0.4)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} onClick={addTesti}
                        style={{ display: "flex", alignItems: "center", gap: 6, color: "#00e5ff", fontSize: 12, fontFamily: "monospace", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 8, padding: "6px 12px", background: "transparent", cursor: "pointer", width: "fit-content" }}>
                        <Plus size={13} /> Add Testimonial
                    </motion.button>
                </div>
            </div>

            {/* ── Save ── */}
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => saveProfile()} disabled={isPending}
                style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px", borderRadius: 12, fontWeight: 700, fontFamily: "monospace", fontSize: 14,
                    border: "none", cursor: "pointer", transition: "all 0.2s",
                    background: saved ? "rgba(34,197,94,0.1)" : "#00e5ff",
                    color: saved ? "#22c55e" : "#0a0f1a",
                }}>
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
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 80px" }}>
            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ color: "#fff", fontFamily: "monospace", fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>
                Edit Profile
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace", fontSize: 13, margin: "0 0 32px" }}>
                How others see you on DevMatch.
            </p>

            {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[96, 160, 100, 200, 220, 180].map((h, i) => (
                        <div key={i} style={{ height: h, background: "rgba(255,255,255,0.04)", borderRadius: 16, animation: "pulse 1.5s infinite" }} />
                    ))}
                    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
                </div>
            ) : (
                <ProfileForm key={profile?._id} profile={profile} />
            )}
        </div>
    );
}