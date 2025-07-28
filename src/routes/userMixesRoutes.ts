import express from 'express';
import { getLatestUserMixController } from '../controllers/userMixesController';

const router = express.Router();

router.get('/latest/:userId/:mixType', getLatestUserMixController);

export default router; 