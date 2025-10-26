// src/components/Download.js
import React from 'react';

const Download = () => {
    return (
        <section className="download-section">
            <div className="download-content">
                <div className="download-text">
                    <h2>Download Our App Today</h2>
                    <p>Get access to all our features on the go. Available now on iOS and Android platforms.</p>
                    
                    <div className="download-buttons">
                        <a href="#" className="store-btn">
                            <div className="store-icon">🍎</div>
                            <div className="store-text">
                                <small>Download on the</small>
                                <span>App Store</span>
                            </div>
                        </a>
                        <a href="#" className="store-btn">
                            <div className="store-icon">📱</div>
                            <div className="store-text">
                                <small>Get it on</small>
                                <span>Google Play</span>
                            </div>
                        </a>
                    </div>

                    <div className="app-features">
                        <div className="feature-item">
                            <span>⭐</span>
                            <div>4.8 Rating</div>
                        </div>
                        <div className="feature-item">
                            <span>📥</span>
                            <div>500K+ Downloads</div>
                        </div>
                        <div className="feature-item">
                            <span>🎯</span>
                            <div>Free to Use</div>
                        </div>
                    </div>
                </div>

                <div className="download-image">
                    <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" alt="Mobile App" className="phone-mockup" />
                </div>
            </div>
        </section>
    );
};

export default Download;