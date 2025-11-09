import React from "react";
// Import the CSS module file as an object named 'styles'
import styles from "./Login.module.css";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "https://assignment-backend-orpin.vercel.app/api/signup",
        userData
      );
      localStorage.setItem("email", email);
      window.location.href = '/home'
      console.log(response.data);
    } catch (e) {
      alert(e.response.data);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://assignment-backend-orpin.vercel.app/api/login",
        userData
      );
      localStorage.setItem("email", email);
      window.location.href = '/home';
      console.log(response.data);
    } catch (e) {
      console.log(e.response.data);
      alert(e.response.data);
    }
  };

  return (
    // Use styles.loginContainer as the className

    <div className={styles.bg}>
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

          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
