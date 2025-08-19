export interface ICategory {
    _id?: string;
    name: string;
    imageUri?: string | null;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategoryDocument extends ICategory {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICategoryPreference {
    categoryID: string;
    categoryName: string;
}

export interface ICategoryFormatted {
    id: string;
    type: "category";
    title: string;
    text: string;
    image: string;
}

export interface ICategoryResponse {
    categories: ICategoryFormatted[];
}

export interface ICategoryCreateRequest {
    name: string;
    imageUri?: string;
    isActive?: boolean;
}

export interface ICategoryUpdateRequest {
    name?: string;
    imageUri?: string;
    isActive?: boolean;
}

export interface ICategoryFilters {
    isActive?: boolean;
    name?: string;
} 