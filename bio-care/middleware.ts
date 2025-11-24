import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 1. Define Public Routes (Pages that don't need login)
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/courses",
    "/contact",
  ];

  // If the user is on a public route, let them pass immediately
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // 2. Read the token from cookies
  const token = request.cookies.get("token")?.value;

  // If no token exists, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // 3. Verify Token (using 'jose' for Edge compatibility)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Extract user role from the token payload
    // Note: TypeScript might complain if it doesn't know payload structure, 
    // but 'jose' returns a generic payload that works here.
    const isAdmin = payload.isAdmin;

    // 4. Role-Based Redirection Logic
    
    // CASE A: User tries to access /admin but is NOT an admin -> Send to Student Dashboard
    if (path.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    }

    // CASE B: User tries to access /dashboard/student but IS an admin -> Send to Admin Dashboard
    if (path.startsWith("/dashboard/student") && isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // If checks pass, allow the request
    return NextResponse.next();

  } catch (e) {
    // If token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// 5. Configuration: Define which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (svg, png, jpg, jpeg, gif, webp) -> THIS FIXES YOUR IMAGE ISSUE
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};