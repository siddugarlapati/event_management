
// Generate 150 dummy vendors with ALL categories
const generateVendors = () => {
  const categories = ['catering', 'venue', 'decoration', 'photography', 'entertainment', 'music', 'makeup', 'florist', 'videography', 'mehendi', 'choreography', 'transportation', 'invitation', 'planning'];
  
  const cities = [
    'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka', 
    'Hyderabad, Telangana', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal',
    'Pune, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan',
    'Lucknow, Uttar Pradesh', 'Chandigarh, Punjab', 'Kochi, Kerala'
  ];
  
  const businessPrefixes = {
    catering: ['Royal', 'Gourmet', 'Delicious', 'Tasty', 'Premium', 'Elite', 'Grand', 'Classic'],
    venue: ['Palace', 'Grand', 'Royal', 'Elegant', 'Majestic', 'Imperial', 'Luxury', 'Premium'],
    decoration: ['Elegant', 'Creative', 'Artistic', 'Beautiful', 'Stunning', 'Gorgeous', 'Fancy', 'Divine'],
    photography: ['Capture', 'Perfect', 'Moment', 'Snap', 'Focus', 'Frame', 'Vision', 'Lens'],
    entertainment: ['Party', 'Fun', 'Celebration', 'Joyful', 'Happy', 'Festive', 'Lively', 'Epic'],
    music: ['Rhythm', 'Beat', 'Melody', 'Harmony', 'Sound', 'Tune', 'Vibe', 'Groove'],
    makeup: ['Glamour', 'Beauty', 'Radiance', 'Glow', 'Charm', 'Style', 'Elegance', 'Allure'],
    florist: ['Bloom', 'Petal', 'Blossom', 'Garden', 'Flora', 'Rose', 'Lily', 'Orchid'],
    videography: ['Motion', 'Film', 'Reel', 'Cinema', 'Story', 'Scene', 'Action', 'Frame'],
    mehendi: ['Henna', 'Art', 'Design', 'Pattern', 'Traditional', 'Bridal', 'Royal', 'Classic'],
    choreography: ['Dance', 'Move', 'Rhythm', 'Step', 'Groove', 'Flow', 'Beat', 'Style'],
    transportation: ['Luxury', 'Royal', 'Premium', 'Elite', 'Grand', 'Classic', 'Vintage', 'Modern'],
    invitation: ['Creative', 'Elegant', 'Royal', 'Premium', 'Custom', 'Designer', 'Artistic', 'Unique'],
    planning: ['Perfect', 'Dream', 'Elite', 'Premium', 'Royal', 'Grand', 'Expert', 'Professional']
  };
  
  const businessSuffixes = {
    catering: ['Caterers', 'Kitchen', 'Delights', 'Foods', 'Cuisine', 'Feast'],
    venue: ['Banquet', 'Hall', 'Palace', 'Gardens', 'Resort', 'Manor'],
    decoration: ['Decorations', 'Designs', 'Decor', 'Creations', 'Art', 'Studio'],
    photography: ['Photography', 'Studios', 'Captures', 'Shots', 'Moments', 'Images'],
    entertainment: ['Entertainment', 'Events', 'Productions', 'Shows', 'Performers', 'Artists'],
    music: ['DJ Services', 'Music', 'Sounds', 'Beats', 'Productions', 'Entertainment'],
    makeup: ['Makeup', 'Beauty', 'Studio', 'Salon', 'Artists', 'Cosmetics'],
    florist: ['Florist', 'Flowers', 'Florals', 'Blooms', 'Gardens', 'Arrangements'],
    videography: ['Videography', 'Films', 'Productions', 'Studios', 'Cinematics', 'Media'],
    mehendi: ['Mehendi', 'Henna Art', 'Designs', 'Artists', 'Studio', 'Creations'],
    choreography: ['Choreography', 'Dance', 'Academy', 'Studio', 'Troupe', 'Performers'],
    transportation: ['Transport', 'Cars', 'Rentals', 'Services', 'Travels', 'Rides'],
    invitation: ['Invitations', 'Cards', 'Prints', 'Designs', 'Creations', 'Studio'],
    planning: ['Planners', 'Events', 'Management', 'Services', 'Solutions', 'Consultants']
  };
  
  const services = {
    catering: ['Wedding Catering', 'Corporate Events', 'Buffet Service', 'Custom Menus', 'Live Counters', 'Dessert Bar'],
    venue: ['Wedding Venue', 'Conference Hall', 'Banquet Hall', 'Outdoor Garden', 'Poolside', 'Rooftop'],
    decoration: ['Floral Arrangements', 'Stage Decoration', 'Lighting', 'Balloon Art', 'Draping', 'Centerpieces'],
    photography: ['Wedding Photography', 'Event Coverage', 'Drone Shots', 'Photo Editing', 'Candid Photography', 'Albums'],
    entertainment: ['DJ Services', 'Live Band', 'MC Services', 'Sound System', 'Dancers', 'Magicians'],
    music: ['DJ Services', 'Live Band', 'Sound System', 'Music Production', 'Playlist Curation', 'Karaoke'],
    makeup: ['Bridal Makeup', 'Party Makeup', 'Hair Styling', 'Airbrush Makeup', 'HD Makeup', 'Saree Draping'],
    florist: ['Bridal Bouquet', 'Venue Decoration', 'Floral Arrangements', 'Garlands', 'Centerpieces', 'Car Decoration'],
    videography: ['Wedding Films', 'Event Coverage', 'Drone Videography', 'Cinematic Videos', 'Highlights', 'Same Day Edit'],
    mehendi: ['Bridal Mehendi', 'Arabic Design', 'Traditional Design', 'Modern Patterns', 'Rajasthani Style', 'Indo-Arabic'],
    choreography: ['Sangeet Choreography', 'Couple Dance', 'Group Dance', 'Flash Mob', 'Wedding Dance', 'Bollywood Style'],
    transportation: ['Luxury Cars', 'Vintage Cars', 'Buses', 'Tempo Traveller', 'Decorated Cars', 'Valet Service'],
    invitation: ['Wedding Cards', 'Digital Invites', 'Custom Design', 'Printing', 'Video Invitations', 'E-cards'],
    planning: ['Full Event Planning', 'Coordination', 'Vendor Management', 'Budget Planning', 'Timeline Management', 'Decor Planning']
  };
  
  const names = ['Priya', 'Amit', 'Kavya', 'Arjun', 'Meera', 'Vikram', 'Rohan', 'Anjali', 'Rahul', 'Neha'];
  const surnames = ['Patel', 'Kumar', 'Iyer', 'Nair', 'Desai', 'Singh', 'Sharma', 'Kapoor', 'Reddy', 'Gupta'];
  
  const vendors = [];
  let vendorId = 1;
  
  // Generate 10-12 vendors per category
  categories.forEach((category, catIndex) => {
    const vendorsPerCategory = 10 + (catIndex % 3);
    
    for (let i = 0; i < vendorsPerCategory; i++) {
      const prefix = businessPrefixes[category][i % businessPrefixes[category].length];
      const suffix = businessSuffixes[category][i % businessSuffixes[category].length];
      const city = cities[vendorId % cities.length];
      const name = names[vendorId % names.length];
      const surname = surnames[vendorId % surnames.length];
      
      // Category-specific pricing
      let basicPrice, premiumPrice, luxuryPrice;
      switch(category) {
        case 'venue':
          basicPrice = 50000 + (i * 5000);
          premiumPrice = 125000 + (i * 10000);
          luxuryPrice = 250000 + (i * 15000);
          break;
        case 'catering':
          basicPrice = 800 + (i * 100);
          premiumPrice = 1500 + (i * 150);
          luxuryPrice = 3000 + (i * 200);
          break;
        case 'photography':
        case 'videography':
          basicPrice = 25000 + (i * 2000);
          premiumPrice = 50000 + (i * 3000);
          luxuryPrice = 100000 + (i * 5000);
          break;
        case 'decoration':
          basicPrice = 30000 + (i * 3000);
          premiumPrice = 75000 + (i * 5000);
          luxuryPrice = 150000 + (i * 8000);
          break;
        case 'makeup':
          basicPrice = 8000 + (i * 500);
          premiumPrice = 15000 + (i * 1000);
          luxuryPrice = 30000 + (i * 1500);
          break;
        case 'mehendi':
          basicPrice = 5000 + (i * 500);
          premiumPrice = 10000 + (i * 800);
          luxuryPrice = 20000 + (i * 1200);
          break;
        case 'music':
        case 'entertainment':
          basicPrice = 15000 + (i * 1500);
          premiumPrice = 35000 + (i * 2500);
          luxuryPrice = 70000 + (i * 4000);
          break;
        case 'choreography':
          basicPrice = 10000 + (i * 1000);
          premiumPrice = 25000 + (i * 2000);
          luxuryPrice = 50000 + (i * 3000);
          break;
        case 'florist':
          basicPrice = 8000 + (i * 800);
          premiumPrice = 20000 + (i * 1500);
          luxuryPrice = 40000 + (i * 2500);
          break;
        case 'transportation':
          basicPrice = 5000 + (i * 500);
          premiumPrice = 15000 + (i * 1000);
          luxuryPrice = 35000 + (i * 2000);
          break;
        case 'invitation':
          basicPrice = 50 + (i * 10);
          premiumPrice = 150 + (i * 20);
          luxuryPrice = 350 + (i * 30);
          break;
        case 'planning':
          basicPrice = 50000 + (i * 5000);
          premiumPrice = 125000 + (i * 10000);
          luxuryPrice = 300000 + (i * 15000);
          break;
        default:
          basicPrice = 10000 + (i * 1000);
          premiumPrice = 25000 + (i * 2000);
          luxuryPrice = 50000 + (i * 3000);
      }
      
      vendors.push({
        _id: `${vendorId}`,
        businessName: `${prefix} ${suffix}${i > 5 ? ' Pro' : ''}`.trim(),
        category: category,
        services: services[category].slice(0, 4 + (i % 3)),
        pricing: {
          basic: basicPrice,
          premium: premiumPrice,
          luxury: luxuryPrice
        },
        address: city,
        rating: parseFloat((3.8 + (vendorId % 12) / 10).toFixed(1)),
        image: `https://images.unsplash.com/photo-${
          category === 'catering' ? '1555244162-803834f70033' :
          category === 'venue' ? '1519167758481-83f29da8c2b0' :
          category === 'decoration' ? '1478146896981-b80fe463b330' :
          category === 'photography' ? '1492691527719-9d1e07e534b4' :
          category === 'videography' ? '1511285560929-80b456fea0bc' :
          category === 'music' ? '1470229722913-7c0e2dbbafd3' :
          category === 'makeup' ? '1487412947147-5cebf100ffc2' :
          category === 'florist' ? '1490750967868-88aa4486c946' :
          category === 'mehendi' ? '1519741644183-4b4c7b4c3c3e' :
          category === 'choreography' ? '1504609813442-a8924e83f76e' :
          category === 'transportation' ? '1449965325384-e3d6c2e6d3e3' :
          category === 'invitation' ? '1516979187457-637abb4f9353' :
          '1505236858219-8359eb29e329'
        }?w=400&q=80`,
        reviews: [
          { 
            rating: 4 + (vendorId % 2), 
            comment: 'Excellent service! Highly recommended.', 
            date: new Date(2024, 9, (vendorId % 28) + 1) 
          }
        ],
        userId: { 
          name: `${name} ${surname}`, 
          email: `${name.toLowerCase()}${vendorId}@example.com` 
        }
      });
      
      vendorId++;
    }
  });
  
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
