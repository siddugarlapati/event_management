
// Generate 100 dummy vendors
const generateVendors = () => {
  const categories = ['catering', 'venue', 'decoration', 'photography', 'entertainment'];
  const cities = [
    'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka', 
    'Hyderabad, Telangana', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal',
    'Pune, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan',
    'Lucknow, Uttar Pradesh', 'Chandigarh, Punjab', 'Kochi, Kerala'
  ];
  
  const businessPrefixes = {
    catering: ['Royal', 'Gourmet', 'Delicious', 'Tasty', 'Premium', 'Elite', 'Grand', 'Classic'],
    venue: ['Palace', 'Grand', 'Royal', 'Elegant', 'Majestic', 'Imperial', 'Luxury', 'Premium'],
    decoration: ['Elegant', 'Creative', 'Artistic', 'Beautiful', 'Stunning', 'Gorgeous', 'Fancy'],
    photography: ['Capture', 'Perfect', 'Moment', 'Snap', 'Focus', 'Frame', 'Vision', 'Lens'],
    entertainment: ['Party', 'Fun', 'Celebration', 'Joyful', 'Happy', 'Festive', 'Lively']
  };
  
  const businessSuffixes = {
    catering: ['Caterers', 'Kitchen', 'Delights', 'Foods', 'Cuisine', 'Feast'],
    venue: ['Banquet', 'Hall', 'Palace', 'Gardens', 'Resort', 'Manor'],
    decoration: ['Decorations', 'Designs', 'Decor', 'Creations', 'Art'],
    photography: ['Photography', 'Studios', 'Captures', 'Shots', 'Moments'],
    entertainment: ['Entertainment', 'Events', 'Productions', 'Shows', 'Performers']
  };
  
  const services = {
    catering: ['Wedding Catering', 'Corporate Events', 'Buffet Service', 'Custom Menus', 'Live Counters', 'Dessert Bar'],
    venue: ['Wedding Venue', 'Conference Hall', 'Banquet Hall', 'Outdoor Garden', 'Poolside', 'Rooftop'],
    decoration: ['Floral Arrangements', 'Stage Decoration', 'Lighting', 'Balloon Art', 'Draping', 'Centerpieces'],
    photography: ['Wedding Photography', 'Event Coverage', 'Drone Shots', 'Photo Editing', 'Videography', 'Albums'],
    entertainment: ['DJ Services', 'Live Band', 'MC Services', 'Sound System', 'Dancers', 'Magicians']
  };
  
  const names = ['Priya', 'Amit', 'Kavya', 'Arjun', 'Meera', 'Vikram', 'Rohan', 'Anjali', 'Rahul', 'Neha'];
  const surnames = ['Patel', 'Kumar', 'Iyer', 'Nair', 'Desai', 'Singh', 'Sharma', 'Kapoor', 'Reddy', 'Gupta'];
  
  const vendors = [];
  
  for (let i = 1; i <= 100; i++) {
    const category = categories[i % categories.length];
    const prefix = businessPrefixes[category][i % businessPrefixes[category].length];
    const suffix = businessSuffixes[category][Math.floor(i / 2) % businessSuffixes[category].length];
    const city = cities[i % cities.length];
    const name = names[i % names.length];
    const surname = surnames[i % surnames.length];
    
    vendors.push({
      _id: `${i}`,
      businessName: `${prefix} ${suffix} ${i > 50 ? 'Pro' : ''}`.trim(),
      category: category,
      services: services[category].slice(0, 4),
      pricing: {
        basic: category === 'venue' ? 50000 + (i * 1000) : category === 'catering' ? 2000 + (i * 50) : 300 + (i * 20),
        premium: category === 'venue' ? 125000 + (i * 2000) : category === 'catering' ? 5000 + (i * 100) : 800 + (i * 40),
        luxury: category === 'venue' ? 250000 + (i * 3000) : category === 'catering' ? 10000 + (i * 150) : 1500 + (i * 60)
      },
      address: city,
      rating: parseFloat((4.0 + (i % 10) / 10).toFixed(1)),
      image: `https://images.unsplash.com/photo-${
        category === 'catering' ? '1555244162-803834f70033' :
        category === 'venue' ? '1519167758481-83f29da8c2b0' :
        category === 'decoration' ? '1478146896981-b80fe463b330' :
        category === 'photography' ? '1492691527719-9d1e07e534b4' :
        '1470229722913-7c0e2dbbafd3'
      }?w=400&q=80`,
      reviews: [
        { 
          rating: 4 + (i % 2), 
          comment: 'Excellent service! Highly recommended.', 
          date: new Date(2024, 9, (i % 28) + 1) 
        }
      ],
      userId: { 
        name: `${name} ${surname}`, 
        email: `${name.toLowerCase()}${i}@example.com` 
      }
    });
  }
  
  return vendors;
};

export const dummyVendors = generateVendors();

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
