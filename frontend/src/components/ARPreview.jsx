import { useState } from 'react';
import styles from './ARPreview.module.css';

const ARPreview = ({ venue, decoration }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('3d');

  const views = [
    { id: '3d', label: '3D View', icon: '🏛️' },
    { id: 'ar', label: 'AR Mode', icon: '🕶️' },
    { id: 'vr', label: 'VR Tour', icon: '🥽' }
  ];

  return (
    <>
      <button className={styles.previewBtn} onClick={() => setIsOpen(true)}>
        🕶️ Preview in AR/VR
      </button>

      {isOpen && (
        <div className={styles.modal} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ×
            </button>

            <h2>Venue Preview</h2>

            <div className={styles.viewTabs}>
              {views.map(view => (
                <button
                  key={view.id}
                  className={`${styles.tab} ${activeView === view.id ? styles.active : ''}`}
                  onClick={() => setActiveView(view.id)}
                >
                  <span className={styles.icon}>{view.icon}</span>
                  {view.label}
                </button>
              ))}
            </div>

            <div className={styles.previewArea}>
              {activeView === '3d' && (
                <div className={styles.view3d}>
                  <div className={styles.placeholder}>
                    <div className={styles.venue}>
                      <div className={styles.stage}>Stage</div>
                      <div className={styles.seating}>
                        <div className={styles.table}>Table 1</div>
                        <div className={styles.table}>Table 2</div>
                        <div className={styles.table}>Table 3</div>
                        <div className={styles.table}>Table 4</div>
                      </div>
                      <div className={styles.entrance}>Entrance</div>
                    </div>
                  </div>
                  <p className={styles.info}>Interactive 3D venue layout with decoration preview</p>
                </div>
              )}

              {activeView === 'ar' && (
                <div className={styles.arView}>
                  <div className={styles.placeholder}>
                    <div className={styles.arOverlay}>
                      <div className={styles.arMarker}>📍</div>
                      <p>Point your camera at the venue</p>
                    </div>
                  </div>
                  <p className={styles.info}>Use your device camera to see decorations in real space</p>
                  <button className={styles.btnAR}>Launch AR Camera</button>
                </div>
              )}

              {activeView === 'vr' && (
                <div className={styles.vrView}>
                  <div className={styles.placeholder}>
                    <div className={styles.vrScene}>
                      <div className={styles.vrHorizon}></div>
                      <p>🥽 VR Experience</p>
                    </div>
                  </div>
                  <p className={styles.info}>Immersive 360° virtual tour of the venue</p>
                  <button className={styles.btnVR}>Start VR Tour</button>
                </div>
              )}
            </div>

            <div className={styles.controls}>
              <div className={styles.controlGroup}>
                <label>Decoration Theme</label>
                <select>
                  <option>Rustic Garden</option>
                  <option>Modern Minimalist</option>
                  <option>Vintage Elegance</option>
                  <option>Tropical Paradise</option>
                </select>
              </div>

              <div className={styles.controlGroup}>
                <label>Lighting</label>
                <select>
                  <option>Warm Ambient</option>
                  <option>Cool White</option>
                  <option>Colorful Party</option>
                  <option>Romantic Dim</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ARPreview;
