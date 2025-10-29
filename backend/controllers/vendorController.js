import Vendor from '../models/Vendor.js';
import { awardXP } from '../utils/rewardEngine.js';

export const createVendor = async (req, res) => {
  try {
    const vendorData = { ...req.body, userId: req.user.id };
    const vendor = await Vendor.create(vendorData);
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendors = async (req, res) => {
  try {
    const { category, minRating, lat, lng, maxDistance } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };

    let vendors;

    if (lat && lng) {
      const distance = maxDistance ? parseInt(maxDistance) : 10000; // 10km default
      vendors = await Vendor.find({
        ...query,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: distance
          }
        }
      })
        .populate('userId', 'name email')
        .limit(20);
    } else {
      vendors = await Vendor.find(query)
        .populate('userId', 'name email')
        .sort({ rating: -1 })
        .limit(20);
    }

    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate('userId', 'name email xp badges');
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const vendor = await Vendor.findById(req.params.id);

    vendor.reviews.push({
      userId: req.user.id,
      rating,
      comment,
      date: new Date()
    });

    const avgRating = vendor.reviews.reduce((sum, r) => sum + r.rating, 0) / vendor.reviews.length;
    vendor.rating = avgRating;

    await vendor.save();

    if (rating >= 4) {
      await awardXP(vendor.userId, 20, 'Positive review');
    }

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
