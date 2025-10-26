// src/components/Carousel.js
import React, { useState, useEffect, useRef } from 'react';

const slidesData = [
    {
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        alt: "Technology",
        title: "Innovative Technology",
        desc: "Building the future with cutting-edge solutions"
    },
    {
        img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
        alt: "Team Collaboration",
        title: "Team Collaboration",
        desc: "Working together to achieve greatness"
    },
    {
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        alt: "Data Analytics",
        title: "Data-Driven Insights",
        desc: "Making informed decisions with powerful analytics"
    },
    {
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
        alt: "Creative Design",
        title: "Creative Design",
        desc: "Beautiful interfaces that users love"
    }
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slidesData.length;
    const autoplayInterval = useRef(null);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const startAutoplay = () => {
        autoplayInterval.current = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval.current);
    };

    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay(); // Cleanup on unmount
    }, []);

    return (
        <section className="carousel-section">
            <h2>Our Gallery</h2>
            <div 
                className="carousel-container"
                onMouseEnter={stopAutoplay}
                onMouseLeave={startAutoplay}
            >
                <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slidesData.map((slide, index) => (
                        <div className="carousel-slide" key={index}>
                            <img src={slide.img} alt={slide.alt} />
                            <div className="carousel-caption">
                                <h3>{slide.title}</h3>
                                <p>{slide.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
                <button className="carousel-btn next" onClick={nextSlide}>›</button>
            </div>
            <div className="carousel-indicators">
                {slidesData.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Carousel;