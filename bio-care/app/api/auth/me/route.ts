import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    const cookieJar = await cookies();
    const token = cookieJar.get("token")?.value;

    if (!token)
      return new Response(JSON.stringify({ user: null }), { status: 200 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await connectDB();

    const user = await User.findById(decoded.id)
      .populate("enrolledCourses")
      .select("-password");

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
}
