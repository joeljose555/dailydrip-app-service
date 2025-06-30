import Category from "../models/Categories";

export const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw error;
    }
}
