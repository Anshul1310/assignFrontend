import  { useState } from 'react'
import "./Events.css"
import { useLocation } from './useLocation'
import axios from 'axios';
import { useEffect } from 'react'
import { format, parseISO } from 'date-fns';

const Events =()=>{

function getString(date) {
 const dateObject = parseISO(date);
const formattedDate = format(dateObject, 'EEEE, MMMM d, yyyy');
return formattedDate;
}

  const { data } = useLocation();
  const [distance, setDistance]=useState("10000");
  const [custom, setCustom]=useState("0");
  const [events,setEvents]=useState([]);
  useEffect(()=>{
    if(data!=null){
      try{
        console.log(data)
        getEvents(distance);
        
      }catch(e){
          console.log(e)
      }
    }
     
  },[data])
 
  const search=()=>{
    
      if(distance==="custom"){
        
          if(custom=="0"){
              alert("Enetered value must be greater than 0")

          }else{
             //custom
             getEvents(custom);
          }
      }else{
          //distance
          getEvents(distance);
      }
  }

  const getEvents=async (proximity)=>{
const dataToSend = {
      latitude: data.latitude,
      distance: proximity+"",
      longitude:data.longitude
    };
    console.log(dataToSend)
    try {
      // Use axios.post(url, data, [config])
      const result = await axios.get('https://assignmentbackend-ty4p.onrender.com/api/events', {params:dataToSend});
      setEvents(result.data);
      console.log(result.data)
    } catch (err) {
      // setError(err.message || 'An error occurred');
      // console.error("Post error:", err);
    } finally {
      // setLoading(false);
    }
  }

  return (
      <div className="container">
  <div className="header">
    <h1>🎉 Discover Local Events</h1>
    <p>Find exciting events happening near you</p>
  </div>
  <div className="search-section">
    <form  className="search-form" onSubmit={(e)=>{e.preventDefault()}}>
      {/* <input
        type="text"
        className="search-input"
        placeholder="Search events..."
        id="searchInput"
      /> */}
      <div className="distance-filter">
        <select className="dropdown" value={distance} onChange={(item)=>{
          setDistance(item.target.value)
          if(item.target.value!="custom"){
              setCustom("0");
          }
        }} id="distanceDropdown">
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
          onChange={(item)=>setCustom(item.target.value)}
        
          style={distance!="custom"? { display: "none" }: {display:"block"}}
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
      {
        events.map((item, index)=>{
          return <div key={index} className="event-card">
        <img
          src={item.image}
          alt="Music Festival"
          className="event-image"
        />
        <div className="event-content">
          <div className="event-title">{item.name}</div>
          <div className="event-date"> {`📅${getString(item.date)}`}</div>
          <div className="event-location">{`📍${item.address}`}</div>
          <div className="event-description">{item.description}</div>
          <span className="event-distance">2.3 km away</span>
        </div>
      </div>
        })
      }
      
    </div>
  </div>
</div>



  )
}
export default Events