"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackInner() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const next = searchParams.get("next") || "/";
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
