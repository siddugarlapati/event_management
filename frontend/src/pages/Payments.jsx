import { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyTransactions } from '../utils/dummyData';
import Navbar from '../components/Navbar';
import styles from './Payments.module.css';

const Payments = () => {
  const [transactions, setTransactions] = useState(dummyTransactions);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/payments/transactions');
      setTransactions(res.data.length > 0 ? res.data : dummyTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions(dummyTransactions);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <h1>Payment History</h1>
        <p className={styles.subtitle}>View all your transactions</p>
        
        <div className={styles.transactions}>
          {transactions.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            transactions.map(tx => (
              <div key={tx._id} className={styles.txCard}>
                <div className={styles.txHeader}>
                  <span className={styles.txType}>{tx.type}</span>
                  <span className={`${styles.status} ${styles[tx.status]}`}>
                    {tx.status}
                  </span>
                </div>
                <div className={styles.txAmount}>₹{tx.amount?.toLocaleString('en-IN')}</div>
                <div className={styles.txDate}>
                  {new Date(tx.createdAt).toLocaleDateString()}
                </div>
                {tx.blockchainHash && (
                  <div className={styles.hash}>
                    Hash: {tx.blockchainHash.substring(0, 16)}...
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
