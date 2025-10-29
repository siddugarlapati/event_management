import Vendor from '../models/Vendor.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const categories = ['catering', 'venue', 'decoration', 'photography', 'entertainment', 'music'];

const vendorData = {
  catering: [
    { name: 'Rajdhani Caterers', area: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Spice Garden Catering', area: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Royal Feast Caterers', area: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Masala Magic Caterers', area: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Tandoor Tales', area: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Biryani House Catering', area: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Maharaja Caterers', area: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Saffron Kitchen', area: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Curry Craft Caterers', area: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Namaste Caterers', area: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Desi Delights', area: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { name: 'Bombay Bites Catering', area: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Nawabi Caterers', area: 'Bhopal', lat: 23.2599, lng: 77.4126 },
    { name: 'Thali Express', area: 'Surat', lat: 21.1702, lng: 72.8311 },
    { name: 'Rasoi Caterers', area: 'Nagpur', lat: 21.1458, lng: 79.0882 }
  ],
  venue: [
    { name: 'Taj Palace Banquet', area: 'Mumbai', lat: 19.0896, lng: 72.8656 },
    { name: 'Royal Heritage Hall', area: 'Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Leela Convention Center', area: 'Bangalore', lat: 12.9352, lng: 77.6245 },
    { name: 'Golconda Resorts', area: 'Hyderabad', lat: 17.4126, lng: 78.4071 },
    { name: 'Shivaji Gardens', area: 'Pune', lat: 18.5642, lng: 73.7769 },
    { name: 'Marina Bay Convention', area: 'Chennai', lat: 13.0475, lng: 80.2824 },
    { name: 'Victoria Memorial Hall', area: 'Kolkata', lat: 22.5448, lng: 88.3426 },
    { name: 'Sabarmati Banquet', area: 'Ahmedabad', lat: 23.0358, lng: 72.5661 },
    { name: 'Hawa Mahal Events', area: 'Jaipur', lat: 26.9239, lng: 75.8267 },
    { name: 'Nawab Palace', area: 'Lucknow', lat: 26.8389, lng: 80.9231 },
    { name: 'Rock Garden Venue', area: 'Chandigarh', lat: 30.7520, lng: 76.8101 },
    { name: 'Rajwada Convention', area: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Lake View Resort', area: 'Bhopal', lat: 23.2599, lng: 77.4126 },
    { name: 'Diamond Hall', area: 'Surat', lat: 21.1959, lng: 72.8302 },
    { name: 'Sitabuldi Gardens', area: 'Nagpur', lat: 21.1498, lng: 79.0806 }
  ],
  decoration: [
    { name: 'Elegant Decorations', area: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Floral Fantasy', area: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Dream Decor', area: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Artistic Touch', area: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Balloon Bliss', area: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Vintage Vibes Decor', area: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Modern Elegance', area: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Rustic Charm Decor', area: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Glamour Events', area: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Creative Concepts', area: 'Surat', lat: 21.1702, lng: 72.8311 },
    { name: 'Luxury Linens', area: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Tropical Paradise Decor', area: 'Goa', lat: 15.2993, lng: 74.1240 },
    { name: 'Classic Elegance', area: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { name: 'Bohemian Decor', area: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Minimalist Design Co', area: 'Kochi', lat: 9.9312, lng: 76.2673 }
  ],
  photography: [
    { name: 'Capture Moments', area: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Perfect Shot Studios', area: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Timeless Photography', area: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Lens & Light', area: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Artistic Vision Photo', area: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Memory Makers', area: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Candid Clicks', area: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Drone Photography Pro', area: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Wedding Bells Photo', area: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Event Snappers', area: 'Surat', lat: 21.1702, lng: 72.8311 },
    { name: 'Portrait Perfection', area: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Cinematic Stories', area: 'Goa', lat: 15.2993, lng: 74.1240 },
    { name: 'Flash & Focus', area: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { name: 'Golden Hour Photography', area: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Shutter Speed Studios', area: 'Kochi', lat: 9.9312, lng: 76.2673 }
  ],
  entertainment: [
    { name: 'Party Entertainment Pro', area: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'DJ Masters', area: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Live Band Central', area: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Magic & More', area: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Comedy Night Entertainment', area: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Dance Troupe Elite', area: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Kids Party Fun', area: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Karaoke Kings', area: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Celebrity Impersonators', area: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Game Show Hosts', area: 'Surat', lat: 21.1702, lng: 72.8311 },
    { name: 'Circus Acts', area: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Fire Performers', area: 'Goa', lat: 15.2993, lng: 74.1240 },
    { name: 'Acoustic Sessions', area: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { name: 'Interactive Entertainment', area: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Virtual Reality Experience', area: 'Kochi', lat: 9.9312, lng: 76.2673 }
  ],
  music: [
    { name: 'Symphony Orchestra', area: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Jazz Ensemble', area: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Rock Band Legends', area: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Classical Quartet', area: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Bollywood Music Stars', area: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Pop Sensation Band', area: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Sufi Beats', area: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Electronic DJ Collective', area: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Fusion Music Tribute', area: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Indie Music Group', area: 'Surat', lat: 21.1702, lng: 72.8311 },
    { name: 'Hip Hop Crew', area: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Devotional Choir', area: 'Goa', lat: 15.2993, lng: 74.1240 },
    { name: 'Qawwali Band', area: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { name: 'String Quartet', area: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Reggae Vibes', area: 'Kochi', lat: 9.9312, lng: 76.2673 }
  ]
};

export const generate100Vendors = async () => {
  try {
    console.log('Starting to generate 100 vendors...');
    
    const hashedPassword = await bcrypt.hash('vendor123', 12);
    const vendors = [];
    let vendorCount = 0;

    for (const category of categories) {
      const categoryVendors = vendorData[category];
      
      for (let i = 0; i < categoryVendors.length && vendorCount < 100; i++) {
        const vendor = categoryVendors[i];
        
        // Create user account
        const user = await User.create({
          name: vendor.name,
          email: `${vendor.name.toLowerCase().replace(/\s+/g, '')}@vendor.com`,
          password: hashedPassword,
          role: 'vendor',
          xp: Math.floor(Math.random() * 500) + 100,
          wallet: Math.floor(Math.random() * 5000) + 500,
          badges: ['Bronze Host'],
          kycVerified: true
        });

        // Create vendor profile
        const newVendor = await Vendor.create({
          userId: user._id,
          businessName: vendor.name,
          category,
          services: getServicesForCategory(category),
          pricing: {
            basic: Math.floor(Math.random() * 20000) + 10000,
            premium: Math.floor(Math.random() * 60000) + 40000,
            luxury: Math.floor(Math.random() * 150000) + 100000
          },
          location: {
            type: 'Point',
            coordinates: [vendor.lng, vendor.lat]
          },
          address: `${vendor.area}, India`,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
          reviews: generateReviews(),
          portfolio: [`${category}1.jpg`, `${category}2.jpg`]
        });

        vendors.push(newVendor);
        vendorCount++;
        console.log(`Created vendor ${vendorCount}: ${vendor.name}`);
      }
    }

    console.log(`✅ Successfully created ${vendorCount} vendors!`);
    return vendors;
  } catch (error) {
    console.error('Error generating vendors:', error);
    throw error;
  }
};

const getServicesForCategory = (category) => {
  const services = {
    catering: ['Wedding Catering', 'Corporate Events', 'Buffet Service', 'Custom Menus', 'Dessert Bar'],
    venue: ['Wedding Venue', 'Conference Hall', 'Banquet Hall', 'Outdoor Garden', 'Rooftop Space'],
    decoration: ['Floral Arrangements', 'Stage Decoration', 'Lighting', 'Balloon Art', 'Theme Decor'],
    photography: ['Wedding Photography', 'Event Coverage', 'Drone Shots', 'Photo Editing', 'Video Production'],
    entertainment: ['DJ Services', 'Live Band', 'MC Services', 'Sound System', 'Dance Performances'],
    music: ['Live Music', 'DJ', 'Band Performance', 'Solo Artist', 'Orchestra']
  };
  return services[category] || [];
};

const generateReviews = () => {
  const reviewCount = Math.floor(Math.random() * 5) + 1;
  const reviews = [];
  const comments = [
    'Excellent service! Highly recommended.',
    'Professional and reliable.',
    'Great experience, will book again.',
    'Amazing quality and attention to detail.',
    'Exceeded our expectations!'
  ];

  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      rating: Math.floor(Math.random() * 2) + 4,
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    });
  }

  return reviews;
};
