import { connectDB } from "@/lib/db";
import CourseRequest from "@/models/CourseRequest";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    await connectDB();

    const request = await CourseRequest.findById(requestId);
    if (!request) return new Response("Not found", { status: 404 });

    await User.findByIdAndUpdate(request.studentId, {
      $push: { enrolledCourses: request.courseId },
    });

    request.status = "approved";
    await request.save();

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}
