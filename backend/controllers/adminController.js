import User from '../models/User.js';
import Event from '../models/Event.js';
import Vendor from '../models/Vendor.js';
import Transaction from '../models/Transaction.js';
import Quote from '../models/Quote.js';

// Get system statistics
export const getSystemStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalEvents,
      totalVendors,
      totalTransactions,
      activeEvents,
      pendingQuotes
    ] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Vendor.countDocuments(),
      Transaction.countDocuments(),
      Event.countDocuments({ status: 'active' }),
      Quote.countDocuments({ status: 'pending' })
    ]);

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10).select('-password');
    const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(10).populate('userId', 'name email');
    
    // Calculate revenue
    const revenue = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      stats: {
        totalUsers,
        totalEvents,
        totalVendors,
        totalTransactions,
        activeEvents,
        pendingQuotes,
        totalRevenue: revenue[0]?.total || 0
      },
      recentUsers,
      recentEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user growth data
export const getUserGrowth = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const growth = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(growth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage user (suspend/activate/verify)
export const manageUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { action, kycVerified } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (action === 'verify') {
      user.kycVerified = true;
    } else if (kycVerified !== undefined) {
      user.kycVerified = kycVerified;
    }

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users with filters
export const getAllUsers = async (req, res) => {
  try {
    const { role, kycVerified, page = 1, limit = 20 } = req.query;
    
    const filter = {};
    if (role) filter.role = role;
    if (kycVerified !== undefined) filter.kycVerified = kycVerified === 'true';

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction logs
export const getTransactionLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const transactions = await Transaction.find()
      .populate('userId', 'name email')
      .populate('eventId', 'title')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Transaction.countDocuments();

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// System health check
export const getSystemHealth = async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'healthy' : 'unhealthy';
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    res.json({
      status: 'operational',
      database: dbStatus,
      uptime: Math.floor(uptime),
      memory: {
        used: Math.floor(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.floor(memoryUsage.heapTotal / 1024 / 1024)
      },
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
