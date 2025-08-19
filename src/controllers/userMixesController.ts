import { Request, Response } from 'express';
import { getLatestUserMix } from '../services/userMixesService';
import { HttpStatus } from '../constants/httpStatus';
import { IUserMix } from '../types/users';

export const getLatestUserMixController = async (req: Request, res: Response) => {
    try {
        const { userId, mixType } = req.params;

        if (!userId || !mixType) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'User ID and mix type are required' });
            return;
        }

        const userMix: IUserMix | null = await getLatestUserMix(userId, mixType);

        if (!userMix) {
            res.status(HttpStatus.NOT_FOUND).json({ message: 'No mix found for this user and mix type' });
            return;
        }

        res.status(HttpStatus.OK).json(userMix);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error', error });
    }
}; 