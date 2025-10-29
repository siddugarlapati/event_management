import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  eventDetails: {
    eventType: String,
    eventDate: Date,
    guestCount: Number,
    location: String,
    budget: Number,
    requirements: String
  },
  quoteDetails: {
    basePrice: { type: Number, default: 0 },
    additionalCharges: [{ 
      item: String, 
      amount: Number 
    }],
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    validUntil: Date,
    notes: String,
    termsAndConditions: String
  },
  status: { 
    type: String, 
    enum: ['pending', 'sent', 'accepted', 'rejected', 'expired'], 
    default: 'pending' 
  },
  requestedAt: { type: Date, default: Date.now },
  respondedAt: Date,
  acceptedAt: Date,
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Quote', quoteSchema);
