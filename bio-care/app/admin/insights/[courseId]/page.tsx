"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function CourseInsightsPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [quizStats, setQuizStats] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/insights/course/${courseId}`);
      const data = await res.json();
      setCourse(data.course);
      setQuizStats(data.quizStats);
    };
    load();
  }, [courseId]);

  if (!course || !quizStats) return <p className="p-6">Loading...</p>;

  // Pie chart data for attempts distribution
  const attemptsData = quizStats.quizAttempts.map((q: any) => ({
    name: q.title,
    value: q.attempts,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#1717a6]">
        Insights — {course.title}
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-4">
          <p>Total Chapters</p>
          <h2 className="text-3xl font-bold">{quizStats.totalChapters}</h2>
        </Card>

        <Card className="p-4">
          <p>Total Quizzes</p>
          <h2 className="text-3xl font-bold">{quizStats.totalQuizzes}</h2>
        </Card>

        <Card className="p-4">
          <p>Total Attempts</p>
          <h2 className="text-3xl font-bold">{quizStats.totalAttempts}</h2>
        </Card>
      </div>

      {/* PIE CHART — Attempts per quiz */}
      <Card className="p-6">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Quiz Attempts Distribution
        </h2>
        <PieChart width={350} height={300}>
          <Pie
            data={attemptsData}
            dataKey="value"
            outerRadius={100}
            label
          >
            {attemptsData.map((_, idx: number) => (
              <Cell key={idx} fill={["#1717a6", "#4caf50", "#ff9800", "#e91e63"][idx % 4]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>

      {/* TABLE OF QUIZZES */}
      <Card className="p-6">
        <h2 className="font-bold text-xl text-[#1717a6] mb-4">
          All Quizzes
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Quiz Title</th>
              <th className="p-2">Attempts</th>
              <th className="p-2">Average Score</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {quizStats.quizAttempts.map((q: any, i: number) => (
              <tr key={i} className="border-b">
                <td className="p-2">{q.title}</td>
                <td className="p-2">{q.attempts}</td>
                <td className="p-2">{q.averageScore.toFixed(1)}</td>
                <td className="p-2">
                  <Link
                    href={`/admin/insights/${courseId}/${q.chapterId}/${q.quizId}`}
                    className="bg-[#1717a6] text-white px-3 py-1 rounded-md hover:bg-blue-900 transition"
                  >
                    View Insights →
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
