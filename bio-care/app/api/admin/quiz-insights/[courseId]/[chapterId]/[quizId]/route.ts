import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(
  req: NextRequest,
  // 1. Update type: params is now a Promise
  context: { params: Promise<{ courseId: string; chapterId: string; quizId: string }> }
) {
  try {
    // 2. Await the params before usage
    const { courseId, chapterId, quizId } = await context.params;

    await connectDB();

    const course = await Course.findById(courseId)
      .populate("chapters.quizzes.results.studentId", "name email class");

    if (!course)
      return Response.json({ error: "Course not found" }, { status: 404 });

    // Mongoose subdocument lookups
    const chapter = course.chapters.id(chapterId);
    if (!chapter)
      return Response.json({ error: "Chapter not found" }, { status: 404 });

    const quiz = chapter.quizzes.id(quizId);
    if (!quiz)
      return Response.json({ error: "Quiz not found" }, { status: 404 });

    const attempts = quiz.results.length;
    const totalQuestions = quiz.questions.length;

    const averageScore =
      attempts === 0
        ? 0
        : quiz.results.reduce((sum: number, r: any) => sum + r.score, 0) /
          attempts;

    const accuracy =
      attempts === 0
        ? 0
        : quiz.results.reduce((sum: number, r: any) => {
            const correct = r.answers.filter(
              (a: number, i: number) =>
                a === quiz.questions[i].correctAnswer
            ).length;

            return sum + (correct / totalQuestions) * 100;
          }, 0) / attempts;

    return Response.json(
      {
        quizTitle: quiz.title,
        attempts,
        averageScore,
        accuracy,
        results: quiz.results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("QUIZ INSIGHTS ERROR:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}