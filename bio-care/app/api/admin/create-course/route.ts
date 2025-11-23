import Course from "@/models/Course";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  const { title, desc, price } = await req.json();

  await Course.create({
    title,
    description: desc,
    price,
  });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
