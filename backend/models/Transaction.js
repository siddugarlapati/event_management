import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['payment', 'refund', 'reward'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  stripePaymentId: String,
  blockchainHash: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
