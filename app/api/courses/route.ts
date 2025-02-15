import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

function transformCourseDoc(doc: any) {
  return {
    id: doc._id.toString(),
    title: doc.title || "Untitled Course",
    thumbnail: doc.thumbnail || "/placeholder-thumb.jpg",
    instructorName: doc.instructorName || "Unknown Instructor",
    rating: doc.rating || 0,
    numReviews: doc.numReviews || 0,
    price: doc.fee || 0
  };
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("houseofedtechdb");
    const docs = await db.collection("courses").find({}).toArray();
    const courses = docs.map(transformCourseDoc);
    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
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
      thumbnail: thumbnailFile ? `/uploads/${(thumbnailFile as File).name}` : "",
      createdAt: new Date()
    };
    const client = await clientPromise;
    const db = client.db("houseofedtechdb");
    const result = await db.collection("courses").insertOne(courseDoc);
    return NextResponse.json({ message: "Course created", id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
