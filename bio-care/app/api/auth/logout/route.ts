import { cookies } from "next/headers";

export async function POST() {
  try {
    const jar = await cookies();
    jar.delete("token");

    return new Response(
      JSON.stringify({ message: "Logged out" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Logout failed" }),
      { status: 500 }
    );
  }
}
