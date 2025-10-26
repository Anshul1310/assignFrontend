// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>INDULGE OUT</h3>
                    <p>Whether you're looking to find your tribe or build one, Indulge Out is your go-to platform for turning passions into communities, and communities into unforgettable experiences.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="LinkedIn">💼</a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Services</h3>
                    <ul className="footer-links">
                        <li><a href="#">Event Management</a></li>
                        <li><a href="#">Show Management</a></li>
                        <li><a href="#">Interests</a></li>
                        <li><a href="#">Find your Interest</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul className="footer-links">
                        <li>📧 info@brandname.com</li>
                        <li>📞 +1 1234 567 789</li>
                        <li>📍 Banglore, Karnataka, India</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 BrandName. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;