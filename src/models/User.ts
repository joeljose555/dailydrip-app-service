import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User", userSchema);

export default User;