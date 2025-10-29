import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import styles from './ChatRoom.module.css';

const socket = io('http://localhost:5000');

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('join-room', roomId);

    socket.on('receive-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => socket.off('receive-message');
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('send-message', {
        roomId,
        message,
        userId: user.id,
        userName: user.name
      });
      setMessage('');
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <h2>Event Chat</h2>
          </div>
          
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${msg.userId === user.id ? styles.own : ''}`}
              >
                <div className={styles.sender}>{msg.userName}</div>
                <div className={styles.text}>{msg.message}</div>
                <div className={styles.time}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={sendMessage} className={styles.inputForm}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
