import { getAIRecommendations, getChatbotResponse } from '../utils/aiEngine.js';

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

// New endpoint for chatbot with AI
export const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const aiResponse = await getChatbotResponse(message, context);

    if (aiResponse) {
      res.json(aiResponse);
    } else {
      res.json({
        text: 'I apologize, but I\'m having trouble processing that right now. Please try rephrasing your question.',
        source: 'fallback',
        confidence: 'low'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
