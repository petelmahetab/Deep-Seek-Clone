import connectDB from "@/config/db";
import Chats from "@/app/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Authorization header:", req.headers.get("authorization"));
    console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY ? "Set" : "Missing");

    const authResult = getAuth(req);
    console.log("Auth result:", authResult);

    const { userId } = authResult || {};
    console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID found" },
        { status: 401 }
      );
    }

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
    };

    await connectDB();
    const newChat = await Chats.create(chatData);
    console.log("Created chat:", newChat);

    return NextResponse.json(
      { success: true, message: "Chat created", data: newChat },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error in /api/chats/create:", {
      message: e.message,
      stack: e.stack,
      name: e.name,
    });
    return NextResponse.json(
      { success: false, message: e.message || "Error creating chat" },
      { status: 500 }
    );
  }
}