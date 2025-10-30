import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { 
      name: "Weddings", 
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80", 
      description: "Expertly crafted weddings experiences" 
    },
    { 
      name: "Corporate", 
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80", 
      description: "Expertly crafted corporate experiences" 
    },
    { 
      name: "Concerts", 
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80", 
      description: "Expertly crafted concerts experiences" 
    },
    { 
      name: "House Warmings", 
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80", 
      description: "Expertly crafted house warmings experiences" 
    },
  ];

  return (
    <div className={styles.home}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.floating3D}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.shape3}></div>
        </div>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Your Perfect Event Brought to Life
            </h1>
            <p className={styles.heroSubtitle}>
              From intimate gatherings to grand celebrations, ArtCulture creates unforgettable moments for weddings, concerts, and more.
            </p>

            {/* Rating */}
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#14b8a6" color="#14b8a6" />
                ))}
              </div>
              <p className={styles.ratingText}>Trusted by 1000+ clients</p>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/register')}
              >
                Start Planning
                <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => navigate('/vendor-search')}
              >
                Explore Services
              </button>
            </div>
          </div>
          
          {/* Hero Image Side */}
          <div className={styles.heroImageSide}>
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" 
              alt="Beautiful wedding celebration"
              className={styles.heroMainImage}
            />
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionSubtitle}>
              Explore our bespoke event planning services, tailored to create moments you'll cherish forever.
            </p>
          </div>

          {/* Services Grid */}
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div
                key={service.name}
                className={styles.serviceCard}
                onClick={() => navigate('/vendor-search')}
              >
                <div className={styles.serviceImage}>
                  <img src={service.image} alt={service.name} />
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sectionCta}>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/vendor-search')}
            >
              View All Services
              <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className={styles.portfolioSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Past Events</h2>
            <p className={styles.sectionSubtitle}>
              Discover the magic we've created for our clients
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className={styles.portfolioGrid}>
            {[
              { id: 1, img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", title: "Elegant Wedding" },
              { id: 2, img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", title: "Corporate Gala" },
              { id: 3, img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80", title: "Music Concert" }
            ].map((event) => (
              <div
                key={event.id}
                className={styles.portfolioCard}
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${event.img})` }}
              >
                <p className={styles.portfolioTitle}>{event.title}</p>
              </div>
            ))}
          </div>

          <div className={styles.sectionCta}>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              View Full Portfolio
              <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaSectionContainer}>
          <h2 className={styles.ctaSectionTitle}>
            Ready to Plan Your Dream Event?
          </h2>
          <p className={styles.ctaSectionSubtitle}>
            Get in touch with our team to discuss your vision and create an unforgettable experience.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/register')}
          >
            Contact Us Today
            <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* Brand */}
            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>ArtCulture Events</h3>
              <p className={styles.footerText}>
                Creating unforgettable moments for your most cherished events.
              </p>
            </div>

            {/* Quick Links */}
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li><a href="/" className={styles.footerLink}>Home</a></li>
                <li><a href="/vendor-search" className={styles.footerLink}>Services</a></li>
                <li><a href="/dashboard" className={styles.footerLink}>Events</a></li>
                <li><a href="/contact" className={styles.footerLink}>Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Contact</h4>
              <ul className={styles.footerContacts}>
                <li className={styles.footerContact}>
                  <Mail size={16} color="#14b8a6" />
                  <a href="mailto:contact@artculture.in" className={styles.footerLink}>
                    contact@artculture.in
                  </a>
                </li>
                <li className={styles.footerContact}>
                  <Phone size={16} color="#14b8a6" />
                  <a href="tel:+919876543210" className={styles.footerLink}>
                    +91 98765 43210
                  </a>
                </li>
                <li className={styles.footerContact}>
                  <MapPin size={16} color="#14b8a6" />
                  <span className={styles.footerText}>MG Road, Bangalore, Karnataka 560001</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Follow Us</h4>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Instagram">📷</a>
                <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">💼</a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>© 2025 ArtCulture Events. All Rights Reserved.</p>
            <div className={styles.footerBottomLinks}>
              <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
              <a href="/terms" className={styles.footerLink}>Terms of Service</a>
              <a href="/contact" className={styles.footerLink}>Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
