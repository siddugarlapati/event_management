import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  requestQuotes,
  getUserQuotes,
  getEventQuotes,
  getVendorQuoteRequests,
  sendQuote,
  acceptQuote,
  rejectQuote,
  addQuoteMessage,
  compareQuotes
} from '../controllers/quoteController.js';

const router = express.Router();

// User routes
router.post('/request', authMiddleware, requestQuotes);
router.get('/user', authMiddleware, getUserQuotes);
router.get('/event/:eventId', authMiddleware, getEventQuotes);
router.post('/compare', authMiddleware, compareQuotes);
router.put('/:quoteId/accept', authMiddleware, acceptQuote);
router.put('/:quoteId/reject', authMiddleware, rejectQuote);
router.post('/:quoteId/message', authMiddleware, addQuoteMessage);

// Vendor routes
router.get('/vendor/requests', authMiddleware, getVendorQuoteRequests);
router.put('/:quoteId/send', authMiddleware, sendQuote);

export default router;
