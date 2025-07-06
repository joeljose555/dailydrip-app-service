import { Request, Response } from "express";
import { createUser as createUserService, addUserCategoryPreference as addUserCategoryPreferenceService, getUserProfile } from "../services/userService";

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