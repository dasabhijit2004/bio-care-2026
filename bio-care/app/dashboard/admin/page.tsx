// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const pendings = [
  { name: "Riya Sen", className: "Class 11", course: "NEET Starter", joined: "2h ago" },
  { name: "Arjun Das", className: "Class 10", course: "Life Science Foundation", joined: "5h ago" },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              Admin Panel
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Bio Care <span className="text-[#1717a6]">Control Center</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Approve students, manage courses, and review test performance from a
              single dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-full border-slate-300 text-xs">
              View All Courses
            </Button>
            <Button className="rounded-full bg-[#1717a6] hover:bg-[#141489] text-xs">
              + Create New Course
            </Button>
          </div>
        </div>

        {/* Top insight cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Total Students</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">326</p>
              <p className="text-xs text-emerald-700 mt-1 bg-emerald-50 inline-flex px-2 py-1 rounded-full">
                +24 this week
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Active Courses</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">12</p>
              <p className="text-xs text-muted-foreground mt-1">Including NEET crash</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Tests Conducted</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">89</p>
              <p className="text-xs text-muted-foreground mt-1">All courses</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Monthly Revenue</p>
              <p className="mt-2 text-2xl font-semibold text-[#1717a6]">₹2.8L</p>
              <p className="text-xs text-emerald-700 mt-1 bg-emerald-50 inline-flex px-2 py-1 rounded-full">
                +12% vs last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr,1fr] items-start">
          {/* Pending approvals */}
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Pending student approvals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {pendings.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-900">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.className} · {s.course}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Requested {s.joined}
                    </p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-4">
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-slate-300 text-slate-600"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full mt-2 rounded-full border-dashed border-slate-300 text-xs"
              >
                View all pending approvals
              </Button>
            </CardContent>
          </Card>

          {/* Course insights mini-table */}
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Course insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Course</span>
                <span>Students · Avg Score</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Class 12 – NEET Advance</span>
                  <span>96 · 72%</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Class 11 – NEET Starter</span>
                  <span>68 · 69%</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Class 10 – Life Science</span>
                  <span>84 · 81%</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2 rounded-full border-slate-300 text-xs"
              >
                View detailed analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
