// app/courses/page.tsx
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const demoCourses = [
  {
    id: 1,
    title: "Class 10 Life Science – Foundation",
    tag: "Board Exam Focus",
    price: "₹5,999",
    duration: "10 months",
    level: "Class 10",
  },
  {
    id: 2,
    title: "Class 11 Biology – NEET Starter",
    tag: "NEET + Boards",
    price: "₹9,999",
    duration: "12 months",
    level: "Class 11",
  },
  {
    id: 3,
    title: "Class 12 Biology – NEET Advance",
    tag: "NEET Intensive",
    price: "₹14,999",
    duration: "12 months",
    level: "Class 12",
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-[#1717a6] text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-center">
            <div className="space-y-5">
              <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-wide uppercase backdrop-blur">
                Bio Care Courses · 2026 Session
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Structured Biology Courses  
                <span className="block text-[#dff7d7]">
                  for Boards & NEET Excellence.
                </span>
              </h1>
              <p className="text-sm md:text-base text-blue-100 max-w-xl">
                Choose from our carefully designed courses for Classes 8–12 and NEET.
                Every batch includes recorded lectures, doubt sessions, practice sheets,
                and full-length tests.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#dff7d7] text-[#1717a6] hover:bg-white font-semibold rounded-full px-6">
                  View All Courses
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#1717a6] border-white/40 text-white rounded-full"
                >
                  Talk to a Mentor
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-xs md:text-sm text-blue-100 mt-4">
                <div>
                  <p className="font-semibold text-white">Live + Recorded</p>
                  <p>Join from anywhere, anytime access.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Practice + Tests</p>
                  <p>MCQs, PYQs & chapter-wise worksheets.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#dff7d7]/20 rounded-full blur-2xl" />
              <Card className="bg-white/95 shadow-xl border-0 backdrop-blur relative z-10">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">
                    Enrolled Student Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span>Active Courses</span>
                    <span className="font-semibold">03</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Practice Tests Completed</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <p className="text-xs text-slate-500">Overall Progress</p>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full w-[70%] bg-[#1717a6] transition-all duration-500" />
                    </div>
                    <p className="text-xs text-right text-slate-500">70% syllabus completed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          {/* Filters (static for now – you’ll wire later) */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Explore our Programs
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Choose the course that matches your class and goal.  
                Prices are indicative and fully manageable from the admin panel.
              </p>
            </div>
            <div className="flex gap-2 text-xs md:text-sm">
              <Button variant="outline" className="rounded-full border-slate-300">
                All
              </Button>
              <Button variant="outline" className="rounded-full border-slate-300">
                Class 9–10
              </Button>
              <Button variant="outline" className="rounded-full border-slate-300">
                Class 11–12
              </Button>
              <Button variant="outline" className="rounded-full border-slate-300">
                NEET
              </Button>
            </div>
          </div>

          {/* Courses grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {demoCourses.map((course) => (
              <Card
                key={course.id}
                className="group border border-slate-200/70 hover:border-[#1717a6]/60 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src="/placeholder.jpg"
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0" />
                  <span className="absolute bottom-3 left-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-900">
                    {course.tag}
                  </span>
                </div>
                <CardContent className="flex-1 flex flex-col pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-slate-900">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{course.level}</p>
                    </div>
                    <span className="rounded-xl bg-[#dff7d7] px-3 py-1 text-[11px] font-semibold text-[#1717a6]">
                      {course.price}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>{course.duration}</span>
                    <span>Weekly tests · Doubt support</span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 rounded-full bg-[#1717a6] hover:bg-[#141489] text-sm">
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full border-slate-300 text-sm"
                    >
                      Enroll Now
                    </Button>
                  </div>

                  {/* You can conditionally show this for logged-in enrolled students */}
                  <p className="mt-3 text-[11px] text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2 hidden">
                    You are enrolled in this course. Continue from the{" "}
                    <span className="font-semibold">Practice page</span>.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
