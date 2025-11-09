import React from 'react';
import styles from './LoadingSpinner.module.css';

/**
 * A simple, centered, infinite progress spinner.
 * To use it as an overlay, wrap it in a container
 * with position: relative.
 */
function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default LoadingSpinner;