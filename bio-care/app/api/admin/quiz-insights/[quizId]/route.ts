import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request, context: any) {
  try {
    const { quizId } = await context.params;

    await connectDB();

    const course = await Course.findOne({
      "chapters.quizzes._id": quizId,
    });

    let foundQuiz = null;

    course.chapters.forEach((ch) => {
      const q = ch.quizzes.id(quizId);
      if (q) foundQuiz = q;
    });

    const results = foundQuiz.results;

    const averageScore =
      results.reduce((acc: number, r: any) => acc + r.score, 0) /
      results.length;

    const attemptsChart = results.map((r: any) => ({
      student: r.studentId.toString().slice(-4),
      score: r.score,
    }));

    return new Response(
      JSON.stringify({
        averageScore,
        attemptsChart,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed" }), {
      status: 500,
    });
  }
}
