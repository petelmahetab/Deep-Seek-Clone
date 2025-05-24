import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    name: {
      type: String,
      default: "New Chat",
    },
  },
  { timestamps: true }
);

const Chats = mongoose.models.Chats || mongoose.model("Chats", ChatSchema);

export default Chats;