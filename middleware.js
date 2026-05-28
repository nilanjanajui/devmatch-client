import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    const isAuthenticated = !!sessionCookie;
    const isDashboard = pathname.startsWith("/dashboard");
    const isAuthPage = pathname === "/login" || pathname === "/register";

    // Redirect unauthenticated users away from dashboard
    if (isDashboard && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect authenticated users away from login/register
    if (isAuthPage && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};