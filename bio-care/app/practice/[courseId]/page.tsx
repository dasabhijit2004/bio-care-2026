"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("videos");

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
      {/* ---------------- TITLE ---------------- */}
      <h1 className="text-4xl font-bold text-[#1717a6]">{course.title}</h1>

      {/* ---------------- SECTION TABS ---------------- */}
      <div className="flex w-full md:w-auto gap-3 mb-6 flex-wrap">
        <Button
          onClick={() => setActiveTab("videos")}
          className={`${
            activeTab === "videos"
              ? "bg-[#1717a6] text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Videos
        </Button>

        <Button
          onClick={() => setActiveTab("documents")}
          className={`${
            activeTab === "documents"
              ? "bg-[#1717a6] text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Documents
        </Button>

        <Button
          onClick={() => setActiveTab("quizzes")}
          className={`${
            activeTab === "quizzes"
              ? "bg-[#1717a6] text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Quizzes
        </Button>
      </div>

      {/* ======================= CHAPTERS ======================= */}
      <div className="space-y-6">
        {course.chapters.map((chap: any, i: number) => (
          <Card
            key={i}
            className="shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-[#1717a6] mb-4">
              {chap.title}
            </h2>

            {/* ------------------------------------------------------ */}
            {/* ---------------------- VIDEOS ------------------------- */}
            {/* ------------------------------------------------------ */}

            {activeTab === "videos" && (
              <div>
                {chap.videos.length === 0 ? (
                  <p className="text-muted-foreground">No videos available.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {chap.videos.map((v: any, idx: number) => (
                      <Card
                        key={idx}
                        className="p-4 border rounded-xl shadow-sm hover:shadow-md bg-gray-50 transition"
                      >
                        <p className="font-medium text-lg">{v.title}</p>

                        <Button
                          asChild
                          className="mt-3 bg-[#1717a6] text-white hover:bg-blue-900"
                        >
                          <a href={v.url} target="_blank">
                            Watch Video
                          </a>
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* -------------------- DOCUMENTS ------------------------ */}
            {/* ------------------------------------------------------ */}

            {activeTab === "documents" && (
              <div>
                {chap.documents.length === 0 ? (
                  <p className="text-muted-foreground">No documents available.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {chap.documents.map((doc: any, idx: number) => (
                      <Card
                        key={idx}
                        className="p-4 border rounded-xl bg-white shadow hover:shadow-md transition"
                      >
                        <p className="font-medium text-lg">{doc.title}</p>

                        <Button
                          asChild
                          className="mt-3 bg-[#1717a6] text-white hover:bg-blue-900"
                        >
                          <a href={doc.url} target="_blank">
                            View / Download Document
                          </a>
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* ---------------------- QUIZZES ------------------------ */}
            {/* ------------------------------------------------------ */}

            {activeTab === "quizzes" && (
              <div className="space-y-3">
                {chap.quizzes.length === 0 ? (
                  <p className="text-muted-foreground">No quizzes available.</p>
                ) : (
                  chap.quizzes.map((q: any, idx: number) => (
                    <Card
                      key={idx}
                      className="p-5 border rounded-xl shadow hover:shadow-lg transition bg-[#f4f7ff]"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xl font-semibold text-[#1717a6]">{q.title}</p>
                          <p className="text-sm text-gray-500">
                            Quiz #{idx + 1}
                          </p>
                        </div>

                        <Button
                          asChild
                          className="rounded-full bg-[#1717a6] text-white px-5 py-2 hover:bg-blue-900"
                        >
                          <Link
                            href={`/practice/quiz/${course._id}/${chap._id}/${q._id}`}
                          >
                            Start Quiz
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
