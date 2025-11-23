import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import CourseRequest from "@/models/CourseRequest";

export async function POST(req: Request) {
  try {
    const { courseId } = await req.json();

    const cookieJar = await cookies();
    const token = cookieJar.get("token")?.value;
    if (!token) return new Response("Unauthorized", { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await connectDB();

    const alreadyRequested = await CourseRequest.findOne({
      studentId: decoded.id,
      courseId,
      status: "pending"
    });

    if (alreadyRequested) {
      return new Response(JSON.stringify({ error: "Already requested" }), {
        status: 400,
      });
    }

    await CourseRequest.create({
      studentId: decoded.id,
      courseId,
      status: "pending",
    });

    return new Response(JSON.stringify({ ok: true }), { status: 201 });

  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}
