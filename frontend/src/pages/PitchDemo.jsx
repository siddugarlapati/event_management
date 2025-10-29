import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PitchDemo.module.css';

const PitchDemo = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className={styles.pitch}>
            <nav className={styles.nav}>
                <div className={styles.logo}>EventPro</div>
                <Link to="/" className={styles.backBtn}>← Back to Home</Link>
            </nav>

            <section className={styles.hero}>
                <h1>Transform Event Management with AI</h1>
                <p>The complete platform for planning, managing, and executing perfect events</p>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>500+</div>
                        <div className={styles.statLabel}>Events Completed</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>200+</div>
                        <div className={styles.statLabel}>Verified Vendors</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>98%</div>
                        <div className={styles.statLabel}>Satisfaction</div>
                    </div>
                </div>
            </section>

            <section className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
                    onClick={() => setActiveTab('features')}
                >
                    Features
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'workflow' ? styles.active : ''}`}
                    onClick={() => setActiveTab('workflow')}
                >
                    Workflow
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'tech' ? styles.active : ''}`}
                    onClick={() => setActiveTab('tech')}
                >
                    Technology
                </button>
            </section>

            <section className={styles.content}>
                {activeTab === 'overview' && (
                    <div className={styles.overview}>
                        <h2>The Problem</h2>
                        <div className={styles.problemGrid}>
                            <div className={styles.problemCard}>
                                <span className={styles.problemIcon}>😰</span>
                                <h3>Overwhelming Planning</h3>
                                <p>Event planning is complex with too many vendors and options</p>
                            </div>
                            <div className={styles.problemCard}>
                                <span className={styles.problemIcon}>💸</span>
                                <h3>Budget Overruns</h3>
                                <p>Hard to optimize costs without expert knowledge</p>
                            </div>
                            <div className={styles.problemCard}>
                                <span className={styles.problemIcon}>🤝</span>
                                <h3>Poor Coordination</h3>
                                <p>Difficult to manage multiple vendors and timelines</p>
                            </div>
                        </div>

                        <h2>Our Solution</h2>
                        <div className={styles.solutionGrid}>
                            <div className={styles.solutionCard}>
                                <span className={styles.solutionIcon}>🤖</span>
                                <h3>AI-Powered Planning</h3>
                                <p>Smart recommendations for venues, vendors, and budgets</p>
                            </div>
                            <div className={styles.solutionCard}>
                                <span className={styles.solutionIcon}>🕶️</span>
                                <h3>AR/VR Preview</h3>
                                <p>See your venue before booking with immersive technology</p>
                            </div>
                            <div className={styles.solutionCard}>
                                <span className={styles.solutionIcon}>🔒</span>
                                <h3>Blockchain Security</h3>
                                <p>Verified contracts and secure payments</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className={styles.features}>
                        <div className={styles.featureSection}>
                            <h2>For Event Organizers</h2>
                            <ul>
                                <li>✓ AI planning assistant</li>
                                <li>✓ AR/VR venue previews</li>
                                <li>✓ Smart vendor matching</li>
                                <li>✓ Budget optimization</li>
                                <li>✓ Task management</li>
                                <li>✓ Real-time collaboration</li>
                            </ul>
                        </div>

                        <div className={styles.featureSection}>
                            <h2>For Vendors</h2>
                            <ul>
                                <li>✓ Professional service pages</li>
                                <li>✓ AI-matched leads</li>
                                <li>✓ Integrated payments</li>
                                <li>✓ Performance analytics</li>
                                <li>✓ Rating system</li>
                                <li>✓ Growth tools</li>
                            </ul>
                        </div>

                        <div className={styles.featureSection}>
                            <h2>For Event Managers</h2>
                            <ul>
                                <li>✓ Project dashboard</li>
                                <li>✓ Vendor coordination</li>
                                <li>✓ Timeline management</li>
                                <li>✓ Commission tracking</li>
                                <li>✓ Client communication</li>
                                <li>✓ Success analytics</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'workflow' && (
                    <div className={styles.workflow}>
                        <div className={styles.flowStep}>
                            <div className={styles.stepNum}>1</div>
                            <div className={styles.stepContent}>
                                <h3>Sign Up & Choose Role</h3>
                                <p>Register as User, Vendor, or Event Manager</p>
                            </div>
                        </div>

                        <div className={styles.flowStep}>
                            <div className={styles.stepNum}>2</div>
                            <div className={styles.stepContent}>
                                <h3>Create Event / List Services</h3>
                                <p>Users create events, Vendors list services</p>
                            </div>
                        </div>

                        <div className={styles.flowStep}>
                            <div className={styles.stepNum}>3</div>
                            <div className={styles.stepContent}>
                                <h3>AI Matching</h3>
                                <p>Smart algorithm matches users with perfect vendors</p>
                            </div>
                        </div>

                        <div className={styles.flowStep}>
                            <div className={styles.stepNum}>4</div>
                            <div className={styles.stepContent}>
                                <h3>Collaborate & Plan</h3>
                                <p>Real-time chat, AR previews, task management</p>
                            </div>
                        </div>

                        <div className={styles.flowStep}>
                            <div className={styles.stepNum}>5</div>
                            <div className={styles.stepContent}>
                                <h3>Secure Payment</h3>
                                <p>Blockchain-verified contracts and transactions</p>
                            </div>
                        </div>

                        <div className={styles.flowStep}>
                            <div className={styles.stepNum}>6</div>
                            <div className={styles.stepContent}>
                                <h3>Execute & Earn Rewards</h3>
                                <p>Complete event, earn XP, badges, and rewards</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'tech' && (
                    <div className={styles.tech}>
                        <div className={styles.techStack}>
                            <h2>Technology Stack</h2>
                            <div className={styles.techGrid}>
                                <div className={styles.techCard}>
                                    <h3>Frontend</h3>
                                    <p>React 18, Vite, CSS Modules</p>
                                </div>
                                <div className={styles.techCard}>
                                    <h3>Backend</h3>
                                    <p>Node.js, Express, MongoDB</p>
                                </div>
                                <div className={styles.techCard}>
                                    <h3>AI</h3>
                                    <p>OpenAI API, Smart Algorithms</p>
                                </div>
                                <div className={styles.techCard}>
                                    <h3>Security</h3>
                                    <p>JWT, Blockchain, KYC</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.architecture}>
                            <h2>System Architecture</h2>
                            <div className={styles.archDiagram}>
                                <div className={styles.layer}>
                                    <h4>Presentation Layer</h4>
                                    <p>React SPA with responsive design</p>
                                </div>
                                <div className={styles.layer}>
                                    <h4>API Layer</h4>
                                    <p>RESTful APIs with JWT auth</p>
                                </div>
                                <div className={styles.layer}>
                                    <h4>Business Logic</h4>
                                    <p>AI Engine, Rewards, Blockchain</p>
                                </div>
                                <div className={styles.layer}>
                                    <h4>Data Layer</h4>
                                    <p>MongoDB with geospatial indexing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section className={styles.cta}>
                <h2>Ready to Transform Event Management?</h2>
                <div className={styles.ctaButtons}>
                    <Link to="/demo" className={styles.btnDemo}>Start Demo Tour</Link>
                    <Link to="/register" className={styles.btnStart}>Get Started Free</Link>
                </div>
            </section>
        </div>
    );
};

export default PitchDemo;
