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

type RecentQuiz = {
  id: string;
  title: string;
  date: string;
  score: number;
  total: number;
  status: "Passed" | "Improvement";
};

type TopicStat = {
  topic: string;
  accuracy: number;
};

type ProgressPoint = {
  label: string;
  score: number;
};

export default function StudentDashboardPage() {
  const [name, setName] = useState<string>("Student");
  const [userClass, setUserClass] = useState<string>("");
  const [loadingUser, setLoadingUser] = useState(true);

  // 🔹 Demo data for now — replace with API data later
  const progressData: ProgressPoint[] = [
    { label: "Test 1", score: 62 },
    { label: "Test 2", score: 71 },
    { label: "Test 3", score: 78 },
    { label: "Test 4", score: 82 },
    { label: "Test 5", score: 88 },
  ];

  const topicStats: TopicStat[] = [
    { topic: "Human Physiology", accuracy: 92 },
    { topic: "Plant Physiology", accuracy: 84 },
    { topic: "Genetics", accuracy: 76 },
    { topic: "Ecology", accuracy: 89 },
  ];

  const recentQuizzes: RecentQuiz[] = [
    {
      id: "1",
      title: "Human Physiology - Test 3",
      date: "18 Nov 2025",
      score: 44,
      total: 50,
      status: "Passed",
    },
    {
      id: "2",
      title: "Plant Physiology - Test 2",
      date: "11 Nov 2025",
      score: 32,
      total: 50,
      status: "Improvement",
    },
    {
      id: "3",
      title: "NEET PYQ - Biology Set A",
      date: "05 Nov 2025",
      score: 172,
      total: 200,
      status: "Passed",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
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
              Track your Biology performance, recent quizzes, and topic-wise
              progress in one place.
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
                <p className="text-3xl font-bold text-[#1717a6]">86%</p>
                <p className="text-xs text-green-700 mt-1">
                  +4% this month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-[#1717a6]">
                HS / NEET
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1717a6]">
                Quizzes Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-[#1717a6]">18</p>
                <p className="text-xs text-emerald-600 mt-1">
                  3 this week
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Keep the streak!
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1717a6]">
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-[#1717a6]">2</p>
                <p className="text-xs text-slate-500 mt-1">
                  Class 12 Board, NEET Biology
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* =================== CHARTS ROW =================== */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance over time */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white shadow-sm border border-slate-100">
              <CardHeader>
                <CardTitle className="text-sm md:text-base text-[#1717a6] flex items-center justify-between">
                  Performance Over Time
                  <span className="text-xs font-normal text-muted-foreground">
                    Last 5 quizzes
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 12 }}
                      tickMargin={8}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickMargin={8}
                      domain={[0, 100]}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#1717a6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Topic-wise accuracy */}
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
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      horizontal={false}
                    />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      dataKey="topic"
                      type="category"
                      tick={{ fontSize: 11 }}
                      width={110}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="accuracy"
                      name="Accuracy (%)"
                      radius={[0, 8, 8, 0]}
                      fill="#1717a6"
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
          <Card className="bg-white shadow-sm border border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm md:text-base text-[#1717a6]">
                  Recent Quizzes
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Review your latest quiz attempts and scores.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="text-xs md:text-sm border-[#1717a6]/40 text-[#1717a6] rounded-full"
              >
                <Link href="/practice">Take a new quiz</Link>
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-[#dff7d7]/60">
                      <th className="text-left py-2 px-3 font-medium text-[#1717a6]">
                        Quiz
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-[#1717a6]">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-[#1717a6]">
                        Score
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-[#1717a6]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentQuizzes.map((quiz) => {
                      const percent = Math.round(
                        (quiz.score / quiz.total) * 100
                      );
                      const isPassed = quiz.status === "Passed";

                      return (
                        <tr
                          key={quiz.id}
                          className="border-b last:border-0 hover:bg-[#f4f6ff]"
                        >
                          <td className="py-2 px-3 text-[13px]">
                            {quiz.title}
                          </td>
                          <td className="py-2 px-3 text-[13px] text-muted-foreground">
                            {quiz.date}
                          </td>
                          <td className="py-2 px-3 text-[13px]">
                            <span className="font-medium text-[#1717a6]">
                              {quiz.score}/{quiz.total}
                            </span>{" "}
                            <span className="text-xs text-muted-foreground">
                              ({percent}%)
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                isPassed
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {quiz.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
