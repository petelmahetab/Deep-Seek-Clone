import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "../../models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req) {

    const wh = new Webhook(process.env.SIGNING_SCECRET);
    const headerPayload = await headers();
    const svixHeaders = {
        'svix-id': headerPayload.get('svix-id'),
        'svix-timestamp': headerPayload.get('svix-timestamp'),
        'svix-signature': headerPayload.get('svix-signature')
    };

    //Get the Payload and Verify It.

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders)

    //Prepare the User Data to be saved in Db
    const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
    };

    try {
        await connectDB();
      
        switch (type) {
          case 'user.created':
            await User.create(userData);
            console.log("User created:", userData);
            break;
          case 'user.updated':
            await User.findByIdAndUpdate(userData._id, userData);
            console.log("User updated:", userData);
            break;
          case 'user.deleted':
            await User.findByIdAndDelete(userData._id);
            console.log("User deleted:", userData._id);
            break;
          default:
            break;
        }
        console.log("🔔 Webhook triggered");

        return NextResponse.json({ message: 'Event processed.' });
      
      } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
      }
      
}