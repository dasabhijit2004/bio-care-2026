"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1717a6]">Practice</h1>
      <p className="text-muted-foreground">
        Select your course to start learning.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Link key={course._id} href={`/practice/${course._id}`}>
            <Card className="shadow hover:shadow-md transition cursor-pointer">
              <CardHeader>
                <CardTitle className="text-[#1717a6]">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={course.thumbnail || "/placeholder.jpg"}
                  alt="Course"
                  width={500}
                  height={300}
                  className="rounded-md object-cover"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
