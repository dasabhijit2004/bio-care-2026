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
  const [openChapter, setOpenChapter] = useState<number | null>(null); // <-- NEW

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
        {["videos", "documents", "quizzes"].map((t) => (
          <Button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`capitalize ${
              activeTab === t
                ? "bg-[#1717a6] text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* ======================= CHAPTER LIST ======================= */}
      <div className="space-y-4">
        {course.chapters.map((chap: any, i: number) => {
          const isOpen = openChapter === i;

          return (
            <Card
              key={i}
              className="border rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* ---------- CHAPTER HEADER ---------- */}
              <div
                onClick={() =>
                  setOpenChapter(isOpen ? null : i)
                }
                className="cursor-pointer p-5 flex justify-between items-center"
              >
                <h2 className="text-2xl font-semibold text-[#1717a6]">
                  {chap.title}
                </h2>

                <span className="text-xl">
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>

              {/* ---------- CONTENT (shown only when open) ---------- */}
              {isOpen && (
                <CardContent className="p-5 border-t animate-fadeIn">
                  
                  {/* -------- VIDEOS -------- */}
                  {activeTab === "videos" && (
                    <>
                      {chap.videos.length === 0 ? (
                        <p className="text-muted-foreground">
                          No videos available.
                        </p>
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
                    </>
                  )}

                  {/* -------- DOCUMENTS -------- */}
                  {activeTab === "documents" && (
                    <>
                      {chap.documents.length === 0 ? (
                        <p className="text-muted-foreground">
                          No documents available.
                        </p>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {chap.documents.map((doc: any, idx: number) => (
                            <Card
                              key={idx}
                              className="p-4 border rounded-xl bg-white shadow hover:shadow-md transition"
                            >
                              <p className="font-medium text-lg">
                                {doc.title}
                              </p>

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
                    </>
                  )}

                  {/* -------- QUIZZES -------- */}
                  {activeTab === "quizzes" && (
                    <>
                      {chap.quizzes.length === 0 ? (
                        <p className="text-muted-foreground">
                          No quizzes available.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {chap.quizzes.map((q: any, idx: number) => (
                            <Card
                              key={idx}
                              className="p-5 border rounded-xl shadow hover:shadow-lg transition bg-[#f4f7ff]"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-xl font-semibold text-[#1717a6]">
                                    {q.title}
                                  </p>
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
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
