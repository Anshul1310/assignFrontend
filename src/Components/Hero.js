// src/components/Hero.js
import React from 'react';
import video from "./video.mp4";

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="bg"></div>
            <video autoPlay loop muted>
          <source src={video} type="video/mp4"></source>

          
        </video>
            <div className="hero-content">
                <h1>INDULGE OUT !!!</h1>
                <p>In a world flooded with digital noise, IndulgeOut is your invitation to rediscover real-world connections.</p>
                <div className="cta-buttons">
                    <button className="btn btn-primary">Get Started</button>
                    <button className="btn btn-secondary">Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;