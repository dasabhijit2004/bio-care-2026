import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB();

    // ---------- SAFE DATE FORMATTER ----------
    const formatDate = (d: any) => {
      if (!d) return null;
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return null;
      return dt.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    // ------------------ STUDENTS ------------------
    const students = await User.find({ isAdmin: false }).lean();

    const approved = students.filter((s) => s.approved).length;
    const pending = students.length - approved;

    // ------------------ COURSES ------------------
    const courses = await Course.find().lean();

    const totalEnrollments = courses.reduce(
      (acc: number, c: any) => acc + (c.enrolledStudents?.length || 0),
      0
    );

    // ------------------ QUIZ & ATTEMPTS ------------------
    let quizzes = 0;
    let attempts = 0;
    let totalScore = 0;
    let totalQuestionsAnswered = 0;

    courses.forEach((course: any) => {
      course.chapters.forEach((ch: any) => {
        ch.quizzes.forEach((q: any) => {
          quizzes++;

          q.results.forEach((r: any) => {
            attempts++;
            totalScore += r.score;
            totalQuestionsAnswered += q.questions.length;
          });
        });
      });
    });

    const avgScore =
      attempts > 0 ? (totalScore / totalQuestionsAnswered) * 100 : 0;

    // ------------------ TIMELINES ------------------

    // --- student registration timeline ---
    const studentTimelineMap: any = {};
    students.forEach((s) => {
      const f = formatDate(s.createdAt);
      if (!f) return;
      studentTimelineMap[f] = (studentTimelineMap[f] || 0) + 1;
    });

    const studentTimeline = Object.entries(studentTimelineMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a: any, b: any) => (a.date < b.date ? -1 : 1));

    // --- enrollments timeline ---
    const enrollmentTimelineMap: any = {};
    courses.forEach((c: any) => {
      c.enrolledStudents?.forEach((e: any) => {
        const f = formatDate(e.date);
        if (!f) return;
        enrollmentTimelineMap[f] = (enrollmentTimelineMap[f] || 0) + 1;
      });
    });

    const enrollmentTimeline = Object.entries(enrollmentTimelineMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a: any, b: any) => (a.date < b.date ? -1 : 1));

    // --- quiz attempts timeline ---
    const attemptsTimelineMap: any = {};
    courses.forEach((course) => {
      course.chapters.forEach((ch) => {
        ch.quizzes.forEach((q) => {
          q.results.forEach((r: any) => {
            const f = formatDate(r.attemptedAt);
            if (!f) return;
            attemptsTimelineMap[f] = (attemptsTimelineMap[f] || 0) + 1;
          });
        });
      });
    });

    const attemptsTimeline = Object.entries(attemptsTimelineMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a: any, b: any) => (a.date < b.date ? -1 : 1));

    // ------------------ RESPONSE ------------------
    return new Response(
      JSON.stringify({
        totalStudents: students.length,
        approvedStudents: approved,
        pendingStudents: pending,

        totalCourses: courses.length,
        totalEnrollments,

        quizzes,
        attempts,
        avgScore: Number(avgScore.toFixed(2)),

        studentTimeline,
        enrollmentTimeline,
        attemptsTimeline,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log("INSIGHTS ERROR:", err);
    return new Response(JSON.stringify({ error: "Failed" }), {
      status: 500,
    });
  }
}
