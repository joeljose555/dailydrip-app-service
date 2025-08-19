import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser, IUserDocument } from "../types/users";

const userSchema: Schema<IUserDocument> = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () { return this.provider === 'local'; },
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'facebook', 'apple'],
        default: 'local',
    },
    providerId: {
        type: String,
        required: function () { return this.provider !== 'local'; },
        unique: false,
    },
}, {
    timestamps: true,
});

const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);

export default User;
export { IUser, IUserDocument };