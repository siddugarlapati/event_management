import axios from 'axios';

// Hugging Face Inference API - Using Mistral 7B for accurate responses
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Alternative: Use Meta's Llama model
// const HF_API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf';

export const getAIRecommendations = async (eventData) => {
  try {
    const prompt = `You are an expert event planning assistant. Provide specific recommendations for a ${eventData.type} event with ${eventData.guestCount} guests and budget ₹${eventData.budget}. Include vendor suggestions, themes, and practical tips.`;
    
    const response = await queryHuggingFace(prompt);

    return {
      suggestions: response || 'Unable to generate AI recommendations at this time.',
      budgetOptimization: calculateBudgetOptimization(eventData),
      trendingThemes: getTrendingThemes(eventData.type)
    };
  } catch (error) {
    console.error('AI Engine error:', error.message);
    return getFallbackRecommendations(eventData);
  }
};

// Query Hugging Face model with retry logic
export const queryHuggingFace = async (prompt, maxTokens = 500, retries = 2) => {
  try {
    if (!HF_API_KEY) {
      console.warn('Hugging Face API key not found, using fallback');
      return null;
    }

    const response = await axios.post(
      HF_API_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: maxTokens,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    if (response.data && response.data[0] && response.data[0].generated_text) {
      return response.data[0].generated_text.trim();
    }

    return null;
  } catch (error) {
    // Model loading - retry after delay
    if (error.response?.status === 503 && retries > 0) {
      console.log('Model is loading, retrying in 5 seconds...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      return queryHuggingFace(prompt, maxTokens, retries - 1);
    }
    
    console.error('Hugging Face API error:', error.response?.data || error.message);
    return null;
  }
};

// Enhanced chatbot response with AI
export const getChatbotResponse = async (userMessage, context = {}) => {
  try {
    // Build context-aware prompt
    const systemPrompt = `You are a helpful event planning assistant for an Indian event management platform. 
You help users with:
- Event planning advice (weddings, corporate events, birthdays)
- Vendor recommendations (caterers, venues, photographers, decorators)
- Budget calculations (in Indian Rupees ₹)
- Booking process and FAQs

User question: "${userMessage}"

Provide a concise, helpful response (max 150 words) with specific, actionable advice.`;

    const aiResponse = await queryHuggingFace(systemPrompt, 300);
    
    if (aiResponse) {
      return {
        text: aiResponse,
        source: 'ai',
        confidence: 'high',
        model: 'Mistral-7B'
      };
    }

    return null;
  } catch (error) {
    console.error('Chatbot AI error:', error.message);
    return null;
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
    wedding: ['Rustic Garden', 'Modern Minimalist', 'Vintage Elegance', 'Royal Palace', 'Beach Paradise'],
    corporate: ['Tech Innovation', 'Professional Networking', 'Team Building', 'Product Launch', 'Annual Gala'],
    birthday: ['Tropical Paradise', 'Retro 80s', 'Elegant Dinner', 'Superhero Theme', 'Garden Party'],
    anniversary: ['Romantic Candlelight', 'Vintage Romance', 'Modern Chic', 'Garden Celebration'],
    engagement: ['Fairy Tale', 'Bohemian', 'Classic Elegance', 'Modern Romance']
  };
  return themes[eventType.toLowerCase()] || ['Classic', 'Modern', 'Themed', 'Elegant', 'Fun'];
};

const getFallbackRecommendations = (eventData) => {
  const eventType = eventData.type.toLowerCase();
  const budget = eventData.budget;
  const guests = eventData.guestCount;
  
  let recommendations = `For your ${eventType} event with ${guests} guests and budget ₹${budget.toLocaleString('en-IN')}:\n\n`;
  
  if (eventType.includes('wedding')) {
    recommendations += `**Wedding Planning Tips:**
- Book venue 6-12 months in advance
- Allocate 30% budget to catering
- Consider seasonal flowers for decoration
- Hire professional photographer
- Create detailed timeline

**Recommended Vendors:**
- Premium banquet halls in your area
- Experienced wedding caterers
- Professional photographers with portfolios
- Decoration specialists for weddings`;
  } else if (eventType.includes('corporate')) {
    recommendations += `**Corporate Event Tips:**
- Choose professional venue with AV equipment
- Plan networking spaces
- Arrange quality catering
- Consider branding opportunities
- Prepare backup plans

**Recommended Vendors:**
- Conference halls with modern facilities
- Corporate catering services
- Event management companies
- AV equipment providers`;
  } else {
    recommendations += `**Event Planning Tips:**
- Start planning 2-3 months ahead
- Create detailed checklist
- Compare multiple vendor quotes
- Book popular vendors early
- Plan for contingencies

**Recommended Vendors:**
- Local event venues
- Catering services
- Decoration specialists
- Entertainment providers`;
  }

  return {
    suggestions: recommendations,
    budgetOptimization: calculateBudgetOptimization(eventData),
    trendingThemes: getTrendingThemes(eventData.type)
  };
};
