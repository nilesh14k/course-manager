import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db("houseofedtechdb");
    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const instructorName = formData.get("instructorName")?.toString();
    const category = formData.get("category")?.toString();
    const topic = formData.get("topic")?.toString();
    const level = formData.get("level")?.toString();
    const language = formData.get("language")?.toString();
    const feeStr = formData.get("fee")?.toString();
    const duration = formData.get("duration")?.toString();
    const whatYouWillLearn = formData.get("whatYouWillLearn")?.toString();
    const requirements = formData.get("requirements")?.toString();
    const thumbnailFile = formData.get("thumbnail");
    if (!title || !description || !instructorName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const fee = feeStr ? parseFloat(feeStr) : 0;
    const courseDoc: any = {
      title,
      description,
      instructorName,
      category,
      topic,
      level,
      language,
      fee,
      duration,
      whatYouWillLearn,
      requirements,
      updatedAt: new Date()
    };
    if (thumbnailFile) {
      courseDoc.thumbnail = `/uploads/${(thumbnailFile as File).name}`;
    }
    const client = await clientPromise;
    const db = client.db("houseofedtechdb");
    const result = await db.collection("courses").updateOne({ _id: new ObjectId(id) }, { $set: courseDoc });
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Course not found or no changes" }, { status: 404 });
    }
    return NextResponse.json({ message: "Course updated" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db("houseofedtechdb");
    const result = await db.collection("courses").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
