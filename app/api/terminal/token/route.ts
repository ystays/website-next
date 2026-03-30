import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { SignJWT } from "jose";
import authOptions from "@/lib/options";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== "yisheng3@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.TERMINAL_JWT_SECRET;
  if (!secret || secret.length < 32) {
    console.error("[terminal/token] TERMINAL_JWT_SECRET missing or too short");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  const key = new TextEncoder().encode(secret);
  const token = await new SignJWT({
    sub: session.user?.email ?? "unknown",
    purpose: "ws-ssh",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .setJti(crypto.randomUUID())
    .sign(key);

  return NextResponse.json({ token });
}
