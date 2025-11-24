import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const { courseId, chapterId, title, questions } = await req.json();

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return new Response("Course not found", { status: 404 });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return new Response("Chapter not found", { status: 404 });

    chapter.quizzes.push({
      title,
      questions,
      settings: {},
      results: [],
    });

    await course.save();

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.log(err);
    return new Response("Error creating quiz", { status: 500 });
  }
}
