export const maxDuration=60;
import Chats from "@/app/models/Chat";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { GoogleGenAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.DEEPSEEK_API_KEY });



export async function POST(req) {
    try {
        const { userId } = getAuth(req);
       
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not Authenticated'
            }),{status:401}
        }
        //FInd the Chat documents in DB based on User and Chat id.
        const { chatId, prompt } = await req.json();

        await connectDB();
        const data = await Chats.findOne({ userId, _id: chatId })
        if (!data) {
            return NextResponse.json(
              {
                success: false,
                message: "Chat not found",
              },
              { status: 404 }
            );
          }
        //create the for users Message Obj
        const userPrompt = {
            role: 'user',
            content: prompt,
            timestamp: Date.now()
        }
        data.messages.push(userPrompt);

        const model=ai.getGenerativeModel({model:'gemini-pro'})
        const result=await model.generateContent(prompt)
        const response=await result.response;
        const aiMessage={
            role:'assistant',content:response.text(),timestamp:Date.now(),
        };

        data.messages.push(aiMessage)
        await data.save();
        return NextResponse.json({success:true,data:aiMessage},{status:200})

    } catch (e) {
        return NextResponse.json({
            success: false, error: e.message
        }, { status: 500 })
    }

}