"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// /dashboard/projects/new → redirect to /dashboard/projects/create
export default function NewProjectRedirect() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/dashboard/projects/create");
    }, [router]);
    return null;
}