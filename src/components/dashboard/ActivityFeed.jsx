"use client";
import { motion } from "framer-motion";
import { Users, RefreshCw, Code2, MessageSquare } from "lucide-react";

const iconMap = {
    join: Users,
    approved: RefreshCw,
    pr: Code2,
    message: MessageSquare,
};

export default function ActivityFeed({ items = [] }) {
    return (
        <div className="bg-[#0d1421] border border-white/5 rounded-2xl p-5 h-full">
            <h3 className="text-white font-mono font-semibold text-sm mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {items.map((item, i) => {
                    const Icon = iconMap[item.type] || Code2;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i + 0.3 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Icon size={14} className="text-[#00e5ff]" />
                            </div>
                            <div>
                                <p className="text-white/80 text-xs font-mono leading-snug">{item.text}</p>
                                <p className="text-white/30 text-xs font-mono mt-0.5">{item.time}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            <button className="mt-5 w-full text-center text-xs font-mono text-white/30 border border-white/10 rounded-lg py-2 hover:border-[#00e5ff]/30 hover:text-[#00e5ff] transition-colors">
                View All History
            </button>
        </div>
    );
}