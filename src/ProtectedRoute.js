import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * This component checks if a user is allowed to see a page.
 * If not, it redirects them to the 'redirectTo' path.
 * * @param {object} props
 * @param {boolean} props.isAllowed - The condition to check (e.g., isUserLoggedIn)
 * @param {string} props.redirectTo - The path to redirect to if not allowed (e.g., "/login")
 * @param {React.ReactNode} props.children - The page component to render if allowed
 */
function ProtectedRoute({ isAllowed, redirectTo = '/login', children }) {
  
  // 1. Check the condition
  if (!localStorage.getItem("email")) {
    // 2. If not allowed, redirect to the login page
    // 'replace' stops the user from clicking "back" to this protected page
    return <Navigate to={redirectTo} replace />;
  }

  // 3. If allowed, render the child component (the actual page)
  return children;
}

export default ProtectedRoute;