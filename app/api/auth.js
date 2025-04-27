import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword, generateToken } from "./authUtils";

const prisma = new PrismaClient();

export async function POST(req) {
  const { action, email, password, name } = await req.json();
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password required" }),
      { status: 400 }
    );
  }
  if (action === "register") {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 409 }
      );
    }
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });
    const token = generateToken(user);
    return new Response(
      JSON.stringify({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        },
      }),
      { status: 201 }
    );
  } else if (action === "login") {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }
    const token = generateToken(user);
    return new Response(
      JSON.stringify({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        },
      }),
      { status: 200 }
    );
  } else {
    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
    });
  }
}
