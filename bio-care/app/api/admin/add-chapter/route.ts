import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const { courseId, title } = await req.json();

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return new Response("Course not found", { status: 404 });

    course.chapters.push({ title, videos: [], documents: [] });

    await course.save();

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
