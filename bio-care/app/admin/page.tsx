"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#1717a6]">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/students">
          <Card className="cursor-pointer hover:shadow-md transition shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1717a6]">Pending Students</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Approve or reject newly registered students.
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/courses/create">
          <Card className="cursor-pointer hover:shadow-md transition shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1717a6]">Create Course</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Add new courses with chapters, videos, PDFs, quizzes.
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/courses">
          <Card className="cursor-pointer hover:shadow-md transition shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1717a6]">Manage Courses</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Update course content, view insights & enrolled students.
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
