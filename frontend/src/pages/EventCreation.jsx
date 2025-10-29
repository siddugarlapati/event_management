import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AIAssistant from '../components/AIAssistant';
import ARPreview from '../components/ARPreview';
import styles from './EventCreation.module.css';

const EventCreation = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'wedding',
    mode: 'fun',
    date: '',
    time: '',
    location: '',
    coordinates: { lat: null, lng: null },
    budget: '',
    guestCount: '',
    theme: '',
    description: '',
    roomType: 'open',
    roomPassword: ''
  });
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/events', formData);
      setAiRecommendations(res.data.aiRecommendations);
      
      // Show success with Room ID and invite link
      const event = res.data;
      alert(`Event created successfully!\n\nRoom ID: ${event.roomId}\nInvite Link: ${event.inviteLink}\n\nShare this with your guests!`);
      
      navigate(`/event/${event._id}`);
    } catch (error) {
      alert('Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <h1>Create New Event</h1>
        <p className={styles.subtitle}>Fill in the details and get AI-powered recommendations</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Event Mode</label>
            <div className={styles.modeSelector}>
              <button
                type="button"
                className={`${styles.modeBtn} ${formData.mode === 'fun' ? styles.active : ''}`}
                onClick={() => setFormData({ ...formData, mode: 'fun' })}
              >
                🎉 Fun Mode
                <span>Parties, Birthdays, Family Events</span>
              </button>
              <button
                type="button"
                className={`${styles.modeBtn} ${formData.mode === 'regular' ? styles.active : ''}`}
                onClick={() => setFormData({ ...formData, mode: 'regular' })}
              >
                🧾 Regular Mode
                <span>Corporate, Meetings, Conferences</span>
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Event Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Summer Wedding Celebration"
              required
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Event Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
                <option value="birthday">Birthday</option>
                <option value="conference">Conference</option>
                <option value="party">Party</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Theme (Optional)</label>
              <input
                type="text"
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                placeholder="e.g., Rustic Garden"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Budget (₹)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Guest Count</label>
              <input
                type="number"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Room Type</label>
            <select
              value={formData.roomType}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
            >
              <option value="open">🌐 Open - Anyone with link can join</option>
              <option value="trusted">🔒 Trusted - Password protected</option>
              <option value="hyperlock">🛡️ Hyperlock - Invite-only + KYC</option>
            </select>
          </div>

          {formData.roomType === 'trusted' && (
            <div className={styles.formGroup}>
              <label>Room Password (max 16 characters)</label>
              <input
                type="password"
                maxLength="16"
                value={formData.roomPassword}
                onChange={(e) => setFormData({ ...formData, roomPassword: e.target.value })}
                placeholder="Enter password"
              />
            </div>
          )}

          <div className={styles.actions}>
            <ARPreview venue={formData.location} decoration="modern" />
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'Creating...' : 'Create Event & Get AI Recommendations'}
            </button>
          </div>
        </form>

        <AIAssistant 
          eventData={formData} 
          onRecommendation={setAiRecommendations}
        />
      </div>
    </div>
  );
};

export default EventCreation;
