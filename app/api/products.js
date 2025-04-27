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

export async function GET(req) {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const { name, description, price, imageUrl, categoryId } = await req.json();
  if (!name || !description || !price || !categoryId) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }
  const product = await prisma.product.create({
    data: { name, description, price, imageUrl, categoryId },
  });
  return new Response(JSON.stringify(product), { status: 201 });
}
