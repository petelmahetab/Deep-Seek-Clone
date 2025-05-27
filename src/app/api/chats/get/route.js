import connectDB from "@/config/db";
import Chats from "@/app/models/Chat";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Request headers:", req.headers); 
    const { userId } = auth(req);
    console.log("User ID:", userId); 

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await Chats.find({ userId })
      .sort({ updatedAt: -1 })
      .exec();
    console.log("Fetched chats:", data); 

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (e) {
    console.error("Error in /api/chats/get:", e); 
    return NextResponse.json(
      { success: false, message: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}