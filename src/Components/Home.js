// src/App.js
import React from 'react';
import './Home.css';

import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Carousel from './Carousel';
import Faq from './Faq';
import Download from './Download';
import Footer from './Footer';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      <Carousel />
      <Faq />
      <Download />
      <Footer />
    </div>
  );
}

export default Home;