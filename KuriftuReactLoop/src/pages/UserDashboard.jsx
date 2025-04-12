// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        if (auth.currentUser) {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setError('Could not find user data.');
          }
        } else {
          setError('No user logged in.');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (userData) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <div className="bg-white rounded shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{auth.currentUser.displayName || 'Guest User'}</h2> {/* Display name if available */}
          <p className="text-gray-700 mb-2">Current Points: <span className="font-bold text-green-500">{userData.points}</span></p>
          <p className="text-gray-700 mb-4">Tier: <span className="font-bold text-blue-500">{userData.tier}</span></p>

          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-500">No recent activity recorded yet.</p> {/* We'll populate this later */}

          <h3 className="text-lg font-semibold mt-4 mb-2">Feedback History</h3>
          <p className="text-gray-500">No feedback submitted yet.</p> {/* We'll populate this later */}
        </div>
      </div>
    );
  }

  return null; // Or a message indicating no user data
}

export default DashboardPage;