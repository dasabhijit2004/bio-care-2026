import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request, { params }: any) {
  try {
    const { courseId } = await params;

    await connectDB();
    const course = await Course.findById(courseId).lean();

    if (!course)
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
      });

    let quizStats: any[] = [];

    let totalAttempts = 0;
    let totalQuizzes = 0;

    course.chapters.forEach((chapter: any) => {
      chapter.quizzes.forEach((quiz: any) => {
        const attempts = quiz.results.length;
        const averageScore =
          attempts > 0
            ? quiz.results.reduce((s: number, r: any) => s + r.score, 0) /
              attempts
            : 0;

        quizStats.push({
          title: quiz.title,
          chapterId: chapter._id,
          quizId: quiz._id,
          attempts,
          averageScore,
        });

        totalAttempts += attempts;
        totalQuizzes++;
      });
    });

    return new Response(
      JSON.stringify({
        course,
        quizStats: {
          totalChapters: course.chapters.length,
          totalQuizzes,
          totalAttempts,
          quizAttempts: quizStats,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed" }), {
      status: 500,
    });
  }
}
