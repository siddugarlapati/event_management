import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define navigation links based on user role
  const getNavigationLinks = () => {
    if (!user) {
      // Public/Guest Navigation
      return [
        { to: '/', label: 'Home' },
        { to: '/vendors', label: 'Services' },
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
          { to: '/event-planner', label: 'AI Planner' },
          { to: '/vendors', label: 'Find Vendors' },
          { to: '/quotes', label: 'Quotes' },
          { to: '/messages', label: 'Messages' },
          { to: '/event/create', label: 'Create Event' },
        ];

      case 'vendor':
        // Vendor Navigation
        return [
          { to: '/dashboard/vendor', label: 'Dashboard' },
          { to: '/quotes', label: 'Quote Requests' },
          { to: '/messages', label: 'Messages' },
          { to: '/profile', label: 'My Profile' },
          { to: '/rewards', label: 'Rewards' },
        ];

      case 'manager':
        // Manager Navigation
        return [
          { to: '/dashboard/manager', label: 'Dashboard' },
          { to: '/vendors', label: 'Vendors' },
          { to: '/quotes', label: 'Quotes' },
          { to: '/messages', label: 'Messages' },
          { to: '/event-planner', label: 'Planner' },
        ];

      case 'admin':
        // Admin Navigation
        return [
          { to: '/dashboard/manager', label: 'Admin Panel' },
          { to: '/vendors', label: 'Manage Vendors' },
          { to: '/quotes', label: 'All Quotes' },
          { to: '/messages', label: 'Messages' },
        ];

      default:
        return [
          { to: '/', label: 'Home' },
          { to: '/vendors', label: 'Services' },
        ];
    }
  };

  const navigationLinks = getNavigationLinks();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎨</span>
          <span className={styles.logoText}>ArtCulture Events</span>
        </Link>
        
        {/* Main Navigation */}
        <div className={styles.navCenter}>
          <div className={styles.navLinks}>
            {navigationLinks.map((link) => (
              <Link key={link.to} to={link.to} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className={styles.navRight}>
          {user ? (
            <>
              {/* Cart Icon */}
              <Link to="/quotes" className={styles.cartIcon} title="View Cart">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className={styles.cartBadge}>{cartCount}</span>
                )}
              </Link>

              {/* User Menu */}
              <div className={styles.userMenu}>
                <div className={styles.userAvatar}>
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{user.name || user.email}</span>
                  <span className={styles.userRole}>{user.role}</span>
                </div>
              </div>

              {/* Logout Button */}
              <button onClick={handleLogout} className={styles.btnLogout} title="Logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.btnLogin}>Login</Link>
              <Link to="/register" className={styles.btnGetStarted}>Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className={styles.mobileToggle} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;