import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import styles from './Messages.module.css';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Dummy conversations based on role
  const getConversations = () => {
    if (user?.role === 'user') {
      return [
        {
          id: 1,
          name: 'Priya Catering Services',
          role: 'Vendor',
          avatar: 'PC',
          lastMessage: 'Yes, we can accommodate 200 guests',
          time: '2 min ago',
          unread: 2,
          online: true
        },
        {
          id: 2,
          name: 'Rahul Photography',
          role: 'Vendor',
          avatar: 'RP',
          lastMessage: 'I have availability on that date',
          time: '1 hour ago',
          unread: 0,
          online: false
        },
        {
          id: 3,
          name: 'Amit - Event Manager',
          role: 'Manager',
          avatar: 'AM',
          lastMessage: 'I can help coordinate your wedding',
          time: '3 hours ago',
          unread: 1,
          online: true
        }
      ];
    } else if (user?.role === 'vendor') {
      return [
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'Client',
          avatar: 'SJ',
          lastMessage: 'What are your catering packages?',
          time: '5 min ago',
          unread: 3,
          online: true
        },
        {
          id: 2,
          name: 'Michael Chen',
          role: 'Client',
          avatar: 'MC',
          lastMessage: 'Can you do a tasting session?',
          time: '30 min ago',
          unread: 1,
          online: false
        },
        {
          id: 3,
          name: 'Amit - Event Manager',
          role: 'Manager',
          avatar: 'AM',
          lastMessage: 'Need catering for corporate event',
          time: '2 hours ago',
          unread: 0,
          online: true
        }
      ];
    } else {
      return [
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'Client',
          avatar: 'SJ',
          lastMessage: 'Can you manage my wedding?',
          time: '10 min ago',
          unread: 2,
          online: true
        },
        {
          id: 2,
          name: 'Priya Catering Services',
          role: 'Vendor',
          avatar: 'PC',
          lastMessage: 'Confirmed for the event',
          time: '1 hour ago',
          unread: 0,
          online: false
        }
      ];
    }
  };

  const conversations = getConversations();

  const getChatMessages = (chatId) => {
    const messages = {
      1: [
        { id: 1, sender: 'them', text: 'Hi! I saw your event request', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Yes, I need catering for 200 guests', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'We can definitely help with that!', time: '10:35 AM' },
        { id: 4, sender: 'them', text: 'What type of cuisine are you looking for?', time: '10:35 AM' },
        { id: 5, sender: 'me', text: 'Indian and Continental mix', time: '10:40 AM' },
        { id: 6, sender: 'them', text: 'Perfect! We specialize in that', time: '10:42 AM' },
        { id: 7, sender: 'them', text: 'Yes, we can accommodate 200 guests', time: 'Just now' }
      ],
      2: [
        { id: 1, sender: 'them', text: 'Hello! Thanks for reaching out', time: '9:00 AM' },
        { id: 2, sender: 'me', text: 'I need a photographer for my wedding', time: '9:05 AM' },
        { id: 3, sender: 'them', text: 'I have availability on that date', time: '9:10 AM' }
      ],
      3: [
        { id: 1, sender: 'them', text: 'Hi! I can help manage your event', time: '8:00 AM' },
        { id: 2, sender: 'me', text: 'That would be great!', time: '8:15 AM' },
        { id: 3, sender: 'them', text: 'I can help coordinate your wedding', time: '8:20 AM' }
      ]
    };
    return messages[chatId] || [];
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In real app, send message to backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className={styles.messages}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.messagesLayout}>
          {/* Conversations List */}
          <div className={styles.conversationsList}>
            <div className={styles.conversationsHeader}>
              <h2>💬 Messages</h2>
              <span className={styles.badge}>{conversations.filter(c => c.unread > 0).length}</span>
            </div>
            
            <div className={styles.searchBox}>
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className={styles.searchInput}
              />
            </div>

            <div className={styles.conversations}>
              {conversations.map(conv => (
                <div 
                  key={conv.id}
                  className={`${styles.conversationItem} ${selectedChat === conv.id ? styles.active : ''}`}
                  onClick={() => setSelectedChat(conv.id)}
                >
                  <div className={styles.avatar}>
                    {conv.avatar}
                    {conv.online && <span className={styles.onlineIndicator}></span>}
                  </div>
                  <div className={styles.conversationInfo}>
                    <div className={styles.conversationTop}>
                      <h4>{conv.name}</h4>
                      <span className={styles.time}>{conv.time}</span>
                    </div>
                    <div className={styles.conversationBottom}>
                      <p className={styles.lastMessage}>{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className={styles.unreadBadge}>{conv.unread}</span>
                      )}
                    </div>
                    <span className={styles.roleTag}>{conv.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={styles.chatArea}>
            {selectedChat ? (
              <>
                <div className={styles.chatHeader}>
                  <div className={styles.chatHeaderInfo}>
                    <div className={styles.avatar}>
                      {conversations.find(c => c.id === selectedChat)?.avatar}
                    </div>
                    <div>
                      <h3>{conversations.find(c => c.id === selectedChat)?.name}</h3>
                      <span className={styles.status}>
                        {conversations.find(c => c.id === selectedChat)?.online ? '🟢 Online' : '⚫ Offline'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.chatActions}>
                    <button className={styles.iconBtn}>📞</button>
                    <button className={styles.iconBtn}>📹</button>
                    <button className={styles.iconBtn}>ℹ️</button>
                  </div>
                </div>

                <div className={styles.chatMessages}>
                  {getChatMessages(selectedChat).map(msg => (
                    <div 
                      key={msg.id} 
                      className={`${styles.message} ${msg.sender === 'me' ? styles.myMessage : styles.theirMessage}`}
                    >
                      <div className={styles.messageBubble}>
                        <p>{msg.text}</p>
                        <span className={styles.messageTime}>{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.chatInput}>
                  <button className={styles.iconBtn}>📎</button>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className={styles.iconBtn}>😊</button>
                  <button 
                    className={styles.sendBtn}
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.emptyChat}>
                <div className={styles.emptyIcon}>💬</div>
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;