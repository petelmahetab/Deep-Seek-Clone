import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/app/models/User";
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

    await connectDB();

    switch (type) {
        case 'user.created':
            await User.create(userData);
            break;
        case 'user.updated':
            await User.findByIdAndUpdate(userData);
            break;
        case 'user.deleted':
            await User.findByIdAndDelete(userData);
            break;
        default:
            break;

    }

       return NextRequest.json({message:'Event Arrived.'})

}