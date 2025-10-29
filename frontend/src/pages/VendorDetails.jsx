import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import axios from 'axios';
import { dummyVendors } from '../utils/dummyData';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import styles from './VendorDetails.module.css';

const VendorDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [vendor, setVendor] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetchVendor();
  }, [vendorId]);

  const fetchVendor = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/vendors/${vendorId}`);
      setVendor(res.data);
    } catch (error) {
      const dummyVendor = dummyVendors.find(v => v._id === vendorId);
      setVendor(dummyVendor || dummyVendors[0]);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user', time: new Date() }]);
      setMessage('');
      
      // Simulate vendor response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: 'Thank you for your message! We\'ll get back to you shortly.',
          sender: 'vendor',
          time: new Date()
        }]);
      }, 1000);
    }
  };

  const handleAddToCart = (packageType) => {
    addToCart(vendor, packageType);
    setSelectedPackage(packageType);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPackage(null);
    }, 3000);
  };

  const handleBookNow = (packageType) => {
    handleAddToCart(packageType);
    // Navigate to quotes page after a short delay
    setTimeout(() => {
      navigate('/quotes');
    }, 1500);
  };

  if (!vendor) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.hero}>
        <img 
          src={`https://images.unsplash.com/photo-${
            vendor.category === 'catering' ? '1555244162-803834f70033' :
            vendor.category === 'venue' ? '1519167758481-83f29da8c2b0' :
            vendor.category === 'decoration' ? '1478146896981-b80fe463b330' :
            vendor.category === 'photography' ? '1542038784456-1ea8e1e3b9d8' :
            '1514525253161-7a46d19cd819'
          }?w=1920`}
          alt={vendor.businessName}
        />
        <div className={styles.heroOverlay}>
          <span className={styles.category}>{vendor.category}</span>
          <h1>{vendor.businessName}</h1>
          <div className={styles.rating}>
            <span>⭐ {vendor.rating}</span>
            <span>({vendor.reviews?.length || 0} reviews)</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.main}>
            <section className={styles.section}>
              <h2>About</h2>
              <p>Professional {vendor.category} services with years of experience. We specialize in creating unforgettable moments for your special events.</p>
            </section>

            <section className={styles.section}>
              <h2>Services Offered</h2>
              <div className={styles.services}>
                {vendor.services?.map((service, idx) => (
                  <div key={idx} className={styles.serviceTag}>
                    {service}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Pricing Packages</h2>
              <div className={styles.packages}>
                <div className={styles.package}>
                  <h3>Basic</h3>
                  <div className={styles.price}>₹{vendor.pricing?.basic?.toLocaleString('en-IN')}</div>
                  <p>Essential services for your event</p>
                  <div className={styles.packageActions}>
                    <button 
                      onClick={() => handleAddToCart('basic')} 
                      className={styles.btnAddToCart}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBookNow('basic')} 
                      className={styles.btnBookNow}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
                <div className={`${styles.package} ${styles.featured}`}>
                  <span className={styles.popular}>Most Popular</span>
                  <h3>Premium</h3>
                  <div className={styles.price}>₹{vendor.pricing?.premium?.toLocaleString('en-IN')}</div>
                  <p>Enhanced services with extras</p>
                  <div className={styles.packageActions}>
                    <button 
                      onClick={() => handleAddToCart('premium')} 
                      className={styles.btnAddToCart}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBookNow('premium')} 
                      className={styles.btnBookNow}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
                <div className={styles.package}>
                  <h3>Luxury</h3>
                  <div className={styles.price}>₹{vendor.pricing?.luxury?.toLocaleString('en-IN')}</div>
                  <p>Complete premium experience</p>
                  <div className={styles.packageActions}>
                    <button 
                      onClick={() => handleAddToCart('luxury')} 
                      className={styles.btnAddToCart}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBookNow('luxury')} 
                      className={styles.btnBookNow}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Reviews</h2>
              <div className={styles.reviews}>
                {vendor.reviews?.map((review, idx) => (
                  <div key={idx} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewRating}>⭐ {review.rating}</span>
                      <span className={styles.reviewDate}>
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.stickyCard}>
              <div className={styles.location}>
                <h3>Location</h3>
                <p>📍 {vendor.address}</p>
              </div>

              <div className={styles.actions}>
                <button onClick={() => navigate('/quotes')} className={styles.btnPrimary}>
                  <ShoppingCart size={20} />
                  View Cart
                </button>
                <button onClick={() => setShowChat(true)} className={styles.btnChat}>
                  💬 Chat with Vendor
                </button>
                <button onClick={() => navigate('/event-planner')} className={styles.btnSecondary}>
                  Plan with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successIcon}>
              <Check size={60} />
            </div>
            <h2>Added to Cart!</h2>
            <p>{vendor.businessName} - {selectedPackage} package</p>
            <div className={styles.successActions}>
              <button onClick={() => navigate('/quotes')} className={styles.btnViewCart}>
                View Cart
              </button>
              <button onClick={() => setShowSuccess(false)} className={styles.btnContinue}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && (
        <div className={styles.chatModal}>
          <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
              <h3>Chat with {vendor.businessName}</h3>
              <button onClick={() => setShowChat(false)}>×</button>
            </div>
            
            <div className={styles.chatMessages}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.chatMessage} ${styles[msg.sender]}`}>
                  <p>{msg.text}</p>
                  <span className={styles.chatTime}>
                    {msg.time.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetails;
