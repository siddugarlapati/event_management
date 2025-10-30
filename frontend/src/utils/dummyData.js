export const dummyVendors = [
  {
    _id: '1',
    businessName: 'Rajdhani Caterers',
    category: 'catering',
    services: ['Wedding Catering', 'Corporate Events', 'Buffet Service', 'Custom Menus'],
    pricing: { basic: 2500, premium: 5000, luxury: 10000 },
    address: 'Andheri West, Mumbai, Maharashtra',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
    reviews: [
      { rating: 5, comment: 'Excellent service! Food was amazing.', date: new Date('2024-10-15') },
      { rating: 5, comment: 'Professional team, delicious food!', date: new Date('2024-09-20') }
    ],
    userId: { name: 'Priya Patel', email: 'priya@example.com' }
  },
  {
    _id: '2',
    businessName: 'Taj Palace Banquet',
    category: 'venue',
    services: ['Wedding Venue', 'Conference Hall', 'Banquet Hall', 'Outdoor Garden'],
    pricing: { basic: 50000, premium: 125000, luxury: 250000 },
    address: 'Colaba, Mumbai, Maharashtra',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=400&q=80',
    reviews: [
      { rating: 5, comment: 'Beautiful venue! Perfect for our wedding.', date: new Date('2024-10-10') }
    ],
    userId: { name: 'Amit Kumar', email: 'amit@example.com' }
  },
  {
    _id: '3',
    businessName: 'Elegant Decorations',
    category: 'decoration',
    services: ['Floral Arrangements', 'Stage Decoration', 'Lighting', 'Balloon Art'],
    pricing: { basic: 300, premium: 800, luxury: 1500 },
    address: 'Bandra West, Mumbai, Maharashtra',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&q=80',
    reviews: [
      { rating: 5, comment: 'Creative and beautiful decorations!', date: new Date('2024-10-05') }
    ],
    userId: { name: 'Kavya Iyer', email: 'kavya@example.com' }
  },
  {
    _id: '4',
    businessName: 'Capture Moments Photography',
    category: 'photography',
    services: ['Wedding Photography', 'Event Coverage', 'Drone Shots', 'Photo Editing'],
    pricing: { basic: 500, premium: 1200, luxury: 2500 },
    address: 'Connaught Place, New Delhi',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
    reviews: [
      { rating: 5, comment: 'Amazing photographer! Captured every moment perfectly.', date: new Date('2024-10-12') }
    ],
    userId: { name: 'Arjun Nair', email: 'arjun@example.com' }
  },
  {
    _id: '5',
    businessName: 'Party Entertainment Pro',
    category: 'entertainment',
    services: ['DJ Services', 'Live Band', 'MC Services', 'Sound System'],
    pricing: { basic: 400, premium: 900, luxury: 1800 },
    address: 'Koramangala, Bangalore, Karnataka',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
    reviews: [
      { rating: 5, comment: 'Great DJ! Everyone loved the music selection.', date: new Date('2024-10-08') }
    ],
    userId: { name: 'Vikram Singh', email: 'vikram@example.com' }
  },
  {
    _id: '6',
    businessName: 'Gourmet Delights Catering',
    category: 'catering',
    services: ['Fine Dining', 'Dessert Bar', 'Cocktail Service', 'Vegan Options'],
    pricing: { basic: 60, premium: 120, luxury: 250 },
    address: 'Jubilee Hills, Hyderabad, Telangana',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    reviews: [
      { rating: 5, comment: 'Exceptional quality and taste!', date: new Date('2024-10-01') }
    ],
    userId: { name: 'Meera Desai', email: 'meera@example.com' }
  }
];

export const dummyEvents = [
  {
    _id: '1',
    title: 'Grand Wedding Celebration',
    type: 'wedding',
    date: new Date('2025-06-15'),
    location: 'Mumbai, Maharashtra',
    budget: 750000,
    guestCount: 150,
    description: 'Beautiful outdoor wedding ceremony and reception',
    status: 'active',
    vendors: [],
    userId: { name: 'Rohan Kapoor', email: 'rohan@example.com' }
  },
  {
    _id: '2',
    title: 'Corporate Annual Gala',
    type: 'corporate',
    date: new Date('2025-03-20'),
    location: 'Bangalore, Karnataka',
    budget: 1250000,
    guestCount: 200,
    description: 'Annual company celebration and awards ceremony',
    status: 'in-progress',
    vendors: [],
    userId: { name: 'Rohan Kapoor', email: 'rohan@example.com' }
  },
  {
    _id: '3',
    title: 'Birthday Bash',
    type: 'birthday',
    date: new Date('2025-02-10'),
    location: 'Delhi, NCR',
    budget: 250000,
    guestCount: 50,
    description: '30th birthday celebration with friends and family',
    status: 'draft',
    vendors: [],
    userId: { name: 'Rohan Kapoor', email: 'rohan@example.com' }
  },
  {
    _id: '4',
    title: 'Tech Conference 2025',
    type: 'conference',
    date: new Date('2025-04-15'),
    location: 'Hyderabad, Telangana',
    budget: 2500000,
    guestCount: 500,
    description: 'Annual technology conference with keynote speakers',
    status: 'completed',
    vendors: [],
    userId: { name: 'Rohan Kapoor', email: 'rohan@example.com' }
  }
];

export const dummyTransactions = [
  {
    _id: '1',
    type: 'payment',
    amount: 125000,
    status: 'completed',
    blockchainHash: 'a3f5e8d9c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5',
    createdAt: new Date('2024-10-20'),
    fromUser: { name: 'Rahul Sharma' },
    toUser: { name: 'Rajdhani Caterers' }
  },
  {
    _id: '2',
    type: 'payment',
    amount: 250000,
    status: 'completed',
    blockchainHash: 'b4g6f9e0d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6',
    createdAt: new Date('2024-10-15'),
    fromUser: { name: 'Rahul Sharma' },
    toUser: { name: 'Taj Palace Banquet' }
  },
  {
    _id: '3',
    type: 'reward',
    amount: 5000,
    status: 'completed',
    blockchainHash: 'c5h7g0f1e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7',
    createdAt: new Date('2024-10-10'),
    fromUser: { name: 'System' },
    toUser: { name: 'Rahul Sharma' }
  }
];

export const dummyLeads = [
  {
    _id: '1',
    eventTitle: 'Grand Wedding Celebration',
    eventType: 'wedding',
    budget: 750000,
    guestCount: 150,
    date: new Date('2025-06-15'),
    location: 'Mumbai, Maharashtra',
    status: 'pending',
    client: { name: 'Rahul Sharma', email: 'rahul@example.com' }
  },
  {
    _id: '2',
    eventTitle: 'Corporate Annual Gala',
    eventType: 'corporate',
    budget: 1250000,
    guestCount: 200,
    date: new Date('2025-03-20'),
    location: 'Bangalore, Karnataka',
    status: 'accepted',
    client: { name: 'Priya Patel', email: 'priya@example.com' }
  },
  {
    _id: '3',
    eventTitle: 'Birthday Celebration',
    eventType: 'birthday',
    budget: 250000,
    guestCount: 50,
    date: new Date('2025-02-10'),
    location: 'Delhi, NCR',
    status: 'pending',
    client: { name: 'Amit Kumar', email: 'amit@example.com' }
  }
];
