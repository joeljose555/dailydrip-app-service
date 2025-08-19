import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserCategoryPreference, IUserCategoryPreferenceDocument } from "../types/users";

const userCategoryPreferenceSchema = new Schema<IUserCategoryPreferenceDocument>({
    userId: {
        type: String,
        ref: "User",
        required: true,
    },
    preferredCategories: [
        {
            categoryID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
            categoryName: {
                type: String,
                required: true,
            }
        }
    ]
}, {
    timestamps: true,
});

const UserCategoryPreference: Model<IUserCategoryPreferenceDocument> = mongoose.model<IUserCategoryPreferenceDocument>("UserCategoryPreference", userCategoryPreferenceSchema);

export default UserCategoryPreference;
export { IUserCategoryPreference, IUserCategoryPreferenceDocument };