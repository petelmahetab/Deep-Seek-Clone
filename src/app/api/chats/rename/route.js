import connectDB from "@/config/db";
import Chats from "@/app/models/Chat";
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({
                success: false, message: "User not Authenticated",
            }, { status: 401 });
        }

        const { chatId, name } = await req.json()

        // Connect to DB and Updated the ChatName
        await connectDB();
        await Chats.findOneAndUpdate({ _id: chatId, userId }, { name })

        return NextResponse.json({
            success: true, message: 'Chat Renamed'
        }, { status: 200 })
    } catch (e) {
        return NextResponse.json({
            success: false, message: e.message
        }, { status: 500 })
    }
}