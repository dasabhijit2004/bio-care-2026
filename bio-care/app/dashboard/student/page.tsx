import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StudentDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <header className="space-y-1 animate-fade-up">
        <h1 className="text-2xl md:text-3xl font-semibold">Student Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          This will show charts and performance analytics for the logged-in student.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 animate-fade-up md:[animation-delay:120ms]">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Upcoming: Performance Charts</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            We&apos;ll integrate professional charts for accuracy, scores, and topic-wise performance here.
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Upcoming: Recent Tests</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Recent quizzes, scores, and improvement will be shown here.
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Upcoming: Course Progress</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Course completion status and pending chapters will be tracked here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
