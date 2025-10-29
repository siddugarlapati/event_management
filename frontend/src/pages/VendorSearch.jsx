import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { dummyVendors } from '../utils/dummyData';
import styles from './VendorSearch.module.css';

const VendorSearch = () => {
  const [vendors, setVendors] = useState(dummyVendors);
  const [filters, setFilters] = useState({
    category: '',
    minRating: '',
    useLocation: false
  });
  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      let params = {};
      
      if (filters.category) params.category = filters.category;
      if (filters.minRating) params.minRating = filters.minRating;
      
      if (filters.useLocation && navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        params.lat = position.coords.latitude;
        params.lng = position.coords.longitude;
        params.maxDistance = 50000; // 50km
      }

      const res = await axios.get('http://localhost:5000/api/vendors', { params });
      setVendors(res.data.length > 0 ? res.data : dummyVendors);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setVendors(dummyVendors);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    fetchVendors();
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Find Vendors</h1>
          <p>Discover top-rated vendors near you</p>
        </div>

        {/* Quick Category Filter */}
        <div className={styles.quickCategories}>
          {[
            { value: '', label: 'All', icon: '🎯' },
            { value: 'catering', label: 'Catering', icon: '🍽️' },
            { value: 'venue', label: 'Venues', icon: '🏛️' },
            { value: 'decoration', label: 'Decoration', icon: '🎨' },
            { value: 'photography', label: 'Photography', icon: '📸' },
            { value: 'entertainment', label: 'Entertainment', icon: '🎭' },
            { value: 'music', label: 'Music', icon: '🎵' },
            { value: 'makeup', label: 'Makeup', icon: '💄' },
            { value: 'florist', label: 'Florist', icon: '🌸' }
          ].map(cat => (
            <button
              key={cat.value}
              className={`${styles.categoryBtn} ${filters.category === cat.value ? styles.active : ''}`}
              onClick={() => {
                handleFilterChange('category', cat.value);
                setTimeout(applyFilters, 100);
              }}
            >
              <span className={styles.catIcon}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.filterBar}>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={styles.select}
          >
            <option value="">All Categories</option>
            <option value="catering">🍽️ Catering</option>
            <option value="venue">🏛️ Venue</option>
            <option value="decoration">🎨 Decoration</option>
            <option value="photography">📸 Photography</option>
            <option value="videography">🎥 Videography</option>
            <option value="entertainment">🎭 Entertainment</option>
            <option value="music">🎵 Music & DJ</option>
            <option value="makeup">💄 Makeup & Beauty</option>
            <option value="mehendi">🎨 Mehendi Artists</option>
            <option value="florist">🌸 Florist</option>
            <option value="transportation">🚗 Transportation</option>
            <option value="invitation">💌 Invitation Cards</option>
            <option value="choreography">💃 Choreography</option>
            <option value="planning">📋 Event Planning</option>
          </select>

          <select
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', e.target.value)}
            className={styles.select}
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={filters.useLocation}
              onChange={(e) => handleFilterChange('useLocation', e.target.checked)}
            />
            <span>Near Me</span>
          </label>

          <button onClick={applyFilters} className={styles.btnSearch}>
            Search
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading vendors...</div>
        ) : (
          <div className={styles.grid}>
            {vendors.map(vendor => (
              <div
                key={vendor._id}
                className={styles.vendorCard}
                onClick={() => setSelectedVendor(vendor)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.category}>{vendor.category}</div>
                  <div className={styles.rating}>
                    ⭐ {vendor.rating.toFixed(1)}
                  </div>
                </div>
                
                <h3>{vendor.businessName}</h3>
                
                <div className={styles.services}>
                  {vendor.services.slice(0, 3).map((service, idx) => (
                    <span key={idx} className={styles.serviceTag}>
                      {service}
                    </span>
                  ))}
                </div>

                {vendor.address && (
                  <p className={styles.address}>📍 {vendor.address}</p>
                )}

                <div className={styles.pricing}>
                  <div className={styles.priceItem}>
                    <span>Basic</span>
                    <strong>₹{vendor.pricing?.basic?.toLocaleString('en-IN') || 'N/A'}</strong>
                  </div>
                  <div className={styles.priceItem}>
                    <span>Premium</span>
                    <strong>₹{vendor.pricing?.premium?.toLocaleString('en-IN') || 'N/A'}</strong>
                  </div>
                </div>

                <Link to={`/vendor/${vendor._id}`} className={styles.btnContact}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {selectedVendor && (
          <div className={styles.modal} onClick={() => setSelectedVendor(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setSelectedVendor(null)}>
                ×
              </button>
              
              <h2>{selectedVendor.businessName}</h2>
              <div className={styles.modalRating}>
                ⭐ {selectedVendor.rating.toFixed(1)} ({selectedVendor.reviews.length} reviews)
              </div>

              <div className={styles.modalSection}>
                <h3>Services Offered</h3>
                <div className={styles.servicesList}>
                  {selectedVendor.services.map((service, idx) => (
                    <span key={idx} className={styles.serviceTag}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.modalSection}>
                <h3>Pricing</h3>
                <div className={styles.pricingTable}>
                  <div className={styles.priceRow}>
                    <span>Basic Package</span>
                    <strong>₹{selectedVendor.pricing?.basic?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className={styles.priceRow}>
                    <span>Premium Package</span>
                    <strong>₹{selectedVendor.pricing?.premium?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className={styles.priceRow}>
                    <span>Luxury Package</span>
                    <strong>₹{selectedVendor.pricing?.luxury?.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {selectedVendor.reviews.length > 0 && (
                <div className={styles.modalSection}>
                  <h3>Reviews</h3>
                  {selectedVendor.reviews.map((review, idx) => (
                    <div key={idx} className={styles.review}>
                      <div className={styles.reviewHeader}>
                        <span>⭐ {review.rating}</span>
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              <button className={styles.btnBook}>Book Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorSearch;
