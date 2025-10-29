import { useState } from 'react';
import styles from './VendorComparison.module.css';

const VendorComparison = ({ vendors, onClose }) => {
  if (!vendors || vendors.length === 0) return null;

  const features = [
    { key: 'businessName', label: 'Business Name', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'pricing.basic', label: 'Basic Price', type: 'price' },
    { key: 'pricing.premium', label: 'Premium Price', type: 'price' },
    { key: 'experience', label: 'Experience', type: 'text' },
    { key: 'servicesOffered', label: 'Services', type: 'list' },
    { key: 'responseTime', label: 'Response Time', type: 'text' },
    { key: 'availability', label: 'Availability', type: 'text' }
  ];

  const getValue = (vendor, key) => {
    const keys = key.split('.');
    let value = vendor;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  };

  return (
    <div className={styles.comparisonOverlay}>
      <div className={styles.comparisonModal}>
        <div className={styles.header}>
          <h2>Compare Vendors</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.featureColumn}>Feature</th>
                {vendors.map(vendor => (
                  <th key={vendor._id} className={styles.vendorColumn}>
                    <div className={styles.vendorHeader}>
                      <div className={styles.vendorAvatar}>
                        {vendor.businessName.charAt(0)}
                      </div>
                      <div>
                        <h4>{vendor.businessName}</h4>
                        <span className={styles.category}>{vendor.category}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map(feature => (
                <tr key={feature.key}>
                  <td className={styles.featureLabel}>{feature.label}</td>
                  {vendors.map(vendor => {
                    const value = getValue(vendor, feature.key);
                    return (
                      <td key={vendor._id} className={styles.featureValue}>
                        {feature.type === 'rating' && (
                          <span className={styles.rating}>
                            ⭐ {value || 'N/A'}
                          </span>
                        )}
                        {feature.type === 'price' && (
                          <span className={styles.price}>
                            {value ? `₹${value.toLocaleString('en-IN')}` : 'N/A'}
                          </span>
                        )}
                        {feature.type === 'list' && (
                          <span className={styles.list}>
                            {Array.isArray(value) ? value.join(', ') : value || 'N/A'}
                          </span>
                        )}
                        {feature.type === 'text' && (
                          <span>{value || 'N/A'}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorComparison;
