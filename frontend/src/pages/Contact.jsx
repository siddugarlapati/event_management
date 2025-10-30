import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get In Touch</h1>
          <p className={styles.subtitle}>
            Let's create something extraordinary together. Reach out to us for your next event.
          </p>
        </div>

        <div className={styles.content}>
          {/* Contact Info */}
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Phone className={styles.icon} />
              </div>
              <h3 className={styles.infoTitle}>Phone</h3>
              <p className={styles.infoText}>+91 98765 43210</p>
              <p className={styles.infoText}>+91 87654 32109</p>
              <p className={styles.infoSubtext}>Mon-Sat, 9AM-8PM IST</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Mail className={styles.icon} />
              </div>
              <h3 className={styles.infoTitle}>Email</h3>
              <p className={styles.infoText}>contact@artculture.in</p>
              <p className={styles.infoText}>events@artculture.in</p>
              <p className={styles.infoSubtext}>We'll respond within 24 hours</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <MapPin className={styles.icon} />
              </div>
              <h3 className={styles.infoTitle}>Office</h3>
              <p className={styles.infoText}>MG Road, Bangalore</p>
              <p className={styles.infoText}>Karnataka 560001, India</p>
              <p className={styles.infoSubtext}>Visit by appointment</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Clock className={styles.icon} />
              </div>
              <h3 className={styles.infoTitle}>Working Hours</h3>
              <p className={styles.infoText}>Monday - Saturday</p>
              <p className={styles.infoText}>9:00 AM - 8:00 PM</p>
              <p className={styles.infoSubtext}>Sunday: By appointment</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              <p className={styles.formSubtitle}>
                Fill out the form below and we'll get back to you shortly
              </p>

              {submitted && (
                <div className={styles.successMessage}>
                  ✓ Thank you! We'll contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Event Type *</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="concert">Concert</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="housewarming">House Warming</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Tell us about your event..."
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Find Us</h2>
          <div className={styles.mapPlaceholder}>
            <MapPin size={48} className={styles.mapIcon} />
            <p>MG Road, Bangalore, Karnataka 560001</p>
            <p className={styles.mapSubtext}>Interactive map coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
