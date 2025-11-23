"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/students", label: "Pending Students" },
    { href: "/admin/courses/create", label: "Create Course" },
    { href: "/admin/courses", label: "Manage Courses" },
    { href: "/admin/quizzes", label: "Quizzes / Tests" },
    { href: "/admin/course-requests", label: "Course Requests" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-60 bg-white shadow-md border-r p-5 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#1717a6] mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`p-2 rounded-md font-medium transition ${
                path === l.href
                  ? "bg-[#1717a6] text-white"
                  : "text-[#1717a6] hover:bg-[#dff7d7]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
