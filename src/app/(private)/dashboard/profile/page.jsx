"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Plus, X, Save, Briefcase, Quote, Layers, Star } from "lucide-react";
import { toast } from "sonner";

// ── shared styles ──────────────────────────────────────────────────────────
const inp = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
    padding: "10px 14px", color: "#fff", fontSize: 13,
    fontFamily: "monospace", outline: "none", boxSizing: "border-box",
};
const focusOn = e => { e.target.style.borderColor = "rgba(0,229,255,0.45)"; };
const focusOff = e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; };

function Input({ value, onChange, placeholder, type = "text" }) {
    return <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={inp} onFocus={focusOn} onBlur={focusOff} />;
}
function Textarea({ value, onChange, placeholder, rows = 3 }) {
    return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        style={{ ...inp, resize: "none" }} onFocus={focusOn} onBlur={focusOff} />;
}
function Label({ text }) {
    return <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 7px" }}>{text}</p>;
}
function Field({ label, children }) {
    return <div><Label text={label} />{children}</div>;
}
const HR = () => <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "4px 0" }} />;

function Card({ children, style: s }) {
    return (
        <div style={{ background: "#0d1421", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 18, marginBottom: 14, ...s }}>
            {children}
        </div>
    );
}

function SectionHead({ icon: Icon, label }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon size={14} style={{ color: "#00e5ff" }} />
            <Label text={label} />
        </div>
    );
}

function AddBtn({ onClick, label }) {
    return (
        <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, color: "#00e5ff", fontSize: 12, fontFamily: "monospace", background: "transparent", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            <Plus size={13} /> {label}
        </button>
    );
}

function RemoveBtn({ onClick }) {
    return (
        <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)", padding: 4, flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}>
            <X size={14} />
        </button>
    );
}

// ── form component ─────────────────────────────────────────────────────────
function ProfileForm({ profile }) {
    const { user } = useAuth();
    const qc = useQueryClient();

    const [form, setForm] = useState({
        bio: profile?.bio ?? "",
        title: profile?.title ?? "",
        location: profile?.location ?? "",
        github: profile?.github ?? "",
        linkedin: profile?.linkedin ?? "",
        portfolio: profile?.portfolio ?? "",
        isPro: profile?.isPro ?? false,
        stats: {
            projectsCompleted: profile?.stats?.projectsCompleted ?? 0,
            collaborations: profile?.stats?.collaborations ?? 0,
            contributionScore: profile?.stats?.contributionScore ?? 0,
            followers: profile?.stats?.followers ?? 0,
        },
        skillProficiency: profile?.skillProficiency ?? [],
        skillTags: profile?.skillTags ?? [],
        experience: profile?.experience ?? [],
        featuredProjects: profile?.featuredProjects ?? [],
        testimonials: profile?.testimonials ?? [],
    });

    // new-item drafts
    const [newSkill, setNewSkill] = useState({ name: "", proficiency: 85 });
    const [newTag, setNewTag] = useState("");
    const [newExp, setNewExp] = useState({ role: "", company: "", period: "", description: "" });
    const [newProj, setNewProj] = useState({ title: "", description: "", tags: "", image: "" });
    const [newTesti, setNewTesti] = useState({ quote: "", author: "", role: "", avatar: "" });
    const [saved, setSaved] = useState(false);

    const { mutate: save, isPending } = useMutation({
        mutationFn: () => axiosInstance.patch("/users/profile", form),
        onSuccess: () => {
            qc.invalidateQueries(["profile", user?.id]);
            toast.success("Profile saved.");
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        },
        onError: () => toast.error("Failed to save profile."),
    });

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
    const setStat = (key, val) => setForm(f => ({ ...f, stats: { ...f.stats, [key]: Number(val) } }));

    // skill proficiency
    const addSkill = () => {
        if (!newSkill.name.trim()) return;
        set("skillProficiency", [...form.skillProficiency, { ...newSkill, proficiency: Number(newSkill.proficiency) }]);
        setNewSkill({ name: "", proficiency: 85 });
    };
    const removeSkill = i => set("skillProficiency", form.skillProficiency.filter((_, idx) => idx !== i));

    // skill tags
    const addTag = () => {
        if (!newTag.trim()) return;
        set("skillTags", [...form.skillTags, newTag.trim()]);
        setNewTag("");
    };
    const removeTag = i => set("skillTags", form.skillTags.filter((_, idx) => idx !== i));

    // experience
    const addExp = () => {
        if (!newExp.role.trim()) return;
        set("experience", [...form.experience, { ...newExp }]);
        setNewExp({ role: "", company: "", period: "", description: "" });
    };
    const removeExp = i => set("experience", form.experience.filter((_, idx) => idx !== i));

    // featured projects
    const addProj = () => {
        if (!newProj.title.trim()) return;
        const tags = newProj.tags.split(",").map(t => t.trim().toUpperCase()).filter(Boolean);
        set("featuredProjects", [...form.featuredProjects, { ...newProj, tags }]);
        setNewProj({ title: "", description: "", tags: "", image: "" });
    };
    const removeProj = i => set("featuredProjects", form.featuredProjects.filter((_, idx) => idx !== i));

    // testimonials
    const addTesti = () => {
        if (!newTesti.quote.trim()) return;
        const initials = newTesti.author.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
        set("testimonials", [...form.testimonials, { ...newTesti, avatar: newTesti.avatar || initials }]);
        setNewTesti({ quote: "", author: "", role: "", avatar: "" });
    };
    const removeTesti = i => set("testimonials", form.testimonials.filter((_, idx) => idx !== i));

    return (
        <div>
            {/* ── Identity ── */}
            <Card>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a0f1a", fontWeight: 700, fontSize: 20, fontFamily: "monospace", flexShrink: 0 }}>
                        {(user?.name ?? "A").charAt(0)}
                    </div>
                    <div>
                        <p style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, margin: 0 }}>{user?.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "monospace", margin: "2px 0 0" }}>{user?.email}</p>
                    </div>
                    <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <input type="checkbox" checked={form.isPro} onChange={e => set("isPro", e.target.checked)} style={{ accentColor: "#00e5ff", width: 14, height: 14 }} />
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "monospace" }}>PRO Account</span>
                    </label>
                </div>
                <HR />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Job Title"><Input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Full-Stack Engineer" /></Field>
                    <Field label="Location"> <Input value={form.location} onChange={e => set("location", e.target.value)} placeholder="e.g. San Francisco" /></Field>
                </div>
                <Field label="Bio"><Textarea value={form.bio} onChange={e => set("bio", e.target.value)} placeholder="Tell the community about yourself…" /></Field>
            </Card>

            {/* ── Links ── */}
            <Card>
                <Label text="Links" />
                <Field label="GitHub">   <Input value={form.github} onChange={e => set("github", e.target.value)} placeholder="https://github.com/username" /></Field>
                <Field label="LinkedIn"> <Input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/profile" /></Field>
                <Field label="Portfolio"><Input value={form.portfolio} onChange={e => set("portfolio", e.target.value)} placeholder="https://yourportfolio.dev" /></Field>
            </Card>

            {/* ── Stats ── */}
            <Card>
                <Label text="Public Stats" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Projects Completed">  <Input type="number" value={form.stats.projectsCompleted} onChange={e => setStat("projectsCompleted", e.target.value)} placeholder="0" /></Field>
                    <Field label="Collaborations">      <Input type="number" value={form.stats.collaborations} onChange={e => setStat("collaborations", e.target.value)} placeholder="0" /></Field>
                    <Field label="Contribution Score">  <Input type="number" value={form.stats.contributionScore} onChange={e => setStat("contributionScore", e.target.value)} placeholder="0" /></Field>
                    <Field label="Followers">           <Input type="number" value={form.stats.followers} onChange={e => setStat("followers", e.target.value)} placeholder="0" /></Field>
                </div>
            </Card>

            {/* ── Skill Proficiency ── */}
            <Card>
                <SectionHead icon={Layers} label="Skill Proficiency (Progress Bars)" />

                {form.skillProficiency.map((s, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 14px" }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "monospace" }}>{s.name}</span>
                                <span style={{ color: "#00e5ff", fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{s.proficiency}%</span>
                            </div>
                            <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 99 }}>
                                <div style={{ height: "100%", width: `${s.proficiency}%`, background: "linear-gradient(90deg,#00e5ff,#7c3aed)", borderRadius: 99 }} />
                            </div>
                        </div>
                        <RemoveBtn onClick={() => removeSkill(i)} />
                    </motion.div>
                ))}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 90px auto", gap: 8, alignItems: "end" }}>
                    <Field label="Skill Name"><Input value={newSkill.name} onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && addSkill()} placeholder="e.g. Rust" /></Field>
                    <Field label="% (0–100)"><Input type="number" value={newSkill.proficiency} onChange={e => setNewSkill(s => ({ ...s, proficiency: e.target.value }))} placeholder="85" /></Field>
                    <AddBtn onClick={addSkill} label="Add" />
                </div>
            </Card>

            {/* ── Skill Tags ── */}
            <Card>
                <SectionHead icon={Star} label="Skill Tags (Chips)" />

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {form.skillTags.map((tag, i) => (
                        <motion.div key={i} layout initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 10px" }}>
                            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "monospace" }}>{tag}</span>
                            <button onClick={() => removeTag(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.25)", padding: 0, lineHeight: 1 }}
                                onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}>
                                <X size={11} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                    <Input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === "Enter" && addTag()} placeholder="e.g. Docker" />
                    <AddBtn onClick={addTag} label="Add" />
                </div>
            </Card>

            {/* ── Experience ── */}
            <Card>
                <SectionHead icon={Briefcase} label="Experience" />

                {form.experience.map((e, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                        <div>
                            <p style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 13, margin: "0 0 3px" }}>{e.role}</p>
                            <p style={{ color: "#00e5ff", fontSize: 11, fontFamily: "monospace", margin: "0 0 5px" }}>{e.company} · {e.period}</p>
                            {e.description && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace", margin: 0, lineHeight: 1.6 }}>{e.description}</p>}
                        </div>
                        <RemoveBtn onClick={() => removeExp(i)} />
                    </motion.div>
                ))}

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <Input value={newExp.role} onChange={e => setNewExp(x => ({ ...x, role: e.target.value }))} placeholder="Role" />
                        <Input value={newExp.company} onChange={e => setNewExp(x => ({ ...x, company: e.target.value }))} placeholder="Company" />
                    </div>
                    <Input value={newExp.period} onChange={e => setNewExp(x => ({ ...x, period: e.target.value }))} placeholder="Period (e.g. 2022 — Present)" />
                    <Textarea value={newExp.description} onChange={e => setNewExp(x => ({ ...x, description: e.target.value }))} placeholder="Brief description…" rows={2} />
                    <AddBtn onClick={addExp} label="Add Entry" />
                </div>
            </Card>

            {/* ── Featured Projects ── */}
            <Card>
                <Label text="Featured Projects" />

                {form.featuredProjects.map((p, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ minWidth: 0 }}>
                            <p style={{ color: "#fff", fontFamily: "monospace", fontWeight: 600, fontSize: 13, margin: "0 0 3px" }}>{p.title}</p>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace", margin: "0 0 6px", lineHeight: 1.5 }}>{p.description}</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                {(p.tags ?? []).map((t, ti) => (
                                    <span key={ti} style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "monospace", background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "2px 7px" }}>{t}</span>
                                ))}
                            </div>
                        </div>
                        <RemoveBtn onClick={() => removeProj(i)} />
                    </motion.div>
                ))}

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <Input value={newProj.title} onChange={e => setNewProj(x => ({ ...x, title: e.target.value }))} placeholder="Project Title" />
                    <Textarea value={newProj.description} onChange={e => setNewProj(x => ({ ...x, description: e.target.value }))} placeholder="Short description…" rows={2} />
                    <Input value={newProj.tags} onChange={e => setNewProj(x => ({ ...x, tags: e.target.value }))} placeholder="Tags (comma-separated, e.g. RUST, GO, LINUX)" />
                    <Input value={newProj.image} onChange={e => setNewProj(x => ({ ...x, image: e.target.value }))} placeholder="Banner image URL" />
                    <AddBtn onClick={addProj} label="Add Project" />
                </div>
            </Card>

            {/* ── Testimonials ── */}
            <Card>
                <SectionHead icon={Quote} label="Testimonials" />

                {form.testimonials.map((t, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                        <div>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "monospace", fontStyle: "italic", margin: "0 0 6px", lineHeight: 1.65 }}>&quot;{t.quote}&quot;</p>
                            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace", margin: 0 }}>— {t.author}, {t.role}</p>
                        </div>
                        <RemoveBtn onClick={() => removeTesti(i)} />
                    </motion.div>
                ))}

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <Textarea value={newTesti.quote} onChange={e => setNewTesti(x => ({ ...x, quote: e.target.value }))} placeholder="What they said about you…" rows={2} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <Input value={newTesti.author} onChange={e => setNewTesti(x => ({ ...x, author: e.target.value }))} placeholder="Author name" />
                        <Input value={newTesti.role} onChange={e => setNewTesti(x => ({ ...x, role: e.target.value }))} placeholder="Role, Company" />
                    </div>
                    <AddBtn onClick={addTesti} label="Add Testimonial" />
                </div>
            </Card>

            {/* ── Save ── */}
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => save()} disabled={isPending}
                style={{
                    width: "100%", padding: 14, borderRadius: 12, border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontWeight: 700, fontFamily: "monospace", fontSize: 14, transition: "all 0.2s",
                    background: saved ? "rgba(34,197,94,0.1)" : "#00e5ff",
                    color: saved ? "#22c55e" : "#0a0f1a",
                }}>
                <Save size={15} />
                {saved ? "Saved!" : isPending ? "Saving…" : "Save Changes"}
            </motion.button>
        </div>
    );
}

// ── page ───────────────────────────────────────────────────────────────────
export default function ProfilePage() {
    const { user } = useAuth();

    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile", user?.id],
        queryFn: () => axiosInstance.get(`/users/${user.id}`).then(r => r.data),
        enabled: !!user?.id,
    });

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px 100px" }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ color: "#fff", fontFamily: "monospace", fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>
                Edit Profile
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace", fontSize: 13, margin: "0 0 30px" }}>
                How others see you on DevMatch.
            </p>

            {isLoading
                ? <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[80, 160, 120, 200, 160, 220, 180, 180].map((h, i) => (
                        <div key={i} style={{ height: h, background: "rgba(255,255,255,0.04)", borderRadius: 16, animation: "pulse 1.5s infinite" }} />
                    ))}
                </div>
                : <ProfileForm key={profile?._id} profile={profile} />
            }
        </div>
    );
}