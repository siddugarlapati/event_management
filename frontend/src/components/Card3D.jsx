import { useState, useRef } from 'react';
import styles from './Card3D.module.css';

const Card3D = ({ front, back, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) onFlip(!isFlipped);
  };

  const handleMouseMove = (e) => {
    if (isFlipped || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (isFlipped || !cardRef.current) return;
    cardRef.current.style.transform = '';
  };

  return (
    <div className={styles.cardContainer}>
      <div
        ref={cardRef}
        className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          {front}
        </div>
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          {back}
        </div>
      </div>
    </div>
  );
};

export default Card3D;
