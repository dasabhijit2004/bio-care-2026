import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password, userClass } = await req.json();

    if (!name || !email || !password || !userClass) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return new Response(JSON.stringify({ error: "Email already registered" }), {
        status: 400,
      });
    }

    const hashed = hashPassword(password);

    await User.create({
      name,
      email,
      password: hashed,
      class: userClass,
      isAdmin: false,
      approved: false,

      enrolledCourses: [], // <-- RESTORED HERE
    });

    return new Response(
      JSON.stringify({ message: "Signup successful. Awaiting admin approval." }),
      { status: 201 }
    );

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return new Response(JSON.stringify({ error: "Signup failed" }), { status: 500 });
  }
}
