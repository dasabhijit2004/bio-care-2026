import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const { courseId, chapterId } = await req.json();

    await connectDB();

    await Course.findByIdAndUpdate(
      courseId,
      { $pull: { chapters: { _id: chapterId } } }
    );

    return new Response(JSON.stringify({ ok: true }));
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
