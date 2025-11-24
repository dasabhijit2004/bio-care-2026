import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { courseId, chapterId, quizId, answers } = await req.json();

    await connectDB();

    const cookieJar = await cookies();
    const token = cookieJar.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized: No token found" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const course = await Course.findById(courseId);
    const chapter = course.chapters.id(chapterId);
    const quiz = chapter.quizzes.id(quizId);

    let score = 0;
    let negative = quiz.settings.negativeMarking;

    quiz.questions.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) {
        score += 1;
      } else if (answers[index] !== null) {
        score -= negative;
      }
    });

    quiz.results.push({
      studentId: decoded.id,
      score,
      answers,
    });

    await course.save();

    return new Response(JSON.stringify({ score }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Submission failed" }), {
      status: 500,
    });
  }
}
