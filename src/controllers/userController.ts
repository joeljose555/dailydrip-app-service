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
                id: "daily_brief",
                text: "Daily news",
                title: "Daily Brief",
                image: "https://via.placeholder.com/150?text=Daily"
            },
            {
                id: "morning_brief",
                text: "Morning news",
                title: "Morning Brief",
                image: "https://via.placeholder.com/150?text=Morning"
            },
            {
                id: "evening_brief",
                text: "Evening news",
                title: "Evening Brief",
                image: "https://via.placeholder.com/150?text=Evening"
            }
        ];

        // Get userId from req.user or req.query
        const userId = req.user?.userID || req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        // Fetch user preferred categories
        const { categories } = await require('../services/userService').getUserProfile(userId);
        const categoriesArr = categories.map(cat => ({
            text: cat.name,
            title: cat.name + " News",
            image: "https://via.placeholder.com/100",
            id: cat.id
        }));

        return res.json({ main, categories: categoriesArr });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const getAllCategoriesFormatted = async (req, res) => {
    try {
        const foo = req.query.foo;
        console.log('Received param foo:', foo);
        const categories = await require('../services/categoriesService').getAllCategories();
        const formatted = categories.map(cat => ({
            id: cat._id,
            title: cat.name,
            text: cat.name + ' News',
            image: 'https://via.placeholder.com/100'
        }));
        return res.json({ categories: formatted });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}