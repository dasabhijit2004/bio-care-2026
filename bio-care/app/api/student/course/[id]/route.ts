import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request, { params }: any) {
  await connectDB();
  const course = await Course.findById(params.id);
  return new Response(JSON.stringify({ course }), { status: 200 });
}
