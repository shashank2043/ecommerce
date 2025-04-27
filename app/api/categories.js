import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./authUtils";

const prisma = new PrismaClient();

function isAdmin(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  const user = verifyToken(token);
  return user && user.isAdmin;
}

export async function GET() {
  const categories = await prisma.category.findMany();
  return new Response(JSON.stringify(categories), { status: 200 });
}

export async function POST(req) {
  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const { name } = await req.json();
  if (!name) {
    return new Response(JSON.stringify({ error: "Name required" }), {
      status: 400,
    });
  }
  const category = await prisma.category.create({ data: { name } });
  return new Response(JSON.stringify(category), { status: 201 });
}
