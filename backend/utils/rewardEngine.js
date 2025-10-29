import User from '../models/User.js';

export const awardXP = async (userId, amount, reason) => {
  const user = await User.findById(userId);
  user.xp += amount;
  
  const newBadges = checkBadgeEligibility(user.xp);
  user.badges = [...new Set([...user.badges, ...newBadges])];
  
  await user.save();
  return { xp: user.xp, badges: user.badges, earned: amount };
};

const checkBadgeEligibility = (xp) => {
  const badges = [];
  if (xp >= 100) badges.push('Bronze Host');
  if (xp >= 500) badges.push('Silver Host');
  if (xp >= 1000) badges.push('Gold Host');
  if (xp >= 5000) badges.push('Platinum Host');
  return badges;
};

export const generateNFTReward = (eventId, userId) => {
  return {
    tokenId: `NFT-${eventId}-${Date.now()}`,
    name: 'Event Completion Certificate',
    description: 'Commemorative NFT for successful event completion',
    metadata: {
      eventId,
      userId,
      timestamp: new Date().toISOString()
    }
  };
};

export const generateCoupon = (discount) => {
  return {
    code: `EVENT${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    discount,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  };
};
