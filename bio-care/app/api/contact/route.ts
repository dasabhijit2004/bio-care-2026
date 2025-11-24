import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, phone, userClass, message } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Bio Care <onboarding@resend.dev>",
      to: "biocare545@gmail.com",
      subject: `New Contact Query from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Class/Exam:</strong> ${userClass}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
