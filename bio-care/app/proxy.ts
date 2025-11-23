import { createProxy } from "next/server";
import jwt from "jsonwebtoken";

export const proxy = createProxy(async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;

  const publicRoutes = [
    "/", 
    "/login",
    "/signup",
    "/courses",
    "/contact"
  ];

  // Allow public routes
  if (publicRoutes.includes(path)) {
    return;
  }

  // Read cookies
  const token = request.cookies.get("token")?.value;

  // No token → redirect to login
  if (!token) {
    return Response.redirect(new URL("/login", request.url));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Admin routes
    if (path.startsWith("/admin") && !decoded.isAdmin) {
      return Response.redirect(new URL("/dashboard/student", request.url));
    }

    // Student routes
    if (path.startsWith("/dashboard/student") && decoded.isAdmin) {
      return Response.redirect(new URL("/admin", request.url));
    }
  } catch (e) {
    return Response.redirect(new URL("/login", request.url));
  }
});

// Which paths need proxy protection?
export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
