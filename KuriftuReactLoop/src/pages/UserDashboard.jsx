// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Gift, ActivitySquare, MessageCircle, Star, Users2 } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-10">🌿 User Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - User Info */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={auth.currentUser.photoURL || '/default-avatar.png'}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border-2 border-green-400 object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold text-green-800">
                  {auth.currentUser.displayName || 'Guest User'}
                </h2>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </div>
            </div>
    
            {/* Points and Tier */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Current Points: <span className="font-bold text-green-600">{userData.points}</span>
              </p>
              <div className="w-full bg-green-100 h-3 rounded-full mb-2">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${Math.min((userData.points / 1000) * 100, 100)}%` }}
                />
              </div>
              <p className="text-gray-700">
                Tier: <span className="font-bold text-green-500">{userData.tier}</span>
              </p>
            </div>
    
            {/* Badges & Achievements */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-yellow-500" size={20} />
                <h3 className="text-lg font-semibold text-green-700">Badges & Achievements</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🌱 Newbie</span>
                <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-medium">🔥 Streak 7 Days</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">⭐ Top 10%</span>
              </div>
            </div>
    
            {/* Referrals */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users2 className="text-green-600" size={20} />
                <h3 className="text-lg font-semibold text-green-700">Referrals</h3>
              </div>
              <p className="text-gray-600 mb-2">
                You’ve referred <span className="font-semibold text-green-700">3 friends</span>. Keep going!
              </p>
              <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm transition">
                📩 Invite More Friends
              </button>
            </div>
          </div>
    
          {/* Right Section - Rewards */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="text-green-600" size={24} />
              <h2 className="text-2xl font-semibold text-green-800">Available Rewards</h2>
            </div>
    
            {/* Rewards Placeholder */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-green-800 font-medium">Reward #{i}</p>
                    <p className="text-sm text-gray-500">Reward description goes here.</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                    Claim
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return null; // Or a message indicating no user data
}

export default DashboardPage;