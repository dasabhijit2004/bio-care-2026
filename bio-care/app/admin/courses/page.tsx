"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/course/all")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#1717a6]">Manage Courses</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c: any) => (
          <Card
            key={c._id}
            className="shadow hover:shadow-lg transition-all duration-200 rounded-xl overflow-hidden"
          >
            <div className="relative h-40">
              <Image
                src={c.thumbnail || "/placeholder.jpg"}
                alt={c.title}
                fill
                className="object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-[#1717a6] text-lg">{c.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">₹ {c.price}</p>

              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="bg-[#1717a6] text-white w-full rounded-full"
                >
                  <Link href={`/admin/courses/${c._id}`}>Edit Content</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
