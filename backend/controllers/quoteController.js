import Quote from '../models/Quote.js';
import Vendor from '../models/Vendor.js';
import User from '../models/User.js';

// Request quotes from multiple vendors
export const requestQuotes = async (req, res) => {
  try {
    const { vendorIds, eventDetails, eventId } = req.body;
    const userId = req.user.id;

    const quotes = await Promise.all(
      vendorIds.map(async (vendorId) => {
        const quote = await Quote.create({
          userId,
          vendorId,
          eventId,
          eventDetails,
          status: 'pending'
        });
        return quote;
      })
    );

    res.status(201).json({
      message: `Quote requests sent to ${quotes.length} vendors`,
      quotes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all quotes for a user
export const getUserQuotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const quotes = await Quote.find({ userId })
      .populate('vendorId', 'businessName category rating location')
      .populate('eventId', 'title type date')
      .sort({ requestedAt: -1 });

    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quotes for a specific event
export const getEventQuotes = async (req, res) => {
  try {
    const { eventId } = req.params;
    const quotes = await Quote.find({ eventId, userId: req.user.id })
      .populate('vendorId', 'businessName category rating location portfolio')
      .sort({ requestedAt: -1 });

    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vendor: Get quote requests
export const getVendorQuoteRequests = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const quotes = await Quote.find({ vendorId: vendor._id })
      .populate('userId', 'name email phone')
      .populate('eventId', 'title type date location')
      .sort({ requestedAt: -1 });

    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vendor: Send quote
export const sendQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { basePrice, additionalCharges, discount, tax, notes, termsAndConditions, validUntil } = req.body;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    // Calculate total
    const additionalTotal = additionalCharges?.reduce((sum, charge) => sum + charge.amount, 0) || 0;
    const subtotal = basePrice + additionalTotal;
    const discountAmount = (subtotal * (discount || 0)) / 100;
    const taxAmount = ((subtotal - discountAmount) * (tax || 0)) / 100;
    const totalAmount = subtotal - discountAmount + taxAmount;

    quote.quoteDetails = {
      basePrice,
      additionalCharges: additionalCharges || [],
      discount: discount || 0,
      tax: tax || 0,
      totalAmount,
      validUntil: validUntil || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days default
      notes,
      termsAndConditions
    };
    quote.status = 'sent';
    quote.respondedAt = new Date();

    await quote.save();

    res.json({ message: 'Quote sent successfully', quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Accept quote
export const acceptQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    if (quote.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    quote.status = 'accepted';
    quote.acceptedAt = new Date();
    await quote.save();

    res.json({ message: 'Quote accepted successfully', quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Reject quote
export const rejectQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { reason } = req.body;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    if (quote.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    quote.status = 'rejected';
    if (reason) {
      quote.messages.push({
        sender: req.user.id,
        message: `Rejection reason: ${reason}`
      });
    }
    await quote.save();

    res.json({ message: 'Quote rejected', quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add message to quote
export const addQuoteMessage = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { message } = req.body;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    quote.messages.push({
      sender: req.user.id,
      message
    });
    await quote.save();

    res.json({ message: 'Message added', quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Compare quotes
export const compareQuotes = async (req, res) => {
  try {
    const { quoteIds } = req.body;

    const quotes = await Quote.find({ 
      _id: { $in: quoteIds },
      userId: req.user.id 
    }).populate('vendorId', 'businessName category rating reviews');

    const comparison = quotes.map(quote => ({
      quoteId: quote._id,
      vendor: quote.vendorId,
      totalAmount: quote.quoteDetails.totalAmount,
      basePrice: quote.quoteDetails.basePrice,
      discount: quote.quoteDetails.discount,
      validUntil: quote.quoteDetails.validUntil,
      status: quote.status,
      rating: quote.vendorId.rating
    }));

    res.json(comparison);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
