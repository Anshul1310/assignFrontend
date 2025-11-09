import React, { useState, useEffect, useRef } from "react";
// Import the CSS module
import { useParams } from "react-router-dom";
import styles from "./ChatApp.module.css";
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
// const firebaseConfig = {
//   apiKey: "AIzaSyBNcvdM8ckE4gCxbxduxZFbDlmRWx3G13M",
//   authDomain: "indulge-93dc5.firebaseapp.com",
//   databaseURL: "https://indulge-93dc5-default-rtdb.firebaseio.com",
//   projectId: "indulge-93dc5",
//   storageBucket: "indulge-93dc5.firebasestorage.app",
//   messagingSenderId: "30146789957",
//   appId: "1:30146789957:web:d18756e2152a4f16e9192c",
//   measurementId: "G-15VPVN54Z2"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// Initial demo messages

function ChatApp() {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [events, setEvents] = useState(null);
    const [event, setEvent] = useState({
      "name":"name",
      "description":"description",
      "date":"date",
      "email":"email",
      "address":"address"
    });
  const [loading, setLoading] = useState(true);

  const getRoomInfo = () => {
    try {
      const eventsRef = ref(db, `events/${room}`);

      const unsubscribe = onValue(
        eventsRef,
        (snapshot) => {
          // 3. Get the data from the snapshot

          const snap = snapshot.val();

          Object.keys(snap).forEach((key) => {
           setEvent(snap[key])
             
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
  };

  useEffect(() => {
    // Define the database path (or "branch") you want to listen to.
    // Here, we're listening to a node called 'events'.

    getRoomInfo();
    const eventsRef = ref(db, `chats/${room}`);

    // onValue() sets up the realtime listener.
    // It returns an 'unsubscribe' function.
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      // Get the data from the snapshot
      const data = snapshot.val();
      console.log(data);

      if (data) {
        // If data exists, convert it from an object to an array
        const eventList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEvents(eventList);
        setMessages(
          eventList.map((item) => {
            if (item.user == localStorage.getItem("email")) {
              return { ...item, type: "sent" };
            } else {
              return { ...item, type: "received" };
            }
          })
        );
      } else {
        setEvents([]); // Handle empty data
      }
      setLoading(false);
    });

    // --- 4. Cleanup function ---
    // This is crucial. When the component unmounts,
    // this return function will be called, detaching the listener.
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    if(newMessage!=""){
    const now = new Date();
    const timeString = now
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
    try {
      console.log(room);
      e.preventDefault();
      const chatRef = ref(db, `chats/${room}`);
      await push(chatRef, {
        text: newMessage.trim(),
        time: timeString,
        user: localStorage.getItem("email") || "anshul",
        createdAt: serverTimestamp(), // Adds a server-side timestamp
      });
    } catch (e) {
      console.log(e.message);
    }
    const message = {
      id: messages.length + 1,
      type: "sent",
      text: newMessage.trim(),
      time: timeString,
      avatar: "https://i.pravatar.cc/150?img=58", // User's avatar
    };
    setMessages([...messages, message]);
    setNewMessage("");
  }else{
    alert("Please write a message")
  }
  };

  return (
    // This wrapper div creates the dark background and centers the app

   
 <div className={styles.appWrapper}>
      <div className={styles.appContainer}>
        {loading ? <LoadingSpinner message="Give us a moment" /> : null}
        {/* App Header */}
        <header className={styles.appHeader}>
          <div className={styles.headerNav}>
            <a href="#" className={styles.navLink}>
              NEED HELP
            </a>
          </div>
          <div className={styles.headerIcons}>
            
            
          </div>
        </header>

        {/* Main Chat Layout */}
        <main className={styles.chatLayout}>
          {/* Left Panel: Chat */}
          <section className={styles.chatPanel}>
            <div className={styles.chatMessages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${
                    msg.type === "sent" ? styles.sent : styles.received
                  }`}
                >
                  {msg.type === "received" && (
                    <img
                      src={msg.avatar}
                      alt="Avatar"
                      className={styles.messageAvatar}
                    />
                  )}
                  <div className={styles.messageContent}>
                    <div className={styles.messageBubble}>
                      {msg.text}
                      <span className={styles.messageTime}>{msg.time}</span>
                    </div>
                  </div>
                  {msg.type === "sent" && (
                    <img
                      src={msg.avatar}
                      alt="Avatar"
                      className={styles.messageAvatar}
                    />
                  )}
                </div>
              ))}
              {/* Empty div to mark the end of messages for scrolling */}
              <div ref={messagesEndRef} />
            </div>

            <form className={styles.chatInputArea} onSubmit={handleSendMessage}>
              
              <input
                type="text"
                placeholder="Type here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="button" className={styles.iconButton}>
               
              </button>
              <button
                type="submit"
                className={`${styles.iconButton} ${styles.sendButton}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </section>

          {/* Right Panel: Profile */}
          <section className={styles.profileSidebar}>
            <div className={styles.profileHeader}>
              <div className={styles.profileAvatarContainer}>
                <img
                  src={event.image}
                  alt="Christino Morillo"
                  className={styles.profileAvatarLarge}
                />
              </div>
              <h2 className={styles.profileName}>{event.name}</h2>
              <div className={styles.profileStatus}>
                <span className={styles.statusDot}></span>
                Active Now
              </div>
            </div>
            <div className={styles.profileActions}>
              
              <button onClick={()=>{window.location.href = `mailto:${event.email}`;}} className={styles.actionButton}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
             
            </div>
            <div className={styles.profileDetails}>
              <div className={styles.detailItem}>
                <label>EMAIL</label>
                <p>{event.email}</p>
              </div>
              <div className={styles.detailItem}>
                <label>NAME</label>
                <p>{event.name}</p>
              </div>
              <div className={styles.detailItem}>
                <label>ADDRESS</label>
                <p>{event.address}</p>
              </div>
              <div className={styles.detailItem}>
                <label>DESCRIPTION</label>
                <p>{event.description}</p>
              </div>
              <div className={styles.detailItem}>
                <label>DATE</label>
                <p>{event.date}</p>
              </div>
            </div>
            <button onClick={()=>{
               window.location.href = '/events';
            }} className={styles.blockButton}>Leave</button>
          </section>
        </main>
      </div>
    </div>
    
   
  );
}

export default ChatApp;
