import { getAIRecommendations } from '../utils/aiEngine.js';

export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await getAIRecommendations(req.body);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const analyzeBudget = async (req, res) => {
  try {
    const { budget, guestCount, type } = req.body;
    
    const analysis = {
      perGuest: budget / guestCount,
      breakdown: {
        venue: budget * 0.4,
        catering: budget * 0.3,
        decoration: budget * 0.2,
        misc: budget * 0.1
      },
      recommendations: budget / guestCount < 50 
        ? 'Consider increasing budget for better quality'
        : 'Budget is adequate for a quality event'
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
