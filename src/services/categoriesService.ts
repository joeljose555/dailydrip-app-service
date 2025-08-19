import Category from "../models/Categories";

export const getAllActiveCategories = async () => {
    try {
        const categories = await Category.find({isActive:true});
        return categories;
    } catch (error) {
        throw error;
    }
}
