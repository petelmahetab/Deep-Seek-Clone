import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        name: { type: String, required: false },
        messages: [
            {
                role: { type: String, required: true },
                content: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
        userId: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Chats = mongoose.models.Chats || mongoose.model("User", ChatSchema);

export default Chats;