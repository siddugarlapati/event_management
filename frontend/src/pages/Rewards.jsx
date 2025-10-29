import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import styles from './Rewards.module.css';

const Rewards = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <h1>Rewards & Achievements</h1>
        <p className={styles.subtitle}>Track your progress and unlock badges</p>
        
        <div className={styles.xpCard}>
          <div className={styles.xpIcon}>⭐</div>
          <div>
            <div className={styles.xpValue}>{user?.xp || 0} XP</div>
            <div className={styles.xpLabel}>Total Experience Points</div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Your Badges</h2>
          <div className={styles.badges}>
            {user?.badges?.length > 0 ? (
              user.badges.map((badge, idx) => (
                <div key={idx} className={styles.badge}>
                  <div className={styles.badgeIcon}>🏆</div>
                  <div className={styles.badgeName}>{badge}</div>
                </div>
              ))
            ) : (
              <p>No badges yet. Complete events to earn badges!</p>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2>How to Earn XP</h2>
          <div className={styles.tips}>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>✅</span>
              <div>
                <strong>Complete Events</strong>
                <p>Earn 100 XP for each completed event</p>
              </div>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>⭐</span>
              <div>
                <strong>Get Positive Reviews</strong>
                <p>Earn 20 XP for each 4+ star review</p>
              </div>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>🎯</span>
              <div>
                <strong>Refer Friends</strong>
                <p>Earn 50 XP for each successful referral</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
