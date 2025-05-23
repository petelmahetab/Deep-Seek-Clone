import connectDB from "@/config/db";
import Chats from "@/app/models/Chat";
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        // If user is authenticated then Connect it to DB and Saved in Chats Collection. and create a new chat.

        const chatData = {
            userId, Messages: [], name: 'New Chat',
        }
        await connectDB();
        await Chats.create(chatData);
        return NextResponse.json({
            success: true,messsage:'Chat is created',
        },{status:201})

    } catch (e) {
     return NextResponse.json({success:false,Messages:e.message},{status:500})
    }

}
