import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Create directory if not exists
async function ensureUploadDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("thumbnail") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", "thumbnails");
    await ensureUploadDir(uploadDir);

    // Generate unique file name
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(uploadDir, fileName);

    // Save file
    await fs.writeFile(filePath, buffer);

    // Public URL
    const url = `/uploads/thumbnails/${fileName}`;

    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error("Thumbnail upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
