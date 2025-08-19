export type UserProvider = 'local' | 'google' | 'facebook' | 'apple';

export interface IUser {
    userID: string;
    name: string;
    email: string;
    password?: string;
    provider: UserProvider;
    providerId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserDocument extends IUser {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCreateRequest {
    name: string;
    email: string;
    password?: string;
    provider?: UserProvider;
    providerId?: string;
}

export interface IUserUpdateRequest {
    name?: string;
    email?: string;
    password?: string;
}

export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserSocialLoginRequest {
    provider: UserProvider;
    id_token?: string;
    access_token?: string;
}

export interface IUserProfile {
    userID: string;
    name: string;
    email: string;
    provider: UserProvider;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCategoryPreference {
    userId: string;
    preferredCategories: Array<{
        categoryID: string;
        categoryName: string;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserCategoryPreferenceDocument extends IUserCategoryPreference {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCategoryPreferenceRequest {
    categories: Array<{
        categoryID: string;
        categoryName: string;
    }>;
}

export interface IUserMix {
    _id?: string;
    userId: string;
    audioUrl: string;
    mixName: string;
    mixIcon?: string;
    mixType: 'morning' | 'afternoon' | 'evening' | 'night';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserMixDocument extends IUserMix {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserMixCreateRequest {
    userId: string;
    audioUrl: string;
    mixName: string;
    mixIcon?: string;
    mixType?: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface IUserMixUpdateRequest {
    audioUrl?: string;
    mixName?: string;
    mixIcon?: string;
    mixType?: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface IUserMixFilters {
    userId?: string;
    mixType?: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface IHomeScreenItem {
    id: string;
    type: 'morning' | 'afternoon' | 'evening' | 'night' | 'category';
    title: string;
    text: string;
    image: string;
}

export interface IUserHomeScreenResponse {
    main: IHomeScreenItem[];
    categories: IHomeScreenItem[];
} 