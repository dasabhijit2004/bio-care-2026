"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function QuizInsights() {
  const { courseId, chapterId, quizId } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/admin/insights/quiz/${courseId}/${chapterId}/${quizId}`)
      .then((res) => res.json())
      .then((resData) => setData(resData));
  }, [quizId]);

  if (!data) return <p className="p-6">Loading...</p>;

  // PIE CHART DATA
  const accuracyChart = [
    { name: "Correct", value: data.totalCorrect },
    { name: "Incorrect", value: data.totalIncorrect },
  ];

  const pieColors = ["#1717a6", "#ff4d4f"];

  // SCORE DISTRIBUTION CHART
  const distributionData = data.scoreDistribution.map((d: any) => ({
    range: d.range,
    count: d.count,
  }));

  // ATTEMPT TIMELINE CHART
  const timelineData = data.timeline.map((t: any) => ({
    date: t.date,
    attempts: t.count,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#1717a6]">
        Quiz Insights — {data.quiz.title}
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-4">
          <p>Total Attempts</p>
          <h2 className="text-3xl font-bold">{data.attempts}</h2>
        </Card>

        <Card className="p-4">
          <p>Average Score</p>
          <h2 className="text-3xl font-bold">{data.averageScore.toFixed(1)}</h2>
        </Card>

        <Card className="p-4">
          <p>Accuracy</p>
          <h2 className="text-3xl font-bold">{Math.round(data.accuracy)}%</h2>
        </Card>
      </div>

      {/* PIE CHART */}
      <Card className="p-6">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">Correct vs Incorrect</h2>

        <PieChart width={350} height={300}>
          <Pie data={accuracyChart} dataKey="value" outerRadius={100} label>
            {accuracyChart.map((_, idx: number) => (
              <Cell key={idx} fill={pieColors[idx]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>

      {/* SCORE DISTRIBUTION BAR CHART */}
      <Card className="p-6">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Score Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distributionData}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1717a6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* ATTEMPT TIMELINE */}
      <Card className="p-6">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Attempts Over Time
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attempts" stroke="#1717a6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* STUDENT RESULTS TABLE */}
      <Card className="p-6">
        <h2 className="font-bold text-xl text-[#1717a6] mb-4">Student Attempts</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Student</th>
              <th className="p-2">Email</th>
              <th className="p-2">Score</th>
              <th className="p-2">Accuracy</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.results.map((r: any, i: number) => (
              <tr key={i} className="border-b">
                <td className="p-2">{r.studentId?.name}</td>
                <td className="p-2">{r.studentId?.email}</td>
                <td className="p-2">{r.score}</td>
                <td className="p-2">{r.accuracy.toFixed(1)}%</td>
                <td className="p-2">
                  {new Date(r.attemptedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
