import connectDB from "@/config/db";
import Chats from "@/app/models/Chat";
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

export async function DELETE(req){
    try{
const {userId}=getAuth(req);
const {chatId}=await req.json();

if (!userId) {
    return NextResponse.json({
        success: false, message: "User not Authenticated",
    }, { status: 401 });
}

// Connect to Db and Delete the Chat using its iD


await connectDB();
await Chats.deleteOne({_id:chatId,userId})
return NextResponse.json({
    success:true,message:"Chat is Deleted"
},{status:200})


    }catch(e){
return NextResponse.json({
    success:false,error:e.message
},{status:500})
    }
}