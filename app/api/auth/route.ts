import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === "test@example.com" && password === "password") {
    return NextResponse.json({
      token: "fake-jwt-token",
      message: "Login successful",
    });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
