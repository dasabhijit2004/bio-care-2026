import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const { courseId, chapterId, title, questions } = await req.json();

    await connectDB();
    const course = await Course.findById(courseId);
    const chapter = course.chapters.id(chapterId);

    chapter.quizzes.push({
      title,
      questions,
    });

    await course.save();

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch {
    return new Response("Error", { status: 500 });
  }
}
