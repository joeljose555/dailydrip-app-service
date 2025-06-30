import { Request, Response } from "express";
import { getAllCategories } from "../services/categoriesService";

export const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}