import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-secret";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing fields: email, password, and name are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("houseofedtechdb");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, name, password: hashedPassword };
    const result = await db.collection("users").insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId, email, name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      token,
      user: { id: result.insertedId, email, name },
      message: "Signup successful",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
