"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/student/course/${courseId}`);
      const data = await res.json();
      setCourse(data.course);
    };
    load();
  }, [courseId]);

  if (!course) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#1717a6]">{course.title}</h1>

      <div className="space-y-4">
        {course.chapters.map((chap: any, i: number) => (
          <Card key={i} className="shadow">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-[#1717a6] mb-2">
                {chap.title}
              </h2>

              <div className="space-y-2">
                {/* VIDEO LIST */}
                {chap.videos.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">Videos</p>
                    <ul className="list-disc ml-5 text-sm">
                      {chap.videos.map((v: any, idx: number) => (
                        <li key={idx}>
                          <a
                            href={v.url}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            {v.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* DOCUMENTS */}
                {chap.documents.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">Documents</p>
                    <ul className="list-disc ml-5 text-sm">
                      {chap.documents.map((doc: any, idx: number) => (
                        <li key={idx}>
                          <a
                            href={doc.url}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            {doc.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* QUIZZES */}
                {chap.quizzes.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">Quizzes</p>
                    <ul className="list-disc ml-5 text-sm">
                      {chap.quizzes.map((q: any, idx: number) => (
                        <li key={idx}>
                          <Link
                            href={`/practice/quiz/${q.quizId}`}
                            className="text-blue-600 underline"
                          >
                            {q.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
