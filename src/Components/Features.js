// src/components/Features.js
import React from 'react';

const Features = () => {
    return (
        <section className="features" id="features">
            <h2>Our Features</h2>
            <div className="feature-grid">
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Experience blazing fast performance with our optimized infrastructure and cutting-edge technology.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure & Safe</h3>
                    <p>Your data is protected with enterprise-grade security measures and encryption protocols.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h3>Beautiful Design</h3>
                    <p>Enjoy a stunning user interface designed with attention to detail and user experience in mind.</p>
                </div>
            </div>
        </section>
    );
};

export default Features;