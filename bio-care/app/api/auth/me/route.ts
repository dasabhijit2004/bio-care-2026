import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieJar = await cookies();
    const token = cookieJar.get("token")?.value;

    if (!token) return new Response(JSON.stringify({ user: null }), { status: 200 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return new Response(JSON.stringify({ user: decoded }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
}
