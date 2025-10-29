import express from 'express';
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  addReview
} from '../controllers/vendorController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getVendors);
router.get('/:id', getVendorById);

router.use(authenticate);

router.post('/', createVendor);
router.put('/:id', updateVendor);
router.post('/:id/review', addReview);

export default router;
