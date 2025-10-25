import React from 'react'
import Navbar from './Components/Navbar'
import Events from './Components/Events'
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
   <Routes>
        <Route path="/" element={<Navbar />} /> {/* Route for the home page */}
        <Route path="/events" element={<Events />} /> 
        <Route path="*" element={<Navbar />} /> {/* Catch-all route for 404 */}
      </Routes>
    
  )
}

export default App