"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <section className="border-b bg-[#dff7d7] py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-6">
          
          {/* Welcome Text */}
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1717a6]/80">
              Student Dashboard
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#1717a6]">
              Welcome back, Student 👋
            </h1>
            <p className="text-sm text-[#1717a6]/80">
              Track your progress, continue learning, and improve every day.
            </p>
          </div>

          {/* Profile photo */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#1717a6] shadow-lg">
            <Image src="/placeholder.jpg" alt="Student" fill className="object-cover" />
          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-10">

        {/* QUICK STATS */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <CardContent className="py-5">
              <p className="text-xs text-muted-foreground">Overall Accuracy</p>
              <p className="mt-2 text-3xl font-semibold text-[#1717a6]">78%</p>
              <p className="mt-2 text-xs bg-emerald-50 text-emerald-700 inline-block px-3 py-1 rounded-full">
                +5% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <CardContent className="py-5">
              <p className="text-xs text-muted-foreground">Tests Attempted</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">16</p>
              <p className="text-xs text-muted-foreground mt-2">Across all chapters</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <CardContent className="py-5">
              <p className="text-xs text-muted-foreground">Questions Solved</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">1,245</p>
              <p className="text-xs text-muted-foreground mt-2">In the last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* PROGRESS + LAST TEST SUMMARY */}
        <div className="grid gap-6 md:grid-cols-[1.2fr,1fr] items-start">

          {/* PROGRESS */}
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Chapter-wise Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

              {[
                { name: "Cell – The Unit of Life", progress: 82 },
                { name: "Human Physiology", progress: 58 },
                { name: "Plant Physiology", progress: 43 },
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1 text-xs font-medium text-slate-700">
                    <span>{c.name}</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-[#1717a6] transition-all duration-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              ))}

            </CardContent>
          </Card>

          {/* LAST TEST SUMMARY */}
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Test Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-semibold text-[#1717a6]">148 / 180</span>
              </div>
              <div className="flex justify-between">
                <span>Rank</span>
                <span className="font-semibold">Top 12%</span>
              </div>
              <div className="flex justify-between">
                <span>Time Taken</span>
                <span className="font-semibold">2h 45m</span>
              </div>

              <div className="text-xs text-muted-foreground">
                <p className="font-semibold text-slate-700 mb-1">Focus Areas:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Revise Human Physiology – Part B</li>
                  <li>Practice Genetics MCQs</li>
                  <li>Attempt previous year NEET questions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* ACTIVE COURSE CARD */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="py-6 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Active Course</p>
              <p className="text-base md:text-lg font-semibold">
                Class 12 Biology – NEET Advance
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Continue from Lecture 18: Human Reproduction
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-full border-slate-300 text-xs px-5"
              >
                Watch Lecture
              </Button>
              <Button className="rounded-full bg-[#1717a6] hover:bg-[#141489] text-xs px-5">
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QUICK LINKS */}
        <div className="grid md:grid-cols-3 gap-6 pt-6">
          {[
            {
              title: "Practice Questions",
              desc: "Solve daily MCQs & worksheets.",
            },
            {
              title: "Your Courses",
              desc: "See enrolled courses, videos & notes.",
            },
            {
              title: "Performance Reports",
              desc: "Track accuracy, speed & improvements.",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <CardHeader>
                <CardTitle className="text-lg text-[#1717a6]">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {feature.desc}
              </CardContent>
            </Card>
          ))}
        </div>

      </section>
    </div>
  );
}
