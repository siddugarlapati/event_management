import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Sparkles, Zap, Shield, Users, Award, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Weddings",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=90",
      description: "Create magical moments that last forever with our expert wedding planning",
      stats: "500+ Events",
      price: "From ₹5L"
    },
    {
      name: "Corporate Events",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=90",
      description: "Professional events that inspire success and build connections",
      stats: "300+ Companies",
      price: "From ₹2L"
    },
    {
      name: "Concerts & Shows",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop&q=90",
      description: "Unforgettable entertainment experiences for your audience",
      stats: "200+ Shows",
      price: "From ₹10L"
    },
    {
      name: "Private Parties",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&q=90",
      description: "Intimate celebrations with a personal touch and attention to detail",
      stats: "1000+ Parties",
      price: "From ₹50K"
    },
  ];

  const features = [
    {
      icon: <Sparkles size={32} />,
      title: "AI-Powered Planning",
      description: "Smart recommendations and automated vendor selection based on your preferences and budget"
    },
    {
      icon: <Zap size={32} />,
      title: "Instant Quotes",
      description: "Get real-time pricing from top vendors instantly without waiting"
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Payments",
      description: "Protected transactions with blockchain technology and escrow services"
    },
    {
      icon: <Users size={32} />,
      title: "Expert Support",
      description: "24/7 dedicated team to help you succeed with your event"
    }
  ];

  const stats = [
    { number: "2000+", label: "Events Completed", icon: <Calendar size={24} /> },
    { number: "500+", label: "Happy Clients", icon: <Users size={24} /> },
    { number: "150+", label: "Verified Vendors", icon: <CheckCircle size={24} /> },
    { number: "98%", label: "Satisfaction Rate", icon: <TrendingUp size={24} /> }
  ];

  const testimonials = [
    {
      name: "Priya & Rahul",
      event: "Wedding",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=90",
      text: "ArtCulture made our dream wedding come true! Every detail was perfect.",
      rating: 5
    },
    {
      name: "Tech Corp",
      event: "Corporate Event",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=90",
      text: "Professional, efficient, and exceeded all our expectations. Highly recommended!",
      rating: 5
    },
    {
      name: "Anjali Sharma",
      event: "Birthday Party",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=90",
      text: "The team went above and beyond to make my daughter's birthday unforgettable!",
      rating: 5
    }
  ];

  return (
    <div className={styles.home}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Sparkles size={16} />
              <span>AI-Powered Event Planning Platform</span>
            </div>

            <h1 className={styles.heroTitle}>
              Create <span className={styles.gradient}>Unforgettable</span> Events with Ease
            </h1>

            <p className={styles.heroSubtitle}>
              From intimate gatherings to grand celebrations, ArtCulture brings your vision to life with AI-powered planning, instant quotes, and 150+ verified vendors.
            </p>

            <div className={styles.heroButtons}>
              <button
                className={styles.primaryBtn}
                onClick={() => navigate('/register')}
              >
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button
                className={styles.secondaryBtn}
                onClick={() => navigate('/demo')}
              >
                Watch Demo
              </button>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <Star fill="#f59e0b" color="#f59e0b" size={20} />
                <span>4.9/5 Rating</span>
              </div>
              <div className={styles.heroStat}>
                <Users size={20} />
                <span>2000+ Events</span>
              </div>
              <div className={styles.heroStat}>
                <Award size={20} />
                <span>Award Winning</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&h=600&fit=crop&q=90"
              alt="Event Planning"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose ArtCulture?</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to plan the perfect event
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionSubtitle}>
              Professional event management for every occasion
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                className={styles.serviceCard}
                onClick={() => navigate('/vendor-search')}
              >
                <div className={styles.serviceImage}>
                  <img src={service.image} alt={service.name} loading="lazy" />
                  <div className={styles.serviceOverlay}>
                    <span className={styles.serviceIcon}>{service.icon}</span>
                  </div>
                  <div className={styles.servicePrice}>{service.price}</div>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <div className={styles.serviceFooter}>
                    <span className={styles.serviceStats}>{service.stats}</span>
                    <ArrowRight size={20} className={styles.serviceArrow} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
            <p className={styles.sectionSubtitle}>
              Real stories from real people
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <div className={styles.testimonialName}>{testimonial.name}</div>
                    <div className={styles.testimonialEvent}>{testimonial.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Create Your Perfect Event?</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of satisfied clients who trust ArtCulture for their special moments
            </p>
            <button
              className={styles.ctaButton}
              onClick={() => navigate('/register')}
            >
              Start Planning Now
              <ArrowRight size={20} />
            </button>
            <p className={styles.ctaNote}>No credit card required • Free to get started</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
