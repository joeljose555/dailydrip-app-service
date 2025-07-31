import { Request, Response } from "express";
import { createUser as createUserService, addUserCategoryPreference as addUserCategoryPreferenceService, getUserProfile } from "../services/userService";
import { title } from "process";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUserService(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addUserCategoryPreference = async (req: Request, res: Response) => {
    try {
        const { categories } = req.body;
        const userId = (req as any).user.userID; // Get userId from authenticated user
        const userCategoryPreference = await addUserCategoryPreferenceService(userId, categories);
        res.status(201).json(userCategoryPreference);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userID;
        const profile = await getUserProfile(userId);
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserHomeScreen = async (req, res) => {
    try {
        // Hardcoded array
        const main = [
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
        const userId = req.user?.userID || req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        // Fetch user preferred categories for home screen
        const categoriesMain = await require('../services/userService').fetchCategoriesForHome(userId);

        return res.json({ main, categories: categoriesMain });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const getAllCategoriesFormatted = async (req, res) => {
    try {
        const foo = req.query.foo; //TODO : pass userId and remove the user categories to avoid duplicate categories
        console.log('Received param foo:', foo);
        const categories = await require('../services/categoriesService').getAllCategories();
        const main = categories.map(cat => ({
            id: cat._id,
            type: "category",
            title: cat.name + " News",
            text: cat.name,
            image: cat.imageUri || "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150&h=150&fit=crop" // fallback image
        }));
        return res.json({ categories:main });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}