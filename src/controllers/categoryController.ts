import { Request, Response } from "express";
import { getAllActiveCategories } from "../services/categoriesService";
import { HttpStatus } from '../constants/httpStatus';
import { ICategory } from '../types/categories';

export const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories: ICategory[] = await getAllActiveCategories();
        const mapCategories= (category:ICategory)=>({
                     id:category._id,
                     name:category.name,
                     imageUrl:category.imageUri,
        })
        const mappedCategories = categories.map(mapCategories);
        res.status(HttpStatus.OK).json(mappedCategories);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}