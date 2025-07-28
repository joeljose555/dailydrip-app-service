import UserMixes from '../models/userMixes';

export const getLatestUserMix = async (userId: string, mixType: string) => {
    return UserMixes.findOne({ userId, mixType }).sort({ createdAt: -1 });
}; 