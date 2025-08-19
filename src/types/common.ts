export interface IBaseDocument {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface IApiErrorResponse {
    success: false;
    error: string;
    message?: string;
}

export interface IApiSuccessResponse<T> {
    success: true;
    data: T;
    message?: string;
}

export interface IPaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface IQueryFilters {
    [key: string]: any;
}

export interface IRequestWithUser extends Request {
    user: {
        userID: string;
        email: string;
        name: string;
        provider: string;
    };
} 