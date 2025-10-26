// src/components/Carousel.js
import React, { useState, useEffect, useRef } from 'react';

const slidesData = [
    {
        img: "https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761488340/Screenshot_2025-10-26_194502_tlk5a6.png",
        alt: "Technology",
        title: "Find your Interest",
        desc: "Building the future with cutting-edge solutions"
    },
    {
        img: "https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761488359/Screenshot_2025-10-26_194440_kon1lk.png",
        alt: "Team Collaboration",
        title: "Curate Experiences",
        desc: "Working together to achieve greatness"
    },
    {
        img: "https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761488327/Screenshot_2025-10-26_194417_fhhfjh.png",
        alt: "Data Analytics",
        title: "Find your Interest",
        desc: "Making informed decisions with powerful analytics"
    },
    {
        img: "https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761488246/Screenshot_2025-10-26_194529_hywlmx.png",
        alt: "Creative Design",
        title: "Find your Interest",
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