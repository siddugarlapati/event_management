import express from 'express';
import { getRecommendations, analyzeBudget, chatWithAI } from '../controllers/aiController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public chatbot endpoint (no auth required)
router.post('/chat', chatWithAI);

// Protected endpoints
router.use(authenticate);
router.post('/recommend', getRecommendations);
router.post('/budget', analyzeBudget);

export default router;
