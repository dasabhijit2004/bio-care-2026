import { NextResponse } from "next/server";
import { createWriteStream } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${randomUUID()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads/pdfs", fileName);

    // Write file to disk
    await new Promise((resolve, reject) => {
      const stream = createWriteStream(filePath);
      stream.write(buffer);
      stream.end();
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    return NextResponse.json({
      url: `/uploads/pdfs/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
