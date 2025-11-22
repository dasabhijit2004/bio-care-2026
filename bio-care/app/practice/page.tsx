import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PracticePage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2 animate-fade-up">
        <h1 className="text-2xl md:text-3xl font-semibold">Practice</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          This page is dedicated to enrolled students. Here they will see
          practice sets, quizzes, and performance analytics for their enrolled
          courses only.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 animate-fade-up md:[animation-delay:120ms]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Login to see your practice dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Once we complete authentication, you&apos;ll see your course-wise
              practice sets, quizzes, and progress charts here.
            </p>
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Coming soon: Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              We&apos;ll integrate charts for accuracy, chapter-wise scores, and
              test history to give a complete professional dashboard view.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
