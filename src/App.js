import React from 'react'
import Navbar from './Components/Navbar'
import Events from './Components/Events'
import { Routes, Route, Link } from 'react-router-dom';
import HeroSection from './Components/HeroSection2/HeroSection'

const App = () => {
  return (
   <Routes>
        <Route path="/" element={<Navbar />} /> {/* Route for the home page */}
        <Route path="/events" element={<Events />} /> {/* Route for the about page */}
        <Route path="*" element={<Navbar />} /> {/* Catch-all route for 404 */}
      </Routes>
    
  )
}

export default App