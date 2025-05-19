import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "../../models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const wh = new Webhook(process.env.SIGNING_SECRET); // Fixed spelling

  const headerPayload = headers();
  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id'),
    'svix-timestamp': headerPayload.get('svix-timestamp'),
    'svix-signature': headerPayload.get('svix-signature')
  };

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let data, type;
  try {
    ({ data, type } = wh.verify(body, svixHeaders));
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const email =
    Array.isArray(data.email_addresses) && data.email_addresses.length > 0
      ? data.email_addresses[0].email_address
      : null;

  if (!email) {
    return NextResponse.json({ error: "Missing email address" }, { status: 400 });
  }

  const userData = {
    _id: data.id,
    email,
    name: `${data.first_name} ${data.last_name}`,
    image: data.image_url,
  };

  try {
    await connectDB();

    switch (type) {
      case 'user.created':
        await User.create(userData);
        break;
      case 'user.updated':
        await User.findByIdAndUpdate(userData._id, userData);
        break;
      case 'user.deleted':
        await User.findByIdAndDelete(userData._id);
        break;
      default:
        break;
    }

    return NextResponse.json({ message: 'Event processed.' });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
