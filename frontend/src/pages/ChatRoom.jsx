import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import VideoChat from '../components/VideoChat';
import styles from './ChatRoom.module.css';

// Use environment variable or fallback to localhost
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connection status handlers
    socket.on('connect', () => {
      console.log('✅ Connected to server');
      setIsConnected(true);
      socket.emit('join-room', roomId);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    // Message handlers
    socket.on('receive-message', (data) => {
      setMessages(prev => [...prev, data]);
      scrollToBottom();
    });

    // Typing indicators
    socket.on('user-typing', ({ userName }) => {
      setIsTyping(true);
      setTypingUser(userName);
    });

    socket.on('user-stop-typing', () => {
      setIsTyping(false);
      setTypingUser('');
    });

    // Join room if already connected
    if (socket.connected) {
      socket.emit('join-room', roomId);
      setIsConnected(true);
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('receive-message');
      socket.off('user-typing');
      socket.off('user-stop-typing');
    };
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = () => {
    socket.emit('typing', { roomId, userName: user?.name || 'Anonymous' });
    setTimeout(() => {
      socket.emit('stop-typing', { roomId });
    }, 1000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      socket.emit('send-message', {
        roomId,
        message,
        userId: user?.id || 'anonymous',
        userName: user?.name || 'Anonymous'
      });
      setMessage('');
      socket.emit('stop-typing', { roomId });
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        {/* Video Chat Section */}
        <div className={styles.videoSection}>
          <VideoChat 
            socket={socket} 
            roomId={roomId} 
            userId={user?.id || 'anonymous'}
            userName={user?.name || 'Anonymous'}
          />
        </div>

        {/* Text Chat Section */}
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <h2>Event Chat</h2>
            <div className={styles.connectionStatus}>
              <span className={`${styles.statusDot} ${isConnected ? styles.connected : styles.disconnected}`}></span>
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
          
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.emptyState}>
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${msg.userId === user?.id ? styles.own : ''}`}
              >
                <div className={styles.sender}>{msg.userName}</div>
                <div className={styles.text}>{msg.message}</div>
                <div className={styles.time}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={styles.typingIndicator}>
                {typingUser} is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={sendMessage} className={styles.inputForm}>
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              disabled={!isConnected}
            />
            <button type="submit" disabled={!isConnected || !message.trim()}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
