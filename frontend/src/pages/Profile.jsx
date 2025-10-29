import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          
          <h1>{user?.name}</h1>
          <p className={styles.email}>{user?.email}</p>
          <span className={styles.role}>{user?.role}</span>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{user?.xp || 0}</div>
              <div className={styles.statLabel}>XP Points</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>₹{(user?.wallet || 0)?.toLocaleString('en-IN')}</div>
              <div className={styles.statLabel}>Wallet</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{user?.badges?.length || 0}</div>
              <div className={styles.statLabel}>Badges</div>
            </div>
          </div>
          
          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span>KYC Status:</span>
              <span className={user?.kycVerified ? styles.verified : styles.pending}>
                {user?.kycVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span>Member Since:</span>
              <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
