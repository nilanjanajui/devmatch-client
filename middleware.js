import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    const isAuthenticated = !!sessionCookie;
    const isDashboard = pathname.startsWith("/dashboard");
    const isProjectDetail = pathname.match(/^\/projects\/[^/]+$/); // ← ADD THIS
    const isAuthPage = pathname === "/login" || pathname === "/register";

    // Redirect unauthenticated users away from protected pages
    if ((isDashboard || isProjectDetail) && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from login/register
    if (isAuthPage && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/projects/:id", "/login", "/register"],
};