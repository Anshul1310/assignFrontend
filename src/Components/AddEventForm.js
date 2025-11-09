import React from "react";
// Import the CSS module
import styles from "./AddEventForm.module.css";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner"; // Adjust path if needed
import { v4 as uuidv4 } from "uuid";
import { auth, db } from './firebase'; // Import from your firebase.js

import {
  getDatabase,
  ref,
  onValue,
  serverTimestamp,
  push,
} from "firebase/database";


function AddEventForm() {
  const [latitude, setLatitude] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState();
 const [selectedDate, setSelectedDate] = useState(null);
  const [milliseconds, setMilliseconds] = useState(null);

 
  const CLOUD_NAME = "dbxtgjwyv";
  const UPLOAD_PRESET = "unsigned";

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const addEvent = () => {
    const millisecondsNow = Date.now();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setImageUrl(null); // Reset image URL when a new file is selected
    setError(null); // Reset error
  };

  const handleUpload = async (e) => {
    console.log("gfh")
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      // Make the POST request to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      // On success, save the secure URL
      console.log("Upload successful:", response.data);
      setImageUrl(response.data.secure_url);

      const eventData = {
        name: name,
        description: description,
        latitude,
        longitude,
        address:address,
        image: response.data.secure_url,
        date:date,
        room: generateRandomString(12),
        createdAt: serverTimestamp()
      };
      console.log(eventData)
      const eventRef = ref(db, `events/${eventData.room}`);
      console.log("Upload successful:", response.data.secure_url);
      await push(eventRef,{
        name: name,
        description: description,
        latitude:latitude,
        longitude,
        image: response.data.secure_url,
        date:date,
        address:address,
        email:localStorage.getItem("email") || "anshul",
        room: eventData.room,
        createdAt: serverTimestamp()
      });

      console.log("Upload successful:", eventData);
      alert("Successfully Uploaded")
      window.location.href = '/events';
    } catch (err) {
      console.error("Upload failed:", err);
      setError(
        "Upload failed. Please check your cloud name and upload preset."
      );
    } finally {
      setLoading(false);
    }
  };

  function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

  return (
    <div className={styles.pageContainer}>
      <h1>Add Event</h1>
      {loading ? <LoadingSpinner message="Uploading" /> : null}
      <div className={styles.formContainer}>
        {/* Left Column: Image Upload */}
        <div className={styles.imageUploadSection}>
          <h2>Add Images</h2>

          <div className={styles.dropzone}>
            {/* Upload Icon SVG */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p>
              Drop your files here, or{" "}
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
              />
            </p>
          </div>
        </div>

        {/* Right Column: Event Details */}
        <form onSubmit={(e)=>e.preventDefault()} className={styles.eventDetailsSection}>
         <div className={styles.formGroup}>
            <label htmlFor="name">Title</label>
            <input  onChange={(item)=>{setName(item.target.value)}} value={name} type="text" id="name" placeholder="Festival" />
          </div>
         
          <div className={styles.formGroup}>
            <label htmlFor="latitude">Latitude</label>
            <input onChange={(item)=>{setLatitude(item.target.value)}} value={latitude} type="number" id="latitude" placeholder="e.g., 40.7128" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="longitude">Longitude</label>
            <input onChange={(item)=>{setLongitude(item.target.value)}} value={longitude} type="number" id="longitude" placeholder="e.g., -74.0060" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="event-date">Event Date</label>
            <input onChange={(e)=>setDate(e.target.value)}
        type="date" id="event-date" className={styles.datePicker} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter event details..."
              value={description}
              onChange={(item)=>{setDescription(item.target.value)}}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              placeholder="Enter full event address..."
              value={address}
              onChange={(item)=>{setAddress(item.target.value)}}
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={handleUpload}
            className={styles.publishBtn}
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;
