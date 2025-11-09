import { useState } from "react";
import "./Events.css";
import { useLocation } from "./useLocation";
import axios from "axios";
import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";
import { auth, db } from './firebase'; // Import from your firebase.js

import {
  getDatabase,
  ref,
  onValue,
  serverTimestamp,
  push,
} from "firebase/database";

// --- 1. Firebase Configuration (Replace with your own) ---
// Note: In a real app, you'd initialize this in a separate firebase.js file



const Events = () => {
  // Attach an asynchronous callback to read the data at our posts reference



  const { data } = useLocation();
  const [distance, setDistance] = useState("10000");
  const [custom, setCustom] = useState("0");
  const [events, setEvents] = useState([]);
  const [tempEvents, setTempEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data != null) {
      try {
        console.log(data);
        getEvents(distance);
        const eventsRef = ref(db, `events`);

        // eventsRef.on(
        //   "value",
        //   (snapshot) => {
        //     const allEvents = snapshot.val(); // snapshot.val() retrieves the data as a JavaScript object
        //     if (allEvents) {
        //       console.log("Here are all your events:", allEvents);

        //       Object.keys(allEvents).forEach((key) => {
        //         console.log("Event ID:", key, "Data:", allEvents[key]);
        //       });
        //     } else {
        //       console.log("No events found in the 'events' node.");
        //     }
        //   },
        //   (error) => {
        //     console.error("Error retrieving events:", error);
        //   }
        // );

        const unsubscribe = onValue(
          eventsRef,
          (snapshot) => {
            // 3. Get the data from the snapshot

            const snap = snapshot.val();

            Object.keys(snap).forEach((key) => {
              Object.keys(snap[key]).forEach((key1) => {
                const obj = snap[key][key1];
                // if(getDistanceFromLatLonInKm(obj.latitude, obj.longitude, data.latitude, data.longitude)<){

                // }
                // console.log([...events, obj]);
                setEvents((event) => {
                  // Create a new array by:
                  // 1. Spreading all items from the previous array (...prevUsers)
                  // 2. Adding the new object (newUser) at the end
                  return [...event, obj];
                });
                setTempEvents((event) => {
                  // Create a new array by:
                  // 1. Spreading all items from the previous array (...prevUsers)
                  // 2. Adding the new object (newUser) at the end
                  return [...event, obj];
                });
              });
            });

            // if (data) {
            //   setItems(data);
            // } else {
            //   setItems({}); // Set to empty object if no data
            // }
            setLoading(false);
          },
          (error) => {
            // Handle errors
            console.error("Error fetching data: ", error);
            setLoading(false);
          }
        );

        // 4. Return a cleanup function
        // This unsubscribes from the listener when the component unmounts
        return () => unsubscribe();
      } catch (e) {
        console.log(e);
      }
    }
  }, [data]);

  /**
   * Converts degrees to radians.
   * @param {number} deg Angle in degrees.
   * @returns {number} Angle in radians.
   */
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  const search = () => {
    if (distance === "custom") {
      if (custom == "0") {
        alert("Enetered value must be greater than 0");
      } else {
        //custom
        getEvents(custom);
      }
    } else {
      //distance
      getEvents(distance);
    }
  };

  const getEvents = async (proximity) => {
    console.log(proximity);
    // const dataToSend = {
    //   latitude: data.latitude,
    //   distance: proximity + "",
    //   longitude: data.longitude,
    // };
    // console.log(dataToSend);
    // try {
    //   // Use axios.post(url, data, [config])
    //   const result = await axios.get(
    //     "https://assignmentbackend-ty4p.onrender.com/api/events",
    //     { params: dataToSend }
    //   );
    //   setEvents(result.data);
    //   console.log(result.data);
    // } catch (err) {
    //   // setError(err.message || 'An error occurred');
    //   // console.error("Post error:", err);
    // } finally {
    //   // setLoading(false);
    // }

    console.log(tempEvents);

    // setEvents([...tempEvents])

    // setEvents(
    //   events.filter((item) => {
    //     console.log(
    //       getDistanceFromLatLonInKm(
    //         parseFloat(item.latitude),
    //         parseFloat(item.longitude),
    //         data.latitude,
    //         data.longitude
    //       )
    //     );
    //     // console.log(
    //     //   item.latitude,
    //     //   item.longitude,
    //     //   data.latitude,
    //     //   data.longitude
    //     // );
    //     // console.log(events);
    //     if (
    //       getDistanceFromLatLonInKm(
    //         Number(item.latitude),
    //         Number(item.longitude),
    //         data.latitude,
    //         data.longitude
    //       ) <= proximity
    //     ) {
    //       return true;
    //     }
    //   })
    // );
    // console.log(
    //         getDistanceFromLatLonInKm(
    //           parseFloat(item.latitude),
    //           parseFloat(item.longitude),
    //           data.latitude,
    //           data.longitude
    //         )
    //       );
    setEvents([])
    setEvents(
      tempEvents.filter((item) => {
        if (
          getDistanceFromLatLonInKm(
            Number(item.latitude),
            Number(item.longitude),
            data.latitude,
            data.longitude
          ) <= proximity
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  return (
    <div className="container">
      {loading ? <LoadingSpinner message="Give us a moment" /> : null}
      <div className="header">
        <h1>🎉 Discover Local Events</h1>
        <p>Find exciting events happening near you</p>
      </div>
      <div className="search-section">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* <input
        type="text"
        className="search-input"
        placeholder="Search events..."
        id="searchInput"
      /> */}
          <div className="distance-filter">
            <select
              className="dropdown"
              value={distance}
              onChange={(item) => {
                setDistance(item.target.value);
                if (item.target.value != "custom") {
                  setCustom("0");
                }
              }}
              id="distanceDropdown"
            >
              <option value={10000000000}>All</option>
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value="custom">Custom</option>
            </select>
            <input
              type="number"
              className="number-input"
              id="customDistance"
              name="ds"
              placeholder="km"
              value={custom}
              onChange={(item) => setCustom(item.target.value)}
              style={
                distance != "custom"
                  ? { display: "none" }
                  : { display: "block" }
              }
            />
          </div>
          <button onClick={search} className="search-btn">
            Search
          </button>
        </form>
      </div>
      <div className="events-section">
        <h2 className="events-header">Upcoming Events</h2>
        <div className="events-list" id="eventsList">
          {events.map((item, index) => {
            return (
              <div key={index} onClick={()=>window.location.href = `/chat/${item.room}`} className="event-card">
                <img
                  src={item.image}
                  alt="Music Festival"
                  className="event-image"
                />
                <div className="event-content">
                  <div className="event-title">{item.name}</div>
                  <div className="event-date"> {`📅${item.date}`}</div>
                  <div className="event-location">{`📍${item.address}`}</div>
                  <div className="event-description">{item.description}</div>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Events;
