import User from "../models/User";
import UserCategoryPreference from "../models/userCategoryPreference";
import { v4 as uuidv4 } from 'uuid';

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

export const addUserCategoryPreference = async (userId: any,categories: any) => {
    const user = await User.findOne({userID:userId});
    if(!user){
        throw new Error("User not found");
    }
    categories = categories.map((category:any)=>{
        return {
            categoryID:category._id,
            categoryName:category.name
        }
    })
    const userCategoryPreference = await UserCategoryPreference.create({userId,preferredCategories:categories});
    return userCategoryPreference;
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
        { $match: { userId: user._id } },
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
                id: "$categoryDetails._id"
            }
        }
    ]);
    
    return {
        user: {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            provider: user.provider,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        },
        categories: result
    };
}