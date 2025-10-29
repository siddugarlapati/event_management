import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'vendor', 'manager'], default: 'user' },
  phone: String,
  avatar: String,
  xp: { type: Number, default: 0 },
  badges: [String],
  wallet: { type: Number, default: 0 },
  kycVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
