import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    const cookieJar = await cookies();
    const token = cookieJar.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await connectDB();

    const user = await User.findById(decoded.id)
      .populate("enrolledCourses")
      .select("-password");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ courses: user.enrolledCourses }), {
      status: 200,
    });

  } catch (e) {
    console.error("ENROLLED API ERROR:", e);
    return new Response(
      JSON.stringify({ error: "Failed to load courses" }),
      { status: 500 }
    );
  }
}
