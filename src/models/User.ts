import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    provider: 'local' | 'google' | 'facebook' | 'apple';
    providerId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {}

const userSchema: Schema<IUserDocument> = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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