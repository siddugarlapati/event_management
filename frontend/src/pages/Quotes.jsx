import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import styles from './Quotes.module.css';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/quotes/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptQuote = async (quoteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/quotes/${quoteId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Quote accepted successfully!');
      fetchQuotes();
    } catch (error) {
      alert('Error accepting quote');
    }
  };

  const handleRejectQuote = async (quoteId) => {
    const reason = prompt('Please provide a reason for rejection (optional):');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/quotes/${quoteId}/reject`, 
        { reason },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      alert('Quote rejected');
      fetchQuotes();
    } catch (error) {
      alert('Error rejecting quote');
    }
  };

  const handleCompareQuotes = async () => {
    if (selectedQuotes.length < 2) {
      alert('Please select at least 2 quotes to compare');
      return;
    }
    navigate('/quotes/compare', { state: { quoteIds: selectedQuotes } });
  };

  const toggleQuoteSelection = (quoteId) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const filteredQuotes = quotes.filter(quote => {
    if (filter === 'all') return true;
    return quote.status === filter;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      sent: '#3b82f6',
      accepted: '#10b981',
      rejected: '#ef4444',
      expired: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.loading}>Loading quotes...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>My Quotes</h1>
          <div className={styles.actions}>
            {selectedQuotes.length > 0 && (
              <button onClick={handleCompareQuotes} className={styles.compareBtn}>
                Compare Selected ({selectedQuotes.length})
              </button>
            )}
          </div>
        </div>

        <div className={styles.filters}>
          <button 
            className={filter === 'all' ? styles.active : ''}
            onClick={() => setFilter('all')}
          >
            All ({quotes.length})
          </button>
          <button 
            className={filter === 'pending' ? styles.active : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({quotes.filter(q => q.status === 'pending').length})
          </button>
          <button 
            className={filter === 'sent' ? styles.active : ''}
            onClick={() => setFilter('sent')}
          >
            Received ({quotes.filter(q => q.status === 'sent').length})
          </button>
          <button 
            className={filter === 'accepted' ? styles.active : ''}
            onClick={() => setFilter('accepted')}
          >
            Accepted ({quotes.filter(q => q.status === 'accepted').length})
          </button>
        </div>

        {filteredQuotes.length === 0 ? (
          <div className={styles.empty}>
            <p>No quotes found</p>
            <button onClick={() => navigate('/vendors')} className={styles.browseBtn}>
              Browse Vendors
            </button>
          </div>
        ) : (
          <div className={styles.quotesList}>
            {filteredQuotes.map(quote => (
              <div key={quote._id} className={styles.quoteCard}>
                <div className={styles.quoteHeader}>
                  <div className={styles.vendorInfo}>
                    <input
                      type="checkbox"
                      checked={selectedQuotes.includes(quote._id)}
                      onChange={() => toggleQuoteSelection(quote._id)}
                      className={styles.checkbox}
                    />
                    <div>
                      <h3>{quote.vendorId?.businessName}</h3>
                      <p className={styles.category}>{quote.vendorId?.category}</p>
                      <div className={styles.rating}>
                        ⭐ {quote.vendorId?.rating?.toFixed(1) || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div 
                    className={styles.status}
                    style={{ backgroundColor: getStatusColor(quote.status) }}
                  >
                    {quote.status}
                  </div>
                </div>

                <div className={styles.quoteBody}>
                  <div className={styles.eventDetails}>
                    <h4>Event Details</h4>
                    <p><strong>Type:</strong> {quote.eventDetails?.eventType}</p>
                    <p><strong>Date:</strong> {new Date(quote.eventDetails?.eventDate).toLocaleDateString()}</p>
                    <p><strong>Guests:</strong> {quote.eventDetails?.guestCount}</p>
                    <p><strong>Location:</strong> {quote.eventDetails?.location}</p>
                  </div>

                  {quote.status === 'sent' && quote.quoteDetails && (
                    <div className={styles.quoteDetails}>
                      <h4>Quote Details</h4>
                      <div className={styles.priceBreakdown}>
                        <div className={styles.priceRow}>
                          <span>Base Price:</span>
                          <span>${quote.quoteDetails.basePrice?.toLocaleString()}</span>
                        </div>
                        {quote.quoteDetails.additionalCharges?.map((charge, idx) => (
                          <div key={idx} className={styles.priceRow}>
                            <span>{charge.item}:</span>
                            <span>${charge.amount?.toLocaleString()}</span>
                          </div>
                        ))}
                        {quote.quoteDetails.discount > 0 && (
                          <div className={styles.priceRow}>
                            <span>Discount ({quote.quoteDetails.discount}%):</span>
                            <span className={styles.discount}>
                              -${((quote.quoteDetails.basePrice * quote.quoteDetails.discount) / 100).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {quote.quoteDetails.tax > 0 && (
                          <div className={styles.priceRow}>
                            <span>Tax ({quote.quoteDetails.tax}%):</span>
                            <span>${((quote.quoteDetails.basePrice * quote.quoteDetails.tax) / 100).toLocaleString()}</span>
                          </div>
                        )}
                        <div className={`${styles.priceRow} ${styles.total}`}>
                          <span>Total Amount:</span>
                          <span>${quote.quoteDetails.totalAmount?.toLocaleString()}</span>
                        </div>
                      </div>
                      {quote.quoteDetails.notes && (
                        <div className={styles.notes}>
                          <strong>Notes:</strong>
                          <p>{quote.quoteDetails.notes}</p>
                        </div>
                      )}
                      <p className={styles.validUntil}>
                        Valid until: {new Date(quote.quoteDetails.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {quote.status === 'sent' && (
                  <div className={styles.quoteActions}>
                    <button 
                      onClick={() => handleAcceptQuote(quote._id)}
                      className={styles.acceptBtn}
                    >
                      Accept Quote
                    </button>
                    <button 
                      onClick={() => handleRejectQuote(quote._id)}
                      className={styles.rejectBtn}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {quote.status === 'pending' && (
                  <div className={styles.pendingMessage}>
                    Waiting for vendor to send quote...
                  </div>
                )}

                {quote.status === 'accepted' && (
                  <div className={styles.acceptedMessage}>
                    ✓ Quote accepted on {new Date(quote.acceptedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;