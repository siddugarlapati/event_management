import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  mode: { type: String, enum: ['fun', 'regular'], default: 'fun' },
  date: { type: Date, required: true },
  time: String,
  location: { type: String, required: true },
  coordinates: {
    lat: Number,
    lng: Number
  },
  budget: { type: Number, required: true },
  guestCount: { type: Number, required: true },
  theme: String,
  description: String,
  bannerImage: String,
  status: { type: String, enum: ['draft', 'active', 'in-progress', 'completed', 'cancelled'], default: 'draft' },
  roomType: { type: String, enum: ['open', 'trusted', 'hyperlock'], default: 'open' },
  roomId: { type: String, unique: true, required: true },
  roomPassword: String,
  inviteLink: String,
  participants: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedAt: Date,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' }
  }],
  invitedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  vendors: [{ 
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    status: { type: String, enum: ['shortlisted', 'booked', 'confirmed'], default: 'shortlisted' },
    bookedAt: Date
  }],
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  aiRecommendations: mongoose.Schema.Types.Mixed,
  contractHash: String,
  tasks: [{
    title: String,
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate: Date
  }],
  media: [{ url: String, type: String, uploadedBy: mongoose.Schema.Types.ObjectId }],
  arPreview: { venueModel: String, decorationTheme: String },
  announcements: [{
    message: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
