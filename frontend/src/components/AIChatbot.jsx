import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Calculator, Search, HelpCircle, Globe } from 'lucide-react';
import { dummyVendors } from '../utils/dummyData';
import styles from './AIChatbot.module.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 I\'m your AI Event Planning Assistant. I can help you with:',
      timestamp: new Date()
    },
    {
      type: 'bot',
      text: '• Event planning advice\n• Vendor recommendations\n• Budget calculations\n• FAQ answers\n• Multi-language support',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const quickActions = [
    { icon: <Calculator size={16} />, text: 'Calculate Budget', action: 'budget' },
    { icon: <Search size={16} />, text: 'Find Vendors', action: 'vendors' },
    { icon: <Sparkles size={16} />, text: 'Event Ideas', action: 'ideas' },
    { icon: <HelpCircle size={16} />, text: 'FAQ', action: 'faq' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const processMessage = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Try AI-powered response first
    try {
      const aiResponse = await getAIResponse(userMessage);
      if (aiResponse && aiResponse.text) {
        return {
          text: `🤖 ${aiResponse.text}`,
          suggestions: generateSmartSuggestions(lowerMessage),
          source: 'ai'
        };
      }
    } catch (error) {
      console.log('AI response failed, using rule-based fallback');
    }

    // Fallback to rule-based responses
    // Budget calculation
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return handleBudgetQuery(userMessage);
    }

    // Vendor recommendations
    if (lowerMessage.includes('vendor') || lowerMessage.includes('caterer') || lowerMessage.includes('photographer')) {
      return handleVendorQuery(userMessage);
    }

    // Event planning advice
    if (lowerMessage.includes('plan') || lowerMessage.includes('organize') || lowerMessage.includes('how to')) {
      return handlePlanningAdvice(userMessage);
    }

    // FAQ
    if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('when')) {
      return handleFAQ(userMessage);
    }

    // Event type queries
    if (lowerMessage.includes('wedding') || lowerMessage.includes('corporate') || lowerMessage.includes('birthday')) {
      return handleEventTypeQuery(userMessage);
    }

    // Default response
    return getDefaultResponse();
  };

  // Call AI backend for intelligent responses
  const getAIResponse = async (message) => {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context: {
            language,
            previousMessages: messages.slice(-3).map(m => ({ type: m.type, text: m.text }))
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return null;
    } catch (error) {
      console.error('AI API error:', error);
      return null;
    }
  };

  // Generate contextual suggestions based on query
  const generateSmartSuggestions = (query) => {
    if (query.includes('budget') || query.includes('cost')) {
      return ['Find vendors', 'Adjust budget', 'Get detailed breakdown'];
    }
    if (query.includes('vendor') || query.includes('caterer')) {
      return ['View details', 'Request quote', 'Compare vendors'];
    }
    if (query.includes('wedding')) {
      return ['Wedding checklist', 'Find wedding vendors', 'Calculate wedding budget'];
    }
    if (query.includes('corporate')) {
      return ['Corporate venues', 'Team building ideas', 'Get quote'];
    }
    return ['Calculate budget', 'Find vendors', 'Planning tips'];
  };

  const handleBudgetQuery = (message) => {
    const numbers = message.match(/\d+/g);
    const guests = numbers ? parseInt(numbers[0]) : 100;
    
    const perPersonCost = 5000; // ₹5000 per person average
    const venueCost = guests * 500;
    const cateringCost = guests * 1500;
    const decorationCost = guests * 300;
    const photographyCost = 50000;
    const entertainmentCost = 30000;
    const miscCost = guests * 200;
    
    const totalBudget = venueCost + cateringCost + decorationCost + photographyCost + entertainmentCost + miscCost;

    return {
      text: `💰 **Budget Estimate for ${guests} guests:**\n\n` +
            `🏛️ Venue: ₹${venueCost.toLocaleString('en-IN')}\n` +
            `🍽️ Catering: ₹${cateringCost.toLocaleString('en-IN')}\n` +
            `🎨 Decoration: ₹${decorationCost.toLocaleString('en-IN')}\n` +
            `📸 Photography: ₹${photographyCost.toLocaleString('en-IN')}\n` +
            `🎭 Entertainment: ₹${entertainmentCost.toLocaleString('en-IN')}\n` +
            `📋 Miscellaneous: ₹${miscCost.toLocaleString('en-IN')}\n\n` +
            `**Total Estimated Budget: ₹${totalBudget.toLocaleString('en-IN')}**\n\n` +
            `💡 Tip: This is a rough estimate. Actual costs may vary based on your location and preferences.`,
      suggestions: ['Find vendors', 'Adjust budget', 'Save estimate']
    };
  };

  const handleVendorQuery = (message) => {
    let category = 'all';
    if (message.includes('caterer') || message.includes('food')) category = 'catering';
    if (message.includes('venue') || message.includes('hall')) category = 'venue';
    if (message.includes('photo') || message.includes('camera')) category = 'photography';
    if (message.includes('decor') || message.includes('decoration')) category = 'decoration';
    if (message.includes('music') || message.includes('dj') || message.includes('entertainment')) category = 'entertainment';

    const vendors = category === 'all' 
      ? dummyVendors.slice(0, 3)
      : dummyVendors.filter(v => v.category === category).slice(0, 3);

    if (vendors.length === 0) {
      return {
        text: `I couldn't find specific vendors for "${category}". Here are some top-rated vendors:\n\n` +
              dummyVendors.slice(0, 3).map(v => 
                `⭐ **${v.businessName}**\n` +
                `   Category: ${v.category}\n` +
                `   Rating: ${v.rating}/5\n` +
                `   From: ₹${v.pricing.basic.toLocaleString('en-IN')}\n`
              ).join('\n'),
        suggestions: ['View all vendors', 'Filter by budget', 'Compare vendors']
      };
    }

    return {
      text: `🎯 **Top ${category} vendors for you:**\n\n` +
            vendors.map(v => 
              `⭐ **${v.businessName}**\n` +
              `   📍 ${v.address}\n` +
              `   ⭐ Rating: ${v.rating}/5\n` +
              `   💰 Starting from: ₹${v.pricing.basic.toLocaleString('en-IN')}\n` +
              `   📋 Services: ${v.services.slice(0, 2).join(', ')}\n`
            ).join('\n'),
      suggestions: ['View details', 'Request quote', 'Compare prices']
    };
  };

  const handlePlanningAdvice = (message) => {
    if (message.includes('wedding')) {
      return {
        text: `💍 **Wedding Planning Guide:**\n\n` +
              `**6-12 Months Before:**\n` +
              `✓ Set budget and guest list\n` +
              `✓ Book venue and key vendors\n` +
              `✓ Send save-the-dates\n\n` +
              `**3-6 Months Before:**\n` +
              `✓ Finalize menu and decorations\n` +
              `✓ Order wedding attire\n` +
              `✓ Plan honeymoon\n\n` +
              `**1-3 Months Before:**\n` +
              `✓ Send invitations\n` +
              `✓ Finalize details with vendors\n` +
              `✓ Create seating chart\n\n` +
              `**1 Month Before:**\n` +
              `✓ Final venue walkthrough\n` +
              `✓ Confirm all bookings\n` +
              `✓ Prepare timeline\n\n` +
              `Need help with any specific aspect?`,
        suggestions: ['Find wedding vendors', 'Calculate budget', 'Create checklist']
      };
    }

    return {
      text: `📋 **Event Planning Steps:**\n\n` +
            `1️⃣ **Define Your Event**\n` +
            `   - Purpose and goals\n` +
            `   - Date and time\n` +
            `   - Guest count\n\n` +
            `2️⃣ **Set Budget**\n` +
            `   - Allocate funds\n` +
            `   - Track expenses\n` +
            `   - Plan for contingencies\n\n` +
            `3️⃣ **Book Venue & Vendors**\n` +
            `   - Research options\n` +
            `   - Compare quotes\n` +
            `   - Sign contracts\n\n` +
            `4️⃣ **Plan Details**\n` +
            `   - Menu, decor, entertainment\n` +
            `   - Timeline and schedule\n` +
            `   - Backup plans\n\n` +
            `5️⃣ **Execute & Enjoy**\n` +
            `   - Final confirmations\n` +
            `   - Day-of coordination\n` +
            `   - Capture memories\n\n` +
            `What type of event are you planning?`,
      suggestions: ['Wedding', 'Corporate', 'Birthday', 'Other']
    };
  };

  const handleEventTypeQuery = (message) => {
    if (message.includes('wedding')) {
      return {
        text: `💍 **Wedding Planning Essentials:**\n\n` +
              `Average Budget: ₹5-15 lakhs\n` +
              `Timeline: 6-12 months\n\n` +
              `**Must-Have Vendors:**\n` +
              `• Venue (₹50,000 - ₹2,50,000)\n` +
              `• Catering (₹1,500 - ₹3,000 per person)\n` +
              `• Photography (₹50,000 - ₹2,00,000)\n` +
              `• Decoration (₹30,000 - ₹1,50,000)\n` +
              `• Music/DJ (₹30,000 - ₹1,00,000)\n\n` +
              `Would you like me to find vendors or calculate your budget?`,
        suggestions: ['Find wedding vendors', 'Calculate budget', 'Wedding checklist']
      };
    }

    if (message.includes('corporate')) {
      return {
        text: `🏢 **Corporate Event Planning:**\n\n` +
              `**Popular Types:**\n` +
              `• Conferences & Seminars\n` +
              `• Team Building Events\n` +
              `• Product Launches\n` +
              `• Annual Parties\n\n` +
              `**Key Considerations:**\n` +
              `• Professional venue\n` +
              `• AV equipment\n` +
              `• Catering options\n` +
              `• Branding opportunities\n` +
              `• Networking spaces\n\n` +
              `What's your event size and budget?`,
        suggestions: ['Find venues', 'Get quote', 'View packages']
      };
    }

    return getDefaultResponse();
  };

  const handleFAQ = (message) => {
    const faqs = {
      'how to book': 'To book a vendor: 1) Browse vendors, 2) Click "Request Quote", 3) Compare quotes, 4) Confirm booking. Simple!',
      'payment': 'We accept credit/debit cards, UPI, net banking, and wallets. Secure payments via Stripe.',
      'cancel': 'Cancellation policy varies by vendor. Check individual vendor policies before booking.',
      'refund': 'Refunds are processed within 7-10 business days as per vendor cancellation policy.',
      'support': 'Contact us at contact@artculture.in or call +91 98765 43210 (Mon-Sat, 9AM-8PM IST)',
    };

    for (const [key, answer] of Object.entries(faqs)) {
      if (message.includes(key)) {
        return { text: `ℹ️ ${answer}`, suggestions: ['More FAQs', 'Contact support', 'Back to menu'] };
      }
    }

    return {
      text: `❓ **Frequently Asked Questions:**\n\n` +
            `• How do I book a vendor?\n` +
            `• What payment methods do you accept?\n` +
            `• What's your cancellation policy?\n` +
            `• How do refunds work?\n` +
            `• How can I contact support?\n\n` +
            `Ask me anything specific!`,
      suggestions: ['Booking process', 'Payment info', 'Contact support']
    };
  };

  const getDefaultResponse = () => {
    return {
      text: `I'm here to help! I can assist you with:\n\n` +
            `💰 Budget calculations\n` +
            `🔍 Vendor recommendations\n` +
            `📋 Event planning advice\n` +
            `❓ Answering your questions\n` +
            `🌍 Multi-language support\n\n` +
            `What would you like to know?`,
      suggestions: ['Calculate budget', 'Find vendors', 'Planning tips', 'FAQs']
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(async () => {
      const response = await processMessage(input);
      
      const botMessage = {
        type: 'bot',
        text: response.text,
        suggestions: response.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action) => {
    const actions = {
      budget: 'Calculate budget for 100 guests',
      vendors: 'Show me top vendors',
      ideas: 'Give me event planning ideas',
      faq: 'Show me FAQs'
    };

    setInput(actions[action]);
    setTimeout(() => handleSend(), 100);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.floatingButton}
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={24} />
          <span className={styles.badge}>AI</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className={styles.chatbot}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>
                <Sparkles size={20} />
              </div>
              <div>
                <h3>AI Assistant</h3>
                <span className={styles.status}>
                  <span className={styles.statusDot}></span>
                  Online 24/7
                </span>
              </div>
            </div>
            <div className={styles.headerRight}>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={styles.languageSelect}
                title="Select Language"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action.action)}
                className={styles.quickActionBtn}
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.type]}`}>
                {msg.type === 'bot' && (
                  <div className={styles.messageAvatar}>
                    <Sparkles size={16} />
                  </div>
                )}
                <div className={styles.messageContent}>
                  <div className={styles.messageText}>
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  {msg.suggestions && (
                    <div className={styles.suggestions}>
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(sug)}
                          className={styles.suggestionBtn}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                  <span className={styles.timestamp}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.messageAvatar}>
                  <Sparkles size={16} />
                </div>
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className={styles.input}
            />
            <button
              onClick={handleSend}
              className={styles.sendButton}
              disabled={!input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
