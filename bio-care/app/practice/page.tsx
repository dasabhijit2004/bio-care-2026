// app/practice/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockChapters = [
  { name: "Cell – The Unit of Life", progress: 80 },
  { name: "Plant Physiology", progress: 55 },
  { name: "Human Physiology", progress: 40 },
]

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              Student Practice Dashboard
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold mt-1">
              Welcome back to{" "}
              <span className="text-[#1717a6]">your biology lab</span> 🧬
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Continue from where you left. Practice questions, attempt quizzes, and
              track your performance in real time.
            </p>
          </div>
          <Button className="rounded-full bg-[#1717a6] hover:bg-[#141489]">
            Start Today&apos;s Practice
          </Button>
        </div>

        {/* Top stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Overall Accuracy</p>
              <p className="mt-2 text-2xl font-semibold text-[#1717a6]">78%</p>
              <p className="text-xs text-emerald-700 mt-1 bg-emerald-50 inline-flex px-2 py-1 rounded-full">
                +5% from last week
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Practice Questions Solved</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">1,245</p>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Tests Attempted</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">16</p>
              <p className="text-xs text-muted-foreground mt-1">Full + chapter-wise</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress “chart” section */}
        <div className="grid gap-6 md:grid-cols-[1.2fr,1fr] items-start">
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Chapter-wise progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockChapters.map((chapter) => (
                <div key={chapter.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">
                      {chapter.name}
                    </span>
                    <span className="text-muted-foreground">{chapter.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-[#1717a6] transition-all duration-500"
                      style={{ width: `${chapter.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Last mock test summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-semibold text-[#1717a6]">148 / 180</span>
              </div>
              <div className="flex justify-between">
                <span>Rank among batch</span>
                <span className="font-semibold">Top 12%</span>
              </div>
              <div className="flex justify-between">
                <span>Time taken</span>
                <span className="font-semibold">2 hr 45 min</span>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                Focus areas:
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Revise Human Physiology – Part B</li>
                  <li>Practice MCQs on Genetics</li>
                  <li>Revisit previous PYQs for last 3 years</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course shortcuts */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Active Course
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-900 mt-1">
                Class 12 Biology – NEET Advance
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Continue from Lecture 18: Human Reproduction
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full border-slate-300 text-xs">
                Watch Lecture
              </Button>
              <Button className="rounded-full bg-[#1717a6] hover:bg-[#141489] text-xs">
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
