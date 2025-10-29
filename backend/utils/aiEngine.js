import axios from 'axios';

export const getAIRecommendations = async (eventData) => {
  try {
    const prompt = `Suggest 3 vendors and themes for a ${eventData.type} event with ${eventData.guestCount} guests and budget $${eventData.budget}`;
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      suggestions: response.data.choices[0].message.content,
      budgetOptimization: calculateBudgetOptimization(eventData),
      trendingThemes: getTrendingThemes(eventData.type)
    };
  } catch (error) {
    console.error('AI Engine error:', error.message);
    return getFallbackRecommendations(eventData);
  }
};

const calculateBudgetOptimization = (eventData) => {
  const perGuestBudget = eventData.budget / eventData.guestCount;
  return {
    perGuest: perGuestBudget,
    venue: eventData.budget * 0.4,
    catering: eventData.budget * 0.3,
    decoration: eventData.budget * 0.2,
    misc: eventData.budget * 0.1
  };
};

const getTrendingThemes = (eventType) => {
  const themes = {
    wedding: ['Rustic Garden', 'Modern Minimalist', 'Vintage Elegance'],
    corporate: ['Tech Innovation', 'Professional Networking', 'Team Building'],
    birthday: ['Tropical Paradise', 'Retro 80s', 'Elegant Dinner']
  };
  return themes[eventType.toLowerCase()] || ['Classic', 'Modern', 'Themed'];
};

const getFallbackRecommendations = (eventData) => {
  return {
    suggestions: `For your ${eventData.type} event, consider local vendors specializing in events of this scale.`,
    budgetOptimization: calculateBudgetOptimization(eventData),
    trendingThemes: getTrendingThemes(eventData.type)
  };
};
