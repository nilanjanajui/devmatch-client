"use client";
import { createContext, useContext } from "react";
import { useSession, signOut } from "@/lib/authClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const { data: session, isPending } = useSession();

    const user = session?.user ?? null;
    const isLoggedIn = !!user;
    const isLoading = isPending;

    const logout = async () => {
        await signOut();
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Use this hook anywhere in the app instead of calling useSession() directly
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}