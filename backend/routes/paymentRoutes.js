import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  getTransactions
} from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.get('/transactions', getTransactions);

export default router;
