import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String, required: false }
    }, {
    timestamps: true
}
);

const User=mongoose.models.User || mongoose.model('User',UserSchema);

export default User;