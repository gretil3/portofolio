import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const { name, email, message } = body as Record<string, unknown>;
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    typeof message === "string" &&
    message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Email dispatch would be wired here (e.g. Resend, Nodemailer + SMTP).
  // Logged server-side for now so submissions aren't silently dropped.
  console.log("Contact form submission:", {
    name: body.name,
    email: body.email,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
