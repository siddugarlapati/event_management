import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Sparkles, TrendingDown, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { dummyVendors } from '../utils/dummyData';
import styles from './SmartEventPlanner.module.css';

const SmartEventPlanner = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    eventName: '',
    eventType: 'wedding',
    budget: '',
    guestCount: '',
    date: '',
    location: ''
  });
  const [aiRecommendations, setAiRecommendations] = useState(null);

  const eventTypes = [
    { value: 'wedding', label: '💍 Wedding', icon: '💍' },
    { value: 'corporate', label: '🏢 Corporate Event', icon: '🏢' },
    { value: 'birthday', label: '🎂 Birthday Party', icon: '🎂' },
    { value: 'anniversary', label: '💑 Anniversary', icon: '💑' },
    { value: 'engagement', label: '💐 Engagement', icon: '💐' }
  ];

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const getSmartRecommendations = async () => {
    setLoading(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const budget = parseFloat(eventData.budget);
      const guests = parseInt(eventData.guestCount);
      
      // Calculate per-person budget
      const perPersonBudget = budget / guests;
      
      // Filter vendors by category and budget
      const categories = ['catering', 'venue', 'photography', 'decoration', 'entertainment'];
      const recommendations = [];
      let totalCost = 0;
      let canAfford = true;
      
      // Budget allocation percentages
      const allocation = {
        venue: 0.25,
        catering: 0.30,
        photography: 0.15,
        decoration: 0.15,
        entertainment: 0.15
      };

      for (const category of categories) {
        const categoryBudget = budget * allocation[category];
        const categoryVendors = dummyVendors.filter(v => v.category === category);
        
        // Find best vendor within budget
        const affordableVendors = categoryVendors.filter(v => v.pricing.basic <= categoryBudget);
        
        if (affordableVendors.length > 0) {
          // Sort by rating and price
          const bestVendor = affordableVendors.sort((a, b) => {
            const scoreA = (a.rating * 0.6) - ((a.pricing.basic / categoryBudget) * 0.4);
            const scoreB = (b.rating * 0.6) - ((b.pricing.basic / categoryBudget) * 0.4);
            return scoreB - scoreA;
          })[0];
          
          const cost = bestVendor.pricing.basic;
          totalCost += cost;
          
          recommendations.push({
            category,
            vendor: bestVendor,
            allocatedBudget: categoryBudget,
            actualCost: cost,
            savings: categoryBudget - cost,
            reason: generateReason(bestVendor, categoryBudget, category)
          });
        } else {
          canAfford = false;
          const minPrice = Math.min(...categoryVendors.map(v => v.pricing.basic));
          recommendations.push({
            category,
            vendor: null,
            allocatedBudget: categoryBudget,
            minPrice,
            shortfall: minPrice - categoryBudget,
            reason: `Budget insufficient. Minimum ${category} cost is ₹${minPrice.toLocaleString('en-IN')}`
          });
        }
      }

      const totalSavings = budget - totalCost;
      
      setAiRecommendations({
        canAfford,
        recommendations,
        totalBudget: budget,
        totalCost,
        totalSavings,
        savingsPercentage: ((totalSavings / budget) * 100).toFixed(1),
        perPersonCost: (totalCost / guests).toFixed(0),
        eventData
      });
      
      setStep(3);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReason = (vendor, budget, category) => {
    const reasons = [];
    
    if (vendor.rating >= 4.5) {
      reasons.push(`⭐ Excellent rating (${vendor.rating}/5)`);
    } else if (vendor.rating >= 4.0) {
      reasons.push(`⭐ High rating (${vendor.rating}/5)`);
    }
    
    const savings = budget - vendor.pricing.basic;
    if (savings > budget * 0.2) {
      reasons.push(`💰 Great value - saves ₹${savings.toLocaleString('en-IN')}`);
    }
    
    if (vendor.services.length >= 5) {
      reasons.push(`✨ Comprehensive services (${vendor.services.length} offerings)`);
    }
    
    if (vendor.pricing.basic < budget * 0.8) {
      reasons.push(`💵 Well within budget`);
    }
    
    reasons.push(`📍 Available in ${vendor.address.split(',')[0]}`);
    
    return reasons.join(' • ');
  };

  const sendQuotesToVendors = async () => {
    setLoading(true);
    
    try {
      // Simulate sending quotes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, this would call backend API
      const quoteRequests = aiRecommendations.recommendations
        .filter(r => r.vendor)
        .map(r => ({
          vendorId: r.vendor._id,
          vendorName: r.vendor.businessName,
          category: r.category,
          eventName: eventData.eventName,
          eventType: eventData.eventType,
          eventDate: eventData.date,
          guestCount: eventData.guestCount,
          budget: r.allocatedBudget,
          message: `Hi ${r.vendor.businessName},\n\nI'm planning a ${eventData.eventType} event "${eventData.eventName}" on ${eventData.date} for ${eventData.guestCount} guests.\n\nBased on your excellent rating and services, you've been selected by our AI system as the best match for ${r.category}.\n\nAllocated Budget: ₹${r.allocatedBudget.toLocaleString('en-IN')}\n\nPlease provide a detailed quote for your services.\n\nLooking forward to working with you!`
        }));
      
      alert(`✅ Quote requests sent to ${quoteRequests.length} vendors!\n\nVendors will respond within 24-48 hours. Check your Messages page for updates.`);
      
      navigate('/quotes');
    } catch (error) {
      console.error('Error sending quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
        <Sparkles className={styles.headerIcon} />
        <h1>🤖 AI Smart Event Planner</h1>
        <p>Let AI find the best vendors within your budget with detailed reasoning</p>
      </div>

      {/* Progress Steps */}
      <div className={styles.progressBar}>
        <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>1</div>
          <span>Event Details</span>
        </div>
        <div className={`${styles.progressLine} ${step >= 2 ? styles.active : ''}`}></div>
        <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>2</div>
          <span>AI Analysis</span>
        </div>
        <div className={`${styles.progressLine} ${step >= 3 ? styles.active : ''}`}></div>
        <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>3</div>
          <span>Recommendations</span>
        </div>
      </div>

      {/* Step 1: Event Details */}
      {step === 1 && (
        <div className={styles.formContainer}>
          <div className={styles.formCard}>
            <h2>Tell us about your event</h2>
            
            <div className={styles.formGroup}>
              <label>Event Name *</label>
              <input
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleInputChange}
                placeholder="e.g., Sarah & John's Wedding"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Event Type *</label>
              <div className={styles.eventTypeGrid}>
                {eventTypes.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    className={`${styles.eventTypeBtn} ${eventData.eventType === type.value ? styles.selected : ''}`}
                    onClick={() => setEventData({ ...eventData, eventType: type.value })}
                  >
                    <span className={styles.eventIcon}>{type.icon}</span>
                    <span>{type.label.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label><DollarSign size={16} /> Total Budget (₹) *</label>
                <input
                  type="number"
                  name="budget"
                  value={eventData.budget}
                  onChange={handleInputChange}
                  placeholder="500000"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label><Users size={16} /> Guest Count *</label>
                <input
                  type="number"
                  name="guestCount"
                  value={eventData.guestCount}
                  onChange={handleInputChange}
                  placeholder="100"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label><Calendar size={16} /> Event Date *</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                />
              </div>
            </div>

            <button
              className={styles.primaryBtn}
              onClick={() => setStep(2)}
              disabled={!eventData.eventName || !eventData.budget || !eventData.guestCount || !eventData.date}
            >
              Continue to AI Analysis
              <Sparkles size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: AI Analysis */}
      {step === 2 && (
        <div className={styles.analysisContainer}>
          <div className={styles.analysisCard}>
            <h2>🤖 AI is analyzing your requirements...</h2>
            <p>Finding the best vendors within your budget</p>
            
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Event</span>
                <span className={styles.value}>{eventData.eventName}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Type</span>
                <span className={styles.value}>{eventData.eventType}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Budget</span>
                <span className={styles.value}>₹{parseFloat(eventData.budget).toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Guests</span>
                <span className={styles.value}>{eventData.guestCount}</span>
              </div>
            </div>

            <div className={styles.btnGroup}>
              <button className={styles.secondaryBtn} onClick={() => setStep(1)}>
                Back
              </button>
              <button
                className={styles.primaryBtn}
                onClick={getSmartRecommendations}
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Get AI Recommendations'}
                <Sparkles size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Recommendations */}
      {step === 3 && aiRecommendations && (
        <div className={styles.recommendationsContainer}>
          {/* Summary Card */}
          <div className={`${styles.summaryCard} ${aiRecommendations.canAfford ? styles.success : styles.warning}`}>
            {aiRecommendations.canAfford ? (
              <>
                <CheckCircle size={48} className={styles.statusIcon} />
                <h2>✅ Perfect Match Found!</h2>
                <p>AI has selected the best vendors within your budget</p>
              </>
            ) : (
              <>
                <AlertCircle size={48} className={styles.statusIcon} />
                <h2>⚠️ Budget Adjustment Needed</h2>
                <p>Some categories require higher budget</p>
              </>
            )}
            
            <div className={styles.costSummary}>
              <div className={styles.costItem}>
                <span>💰 Total Budget</span>
                <span className={styles.amount}>₹{aiRecommendations.totalBudget.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.costItem}>
                <span>📊 Estimated Cost</span>
                <span className={styles.amount}>₹{aiRecommendations.totalCost.toLocaleString('en-IN')}</span>
              </div>
              {aiRecommendations.canAfford && (
                <>
                  <div className={`${styles.costItem} ${styles.savings}`}>
                    <span><TrendingDown size={18} /> Your Savings</span>
                    <span className={styles.amount}>₹{aiRecommendations.totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                  <div className={styles.savingsPercent}>
                    🎉 Amazing! You're saving {aiRecommendations.savingsPercentage}% of your budget!
                  </div>
                </>
              )}
              <div className={styles.costItem}>
                <span>👥 Cost per Guest</span>
                <span className={styles.amount}>₹{aiRecommendations.perPersonCost}</span>
              </div>
            </div>
          </div>

          {/* Vendor Recommendations */}
          <div className={styles.vendorsList}>
            <h2>📋 AI-Selected Vendors</h2>
            
            {aiRecommendations.recommendations.map((rec, index) => (
              <div key={index} className={`${styles.vendorCard} ${!rec.vendor ? styles.unavailable : ''}`}>
                <div className={styles.vendorHeader}>
                  <div className={styles.categoryBadge}>
                    {rec.category.toUpperCase()}
                  </div>
                  {rec.vendor && (
                    <div className={styles.rating}>
                      ⭐ {rec.vendor.rating}/5
                    </div>
                  )}
                </div>

                {rec.vendor ? (
                  <>
                    <h3>{rec.vendor.businessName}</h3>
                    <p className={styles.vendorLocation}>📍 {rec.vendor.address}</p>
                    
                    <div className={styles.reasonBox}>
                      <strong><Sparkles size={18} /> Why AI Selected This Vendor:</strong>
                      <p>{rec.reason}</p>
                    </div>

                    <div className={styles.costBreakdown}>
                      <div className={styles.costRow}>
                        <span>💵 Allocated Budget:</span>
                        <span className={styles.budgetAmount}>₹{rec.allocatedBudget.toLocaleString('en-IN')}</span>
                      </div>
                      <div className={styles.costRow}>
                        <span>💳 Actual Cost:</span>
                        <span className={styles.costAmount}>₹{rec.actualCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className={`${styles.costRow} ${styles.savings}`}>
                        <span>💰 You Save:</span>
                        <span className={styles.savingsAmount}>₹{rec.savings.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className={styles.services}>
                      <strong>Services:</strong>
                      <div className={styles.serviceTags}>
                        {rec.vendor.services.slice(0, 3).map((service, i) => (
                          <span key={i} className={styles.serviceTag}>{service}</span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>❌ No vendor available within budget</h3>
                    <div className={styles.errorBox}>
                      <p>{rec.reason}</p>
                      <div className={styles.shortfall}>
                        <span>Budget Shortfall:</span>
                        <span className={styles.amount}>₹{rec.shortfall.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.secondaryBtn} onClick={() => setStep(1)}>
              Start Over
            </button>
            
            {aiRecommendations.canAfford && (
              <button
                className={styles.primaryBtn}
                onClick={sendQuotesToVendors}
                disabled={loading}
              >
                <MessageSquare size={20} />
                {loading ? 'Sending...' : 'Send Quote Requests to All Vendors'}
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default SmartEventPlanner;
