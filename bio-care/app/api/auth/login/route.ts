import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 400,
      });
    }

    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 400,
      });
    }

    if (!user.approved && !user.isAdmin) {
      return new Response(JSON.stringify({ error: "Your account is pending approval" }), {
        status: 403,
      });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // NEW COOKIE API — WORKS 100%
    const cookieJar = await cookies();
    cookieJar.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: { id: user._id, name: user.name, isAdmin: user.isAdmin },
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), { status: 500 });
  }
}
