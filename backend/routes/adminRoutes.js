import express from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import {
  getSystemStats,
  getUserGrowth,
  manageUser,
  getAllUsers,
  getTransactionLogs,
  getSystemHealth
} from '../controllers/adminController.js';

const router = express.Router();

// All routes require admin authentication
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats', getSystemStats);
router.get('/users/growth', getUserGrowth);
router.get('/users', getAllUsers);
router.put('/users/:userId', manageUser);
router.get('/transactions', getTransactionLogs);
router.get('/health', getSystemHealth);

export default router;
