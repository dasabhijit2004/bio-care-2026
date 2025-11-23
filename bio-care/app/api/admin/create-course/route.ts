import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const cookieJar = await cookies();
    const token = cookieJar.get("token")?.value;

    if (!token)
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded.isAdmin)
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

    await connectDB();

    const { title, description, price, thumbnail } = await req.json();

    if (!title || !price) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const newCourse = await Course.create({
      title,
      description: description || "",
      price,
      thumbnail: thumbnail || "/placeholder.jpg",
      chapters: [],
    });

    return new Response(JSON.stringify({ course: newCourse }), {
      status: 201,
    });

  } catch (err) {
    console.error("CREATE COURSE API ERROR:", err);
    return new Response(JSON.stringify({ error: "Failed to create course" }), {
      status: 500,
    });
  }
}
