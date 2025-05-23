import connectDB from "@/config/db";
import Chats from "@/app/models/Chat";
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        const {userId}=getAuth(req)

        if(!userId){
   return NextResponse.json({
    success:false,message:"User not Authenticated",
   },{status:401})
        }

        // If the user Exists then Connect to Db and fetch the all chats or messages from DB.
        await connectDB();
        const data=await Chats.find({userId});

        return NextResponse.json({
            success:true,data
        },{status:200})

    }catch(e){
          return NextResponse.json({
            success:false,message:e.message
          },{status:500})
    }
}