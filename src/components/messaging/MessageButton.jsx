"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

// Reusable "start a conversation" trigger.
// Drop it anywhere you already have another user's id in context
// (a project owner, a developer profile, an applicant, etc).
// Renders nothing if there's no valid recipient or the recipient is you.
export default function MessageButton({
    recipientId,
    projectId,
    style,
    className,
    onMouseEnter,
    onMouseLeave,
    children = "Message",
}) {
    const { user, isLoggedIn } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (!recipientId || (isLoggedIn && user?.id === recipientId)) return null;

    const handleClick = async () => {
        if (loading) return;

        if (!isLoggedIn) {
            router.push("/login?from=/dashboard/messages");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/conversations", { recipientId, projectId });
            router.push(`/dashboard/messages?conversationId=${data.id}`);
        } catch (err) {
            console.error("Failed to start conversation:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className={className}
            style={{ cursor: loading ? "wait" : "pointer", ...style }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {loading ? "Starting…" : children}
        </button>
    );
}