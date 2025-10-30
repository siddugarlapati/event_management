import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Card3D from '../components/Card3D';
import FloatingElements3D from '../components/FloatingElements3D';
import styles from './Animations3DDemo.module.css';

const Animations3DDemo = () => {
  const navigate = useNavigate();
  const [flippedCard, setFlippedCard] = useState(null);

  const demoCards = [
    {
      id: 1,
      title: 'Wedding Venue',
      description: 'Beautiful outdoor venue',
      rating: 4.9,
      price: '$5,000',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=400&q=80'
    },
    {
      id: 2,
      title: 'Catering Service',
      description: 'Gourmet dining experience',
      rating: 4.8,
      price: '$3,500',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80'
    },
    {
      id: 3,
      title: 'Photography',
      description: 'Professional event photography',
      rating: 5.0,
      price: '$2,000',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80'
    }
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.heroSection}>
        <FloatingElements3D />
        <div className={styles.heroContent}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className={styles.title}>
            <Sparkles size={32} className={styles.sparkle} />
            3D Animations Showcase
          </h1>
          <p className={styles.subtitle}>
            Experience our stunning 3D effects and interactive animations
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* 3D Flip Cards Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3D Flip Cards</h2>
          <p className={styles.sectionDesc}>
            Click on any card to flip it and reveal more details. Hover to see the 3D tilt effect.
          </p>
          
          <div className={styles.cardsGrid}>
            {demoCards.map((card) => (
              <div key={card.id} className={styles.cardWrapper}>
                <Card3D
                  front={
                    <div className={styles.cardFront}>
                      <div 
                        className={styles.cardImage}
                        style={{ backgroundImage: `url(${card.image})` }}
                      />
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{card.title}</h3>
                        <p className={styles.cardDesc}>{card.description}</p>
                        <div className={styles.cardFooter}>
                          <span className={styles.rating}>⭐ {card.rating}</span>
                          <span className={styles.price}>{card.price}</span>
                        </div>
                      </div>
                    </div>
                  }
                  back={
                    <div className={styles.cardBack}>
                      <h3 className={styles.backTitle}>{card.title}</h3>
                      <p className={styles.backText}>
                        This is a premium service with excellent reviews. 
                        Book now to secure your date and create unforgettable memories.
                      </p>
                      <div className={styles.backFeatures}>
                        <div className={styles.feature}>✓ Professional Service</div>
                        <div className={styles.feature}>✓ Highly Rated</div>
                        <div className={styles.feature}>✓ Flexible Packages</div>
                      </div>
                      <button className={styles.bookBtn}>
                        Book Now
                      </button>
                    </div>
                  }
                  onFlip={(isFlipped) => setFlippedCard(isFlipped ? card.id : null)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3D Hover Cards Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3D Hover Effects</h2>
          <p className={styles.sectionDesc}>
            Move your mouse over these cards to see the parallax 3D effect
          </p>
          
          <div className={styles.hoverCardsGrid}>
            {['Weddings', 'Corporate Events', 'Concerts', 'Parties'].map((item, index) => (
              <div key={index} className={styles.hoverCard}>
                <div className={styles.hoverCardInner}>
                  <div className={styles.hoverCardIcon}>
                    {['💍', '🏢', '🎵', '🎉'][index]}
                  </div>
                  <h3 className={styles.hoverCardTitle}>{item}</h3>
                  <p className={styles.hoverCardText}>
                    Professional planning services
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Floating Elements Info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Floating 3D Elements</h2>
          <p className={styles.sectionDesc}>
            Notice the floating 3D shapes in the hero section? They follow your mouse movement 
            and create an immersive parallax effect. These elements add depth and visual interest 
            to the page.
          </p>
          
          <div className={styles.infoBox}>
            <h3>Features Implemented:</h3>
            <ul className={styles.featureList}>
              <li>✨ 3D Rotating Cube with glass morphism effect</li>
              <li>✨ Pulsing 3D Sphere with radial gradients</li>
              <li>✨ Spinning 3D Ring with nested circles</li>
              <li>✨ Mouse-tracking parallax movement</li>
              <li>✨ Smooth floating animations</li>
              <li>✨ Perspective-based depth effects</li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Experience More?</h2>
            <p className={styles.ctaText}>
              These 3D animations are integrated throughout the EventPro platform
            </p>
            <div className={styles.ctaButtons}>
              <button 
                className={styles.primaryBtn}
                onClick={() => navigate('/vendor-search')}
              >
                Explore Vendors
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Animations3DDemo;
