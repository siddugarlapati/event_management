import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { dummyLeads } from '../utils/dummyData';
import Navbar from '../components/Navbar';
import styles from './Dashboard.module.css';

const DashboardVendor = () => {
  const { user } = useContext(AuthContext);
  const [leads, setLeads] = useState(dummyLeads);
  const [filter, setFilter] = useState('all');

  const handleAcceptLead = (leadId) => {
    setLeads(leads.map(lead => 
      lead._id === leadId ? { ...lead, status: 'accepted' } : lead
    ));
  };

  const handleRejectLead = (leadId) => {
    setLeads(leads.map(lead => 
      lead._id === leadId ? { ...lead, status: 'rejected' } : lead
    ));
  };

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  const pendingCount = leads.filter(l => l.status === 'pending').length;
  const acceptedCount = leads.filter(l => l.status === 'accepted').length;
  const totalEarnings = leads
    .filter(l => l.status === 'accepted')
    .reduce((sum, l) => sum + (l.budget * 0.15), 0);

  return (
    <div className={styles.dashboard}>
      <Navbar />
      
      {/* Vendor Hero Section */}
      <div className={styles.vendorHero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Welcome back, {user?.name}</h1>
            <p>Grow your business with EventPro</p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>{pendingCount}</span>
                <span className={styles.heroStatLabel}>New Leads</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>{acceptedCount}</span>
                <span className={styles.heroStatLabel}>Active Bookings</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>4.8⭐</span>
                <span className={styles.heroStatLabel}>Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.container}>
        {/* Quick Actions for Vendors */}
        <div className={styles.quickActions}>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>📦</div>
            <h3>Manage Services</h3>
            <p>Update your service offerings</p>
          </div>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>📅</div>
            <h3>Calendar</h3>
            <p>View your booking schedule</p>
          </div>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>💬</div>
            <h3>Messages</h3>
            <p>Chat with clients</p>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📦</div>
            <div>
              <div className={styles.statValue}>{acceptedCount}</div>
              <div className={styles.statLabel}>Active Bookings</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📬</div>
            <div>
              <div className={styles.statValue}>{pendingCount}</div>
              <div className={styles.statLabel}>Pending Leads</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div>
              <div className={styles.statValue}>₹{totalEarnings.toLocaleString('en-IN')}</div>
              <div className={styles.statLabel}>Total Earnings</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div>
              <div className={styles.statValue}>4.8</div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
          </div>
        </div>

        {/* Lead Filters */}
        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All Leads ({leads.length})
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'accepted' ? styles.active : ''}`}
            onClick={() => setFilter('accepted')}
          >
            Accepted ({acceptedCount})
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'rejected' ? styles.active : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>

        {/* Leads Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📬 Booking Requests</h2>
            <p>Manage your incoming event opportunities</p>
          </div>
          <div className={styles.leadsContainer}>
            {filteredLeads.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📭</div>
                <h3>No {filter !== 'all' ? filter : ''} leads</h3>
                <p>New booking requests will appear here</p>
              </div>
            ) : (
              filteredLeads.map(lead => (
                <div key={lead._id} className={styles.leadCard}>
                  <div className={styles.leadHeader}>
                    <div>
                      <h3>{lead.eventTitle}</h3>
                      <p className={styles.leadType}>{lead.eventType}</p>
                    </div>
                    <span className={`${styles.badge} ${styles[lead.status]}`}>
                      {lead.status}
                    </span>
                  </div>
                  
                  <div className={styles.leadDetails}>
                    <p>📅 {new Date(lead.date).toLocaleDateString()}</p>
                    <p>📍 {lead.location}</p>
                    <p>👥 {lead.guestCount} guests</p>
                    <p>💵 Budget: ₹{lead.budget?.toLocaleString('en-IN')}</p>
                    <p>👤 Client: {lead.client.name}</p>
                    <p>📧 {lead.client.email}</p>
                  </div>

                  {lead.status === 'pending' && (
                    <div className={styles.leadActions}>
                      <button 
                        onClick={() => handleAcceptLead(lead._id)}
                        className={styles.btnAccept}
                      >
                        ✓ Accept Booking
                      </button>
                      <button 
                        onClick={() => handleRejectLead(lead._id)}
                        className={styles.btnReject}
                      >
                        ✗ Decline
                      </button>
                    </div>
                  )}

                  {lead.status === 'accepted' && (
                    <div className={styles.leadActions}>
                      <button className={styles.btnChat}>
                        💬 Chat with Client
                      </button>
                      <button className={styles.btnDetails}>
                        📋 View Details
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Performance Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📊 Performance Metrics</h2>
            <p>Track your business growth</p>
          </div>
          <div className={styles.performanceGrid}>
            <div className={styles.performanceCard}>
              <div className={styles.performanceIcon}>📈</div>
              <h3>Acceptance Rate</h3>
              <div className={styles.performanceValue}>
                {leads.length > 0 ? Math.round((acceptedCount / leads.length) * 100) : 0}%
              </div>
              <p>Of total leads accepted</p>
            </div>
            <div className={styles.performanceCard}>
              <div className={styles.performanceIcon}>💼</div>
              <h3>Completed Events</h3>
              <div className={styles.performanceValue}>24</div>
              <p>Successfully delivered</p>
            </div>
            <div className={styles.performanceCard}>
              <div className={styles.performanceIcon}>⭐</div>
              <h3>Client Satisfaction</h3>
              <div className={styles.performanceValue}>98%</div>
              <p>Positive feedback rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVendor;
