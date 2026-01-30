"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Check login + enrollment
        const meRes = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        const meData = await meRes.json();

        if (!meData.user) {
          toast.error("Please login first");
          router.push("/login");
          return;
        }

        const enrolled = meData.user.enrolledCourses?.some(
          (c: any) => c._id === courseId
        );

        if (!enrolled) {
          toast.error("You are not enrolled in this course");
          router.push("/courses");
          return;
        }

        // Load course
        const res = await fetch(`/api/student/course/${courseId}`);
        const data = await res.json();

        setCourse(data.course);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId, router]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!course) return <p className="p-6">Course not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1717a6]">
          {course.title}
        </h1>

        <Button asChild variant="outline">
          <Link href="/courses">← Back</Link>
        </Button>
      </div>

      {/* CHAPTERS */}
      <div className="space-y-4">

        {course.chapters.map((chap: any) => (
          <Card key={chap._id} className="shadow">
            <CardContent className="p-5 space-y-4">

              <h2 className="text-lg font-semibold text-[#1717a6]">
                {chap.title}
              </h2>

              {/* VIDEOS */}
              {chap.videos?.length > 0 && (
                <div>
                  <p className="font-medium mb-1">📺 Videos</p>

                  <div className="grid md:grid-cols-2 gap-3">
                    {chap.videos.map((v: any) => (
                      <a
                        key={v._id}
                        href={v.url}
                        target="_blank"
                        className="border rounded-md p-3 hover:bg-gray-50 transition text-sm"
                      >
                        ▶ {v.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* DOCUMENTS */}
              {chap.documents?.length > 0 && (
                <div>
                  <p className="font-medium mb-1">📄 Documents</p>

                  <div className="grid md:grid-cols-2 gap-3">
                    {chap.documents.map((d: any) => (
                      <a
                        key={d._id}
                        href={d.url}
                        target="_blank"
                        className="border rounded-md p-3 hover:bg-gray-50 transition text-sm"
                      >
                        📄 {d.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* QUIZZES */}
              {chap.quizzes?.length > 0 && (
                <div>
                  <p className="font-medium mb-1">📝 Quizzes</p>

                  <div className="space-y-2">
                    {chap.quizzes.map((q: any) => (
                      <Link
                        key={q._id}
                        href={`/practice/quiz/${course._id}/${chap._id}/${q._id}`}
                        className="block border rounded-md p-3 hover:bg-blue-50 transition text-sm text-blue-700"
                      >
                        {q.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}
