import mongoose, { Document, Model, Schema } from 'mongoose';
import { ICategory, ICategoryDocument } from '../types/categories';

const categorySchema = new Schema<ICategoryDocument>({
    name: {
        type: String,
        required: true
    },
    imageUri: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Category: Model<ICategoryDocument> = mongoose.model<ICategoryDocument>('Category', categorySchema);

export default Category;
export { ICategory, ICategoryDocument };