import { useState } from 'react';
import axios from 'axios';
import styles from './AIAssistant.module.css';

const AIAssistant = ({ eventData, onRecommendation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI event planning assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/recommend', {
        ...eventData,
        query: input
      });

      const aiMessage = {
        role: 'assistant',
        content: res.data.suggestions || 'Here are my recommendations based on your event details.'
      };

      setMessages(prev => [...prev, aiMessage]);
      if (onRecommendation) onRecommendation(res.data);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'I can help you with venue suggestions, budget optimization, vendor recommendations, and theme ideas!'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    'Suggest venues',
    'Optimize budget',
    'Recommend vendors',
    'Trending themes'
  ];

  return (
    <>
      <button className={styles.floatingBtn} onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <h3>AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
                {msg.content}
              </div>
            ))}
            {loading && <div className={styles.loading}>Thinking...</div>}
          </div>

          <div className={styles.quickActions}>
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => setInput(action)}
                className={styles.quickBtn}
              >
                {action}
              </button>
            ))}
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
