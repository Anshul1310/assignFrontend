import React from 'react'
import Home from './Components/Home'
import Events from './Components/Events'
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
   <Routes>
        <Route path="/" element={<Home />} /> {/* Route for the home page */}
        <Route path="/events" element={<Events />} /> 
        <Route path="*" element={<Home />} /> {/* Catch-all route for 404 */}
      </Routes>
    
  )
}

export default App