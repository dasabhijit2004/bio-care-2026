import { connectDB } from "@/lib/db";
import CourseRequest from "@/models/CourseRequest";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    await connectDB();

    await CourseRequest.findByIdAndUpdate(requestId, {
      status: "rejected",
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to reject" }), {
      status: 500,
    });
  }
}
