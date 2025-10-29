import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import Event from '../models/Event.js';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded');
      return;
    }

    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create sample users
    const users = await User.create([
      {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        password: hashedPassword,
        role: 'user',
        xp: 250,
        wallet: 25000,
        badges: ['Bronze Host', 'Silver Host'],
        kycVerified: true
      },
      {
        name: 'Priya Patel',
        email: 'priya@example.com',
        password: hashedPassword,
        role: 'vendor',
        xp: 450,
        wallet: 125000,
        badges: ['Bronze Host', 'Silver Host', 'Gold Host'],
        kycVerified: true
      },
      {
        name: 'Amit Kumar',
        email: 'amit@example.com',
        password: hashedPassword,
        role: 'manager',
        xp: 800,
        wallet: 175000,
        badges: ['Bronze Host', 'Silver Host', 'Gold Host'],
        kycVerified: true
      },
      {
        name: 'Sneha Reddy',
        email: 'sneha@example.com',
        password: hashedPassword,
        role: 'vendor',
        xp: 600,
        wallet: 150000,
        badges: ['Bronze Host', 'Silver Host', 'Gold Host'],
        kycVerified: true
      }
    ]);

    // Create sample vendors with locations
    const vendors = await Vendor.create([
      {
        userId: users[1]._id,
        businessName: 'Elite Catering Services',
        category: 'catering',
        services: ['Wedding Catering', 'Corporate Events', 'Buffet Service', 'Custom Menus'],
        pricing: { basic: 50, premium: 100, luxury: 200 },
        location: { type: 'Point', coordinates: [72.8777, 19.0760] },
        address: 'Andheri West, Mumbai, Maharashtra',
        rating: 4.8,
        reviews: [
          { userId: users[0]._id, rating: 5, comment: 'Excellent service! Food was amazing and presentation was top-notch.', date: new Date('2024-10-15') },
          { userId: users[2]._id, rating: 5, comment: 'Professional team, delicious food!', date: new Date('2024-09-20') }
        ],
        portfolio: ['catering1.jpg', 'catering2.jpg']
      },
      {
        userId: users[1]._id,
        businessName: 'Grand Ballroom Venues',
        category: 'venue',
        services: ['Wedding Venue', 'Conference Hall', 'Banquet Hall', 'Outdoor Garden'],
        pricing: { basic: 1000, premium: 2500, luxury: 5000 },
        location: { type: 'Point', coordinates: [77.2090, 28.6139] },
        address: 'Connaught Place, New Delhi',
        rating: 4.9,
        reviews: [
          { userId: users[0]._id, rating: 5, comment: 'Beautiful venue! Perfect for our wedding.', date: new Date('2024-10-10') },
          { userId: users[2]._id, rating: 5, comment: 'Stunning location with great amenities.', date: new Date('2024-09-25') }
        ],
        portfolio: ['venue1.jpg', 'venue2.jpg']
      },
      {
        userId: users[3]._id,
        businessName: 'Elegant Decorations',
        category: 'decoration',
        services: ['Floral Arrangements', 'Stage Decoration', 'Lighting', 'Balloon Art'],
        pricing: { basic: 300, premium: 800, luxury: 1500 },
        location: { type: 'Point', coordinates: [72.8479, 19.0596] },
        address: 'Bandra West, Mumbai, Maharashtra',
        rating: 4.7,
        reviews: [
          { userId: users[0]._id, rating: 5, comment: 'Creative and beautiful decorations!', date: new Date('2024-10-05') }
        ],
        portfolio: ['decor1.jpg', 'decor2.jpg']
      },
      {
        userId: users[3]._id,
        businessName: 'Capture Moments Photography',
        category: 'photography',
        services: ['Wedding Photography', 'Event Coverage', 'Drone Shots', 'Photo Editing'],
        pricing: { basic: 500, premium: 1200, luxury: 2500 },
        location: { type: 'Point', coordinates: [77.5946, 12.9716] },
        address: 'Koramangala, Bangalore, Karnataka',
        rating: 4.9,
        reviews: [
          { userId: users[0]._id, rating: 5, comment: 'Amazing photographer! Captured every moment perfectly.', date: new Date('2024-10-12') },
          { userId: users[2]._id, rating: 5, comment: 'Professional and creative work!', date: new Date('2024-09-18') }
        ],
        portfolio: ['photo1.jpg', 'photo2.jpg']
      },
      {
        userId: users[1]._id,
        businessName: 'Party Entertainment Pro',
        category: 'entertainment',
        services: ['DJ Services', 'Live Band', 'MC Services', 'Sound System'],
        pricing: { basic: 400, premium: 900, luxury: 1800 },
        location: { type: 'Point', coordinates: [78.4867, 17.3850] },
        address: 'Jubilee Hills, Hyderabad, Telangana',
        rating: 4.6,
        reviews: [
          { userId: users[0]._id, rating: 5, comment: 'Great DJ! Everyone loved the music selection.', date: new Date('2024-10-08') }
        ],
        portfolio: ['entertainment1.jpg', 'entertainment2.jpg']
      },
      {
        userId: users[3]._id,
        businessName: 'Gourmet Delights Catering',
        category: 'catering',
        services: ['Fine Dining', 'Dessert Bar', 'Cocktail Service', 'Vegan Options'],
        pricing: { basic: 60, premium: 120, luxury: 250 },
        location: { type: 'Point', coordinates: [72.8311, 18.9388] },
        address: 'Colaba, Mumbai, Maharashtra',
        rating: 4.8,
        reviews: [
          { userId: users[2]._id, rating: 5, comment: 'Exceptional quality and taste!', date: new Date('2024-10-01') }
        ],
        portfolio: ['catering3.jpg', 'catering4.jpg']
      }
    ]);

    // Create sample events
    const events = await Event.create([
      {
        userId: users[0]._id,
        title: 'Grand Wedding Celebration',
        type: 'wedding',
        date: new Date('2025-06-15'),
        location: 'Mumbai, Maharashtra',
        budget: 750000,
        guestCount: 150,
        description: 'Beautiful outdoor wedding ceremony and reception',
        status: 'active',
        vendors: [vendors[0]._id, vendors[1]._id],
        aiRecommendations: {
          suggestions: 'Consider Elite Catering and Grand Ballroom for your wedding',
          budgetOptimization: { perGuest: 5000, venue: 300000, catering: 225000, decoration: 150000, misc: 75000 },
          trendingThemes: ['Rustic Garden', 'Modern Minimalist', 'Vintage Elegance']
        }
      },
      {
        userId: users[0]._id,
        title: 'Corporate Annual Gala',
        type: 'corporate',
        date: new Date('2025-03-20'),
        location: 'Bangalore, Karnataka',
        budget: 1250000,
        guestCount: 200,
        description: 'Annual company celebration and awards ceremony',
        status: 'draft',
        vendors: [],
        aiRecommendations: {
          suggestions: 'Professional venue and catering recommended',
          budgetOptimization: { perGuest: 6250, venue: 500000, catering: 375000, decoration: 250000, misc: 125000 },
          trendingThemes: ['Tech Innovation', 'Professional Networking', 'Team Building']
        }
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Sample credentials:');
    console.log('User: rahul@example.com / password123');
    console.log('Vendor: priya@example.com / password123');
    console.log('Manager: amit@example.com / password123');
    console.log('\n📊 Created:');
    console.log(`- ${users.length} users`);
    console.log(`- ${vendors.length} vendors`);
    console.log(`- ${events.length} events`);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
