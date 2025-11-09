import React from "react";
// Import the CSS module file as an object named 'styles'
import styles from "./Login.module.css";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase'; // Import from your firebase.js
import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoadingSpinner from "./LoadingSpinner";

function Login() {
  const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

   const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // try {
      // const userData = {
      //   email: email,
      //   password: password,
      // };
      // const response = await axios.post(
      //   "https://assignment-backend-orpin.vercel.app/api/signup",
      //   userData
      // );
      // localStorage.setItem("email", email);
      // window.location.href = '/home'
      // console.log(response.data);

      try {
        setLoading(true)
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // --- THIS IS THE KEY PART ---
      // Save additional user info to the Realtime Database
      await set(ref(db, 'users/' + user.uid), {
        email: user.email,
        // Add any other profile data you want here
        createdAt: new Date().toISOString(),
      });
      // --- End of Realtime Database write ---

      console.log('User created successfully and data saved!');
       localStorage.setItem("email", email);
       setLoading(false)
      window.location.href = '/home'
    } catch (err) {
      setError(err.message);
       setLoading(false)
      console.error('Error signing up:', err.message);
    }

    // } catch (e) {
    //   alert(e.response.data);
    // }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true)
    // try {
    //   const response = await axios.post(
    //     "https://assignment-backend-orpin.vercel.app/api/login",
    //     userData
    //   );
    //   localStorage.setItem("email", email);
    //   window.location.href = '/home';
    //   console.log(response.data);
    // } catch (e) {
    //   console.log(e.response.data);
    //   alert(e.response.data);
    // }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');
      localStorage.setItem("email", email);
       setLoading(false)
      window.location.href = '/home';
      // console.log(response.data);
    } catch (err) {
      setError(err.message);
       setLoading(false)
      console.error('Error logging in:', err.message);
    }
  };

  return (
    // Use styles.loginContainer as the className

    <div className={styles.bg}>
       {loading ? <LoadingSpinner message="Give us a moment" /> : null}
      <div className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <h2>Login</h2>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
              required
            />
          </div>

          {/* You can combine classes like this if needed */}
          <button
            type="submit"
            onClick={handleSignIn}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Login
          </button>

          <div className={styles.separator}>
            <span>or</span>
          </div>

          <button
            type="button"
            onClick={handleSignup}
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            Sign Up
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
