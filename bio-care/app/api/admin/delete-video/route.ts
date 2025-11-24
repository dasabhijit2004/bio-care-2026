import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const { courseId, chapterId, videoId } = await req.json();

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return new Response("Not found", { status: 404 });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return new Response("Chapter not found", { status: 404 });

    chapter.videos.id(videoId).deleteOne();

    await course.save();

    return new Response(JSON.stringify({ ok: true }));
  } catch {
    return new Response("Error", { status: 500 });
  }
}
