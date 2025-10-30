import { useEffect, useRef } from 'react';
import styles from './FloatingElements3D.module.css';

const FloatingElements3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      const elements = containerRef.current.querySelectorAll(`.${styles.floatingElement}`);
      elements.forEach((el, index) => {
        const speed = (index + 1) * 0.5;
        const x = xPercent * 20 * speed;
        const y = yPercent * 20 * speed;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${yPercent * 10}deg) rotateY(${xPercent * 10}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={`${styles.floatingElement} ${styles.element1}`}>
        <div className={styles.cube}>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
        </div>
      </div>
      <div className={`${styles.floatingElement} ${styles.element2}`}>
        <div className={styles.sphere}></div>
      </div>
      <div className={`${styles.floatingElement} ${styles.element3}`}>
        <div className={styles.ring}></div>
      </div>
    </div>
  );
};

export default FloatingElements3D;
