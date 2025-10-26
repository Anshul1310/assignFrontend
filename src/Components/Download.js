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
                        <a href="https://play.google.com/store/apps/details?id=com.anantexperiences.indulgeout&pcampaignid=web_share" className="store-btn">
                            <div className="store-icon"><img height="30px" src="https://cdn0.iconfinder.com/data/icons/shift-logotypes/32/Google_Play-1024.png" /></div>
                            <div className="store-text">
                                <small>Download on the</small>
                                <span>Google Play</span>
                            </div>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.anantexperiences.indulgeout&pcampaignid=web_share" className="store-btn">
                            <div className="store-icon"><img src="https://1000logos.net/wp-content/uploads/2020/08/App-Store-Logo-768x480.png" height="30px"/></div>
                            <div className="store-text">
                                <small>Get it on</small>
                                <span>App Store</span>
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
                            <div>100+ Downloads</div>
                        </div>
                        <div className="feature-item">
                            <span>🎯</span>
                            <div>Free to Use</div>
                        </div>
                    </div>
                </div>

                <div className="download-image">
                    <img src="https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761488761/Screenshot_2025-10-26_195540_adeuut.png" alt="Mobile App" className="phone-mockup" />
                </div>
            </div>
        </section>
    );
};

export default Download;