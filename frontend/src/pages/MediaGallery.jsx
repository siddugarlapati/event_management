import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './MediaGallery.module.css';

const MediaGallery = () => {
  const [media, setMedia] = useState([
    { id: 1, type: 'image', url: 'https://via.placeholder.com/400x300', caption: 'Venue Setup' },
    { id: 2, type: 'image', url: 'https://via.placeholder.com/400x300', caption: 'Decoration' },
    { id: 3, type: 'video', url: 'https://via.placeholder.com/400x300', caption: 'Event Highlights' },
    { id: 4, type: 'image', url: 'https://via.placeholder.com/400x300', caption: 'Guest Moments' }
  ]);

  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>Event Media Gallery</h1>
            <p>Photos and videos from your event</p>
          </div>
          <button className={styles.btnUpload}>📸 Upload Media</button>
        </div>

        <div className={styles.aiHighlights}>
          <h3>🤖 AI-Generated Highlights</h3>
          <p>Automatically compiled best moments from your event</p>
          <button className={styles.btnGenerate}>Generate Highlight Reel</button>
        </div>

        <div className={styles.gallery}>
          {media.map(item => (
            <div
              key={item.id}
              className={styles.mediaItem}
              onClick={() => setSelectedMedia(item)}
            >
              <div className={styles.thumbnail}>
                {item.type === 'video' && <div className={styles.playIcon}>▶</div>}
                <img src={item.url} alt={item.caption} />
              </div>
              <p className={styles.caption}>{item.caption}</p>
            </div>
          ))}
        </div>

        {selectedMedia && (
          <div className={styles.modal} onClick={() => setSelectedMedia(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setSelectedMedia(null)}>
                ×
              </button>
              <img src={selectedMedia.url} alt={selectedMedia.caption} />
              <p>{selectedMedia.caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
