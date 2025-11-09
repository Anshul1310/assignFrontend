// src/components/Navbar.js
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const scrollThreshold = 100;

    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(() => {

        if(localStorage.getItem("email")==null){
            setIsLoggedIn(false);
        }else{
            setIsLoggedIn(true);
        }
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > scrollThreshold) {
                if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    setIsHidden(true);
                } else {
                    // Scrolling up
                    setIsHidden(false);
                }
            } else {
                // At the top
                setIsHidden(false);
            }
            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={isHidden ? 'hidden' : ''}>
            <div className="nav-container">
                <div className="logo">INDULGEOUT</div>
                <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
                    <li><a href="#home" onClick={closeMenu}>Home</a></li>
                    <li><a href="#features" onClick={closeMenu}>Features</a></li>
                    <li><a href="#about" onClick={closeMenu}>Gallery</a></li>
                    <li><a href="#contact" onClick={closeMenu}>FAQ</a></li>
                    <li><a href="#contact" onClick={closeMenu}>Downloadds</a></li>
                    <li><a href="/add" onClick={closeMenu}>Add Event</a></li>
                    <li><a href="/events" onClick={closeMenu}>Events</a></li>
                    {
                        isLoggedIn? <li><a href="#" onClick={()=>{
                            localStorage.removeItem("email");
                        }}>LOGOUT</a></li> : <li><a href="/login" onClick={closeMenu}>LOGIN</a></li> 
                    }
                </ul>
                <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;