import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 1. Define Public Routes
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/courses",
    "/contact",
  ];

  // If it's a public route, let them pass
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // 2. Read the token
  const token = request.cookies.get("token")?.value;

  // No token? Redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // 3. Verify Token (using 'jose' for Edge compatibility)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Payload contains your data (e.g., isAdmin)
    const isAdmin = payload.isAdmin;

    // 4. Admin vs Student Redirection Logic
    
    // If user tries to go to /admin but is NOT an admin -> Send to Student Dashboard
    if (path.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    }

    // If user tries to go to /dashboard/student but IS an admin -> Send to Admin Dashboard
    if (path.startsWith("/dashboard/student") && isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Allow request to proceed
    return NextResponse.next();

  } catch (e) {
    // Token invalid or expired -> Redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Configure which paths this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};