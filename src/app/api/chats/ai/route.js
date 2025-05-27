export const maxDuration = 60;
import Chats from "@/app/models/Chat";
import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
    try {
        // Get userId from Clerk auth
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not authenticated",
                },
                { status: 401 }
            );
        }

        // Parse and validate request body
        const { chatId, prompt } = await req.json();
        if (!chatId || !prompt || typeof prompt !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    message: "chatId and prompt are required and must be valid",
                },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // Find chat document
        const data = await Chats.findOne({ userId, _id: chatId });
        if (!data) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Chat not found",
                },
                { status: 404 }
            );
        }

        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now(),
        };
        data.messages.push(userPrompt);

        const model = ai.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiMessage = {
            role: "assistant",
            content: response.text(),
            timestamp: Date.now(),
        };

        
        data.messages.push(aiMessage);
        await data.save();

        return NextResponse.json({ success: true, data: aiMessage }, { status: 200 });
    } catch (e) {
        console.error("Error in POST /api/chat:", e);
        return NextResponse.json(
            {
                success: false,
                error: e.message,
            },
            { status: 500 }
        );
    }
}