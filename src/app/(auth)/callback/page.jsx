"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackInner() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const next = searchParams.get("next") || "/";
        // Set the auth_status cookie so middleware + private layout know the user is logged in.
        // max-age=604800 = 7 days (matches typical session length)
        document.cookie = "auth_status=1; path=/; max-age=604800; SameSite=Lax";
        router.replace(next);
    }, [router, searchParams]);

    return null;
}

export default function CallbackPage() {
    return (
        <Suspense fallback={null}>
            <CallbackInner />
        </Suspense>
    );
}

export const dynamic = "force-dynamic";