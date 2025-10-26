// src/components/Hero.js
import React from 'react';

const Hero = () => {
    return (
        <section className="hero" id="home">
            
            <div className="hero-content">
                <h1>Welcome to the Future</h1>
                <p>Transform your ideas into reality with our innovative solutions</p>
                <div className="cta-buttons">
                    <button className="btn btn-primary">Get Started</button>
                    <button className="btn btn-secondary">Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;