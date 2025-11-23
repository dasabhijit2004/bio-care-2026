"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

// Shadcn UI Sheet (for mobile menu)
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

export default function SiteHeader() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // Re-check user when route changes
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-[#1717a6]">
          Bio Care
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-[#1717a6]">Home</Link>
          <Link href="/courses" className="hover:text-[#1717a6]">Courses</Link>
          <Link href="/contact" className="hover:text-[#1717a6]">Contact</Link>

          {loading && <span className="text-xs text-muted-foreground">...</span>}

          {!loading && !user && (
            <>
              <Link href="/login" className="font-medium text-[#1717a6]">Login</Link>
              <Button asChild className="bg-[#1717a6] text-white rounded-full px-4 py-1">
                <Link href="/signup">Signup</Link>
              </Button>
            </>
          )}

          {!loading && user && !user.isAdmin && (
            <>
              <Link href="/practice" className="hover:text-[#1717a6]">Practice</Link>
              <Link href="/dashboard/student" className="hover:text-[#1717a6]">Dashboard</Link>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4"
              >
                Logout
              </Button>
            </>
          )}

          {!loading && user?.isAdmin && (
            <>
              <Link href="/admin" className="hover:text-[#1717a6]">Admin Panel</Link>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4"
              >
                Logout
              </Button>
            </>
          )}
        </nav>

        {/* MOBILE MENU (Hamburger) */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-[#1717a6]" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 p-2">
            <SheetHeader>
              <SheetTitle className="text-[#1717a6] font-bold">
                Bio Care
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-4 text-sm">

              <Link href="/" className="hover:text-[#1717a6]">Home</Link>
              <Link href="/courses" className="hover:text-[#1717a6]">Courses</Link>
              <Link href="/contact" className="hover:text-[#1717a6]">Contact</Link>

              {loading && <span className="text-xs text-muted-foreground">...</span>}

              {!loading && !user && (
                <>
                  <Link href="/login" className="hover:text-[#1717a6] font-medium">
                    Login
                  </Link>

                  <Button asChild className="bg-[#1717a6] text-white rounded-full">
                    <Link href="/signup">Signup</Link>
                  </Button>
                </>
              )}

              {/* Student */}
              {!loading && user && !user.isAdmin && (
                <>
                  <Link href="/practice" className="hover:text-[#1717a6]">Practice</Link>
                  <Link href="/dashboard/student" className="hover:text-[#1717a6]">
                    Dashboard
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                  >
                    Logout
                  </Button>
                </>
              )}

              {/* Admin */}
              {!loading && user?.isAdmin && (
                <>
                  <Link href="/admin" className="hover:text-[#1717a6]">
                    Admin Panel
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
