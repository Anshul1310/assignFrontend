// src/useLocation.js
import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is supported
    if (!("geolocation" in navigator)) {
      setError(new Error("Geolocation is not supported by your browser."));
      setLoading(false);
      return;
    }

    setLoading(true);

    // Success callback
    const onSuccess = (position) => {
      setData({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
    };

    // Error callback
    const onError = (err) => {
      setError(err);
      setLoading(false);
    };

    // Get the current position
    // This will trigger the browser's permission prompt
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true, // Requests a more accurate position
      timeout: 10000,          // 10 seconds
      maximumAge: 0,           // Don't use a cached position
    });

    // Note: If you need to *continuously* track the user's location,
    // you would use `navigator.geolocation.watchPosition()` instead
    // and store its ID to clear it in the return function.

  }, []); // Empty dependency array means this effect runs once on mount

  return { loading, error, data };
};