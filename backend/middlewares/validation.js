import { body, param, query, validationResult } from 'express-validator';
import { AppError } from '../utils/errorHandler.js';

// Validation result checker
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return next(new AppError(errorMessages, 400));
  }
  next();
};

// User validation rules
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
  
  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['user', 'vendor', 'manager']).withMessage('Invalid role'),
  
  validate
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  validate
];

// Event validation rules
export const createEventValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Event title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  
  body('mode')
    .notEmpty().withMessage('Event mode is required')
    .isIn(['fun', 'regular']).withMessage('Invalid event mode'),
  
  body('type')
    .trim()
    .notEmpty().withMessage('Event type is required'),
  
  body('date')
    .notEmpty().withMessage('Event date is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Event date must be in the future');
      }
      return true;
    }),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),
  
  body('budget')
    .optional()
    .isNumeric().withMessage('Budget must be a number')
    .isFloat({ min: 0 }).withMessage('Budget must be positive'),
  
  body('guestCount')
    .optional()
    .isInt({ min: 1 }).withMessage('Guest count must be at least 1'),
  
  body('roomType')
    .notEmpty().withMessage('Room type is required')
    .isIn(['open', 'trusted', 'hyperlock']).withMessage('Invalid room type'),
  
  body('roomPassword')
    .optional()
    .isLength({ max: 16 }).withMessage('Password must be max 16 characters'),
  
  validate
];

export const updateEventValidation = [
  param('id')
    .isMongoId().withMessage('Invalid event ID'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('budget')
    .optional()
    .isNumeric().withMessage('Budget must be a number'),
  
  validate
];

// Vendor validation rules
export const createVendorValidation = [
  body('businessName')
    .trim()
    .notEmpty().withMessage('Business name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Business name must be between 2 and 100 characters'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['catering', 'photography', 'decoration', 'venue', 'entertainment', 'planning'])
    .withMessage('Invalid category'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  
  body('pricing')
    .optional()
    .isNumeric().withMessage('Pricing must be a number')
    .isFloat({ min: 0 }).withMessage('Pricing must be positive'),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),
  
  validate
];

// Review validation
export const reviewValidation = [
  param('id')
    .isMongoId().withMessage('Invalid vendor ID'),
  
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  
  body('comment')
    .trim()
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10 and 500 characters'),
  
  validate
];

// Payment validation
export const paymentValidation = [
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number')
    .isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
  
  body('eventId')
    .notEmpty().withMessage('Event ID is required')
    .isMongoId().withMessage('Invalid event ID'),
  
  body('vendorId')
    .optional()
    .isMongoId().withMessage('Invalid vendor ID'),
  
  validate
];

// Query validation
export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  validate
];

// ID parameter validation
export const idValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  
  validate
];

// Sanitize input
export const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
        // Remove any HTML tags
        req.body[key] = req.body[key].replace(/<[^>]*>/g, '');
      }
    });
  }
  next();
};
