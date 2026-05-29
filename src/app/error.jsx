"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-sm"
            >
                <p className="text-red-400 font-mono text-xs mb-3 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 inline-block">
                    Something went wrong
                </p>
                <h2 className="text-white font-mono font-bold text-lg mb-2">
                    Unexpected error
                </h2>
                <p className="text-white/40 font-mono text-sm mb-6">
                    {error?.message ?? "An unknown error occurred."}
                </p>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={reset}
                    className="flex items-center gap-2 mx-auto bg-[#00e5ff] text-[#0a0f1a] font-bold font-mono text-sm px-5 py-2.5 rounded-xl"
                >
                    <RefreshCw size={14} />
                    Try again
                </motion.button>
            </motion.div>
        </div>
    );
}