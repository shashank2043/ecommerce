import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./authUtils";

const prisma = new PrismaClient();

function getUser(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const token = auth.replace("Bearer ", "");
  return verifyToken(token);
}

export async function GET(req) {
  const user = getUser(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  if (user.isAdmin) {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } }, user: true },
    });
    return new Response(JSON.stringify(orders), { status: 200 });
  } else {
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
    return new Response(JSON.stringify(orders), { status: 200 });
  }
}

export async function POST(req) {
  const user = getUser(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const { items, total } = await req.json();
  if (!items || !Array.isArray(items) || items.length === 0 || !total) {
    return new Response(JSON.stringify({ error: "Invalid order data" }), {
      status: 400,
    });
  }
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });
  return new Response(JSON.stringify(order), { status: 201 });
}
