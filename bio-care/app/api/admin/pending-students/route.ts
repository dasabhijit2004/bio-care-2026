import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const students = await User.find({ approved: false, isAdmin: false });
  return new Response(JSON.stringify({ students }), { status: 200 });
}
