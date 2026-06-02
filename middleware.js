export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Use a lightweight client-set cookie (set on vercel.app domain, readable here)
    const authStatus = request.cookies.get("auth_status")?.value;
    const isAuthenticated = authStatus === "1";
    const isAuthPage = pathname === "/login" || pathname === "/register";

    // Logged-in users don't need to see login/register
    if (isAuthPage && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: [],
};