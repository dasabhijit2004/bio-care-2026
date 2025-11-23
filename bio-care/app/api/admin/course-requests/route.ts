import { connectDB } from "@/lib/db";
import CourseRequest from "@/models/CourseRequest";

export async function GET() {
  await connectDB();

  const requests = await CourseRequest.find({ status: "pending" })
    .populate("studentId")
    .populate("courseId");

  return new Response(JSON.stringify({ requests }), { status: 200 });
}
