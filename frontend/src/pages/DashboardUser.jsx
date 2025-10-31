import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { dummyEvents, dummyVendors } from '../utils/dummyData';
import Navbar from '../components/Navbar';
import styles from './Dashboard.module.css';

const DashboardUser = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState(dummyEvents);
  const [recommendedVendors, setRecommendedVendors] = useState(dummyVendors.slice(0, 3));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data.length > 0 ? res.data : dummyEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(dummyEvents);
    }
  };

  return (
    <div className={styles.dashboard}>
      <Navbar />
      
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Welcome back, {user?.name}</h1>
            <p>Create unforgettable moments</p>
            <Link to="/event/create" className={styles.btnHero}>
              Create New Event
            </Link>
          </div>
        </div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div>
              <div className={styles.statValue}>{events.length}</div>
              <div className={styles.statLabel}>Total Events</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div>
              <div className={styles.statValue}>{user?.xp || 0}</div>
              <div className={styles.statLabel}>XP Points</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div>
              <div className={styles.statValue}>₹{(user?.wallet || 0)?.toLocaleString('en-IN')}</div>
              <div className={styles.statLabel}>Wallet Balance</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Your Events</h2>
            <p>Manage and track your upcoming celebrations</p>
          </div>
          <div className={styles.eventsGrid}>
            {events.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📅</div>
                <h3>No events yet</h3>
                <p>Create your first event to get started</p>
                <Link to="/event/create" className={styles.btnCreate}>
                  Create Event
                </Link>
              </div>
            ) : (
              events.map(event => (
                <div key={event._id} className={styles.eventCardNew}>
                  <div className={styles.eventImage}>
                    <img 
                      src={`https://images.unsplash.com/photo-${
                        event.type === 'wedding' ? '1519741497674-611481863552' :
                        event.type === 'corporate' ? '1540575467063-178a50c2df87' :
                        event.type === 'birthday' ? '1530103862676-de8c9debad1d' :
                        '1511795409834-ef04bbd61622'
                      }?w=600`}
                      alt={event.title}
                    />
                    <span className={`${styles.badge} ${styles[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className={styles.eventContent}>
                    <h3>{event.title}</h3>
                    <p className={styles.eventType}>{event.type}</p>
                    <div className={styles.eventDetails}>
                      <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                      <span>📍 {event.location}</span>
                      <span>👥 {event.guestCount} guests</span>
                    </div>
                    <div className={styles.eventFooter}>
                      <span className={styles.budget}>₹{event.budget?.toLocaleString('en-IN')}</span>
                      <Link to={`/event/${event._id}`} className={styles.btnViewEvent}>
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Recommended Vendors</h2>
            <p>Handpicked professionals for your perfect event</p>
          </div>
          <div className={styles.vendorsGrid}>
            {recommendedVendors.map(vendor => (
              <div key={vendor._id} className={styles.vendorCardNew}>
                <div className={styles.vendorImage}>
                  <img 
                    src={`https://images.unsplash.com/photo-${
                      vendor.category === 'catering' ? '1555244162-803834f70033' :
                      vendor.category === 'venue' ? '1519167758481-83f29da8c2b0' :
                      vendor.category === 'decoration' ? '1478146896981-b80fe463b330' :
                      vendor.category === 'photography' ? '1542038784456-1ea8e1e3b9d8' :
                      '1514525253161-7a46d19cd819'
                    }?w=600`}
                    alt={vendor.businessName}
                  />
                  <div className={styles.vendorRating}>
                    <span>⭐ {vendor.rating}</span>
                  </div>
                </div>
                <div className={styles.vendorContent}>
                  <span className={styles.vendorCategory}>{vendor.category}</span>
                  <h3>{vendor.businessName}</h3>
                  <p className={styles.vendorAddress}>📍 {vendor.address}</p>
                  <div className={styles.vendorFooter}>
                    <span className={styles.vendorPrice}>From ₹{vendor.pricing.basic?.toLocaleString('en-IN')}</span>
                    <Link to="/vendors" className={styles.btnViewVendor}>
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
