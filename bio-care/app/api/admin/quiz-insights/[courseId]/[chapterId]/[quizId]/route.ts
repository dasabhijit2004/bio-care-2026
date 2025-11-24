import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  try {
    const { courseId, chapterId, quizId } = await params;

    await connectDB();

    const course = await Course.findById(courseId)
      .populate("chapters.quizzes.results.studentId", "name email class");

    if (!course) return new Response("Not found", { status: 404 });

    const chapter = course.chapters.id(chapterId);
    const quiz = chapter.quizzes.id(quizId);

    if (!quiz) return new Response("Quiz not found", { status: 404 });

    // Analytics Computation
    const attempts = quiz.results.length;

    const totalQuestions = quiz.questions.length;

    const averageScore =
      attempts === 0
        ? 0
        : quiz.results.reduce((sum, r) => sum + r.score, 0) / attempts;

    const accuracy =
      attempts === 0
        ? 0
        : quiz.results.reduce((sum, r) => {
            return (
              sum +
              (r.answers.filter(
                (a, i) => a === quiz.questions[i].correctAnswer
              ).length /
                totalQuestions) *
                100
            );
          }, 0) / attempts;

    return new Response(
      JSON.stringify({
        quizTitle: quiz.title,
        attempts,
        averageScore,
        accuracy,
        results: quiz.results,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}
