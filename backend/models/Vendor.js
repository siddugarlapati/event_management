import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  category: { type: String, required: true },
  services: [String],
  pricing: mongoose.Schema.Types.Mixed,
  availability: [Date],
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  address: String,
  rating: { type: Number, default: 0 },
  reviews: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number, comment: String, date: Date }],
  portfolio: [String],
  createdAt: { type: Date, default: Date.now }
});

vendorSchema.index({ location: '2dsphere' });

export default mongoose.model('Vendor', vendorSchema);
