"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/course/all")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1717a6] mb-6">Manage Courses</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((c: any) => (
          <Card key={c._id} className="shadow hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-[#1717a6]">{c.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">₹{c.price}</p>

              <Link
                href={`/admin/courses/${c._id}`}
                className="text-blue-600 underline"
              >
                Edit Content
              </Link>

              <Link
                href={`/admin/courses/insights/${c._id}`}
                className="text-green-600 underline"
              >
                View Insights
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
