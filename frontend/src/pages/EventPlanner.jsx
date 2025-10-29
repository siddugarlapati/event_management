import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../components/Navbar';
import styles from './EventPlanner.module.css';

const stripePromise = loadStripe('pk_test_your_key_here');

const EventPlanner = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    budget: '',
    guestCount: '',
    eventType: 'wedding',
    date: '',
    location: ''
  });
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('selectedVendors') || '[]');
    setSelectedVendors(saved);
  }, []);

  const categories = [
    { id: 'catering', name: 'Catering', icon: '🍽️' },
    { id: 'venue', name: 'Venue', icon: '🏛️' },
    { id: 'decoration', name: 'Decoration', icon: '💐' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎵' },
    { id: 'music', name: 'Music', icon: '🎼' }
  ];

  const generateQuote = async () => {
    setLoading(true);
    
    // Calculate costs
    const vendorCosts = selectedVendors.reduce((sum, v) => sum + (v.pricing?.premium || 0), 0);
    const perGuestCost = vendorCosts / (eventDetails.guestCount || 1);
    const tax = vendorCosts * 0.1;
    const serviceFee = vendorCosts * 0.05;
    const total = vendorCosts + tax + serviceFee;

    // AI recommendations
    const recommendations = {
      budgetAnalysis: eventDetails.budget >= total ? 'Within budget' : 'Over budget',
      suggestions: [
        'Consider booking 3 months in advance for better rates',
        'Weekend dates may have premium pricing',
        'Bundle services for potential discounts'
      ],
      timeline: [
        { task: 'Book vendors', weeks: 12 },
        { task: 'Send invitations', weeks: 8 },
        { task: 'Final confirmations', weeks: 2 }
      ]
    };

    setQuote({
      vendorCosts,
      perGuestCost: perGuestCost.toFixed(2),
      tax: tax.toFixed(2),
      serviceFee: serviceFee.toFixed(2),
      total: total.toFixed(2),
      recommendations
    });

    setLoading(false);
    setStep(3);
  };

  const handlePayment = async () => {
    alert('Payment gateway integration - Stripe checkout would open here');
    // In production, create payment intent and redirect to Stripe
  };

  const removeVendor = (vendorId) => {
    const updated = selectedVendors.filter(v => v._id !== vendorId);
    setSelectedVendors(updated);
    localStorage.setItem('selectedVendors', JSON.stringify(updated));
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.hero}>
        <h1>AI Event Planner</h1>
        <p>Let AI help you plan the perfect event</p>
      </div>

      <div className={styles.container}>
        <div className={styles.progress}>
          <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
            <span>1</span>
            <p>Select Vendors</p>
          </div>
          <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
            <span>2</span>
            <p>Event Details</p>
          </div>
          <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
            <span>3</span>
            <p>Review Quote</p>
          </div>
          <div className={`${styles.progressStep} ${step >= 4 ? styles.active : ''}`}>
            <span>4</span>
            <p>Payment</p>
          </div>
        </div>

        {step === 1 && (
          <div className={styles.content}>
            <h2>Selected Vendors</h2>
            <p className={styles.subtitle}>Choose vendors from different categories</p>

            <div className={styles.categoryGrid}>
              {categories.map(cat => {
                const hasVendor = selectedVendors.some(v => v.category === cat.id);
                return (
                  <div key={cat.id} className={`${styles.categoryCard} ${hasVendor ? styles.filled : ''}`}>
                    <div className={styles.categoryIcon}>{cat.icon}</div>
                    <h3>{cat.name}</h3>
                    {hasVendor ? (
                      <span className={styles.checkmark}>✓ Selected</span>
                    ) : (
                      <span className={styles.empty}>Not selected</span>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedVendors.length > 0 && (
              <div className={styles.selectedList}>
                <h3>Your Selection ({selectedVendors.length})</h3>
                {selectedVendors.map(vendor => (
                  <div key={vendor._id} className={styles.vendorItem}>
                    <div>
                      <h4>{vendor.businessName}</h4>
                      <p>{vendor.category}</p>
                    </div>
                    <div className={styles.vendorActions}>
                      <span>₹{vendor.pricing?.premium?.toLocaleString('en-IN')}</span>
                      <button onClick={() => removeVendor(vendor._id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.actions}>
              <button onClick={() => navigate('/vendors')} className={styles.btnSecondary}>
                Browse More Vendors
              </button>
              <button 
                onClick={() => setStep(2)} 
                className={styles.btnPrimary}
                disabled={selectedVendors.length === 0}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.content}>
            <h2>Event Details</h2>
            <p className={styles.subtitle}>Tell us about your event</p>

            <div className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Event Type</label>
                  <select
                    value={eventDetails.eventType}
                    onChange={(e) => setEventDetails({...eventDetails, eventType: e.target.value})}
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="birthday">Birthday</option>
                    <option value="conference">Conference</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Event Date</label>
                  <input
                    type="date"
                    value={eventDetails.date}
                    onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Number of Guests</label>
                  <input
                    type="number"
                    value={eventDetails.guestCount}
                    onChange={(e) => setEventDetails({...eventDetails, guestCount: e.target.value})}
                    placeholder="e.g., 150"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Total Budget (₹)</label>
                  <input
                    type="number"
                    value={eventDetails.budget}
                    onChange={(e) => setEventDetails({...eventDetails, budget: e.target.value})}
                    placeholder="e.g., 15000"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  value={eventDetails.location}
                  onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})}
                  placeholder="e.g., Mumbai, Maharashtra"
                  required
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={() => setStep(1)} className={styles.btnSecondary}>
                Back
              </button>
              <button onClick={generateQuote} className={styles.btnPrimary} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Quote'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && quote && (
          <div className={styles.content}>
            <h2>Your Event Quote</h2>
            <p className={styles.subtitle}>AI-generated cost breakdown</p>

            <div className={styles.quoteCard}>
              <div className={styles.quoteSection}>
                <h3>Cost Breakdown</h3>
                <div className={styles.quoteItem}>
                  <span>Vendor Services</span>
                  <span>₹{quote.vendorCosts.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.quoteItem}>
                  <span>Per Guest Cost</span>
                  <span>₹{parseFloat(quote.perGuestCost).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.quoteItem}>
                  <span>Tax (10%)</span>
                  <span>₹{quote.tax?.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.quoteItem}>
                  <span>Service Fee (5%)</span>
                  <span>₹{quote.serviceFee?.toLocaleString('en-IN')}</span>
                </div>
                <div className={`${styles.quoteItem} ${styles.total}`}>
                  <span>Total</span>
                  <span>₹{quote.total?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className={styles.quoteSection}>
                <h3>AI Recommendations</h3>
                <div className={styles.analysis}>
                  <span className={styles.badge}>
                    {quote.recommendations.budgetAnalysis}
                  </span>
                </div>
                <ul className={styles.suggestions}>
                  {quote.recommendations.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.quoteSection}>
                <h3>Planning Timeline</h3>
                <div className={styles.timeline}>
                  {quote.recommendations.timeline.map((item, i) => (
                    <div key={i} className={styles.timelineItem}>
                      <span>{item.task}</span>
                      <span>{item.weeks} weeks before</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={() => setStep(2)} className={styles.btnSecondary}>
                Edit Details
              </button>
              <button onClick={() => setStep(4)} className={styles.btnPrimary}>
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.content}>
            <h2>Secure Payment</h2>
            <p className={styles.subtitle}>Complete your booking</p>

            <div className={styles.paymentCard}>
              <div className={styles.paymentSummary}>
                <h3>Payment Summary</h3>
                <div className={styles.summaryItem}>
                  <span>Total Amount</span>
                  <span className={styles.amount}>₹{quote?.total?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className={styles.paymentMethods}>
                <h3>Payment Method</h3>
                <div className={styles.methodGrid}>
                  <div className={styles.methodCard}>
                    <span>💳</span>
                    <p>Credit Card</p>
                  </div>
                  <div className={styles.methodCard}>
                    <span>🏦</span>
                    <p>Bank Transfer</p>
                  </div>
                  <div className={styles.methodCard}>
                    <span>💰</span>
                    <p>Crypto</p>
                  </div>
                </div>
              </div>

              <button onClick={handlePayment} className={styles.btnPayment}>
                Pay ₹{quote?.total?.toLocaleString('en-IN')} Securely
              </button>

              <p className={styles.secure}>
                🔒 Secured by Stripe • Your payment information is encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPlanner;
