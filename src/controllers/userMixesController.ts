import { Request, Response } from 'express';
import { getLatestUserMix } from '../services/userMixesService';

export const getLatestUserMixController = async (req: Request, res: Response) => {
    try {
        const { userId, mixType } = req.params;

        if (!userId || !mixType) {
            res.status(400).json({ message: 'User ID and mix type are required' });
            return;
        }

        const userMix = await getLatestUserMix(userId, mixType);

        if (!userMix) {
            res.status(404).json({ message: 'No mix found for this user and mix type' });
            return;
        }

        res.status(200).json(userMix);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}; 