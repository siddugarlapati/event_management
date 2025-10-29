import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  finalizeEvent,
  completeEvent,
  joinEvent
} from '../controllers/eventController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createEvent);
router.post('/join', joinEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.post('/:id/finalize', finalizeEvent);
router.post('/:id/complete', completeEvent);

export default router;
