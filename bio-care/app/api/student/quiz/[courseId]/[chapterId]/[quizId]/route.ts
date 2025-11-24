import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request, context: any) {
  try {
    const { courseId, chapterId, quizId } = await context.params;

    if (!courseId || !chapterId || !quizId) {
      return new Response(
        JSON.stringify({ error: "Invalid parameters" }),
        { status: 400 }
      );
    }

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course)
      return new Response(JSON.stringify({ error: "Course not found" }), { status: 404 });

    const chapter = course.chapters.id(chapterId);
    if (!chapter)
      return new Response(JSON.stringify({ error: "Chapter not found" }), { status: 404 });

    const quiz = chapter.quizzes.id(quizId);
    if (!quiz)
      return new Response(JSON.stringify({ error: "Quiz not found" }), { status: 404 });

    return new Response(JSON.stringify({ quiz }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to load quiz" }), {
      status: 500,
    });
  }
}
