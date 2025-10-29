import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import styles from './JoinEvent.module.css';

const JoinEvent = () => {
  const { roomId: urlRoomId } = useParams();
  const [roomId, setRoomId] = useState(urlRoomId || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/events/join', {
        roomId: roomId.toUpperCase(),
        password
      });

      if (res.data.status === 'pending') {
        alert('Your request to join is pending approval');
      } else {
        alert('Successfully joined event!');
        navigate(`/event/${res.data.event._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.icon}>🎉</div>
          <h1>Join Event</h1>
          <p className={styles.subtitle}>Enter Room ID or paste invite link</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleJoin} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Room ID</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="e.g., ABC12345"
                maxLength="8"
                required
              />
              <span className={styles.hint}>8-character alphanumeric code</span>
            </div>

            <div className={styles.formGroup}>
              <label>Password (if required)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password for trusted rooms"
                maxLength="16"
              />
            </div>

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'Joining...' : 'Join Event'}
            </button>
          </form>

          <div className={styles.info}>
            <h3>Room Types</h3>
            <div className={styles.roomTypes}>
              <div className={styles.roomType}>
                <span className={styles.roomIcon}>🌐</span>
                <div>
                  <strong>Open Room</strong>
                  <p>Anyone with Room ID can join instantly</p>
                </div>
              </div>
              <div className={styles.roomType}>
                <span className={styles.roomIcon}>🔒</span>
                <div>
                  <strong>Trusted Room</strong>
                  <p>Password required to join</p>
                </div>
              </div>
              <div className={styles.roomType}>
                <span className={styles.roomIcon}>🛡️</span>
                <div>
                  <strong>Hyperlock Room</strong>
                  <p>Requires approval or KYC verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinEvent;
