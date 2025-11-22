import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <header className="space-y-1 animate-fade-up">
        <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          This area will be protected. Admin can manage courses, students, and see insights here.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 animate-fade-up md:[animation-delay:120ms]">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Pending Student Approval</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            A list of students awaiting approval will appear here.
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Course Management</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Admin can create courses, add videos, documents, and quizzes from here.
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Insights & Reports</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Course-wise enrolments, test performance, and scores will be visualized here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
