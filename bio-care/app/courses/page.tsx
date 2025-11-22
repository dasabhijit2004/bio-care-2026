import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dummyCourses = [
  {
    id: "neet-bio-2026",
    title: "NEET Biology Foundation",
    level: "Class 11–12 + NEET",
    price: 14999,
    description:
      "Complete biology syllabus for NEET with chapter-wise tests and PYQs.",
  },
  {
    id: "hs-bio-2026",
    title: "Higher Secondary Biology",
    level: "Class 11–12 Board",
    price: 8999,
    description:
      "Board-focused biology course with detailed notes and model question papers.",
  },
  {
    id: "crash-bio",
    title: "Biology Crash Course",
    level: "Short Term",
    price: 4999,
    description:
      "Fast revision of important chapters before exams with daily tests.",
  },
];

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2 animate-fade-up">
        <h1 className="text-2xl md:text-3xl font-semibold">Courses</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Explore our biology courses. Prices and content will be fully managed
          by the admin panel. Enrolled students will later see their enrolled
          courses and direct access to videos, docs and quizzes here.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3 animate-fade-up md:[animation-delay:120ms]">
        {dummyCourses.map((course) => (
          <Card
            key={course.id}
            className="flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-sm">
              <p className="text-primary font-semibold">
                ₹{course.price.toLocaleString("en-IN")}
              </p>
              <p className="text-muted-foreground">{course.description}</p>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {course.level}
              </p>
              <Button asChild className="mt-2 w-full">
                {/* Later we can change this to /signup or /courses/[id] */}
                <Link href="/signup">Enroll Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-4 text-xs text-muted-foreground animate-fade-up md:[animation-delay:180ms]">
        <p>
          Already enrolled? After we finish authentication and student model,
          this page will show your <strong>My Courses</strong> section with
          direct access to your videos, PDFs, and quizzes.
        </p>
      </section>
    </div>
  );
}
