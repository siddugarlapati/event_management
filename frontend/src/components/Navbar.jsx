import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Settings, Award, ChevronDown, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getCartCount();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 20);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  // Define navigation links based on user role
  const getNavigationLinks = () => {
    if (!user) {
      // Public/Guest Navigation
      return [
        { to: '/', label: 'Home' },
        { to: '/vendor-search', label: 'Services' },
        { to: '/demo', label: 'Portfolio' },
        { to: '/contact', label: 'Contact' },
      ];
    }

    // Role-based navigation
    switch (user.role) {
      case 'user':
      case 'organizer':
        // User/Organizer Navigation
        return [
          { to: '/dashboard/user', label: 'Dashboard' },
          { to: '/smart-planner', label: '🤖 Smart Planner' },
          { to: '/quotes', label: 'AI Planner' },
          { to: '/vendor-search', label: 'Find Vendors' },
          { to: '/event-planner', label: 'Quotes' },
          { to: '/messages', label: 'Messages' },
          { to: '/event/create', label: 'Create Event' },
        ];

      case 'vendor':
        // Vendor Navigation
        return [
          { to: '/dashboard/vendor', label: 'Dashboard' },
          { to: '/event-planner', label: 'Quote Requests' },
          { to: '/messages', label: 'Messages' },
          { to: '/profile', label: 'My Profile' },
          { to: '/rewards', label: 'Rewards' },
        ];

      case 'manager':
        // Manager Navigation
        return [
          { to: '/dashboard/manager', label: 'Dashboard' },
          { to: '/vendor-search', label: 'Vendors' },
          { to: '/event-planner', label: 'Quotes' },
          { to: '/messages', label: 'Messages' },
          { to: '/quotes', label: 'Planner' },
        ];

      case 'admin':
        // Admin Navigation
        return [
          { to: '/dashboard/manager', label: 'Admin Panel' },
          { to: '/vendor-search', label: 'Manage Vendors' },
          { to: '/event-planner', label: 'All Quotes' },
          { to: '/messages', label: 'Messages' },
        ];

      default:
        return [
          { to: '/', label: 'Home' },
          { to: '/vendor-search', label: 'Services' },
        ];
    }
  };

  const navigationLinks = getNavigationLinks();

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Sparkles size={24} />
          </div>
          <span className={styles.logoText}>ArtCulture</span>
        </Link>
        
        {/* Main Navigation */}
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
          {navigationLinks.map((link) => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                className={`${styles.navLink} ${location.pathname === link.to ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className={styles.navRight}>
          {user ? (
            <>
              {/* Cart Button */}
              <Link to="/cart" className={styles.cartButton} title="View Cart">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className={styles.cartBadge}>{cartCount}</span>
                )}
              </Link>

              {/* User Menu */}
              <div className={styles.userMenu}>
                <button 
                  className={styles.userButton}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className={styles.userAvatar}>
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <span className={styles.userName}>{user.name || user.email}</span>
                  <ChevronDown size={16} className={styles.dropdownIcon} />
                </button>

                {/* Dropdown Menu */}
                <div className={`${styles.dropdown} ${isUserMenuOpen ? styles.open : ''}`}>
                  <Link 
                    to="/profile" 
                    className={styles.dropdownItem}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <Link 
                    to="/rewards" 
                    className={styles.dropdownItem}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Award size={18} />
                    Rewards
                  </Link>
                  <Link 
                    to="/profile" 
                    className={styles.dropdownItem}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                  <div className={styles.dropdownDivider}></div>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginButton}>Login</Link>
              <Link to="/register" className={styles.registerButton}>Get Started</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;