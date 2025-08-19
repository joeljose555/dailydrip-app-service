import Category from "../models/Categories";
import User from "../models/User";
import UserCategoryPreference from "../models/userCategoryPreference";
import { v4 as uuidv4 } from 'uuid';
import { IUserCategoryPreferenceRequest } from "../types";

export const createUser = async (name: string, email: string, password: string) => {
    const userID = uuidv4();
    const user = await User.create({ userID, name, email, password });
    return user;
}

export const getUserByEmailAndProvider = async (email: string, provider: string) => {
    const user = await User.findOne({ email, provider });
    return user;
}

export const getUser = async (id: string) => {
    const user = await User.findById(id);
    return user;
}

export const updateUserCategoryPreference = async (userId: string, categories: IUserCategoryPreferenceRequest[]) => {
    const user = await User.findOne({ userID: userId });
    if (!user) {
        throw new Error("User not found");
    }
    
    // Check if user already has preferences
    const existingPreference = await UserCategoryPreference.findOne({ userId });
    if (existingPreference) {
        // Update existing preferences
        const updatedPreference = await UserCategoryPreference.findOneAndUpdate(
            { userId },
            { preferredCategories: categories },
            { new: true, runValidators: true }
        );
        return updatedPreference;
    } else {

        // User has no preferences yet
        throw new Error("User has no existing category preferences to update");
    }
}

// Keep the old function name for backward compatibility
export const addUserCategoryPreference = async (userId: any, categories: any) => {
    return updateUserCategoryPreference(userId, categories);
}

export const getUserCategoryPreference = async (userId: string) => {
    const userCategoryPreference = await UserCategoryPreference.find({ userId });
    return userCategoryPreference;
}

export const getUserProfile = async (userID: string) => {
    const user = await User.findOne({ userID });
    if (!user) {
        throw new Error("User not found");
    }
    
    const result = await UserCategoryPreference.aggregate([
        { $match: { userId: user.userID } }, // Use user.userID if that's what you store
        { $unwind: "$preferredCategories" },
        {
            $lookup: {
                from: "categories",
                localField: "preferredCategories.categoryID",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        { $unwind: "$categoryDetails" },
        { $match: { "categoryDetails.isActive": true } },
        {
            $project: {
                _id: 0,
                name: "$preferredCategories.categoryName",
                id: "$categoryDetails._id",
                imageUrl: "$categoryDetails.imageUri"
            }
        }
    ]);
    
    return {
        user: {
            userID: user.userID,
            name: user.name,
            email: user.email,
            provider: user.provider,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        },
        categories: result
    };
}

export const fetchCategoriesForHome = async (userId: string) => {
    const user = await User.findOne({ userID: userId });
    if (!user) {
        throw new Error("User not found");
    }
    
    const result = await UserCategoryPreference.aggregate([
        { $match: { userId: user.userID } },
        { $unwind: "$preferredCategories" },
        {
            $lookup: {
                from: "categories",
                localField: "preferredCategories.categoryID",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        { $unwind: "$categoryDetails" },
        { $match: { "categoryDetails.isActive": true } },
        {
            $project: {
                _id: 0,
                id: "$categoryDetails._id",
                type: { $toLower: "$categoryDetails.name" },
                title: { $concat: ["$categoryDetails.name", " News"] },
                text: "$categoryDetails.name",
                image: "$categoryDetails.imageUri"
            }
        }
    ]);
    
    return result;
}