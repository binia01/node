// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  if (loading) {
    // You can render a loading spinner here
    return <div>Loading...</div>;
  }

  if (user) {
    return children; // Render the protected component if the user is logged in
  } else {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;