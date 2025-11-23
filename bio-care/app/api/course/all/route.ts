import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET() {
  await connectDB();
  const courses = await Course.find({});
  return new Response(JSON.stringify({ courses }), { status: 200 });
}
