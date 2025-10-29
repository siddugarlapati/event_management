import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './Notifications.module.css';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      message: 'Priya Catering sent you a message',
      time: '2 min ago',
      read: false,
      icon: '💬'
    },
    {
      id: 2,
      type: 'booking',
      title: 'Booking Request',
      message: 'New booking request for Wedding Event',
      time: '1 hour ago',
      read: false,
      icon: '📦'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₹50,000 received',
      time: '3 hours ago',
      read: true,
      icon: '💰'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Event Reminder',
      message: 'Your event "Birthday Party" is tomorrow',
      time: '5 hours ago',
      read: true,
      icon: '🔔'
    },
    {
      id: 5,
      type: 'review',
      title: 'New Review',
      message: 'Sarah gave you a 5-star review',
      time: '1 day ago',
      read: true,
      icon: '⭐'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className={styles.notificationsWrapper}>
      <button 
        className={styles.notificationBtn}
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.notificationsPanel}>
            <div className={styles.header}>
              <h3>Notifications</h3>
              <div className={styles.headerActions}>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className={styles.markAllBtn}>
                    Mark all read
                  </button>
                )}
                <button onClick={clearAll} className={styles.clearBtn}>
                  Clear all
                </button>
              </div>
            </div>

            <div className={styles.notificationsList}>
              {notifications.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🔔</div>
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={styles.notificationIcon}>
                      {notification.icon}
                    </div>
                    <div className={styles.notificationContent}>
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className={styles.time}>{notification.time}</span>
                    </div>
                    {!notification.read && (
                      <div className={styles.unreadDot}></div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
