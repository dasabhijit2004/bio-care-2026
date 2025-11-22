import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="grid gap-10 md:grid-cols-2 items-center animate-fade-up">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Bio Care Coaching Center
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Master Biology with{" "}
            <span className="text-primary">Personalized Practice</span> and
            Smart Analytics.
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Structured courses, auto-evaluated quizzes, and performance
            dashboards to make biology crystal clear for every student.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/courses">View Courses</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/practice">Go to Practice</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground">Live & Recorded</p>
              <p>Learn at your pace with chapter-wise videos.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Smart Reports</p>
              <p>Track your strengths and weak chapters instantly.</p>
            </div>
          </div>
        </div>

        {/* Right: Highlight Card */}
        <Card className="border-primary/10 shadow-sm md:translate-y-2 animate-fade-up md:[animation-delay:120ms]">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Why Bio Care?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Our private coaching focuses on concept clarity, exam strategy,
              and continuous practice through curated tests.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Course-wise practice sets & PDFs</li>
              <li>Instant quiz evaluation & detailed solutions</li>
              <li>Performance dashboard for each student</li>
              <li>Admin panel to manage courses & monitor progress</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* About */}
      <section className="space-y-6 animate-fade-up md:[animation-delay:160ms]">
        <h2 className="text-2xl font-semibold">About Bio Care</h2>
        <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
          Bio Care is a specialized biology coaching center designed for school
          and entrance-level students. We combine traditional teaching with a
          modern digital platform where students can watch lectures, download
          notes, attempt tests, and track their improvement over time.
        </p>
      </section>

      {/* Gallery (placeholder cards for now) */}
      <section className="space-y-6 animate-fade-up md:[animation-delay:200ms]">
        <h2 className="text-2xl font-semibold">Classroom & Learning Space</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {["Classroom Sessions", "Doubt Solving", "Digital Resources"].map(
            (title, idx) => (
              <Card
                key={title}
                className="overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-32 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {idx === 0 && (
                    <p>
                      Interactive classroom teaching with focus on NCERT and
                      exam-oriented questions.
                    </p>
                  )}
                  {idx === 1 && (
                    <p>
                      Regular doubt-clearing sessions so no concept remains
                      confusing.
                    </p>
                  )}
                  {idx === 2 && (
                    <p>
                      Access to lecture recordings, notes, and practice sets for
                      revision anytime.
                    </p>
                  )}
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
