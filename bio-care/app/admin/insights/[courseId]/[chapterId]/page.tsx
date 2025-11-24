"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChapterInsightsPage() {
  const { courseId, chapterId } = useParams();
  const [chapter, setChapter] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `/api/admin/insights/chapter/${courseId}/${chapterId}`
      );
      const data = await res.json();

      setChapter(data.chapter);
      setStats(data.stats);
    };

    load();
  }, [courseId, chapterId]);

  if (!chapter || !stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#1717a6]">
        Chapter Insights — {chapter.title}
      </h1>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-4">
          <p>Total Videos</p>
          <h2 className="text-3xl font-bold">{stats.videos}</h2>
        </Card>

        <Card className="p-4">
          <p>Total PDFs</p>
          <h2 className="text-3xl font-bold">{stats.documents}</h2>
        </Card>

        <Card className="p-4">
          <p>Total Quizzes</p>
          <h2 className="text-3xl font-bold">{stats.totalQuizzes}</h2>
        </Card>
      </div>

      {/* BAR CHART */}
      <Card className="p-6">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Quiz Attempts Overview
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stats.quizStats}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attempts" fill="#1717a6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* QUIZ TABLE */}
      <Card className="p-6">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Quizzes in This Chapter
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Title</th>
              <th className="p-2">Attempts</th>
              <th className="p-2">Avg Score</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {stats.quizStats.map((quiz: any) => (
              <tr key={quiz.quizId} className="border-b">
                <td className="p-2">{quiz.title}</td>
                <td className="p-2">{quiz.attempts}</td>
                <td className="p-2">{quiz.averageScore.toFixed(1)}</td>
                <td className="p-2">
                  <Link
                    href={`/admin/insights/${courseId}/${chapterId}/${quiz.quizId}`}
                    className="text-blue-600 underline"
                  >
                    Drilldown →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
