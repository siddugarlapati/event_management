import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { dummyEvents } from '../utils/dummyData';
import Navbar from '../components/Navbar';
import styles from './Dashboard.module.css';

const DashboardManager = () => {
  const { user } = useContext(AuthContext);
  const [availableEvents, setAvailableEvents] = useState(
    dummyEvents.filter(e => e.status === 'active' || e.status === 'draft')
  );
  const [appliedEvents, setAppliedEvents] = useState([]);

  const handleApply = (eventId) => {
    const event = availableEvents.find(e => e._id === eventId);
    setAppliedEvents([...appliedEvents, { ...event, applicationStatus: 'pending' }]);
    alert('Application submitted successfully!');
  };

  return (
    <div className={styles.dashboard}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>Event Manager Dashboard</h1>
            <p>Browse and manage event opportunities</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📋</div>
            <div>
              <div className={styles.statValue}>{appliedEvents.length}</div>
              <div className={styles.statLabel}>Active Projects</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div>
              <div className={styles.statValue}>{user?.xp || 800}</div>
              <div className={styles.statLabel}>XP Points</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div>
              <div className={styles.statValue}>₹{(user?.wallet || 280000)?.toLocaleString('en-IN')}</div>
              <div className={styles.statLabel}>Earnings</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div>
              <div className={styles.statValue}>12</div>
              <div className={styles.statLabel}>Completed Events</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Available Events</h2>
          <div className={styles.grid}>
            {availableEvents.map(event => (
              <div key={event._id} className={styles.eventCard}>
                <div className={styles.eventHeader}>
                  <h3>{event.title}</h3>
                  <span className={`${styles.badge} ${styles[event.status]}`}>
                    {event.status}
                  </span>
                </div>
                <p className={styles.eventType}>{event.type}</p>
                <p className={styles.eventDate}>
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className={styles.eventLocation}>📍 {event.location}</p>
                <p className={styles.eventBudget}>💵 ₹{event.budget?.toLocaleString('en-IN')}</p>
                <p className={styles.eventGuests}>👥 {event.guestCount} guests</p>
                <button 
                  onClick={() => handleApply(event._id)}
                  className={styles.btnView}
                  disabled={appliedEvents.some(e => e._id === event._id)}
                >
                  {appliedEvents.some(e => e._id === event._id) ? 'Applied' : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {appliedEvents.length > 0 && (
          <div className={styles.section}>
            <h2>My Applications</h2>
            <div className={styles.grid}>
              {appliedEvents.map(event => (
                <div key={event._id} className={styles.eventCard}>
                  <div className={styles.eventHeader}>
                    <h3>{event.title}</h3>
                    <span className={`${styles.badge} ${styles.pending}`}>
                      {event.applicationStatus}
                    </span>
                  </div>
                  <p className={styles.eventType}>{event.type}</p>
                  <p className={styles.eventDate}>
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className={styles.eventLocation}>📍 {event.location}</p>
                  <p className={styles.eventBudget}>💵 ₹{event.budget?.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardManager;
