import express from 'express';
import { getRecommendations, analyzeBudget } from '../controllers/aiController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/recommend', getRecommendations);
router.post('/budget', analyzeBudget);

export default router;
