"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PracticePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/student/enrolled");
      const data = await res.json();
      setCourses(data.courses || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading)
    return (
      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-40 w-full rounded-md" />
          </Card>
        ))}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Practice
        </h1>

        <p className="text-muted-foreground mt-1">
          Select a course to start learning and practicing questions.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course._id} href={`/practice/${course._id}`}>
            <Card className="shadow hover:shadow-lg transition-all border rounded-xl overflow-hidden group cursor-pointer">
              <div className="relative h-44 md:h-52 overflow-hidden">
                <Image
                  src={course.thumbnail || "/placeholder.png"}
                  alt="Course"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg md:text-xl font-semibold text-[#1717a6] group-hover:text-indigo-700 transition">
                  {course.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Start practicing questions from this course.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
