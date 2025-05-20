import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "../../models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const wh = new Webhook(process.env.SIGNING_SECRET);
  
  const headerPayload = headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log("🔵 Incoming Payload:", payload);

  let data, type;
  try {
    ({ data, type } = wh.verify(body, svixHeaders));
    console.log("✅ Webhook Verified: ", type, data.id);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    await connectDB();

    switch (type) {
      case "user.created": {
        const email =
          Array.isArray(data.email_addresses) && data.email_addresses.length > 0
            ? data.email_addresses[0].email_address
            : null;

        if (!email) {
          console.log("Missing email for user.created:", data);
          return NextResponse.json({ error: "Missing email address" }, { status: 400 });
        }

        const name = `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Unknown User";

        const userData = {
          _id: data.id,
          email,
          name,
          image: data.image_url || "",
        };

        await User.create(userData);
        console.log("User created:", userData);
        break;
      }
      case "user.updated": {
        const userData = {};

        // Only update email if provided
        const email =
          Array.isArray(data.email_addresses) && data.email_addresses.length > 0
            ? data.email_addresses[0].email_address
            : null;
        if (email) {
          const existingUser = await User.findOne({ email, _id: { $ne: data.id } });
          if (existingUser) {
            console.log("Email already exists for user.updated:", email);
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
          }
          userData.email = email;
        }

        // Only update name if provided
        const name = `${data.first_name || ""} ${data.last_name || ""}`.trim();
        if (name) {
          userData.name = name;
        }

        // Only update image if provided
        if (data.image_url) {
          userData.image = data.image_url;
        }

        if (Object.keys(userData).length === 0) {
          console.log("No fields to update for user:", data.id);
          return NextResponse.json({ message: "No updates provided." });
        }

        const updatedUser = await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          runValidators: true,
        });
        console.log("User updated:", updatedUser);
        break;
      }
      case "user.deleted": {
        const deletedUser = await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id, deletedUser);
        break;
      }
      default:
        console.log("Unhandled event type:", type);
        break;
    }

    return NextResponse.json({ message: "Event processed." });
  } catch (error) {
    console.error("Webhook error:", error.message, error.stack);
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
}