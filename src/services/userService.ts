import Category from "../models/Categories";
import User from "../models/User";
import UserCategoryPreference from "../models/userCategoryPreference";
import { v4 as uuidv4 } from 'uuid';
import { IUserCategoryPreferenceRequest, ICategoryPreferenceItem } from "../types";
import mongoose from 'mongoose';

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

export const updateUserCategoryPreference = async (userId: string, categories: ICategoryPreferenceItem[]) => {
    const user = await User.findOne({ userID: userId });
    if (!user) {
        throw new Error("User not found");
    }

    // Incoming payload is already a flat array of category items
    const incomingPreferredCategories = (categories || [])
        .map(cat => ({ 
            categoryID: typeof cat.categoryID === 'string' ? new mongoose.Types.ObjectId(cat.categoryID) : cat.categoryID,
            categoryName: cat.categoryName 
        }));

    // Ensure we have something to add/update
    if (incomingPreferredCategories.length === 0) {
        return await UserCategoryPreference.findOne({ userId }) || await UserCategoryPreference.create({ userId, preferredCategories: [] });
    }

    const existingPreference = await UserCategoryPreference.findOne({ userId });

    if (existingPreference) {
        // Merge without duplicates (by categoryID)
        const existingMap = new Map<string, { categoryID: any; categoryName: string }>();
        for (const c of existingPreference.preferredCategories as any[]) {
            existingMap.set(String(c.categoryID), { categoryID: c.categoryID, categoryName: c.categoryName });
        }
        for (const c of incomingPreferredCategories) {
            existingMap.set(String(c.categoryID), { categoryID: c.categoryID as any, categoryName: c.categoryName });
        }
        const merged = Array.from(existingMap.values());

        const updatedPreference = await UserCategoryPreference.findOneAndUpdate(
            { userId },
            { preferredCategories: merged },
            { new: true, runValidators: true }
        );
        return updatedPreference;
    } else {
        // Create new preference document when none exists
        const created = await UserCategoryPreference.create({
            userId,
            preferredCategories: incomingPreferredCategories,
        });
        return created;
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

export const getUserPreferredCategories = async (userId: string) => {
    const user = await User.findOne({ userID: userId });
    console.log('user', user);
    if (!user) {
        return [];
    }

    const preference = await UserCategoryPreference.findOne({ userId: user.userID }).lean();
    if (!preference || !preference.preferredCategories || preference.preferredCategories.length === 0) {
        return [];
    }

    // Extract ids preserving user preference order
    const preferred = preference.preferredCategories.map((c: any) => ({
        id: typeof c.categoryID === 'string' ? c.categoryID : String(c.categoryID),
        name: c.categoryName
    }));
    const ids = preferred.map(p => p.id);

    // Fetch categories in one query
    const categories = await Category.find({ _id: { $in: ids }, isActive: true }).lean();
    const idToCategory = new Map<string, any>(
        categories.map((c: any) => [String(c._id), c])
    );

    // Map back to home screen format, preserving preferred order and skipping missing
    const result = preferred
        .map(p => {
            const cat = idToCategory.get(p.id);
            if (!cat) return null;
            return {
                id: cat._id,
                type: String(cat.name).toLowerCase(),
                title: `${cat.name} News`,
                text: cat.name,
                image: cat.imageUri
            };
        })
        .filter(Boolean);

    return result as any[];
}

export const getUserPreferredCategoryRefs = async (userId: string) => {
    const user = await User.findOne({ userID: userId });
    if (!user) {
        return [];
    }
    const preference = await UserCategoryPreference.findOne({ userId: user.userID }).lean();
    if (!preference || !preference.preferredCategories) {
        return [];
    }
    return preference.preferredCategories.map((c: any) => ({
        categoryID: typeof c.categoryID === 'string' ? c.categoryID : String(c.categoryID),
        categoryName: c.categoryName
    }));
}

