import { Request, Response } from "express";
import { createUser as createUserService, 
    addUserCategoryPreference as addUserCategoryPreferenceService, 
    getUserProfile, 
    updateUserCategoryPreference, 
    getUserPreferredCategories
 } from"../services/userService";
import { title } from "process";
import { HttpStatus } from '../constants/httpStatus';
import { 
    IUser, 
    IUserCategoryPreferenceRequest, 
    IUserHomeScreenResponse,
    IHomeScreenItem 
} from '../types/users';
import Category from "../models/Categories";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user: IUser = await createUserService(name, email, password);
        res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}

export const addUserCategoryPreference = async (req: Request, res: Response) => {
    try {
        const  categories  = req.body; // expecting an array of { categoryID, categoryName }
        const userId = (req as any).user.userID; // Get userId from authenticated user
        const userCategoryPreference = await updateUserCategoryPreference(userId, categories);
        res.status(HttpStatus.CREATED).json(userCategoryPreference);
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userID;
        const profile = await getUserProfile(userId);
        res.status(HttpStatus.OK).json(profile);
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}

export const getUserHomeScreen = async (req: Request, res: Response) => {
    try {
        // Hardcoded array
        const main: IHomeScreenItem[] = [
            {
                id: "morning_mix",
                type: "morning",
                title: "Morning Mix",
                text: "Start your day informed",
                image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150&h=150&fit=crop"
            },
            {
                id: "afternoon_mix",
                type: "afternoon",
                title: "Afternoon Mix",
                text: "Catch up on the day's events",
                image: "https://images.unsplash.com/photo-1553341829-4c9f53513b3b?w=150&h=150&fit=crop"
            },
            {
                id: "evening_mix",
                type: "evening",
                title: "Evening Mix",
                text: "Wind down with the latest news",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop"
            },
            {
                id: "night_mix",
                type: "night",
                title: "Night Mix",
                text: "The stories that mattered today",
                image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=150&h=150&fit=crop"
            }
        ];

        // Get userId from req.user or req.query
        const userId = (req as any).user?.userID || req.query.userId;
        if (!userId) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing userId" });
            return;
        }

        console.log('userId', userId);

        // Fetch user preferred categories for home screen
        const refs = await require('../services/userService').getUserPreferredCategoryRefs(userId as string);
        const ids = refs.map((r: any) => r.categoryID);
        const cats = await Category.find({ _id: { $in: ids }, isActive: true }).lean();
        const idToCat = new Map<string, any>(cats.map((c: any) => [String(c._id), c]));
        const categoriesMain = refs
            .map((r: any) => {
                const cat = idToCat.get(String(r.categoryID));
                if (!cat) return null;
                return {
                    id: cat._id,
                    type: String(cat.name).toLowerCase(),
                    title: `${cat.name} News`,
                    text: cat.name,
                    image: cat.imageUri
                };
            })
            .filter(Boolean) as IHomeScreenItem[];

        const response: IUserHomeScreenResponse = { main, categories: categoriesMain };
        res.json(response);
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
}

export const getAllCategoriesFormatted = async (req: Request, res: Response) => {
    try {
        const foo = req.query.foo; //TODO : pass userId and remove the user categories to avoid duplicate categories
        console.log('Received param foo:', foo);
        const categories = await require('../services/categoriesService').getAllCategories();
        const main = categories.map(cat => ({
            id: cat._id,
            type: "category" as const,
            title: cat.name + " News",
            text: cat.name,
            image: cat.imageUri || "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150&h=150&fit=crop" // fallback image
        }));
        res.json({ categories: main });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
}