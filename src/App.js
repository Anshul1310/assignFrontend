import React,{useState,useEffect} from "react";
import Home from "./Components/Home";
import Events from "./Components/Events";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import AddEventForm from "./Components/AddEventForm";
import ChatApp from "./Components/ChatApp";
import ProtectedRoute from './ProtectedRoute';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Route for the home page */}
      <Route path="/home" element={<Home />} /> 
      {/* <Route path="/events" element={<Events />} /> */}
      <Route 
          path="/events" 
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <Events />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add" 
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <AddEventForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat/:room" 
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <ChatApp />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} /> */
      {/* <Route path="/add" element={<AddEventForm />} />
      <Route path="/chat/:room" element={<ChatApp />} />
      
      <Route path="*" element={<Home />} /> {/* Catch-all route for 404 */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
