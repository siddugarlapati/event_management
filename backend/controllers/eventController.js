import Event from '../models/Event.js';
import { getAIRecommendations } from '../utils/aiEngine.js';
import { generateContract } from '../utils/blockchainSimulator.js';
import { awardXP } from '../utils/rewardEngine.js';
import { generateRoomId, generateInviteLink } from '../utils/roomIdGenerator.js';

export const createEvent = async (req, res) => {
  try {
    const roomId = generateRoomId();
    const inviteLink = generateInviteLink(roomId);
    
    const eventData = { 
      ...req.body, 
      userId: req.user.id,
      roomId,
      inviteLink,
      participants: [{ userId: req.user.id, joinedAt: new Date(), status: 'approved' }]
    };
    
    const event = await Event.create(eventData);

    const aiRecommendations = await getAIRecommendations(eventData);
    event.aiRecommendations = aiRecommendations;
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const { roomId, password } = req.body;
    const event = await Event.findOne({ roomId });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check room type access
    if (event.roomType === 'trusted' && event.roomPassword !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (event.roomType === 'hyperlock') {
      // Check if user is invited or KYC verified
      const isInvited = event.invitedUsers.includes(req.user.id);
      if (!isInvited && !req.user.kycVerified) {
        // Add to pending participants
        event.participants.push({
          userId: req.user.id,
          joinedAt: new Date(),
          status: 'pending'
        });
        await event.save();
        return res.status(202).json({ message: 'Approval pending', status: 'pending' });
      }
    }

    // Add user to participants
    const alreadyJoined = event.participants.some(p => p.userId.toString() === req.user.id);
    if (!alreadyJoined) {
      event.participants.push({
        userId: req.user.id,
        joinedAt: new Date(),
        status: 'approved'
      });
      await event.save();
    }

    res.json({ event, message: 'Successfully joined event' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const query = req.user.role === 'user' 
      ? { userId: req.user.id }
      : req.user.role === 'manager'
      ? { status: 'active' }
      : {};

    const events = await Event.find(query)
      .populate('userId', 'name email')
      .populate('vendors')
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('vendors')
      .populate('manager', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const finalizeEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    const contract = generateContract(event, {
      user: event.userId,
      vendors: event.vendors,
      manager: event.manager
    });

    event.contractHash = contract.hash;
    event.status = 'in-progress';
    await event.save();

    res.json({ event, contract });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.status = 'completed';
    await event.save();

    const reward = await awardXP(event.userId, 100, 'Event completion');

    res.json({ event, reward });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
