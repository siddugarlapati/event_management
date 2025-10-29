import { useState } from 'react';
import styles from './ShareButton.module.css';

const ShareButton = ({ title, text, url }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: title || 'EventPro',
    text: text || 'Check out this event on EventPro!',
    url: url || window.location.href
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowMenu(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowMenu(false);
    }, 2000);
  };

  const shareToSocial = (platform) => {
    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedText = encodeURIComponent(shareData.text);

    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      email: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodedText}%20${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  return (
    <div className={styles.shareWrapper}>
      <button 
        className={styles.shareBtn}
        onClick={handleNativeShare}
      >
        📤 Share
      </button>

      {showMenu && (
        <>
          <div className={styles.overlay} onClick={() => setShowMenu(false)} />
          <div className={styles.shareMenu}>
            <h4>Share this event</h4>
            
            <div className={styles.socialButtons}>
              <button 
                className={`${styles.socialBtn} ${styles.whatsapp}`}
                onClick={() => shareToSocial('whatsapp')}
              >
                <span className={styles.icon}>📱</span>
                WhatsApp
              </button>

              <button 
                className={`${styles.socialBtn} ${styles.facebook}`}
                onClick={() => shareToSocial('facebook')}
              >
                <span className={styles.icon}>📘</span>
                Facebook
              </button>

              <button 
                className={`${styles.socialBtn} ${styles.twitter}`}
                onClick={() => shareToSocial('twitter')}
              >
                <span className={styles.icon}>🐦</span>
                Twitter
              </button>

              <button 
                className={`${styles.socialBtn} ${styles.linkedin}`}
                onClick={() => shareToSocial('linkedin')}
              >
                <span className={styles.icon}>💼</span>
                LinkedIn
              </button>

              <button 
                className={`${styles.socialBtn} ${styles.telegram}`}
                onClick={() => shareToSocial('telegram')}
              >
                <span className={styles.icon}>✈️</span>
                Telegram
              </button>

              <button 
                className={`${styles.socialBtn} ${styles.email}`}
                onClick={() => shareToSocial('email')}
              >
                <span className={styles.icon}>📧</span>
                Email
              </button>
            </div>

            <div className={styles.copyLink}>
              <input 
                type="text" 
                value={shareData.url} 
                readOnly 
                className={styles.linkInput}
              />
              <button 
                className={styles.copyBtn}
                onClick={copyToClipboard}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
