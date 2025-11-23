import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();
  const { id } = await req.json();

  await User.findByIdAndDelete(id);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
