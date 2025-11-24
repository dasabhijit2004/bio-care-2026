"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function QuizInsights() {
  const { quizId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/quiz-insights/${quizId}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#1717a6]">Quiz Insights</h1>

      {/* Average Score */}
      <Card className="p-4">
        <h2 className="font-bold text-[#1717a6]">Average Score</h2>
        <p className="text-xl font-semibold">{data.averageScore}</p>
      </Card>

      {/* Attempts Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data.attemptsChart}>
            <XAxis dataKey="student" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#1717a6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
