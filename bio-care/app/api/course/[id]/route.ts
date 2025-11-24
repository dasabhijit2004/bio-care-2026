import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;

    await connectDB();

    const course = await Course.findById(id);

    if (!course)
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

    return new Response(JSON.stringify({ course }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}
