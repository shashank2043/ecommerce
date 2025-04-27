import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const uploadPath = path.join(process.cwd(), "public", fileName);
  await fs.writeFile(uploadPath, buffer);
  const url = `/public/${fileName}`;
  return new Response(JSON.stringify({ url }), { status: 201 });
}
