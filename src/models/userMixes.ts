import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUserMix, IUserMixDocument } from '../types/users';

const userMixesSchema = new Schema<IUserMixDocument>({
    userId: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    mixName: {
        type: String,
        required: true,
    },
    mixIcon: {
        type: String
    },
    mixType: {
        type: String,
        enum: ['morning', 'afternoon', 'evening', 'night'],
        default: 'morning'
    }
}, {
    timestamps: true,
    versionKey: false,
});

const UserMixes: Model<IUserMixDocument> = mongoose.model<IUserMixDocument>('UserMixes', userMixesSchema);

export default UserMixes;
export { IUserMix, IUserMixDocument };