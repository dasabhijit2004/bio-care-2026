"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentDashboardPage() {
  const [name, setName] = useState<string>("Student");
  const [userClass, setUserClass] = useState<string>("");
  const [loadingUser, setLoadingUser] = useState(true);

  const [stats, setStats] = useState<any>(null);

  // Load user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (data.user) {
          setName(data.user.name || "Student");
          setUserClass(data.user.class || "");
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // Load quiz summary stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("/api/student/quiz-summary", {
          cache: "no-store",
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load quiz stats:", err);
      }
    };
    loadStats();
  }, []);

  if (!stats)
    return <div className="p-6 text-center text-[#1717a6]">Loading dashboard...</div>;

  // Safe extracted data
  const recent = stats.recent || [];
  const progressData = stats.progress || [];
  const topicStats = stats.topicAccuracy || [];
  const attemptsCount = stats.attemptsCount || 0;
  const averageAccuracy = stats.averageAccuracy || 0;

  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* =================== HEADER =================== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-[#1717a6]/70">
              Bio Care • Student Dashboard
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-[#1717a6]">
              Welcome back,{" "}
              <span className="text-black">
                {loadingUser ? "..." : name.split(" ")[0]}
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your Biology performance & quiz progress.
              {userClass && (
                <span className="ml-2 font-medium text-[#1717a6]">
                  • Class {userClass}
                </span>
              )}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              asChild
              className="bg-[#1717a6] hover:bg-[#10107d] text-white rounded-full px-5"
            >
              <Link href="/practice">Go to Practice</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#1717a6]/30 text-[#1717a6] rounded-full px-5 bg-white"
            >
              <Link href="/courses">View My Courses</Link>
            </Button>
          </div>
        </motion.div>

        {/* =================== TOP STATS =================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <Card className="border-none bg-[#dff7d7] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1717a6]">
                Overall Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-[#1717a6]">
                  {averageAccuracy}%
                </p>
                <p className="text-xs text-green-700 mt-1">Improving steadily</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1717a6]">
                Quizzes Attempted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#1717a6]">
                {attemptsCount}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1717a6]">
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#1717a6]">
                {stats.enrolledCourses || 0}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* =================== CHARTS =================== */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white shadow-sm border border-slate-100">
              <CardHeader>
                <CardTitle className="text-sm md:text-base text-[#1717a6]">
                  Performance Over Time
                </CardTitle>
              </CardHeader>

              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="label" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#1717a6"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Topic-wise Accuracy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white shadow-sm border border-slate-100">
              <CardHeader>
                <CardTitle className="text-sm md:text-base text-[#1717a6]">
                  Topic-wise Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicStats} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="topic" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="accuracy"
                      fill="#1717a6"
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* =================== RECENT QUIZZES =================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white shadow-sm border border-slate-100 mb-10">
            <CardHeader>
              <CardTitle className="text-[#1717a6]">Recent Quizzes</CardTitle>
            </CardHeader>

            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-[#dff7d7]/70">
                    <th className="p-2 text-left text-[#1717a6]">Quiz</th>
                    <th className="p-2 text-left text-[#1717a6]">Score</th>
                    <th className="p-2 text-left text-[#1717a6]">Accuracy</th>
                    <th className="p-2 text-left text-[#1717a6]">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recent.map((q: any, i: number) => (
                    <tr key={i} className="border-b hover:bg-[#f4f6ff]">
                      <td className="p-2">{q.title}</td>
                      <td className="p-2 font-semibold text-[#1717a6]">
                        {q.score}/{q.total}
                      </td>
                      <td className="p-2">{q.accuracy}%</td>
                      <td className="p-2 text-muted-foreground">
                        {new Date(q.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
