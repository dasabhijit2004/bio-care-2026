"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function InsightsPage() {
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/admin/insights/overall")
      .then((res) => res.json())
      .then(setStats);

    fetch("/api/course/all")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []));
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  const pieData = [
    { name: "Approved", value: stats.approvedStudents },
    { name: "Pending", value: stats.pendingStudents },
  ];

  const pieColors = ["#1717a6", "#ff4d4f"];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#1717a6]">
        Platform Insights Dashboard
      </h1>

      {/* ===================== TOP STATS ===================== */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-4 shadow-sm">
          <p>Total Students</p>
          <h2 className="text-3xl font-bold">{stats.totalStudents}</h2>
        </Card>

        <Card className="p-4 shadow-sm">
          <p>Total Courses</p>
          <h2 className="text-3xl font-bold">{stats.totalCourses}</h2>
        </Card>

        <Card className="p-4 shadow-sm">
          <p>Total Enrollments</p>
          <h2 className="text-3xl font-bold">{stats.totalEnrollments}</h2>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-4 shadow-sm">
          <p>Total Quizzes</p>
          <h2 className="text-3xl font-bold">{stats.quizzes}</h2>
        </Card>

        <Card className="p-4 shadow-sm">
          <p>Total Quiz Attempts</p>
          <h2 className="text-3xl font-bold">{stats.attempts}</h2>
        </Card>

        <Card className="p-4 shadow-sm">
          <p>Overall Avg Score</p>
          <h2 className="text-3xl font-bold">{stats.avgScore.toFixed(1)}%</h2>
        </Card>
      </div>

      {/* ===================== STUDENT APPROVAL PIE CHART ===================== */}
      <Card className="p-6 shadow-sm">
        <h2 className="font-bold text-xl text-[#1717a6] mb-4">
          Student Approval Distribution
        </h2>

        <PieChart width={350} height={300}>
          <Pie data={pieData} dataKey="value" outerRadius={100} label>
            {pieData.map((_, idx) => (
              <Cell key={idx} fill={pieColors[idx]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>

      {/* ===================== STUDENT GROWTH ===================== */}
      <Card className="p-6 shadow-sm">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          New Students Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.studentTimeline}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#1717a6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* ===================== ENROLLMENTS OVER TIME ===================== */}
      {/* <Card className="p-6 shadow-sm">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Enrollments Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.enrollmentTimeline}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1717a6" />
          </BarChart>
        </ResponsiveContainer>
      </Card> */}

      {/* ===================== QUIZ ATTEMPTS ===================== */}
      <Card className="p-6 shadow-sm">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Quiz Attempts Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.attemptsTimeline}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ff4d4f" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* ===================== COURSES LIST SECTION ===================== */}
      <Card className="p-6 shadow-sm mt-10">
        <h2 className="font-bold text-xl mb-4 text-[#1717a6]">
          Course Insights Overview
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#dff7d7] text-[#1717a6]">
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Chapters</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c: any) => (
              <tr key={c._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.chapters.length}</td>
                <td className="p-3">₹{c.price}</td>
                <td className="p-3 text-center">
                  <Link
                    href={`/admin/insights/${c._id}`}
                    className="bg-[#1717a6] text-white px-3 py-1 rounded-md hover:bg-blue-900 transition"
                  >
                    View Course Insights →
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
