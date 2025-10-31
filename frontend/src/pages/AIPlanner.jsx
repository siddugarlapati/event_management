import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Sparkles, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import { dummyVendors } from '../utils/dummyData';
import styles from './AIPlanner.module.css';

const AIPlanner = () => {
  const [step, setStep] = useState(1);
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventType: '',
    budget: '',
    guestCount: '',
    eventDate: '',
    vendorTypes: []
  });
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const vendorTypeOptions = [
    { value: 'catering', label: 'Catering', icon: '🍽️' },
    { value: 'venue', label: 'Venue', icon: '🏛️' },
    { value: 'decoration', label: 'Decoration', icon: '🎨' },
    { value: 'photography', label: 'Photography', icon: '📸' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { value: 'music', label: 'Music & DJ', icon: '🎵' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
  };

  const toggleVendorType = (type) => {
    setEventDetails(prev => ({
      ...prev,
      vendorTypes: prev.vendorTypes.includes(type)
        ? prev.vendorTypes.filter(t => t !== type)
        : [...prev.vendorTypes, type]
    }));
  };

  const generateRecommendations = () => {
    // Filter vendors based on selected types and budget
    const budget = parseInt(eventDetails.budget) || 0;
    const filtered = dummyVendors.filter(vendor => {
      const matchesType = eventDetails.vendorTypes.length === 0 || 
                         eventDetails.vendorTypes.includes(vendor.category);
      const withinBudget = vendor.pricing.basic <= budget / eventDetails.vendorTypes.length;
      return matchesType && withinBudget;
    });

    setRecommendations(filtered);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventDetails.eventName || !eventDetails.budget || eventDetails.vendorTypes.length === 0) {
      alert('Please fill in event name, budget, and select at least one vendor type');
      return;
    }
    generateRecommendations();
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.content}>
        {step === 1 ? (
          <div className={styles.plannerForm}>
            <div className={styles.header}>
              <Sparkles className={styles.headerIcon} size={80} />
              <h1>🤖 AI Event Planner</h1>
              <p>Tell us about your event and we'll recommend the perfect vendors within your budget</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Event Name *</label>
                <input
                  type="text"
                  name="eventName"
                  value={eventDetails.eventName}
                  onChange={handleInputChange}
                  placeholder="e.g., Sarah & John's Wedding"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Event Type</label>
                  <select
                    name="eventType"
                    value={eventDetails.eventType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select type</option>
                    <option value="wedding">💍 Wedding</option>
                    <option value="corporate">🏢 Corporate Event</option>
                    <option value="birthday">🎂 Birthday Party</option>
                    <option value="anniversary">💑 Anniversary</option>
                    <option value="engagement">💐 Engagement</option>
                    <option value="concert">🎵 Concert</option>
                    <option value="other">✨ Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label><DollarSign size={16} /> Total Budget (₹) *</label>
                  <input
                    type="number"
                    name="budget"
                    value={eventDetails.budget}
                    onChange={handleInputChange}
                    placeholder="500000"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label><Users size={16} /> Guest Count</label>
                  <input
                    type="number"
                    name="guestCount"
                    value={eventDetails.guestCount}
                    onChange={handleInputChange}
                    placeholder="150"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label><Calendar size={16} /> Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={eventDetails.eventDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>What vendors do you need? *</label>
                <div className={styles.vendorTypes}>
                  {vendorTypeOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.vendorTypeBtn} ${
                        eventDetails.vendorTypes.includes(option.value) ? styles.selected : ''
                      }`}
                      onClick={() => toggleVendorType(option.value)}
                    >
                      <span className={styles.icon}>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Sparkles size={20} />
                Get AI Recommendations
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.recommendations}>
            <div className={styles.header}>
              <button onClick={() => setStep(1)} className={styles.backBtn}>
                ← Back to Form
              </button>
              <div>
                <h1>✨ AI-Recommended Vendors</h1>
                <p>Perfect matches for "{eventDetails.eventName}" • Budget: ₹{parseInt(eventDetails.budget).toLocaleString('en-IN')}</p>
              </div>
            </div>

            {recommendations.length === 0 ? (
              <div className={styles.empty}>
                <Sparkles size={64} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
                <p>No vendors found matching your criteria</p>
                <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Try adjusting your budget or vendor types</p>
                <button onClick={() => setStep(1)} className={styles.browseBtn}>
                  <Sparkles size={18} />
                  Adjust Criteria
                </button>
              </div>
            ) : (
              <div className={styles.vendorGrid}>
                {recommendations.map(vendor => (
                  <div key={vendor._id} className={styles.vendorCard}>
                    {vendor.image && (
                      <div className={styles.vendorImage}>
                        <img src={vendor.image} alt={vendor.businessName} />
                      </div>
                    )}
                    
                    <div className={styles.vendorContent}>
                      <div className={styles.vendorHeader}>
                        <h3>{vendor.businessName}</h3>
                        <div className={styles.rating}>⭐ {vendor.rating.toFixed(1)}</div>
                      </div>
                      
                      <span className={styles.category}>{vendor.category.toUpperCase()}</span>
                      <p className={styles.address}>
                        <MapPin size={16} />
                        {vendor.address}
                      </p>
                      
                      <div className={styles.pricing}>
                        <div className={styles.priceTag}>
                          <span>Starting From</span>
                          <strong>₹{vendor.pricing.basic.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>

                      <div className={styles.actions}>
                        <button 
                          onClick={() => navigate(`/vendor/${vendor._id}`)}
                          className={styles.viewBtn}
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => navigate('/event-planner')}
                          className={styles.requestBtn}
                        >
                          <Sparkles size={16} />
                          Request Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
