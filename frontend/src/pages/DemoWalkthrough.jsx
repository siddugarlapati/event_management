import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DemoWalkthrough.module.css';

const DemoWalkthrough = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Welcome to EventPro',
      description: 'The ultimate AI-powered event management platform',
      icon: '🎉',
      features: [
        'AI-powered planning assistant',
        'AR/VR venue previews',
        'Blockchain-verified contracts',
        'Real-time collaboration',
        'Rewards & XP system'
      ]
    },
    {
      title: 'Choose Your Role',
      description: 'Select how you want to use EventPro',
      icon: '👥',
      roles: [
        { name: 'Event Organizer', icon: '🎯', desc: 'Plan and manage your events' },
        { name: 'Vendor', icon: '🛍️', desc: 'Offer services and grow your business' },
        { name: 'Event Manager', icon: '🧑‍💼', desc: 'Coordinate events professionally' }
      ]
    },
    {
      title: 'Create Your Event',
      description: 'AI helps you plan every detail',
      icon: '✨',
      demo: 'event-creation'
    },
    {
      title: 'Find Perfect Vendors',
      description: 'AI-matched vendors near you',
      icon: '🔍',
      demo: 'vendor-search'
    },
    {
      title: 'Preview in AR/VR',
      description: 'See your venue before booking',
      icon: '🕶️',
      demo: 'ar-preview'
    },
    {
      title: 'Collaborate in Real-time',
      description: 'Chat with vendors and managers',
      icon: '💬',
      demo: 'chat'
    },
    {
      title: 'Track Progress',
      description: 'Manage tasks and timeline',
      icon: '📊',
      demo: 'tasks'
    },
    {
      title: 'Secure Payments',
      description: 'Blockchain-verified transactions',
      icon: '🔒',
      demo: 'payments'
    },
    {
      title: 'Earn Rewards',
      description: 'XP, badges, and exclusive perks',
      icon: '🎁',
      demo: 'rewards'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register');
    }
  };

  const handleSkip = () => {
    navigate('/register');
  };

  const step = steps[currentStep];

  return (
    <div className={styles.walkthrough}>
      <div className={styles.container}>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {currentStep + 1} of {steps.length}
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.icon}>{step.icon}</div>
          <h1>{step.title}</h1>
          <p className={styles.description}>{step.description}</p>

          {step.features && (
            <div className={styles.features}>
              {step.features.map((feature, idx) => (
                <div key={idx} className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  {feature}
                </div>
              ))}
            </div>
          )}

          {step.roles && (
            <div className={styles.roles}>
              {step.roles.map((role, idx) => (
                <div key={idx} className={styles.roleCard}>
                  <div className={styles.roleIcon}>{role.icon}</div>
                  <h3>{role.name}</h3>
                  <p>{role.desc}</p>
                </div>
              ))}
            </div>
          )}

          {step.demo && (
            <div className={styles.demoPreview}>
              <div className={styles.mockup}>
                {step.demo === 'event-creation' && (
                  <div className={styles.mockupContent}>
                    <div className={styles.formPreview}>
                      <div className={styles.inputLine}></div>
                      <div className={styles.inputLine}></div>
                      <div className={styles.inputLine}></div>
                    </div>
                  </div>
                )}
                {step.demo === 'vendor-search' && (
                  <div className={styles.mockupContent}>
                    <div className={styles.cardGrid}>
                      <div className={styles.miniCard}></div>
                      <div className={styles.miniCard}></div>
                      <div className={styles.miniCard}></div>
                    </div>
                  </div>
                )}
                {step.demo === 'ar-preview' && (
                  <div className={styles.mockupContent}>
                    <div className={styles.arView}>
                      <div className={styles.arMarker}>📍</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button onClick={handleSkip} className={styles.btnSkip}>
            Skip Tour
          </button>
          <button onClick={handleNext} className={styles.btnNext}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoWalkthrough;
