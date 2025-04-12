// src/pages/DashboardPage.jsx
import React from 'react';

function UserDashboard() {
  // For now, we'll hardcode user data
  const user = {
    name: "Guest User",
    points: 150,
    tier: "Explorer"
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
      <div className="bg-white rounded shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
        <p className="text-gray-700 mb-2">Current Points: <span className="font-bold text-green-500">{user.points}</span></p>
        <p className="text-gray-700 mb-4">Tier: <span className="font-bold text-blue-500">{user.tier}</span></p>

        <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
        <p className="text-gray-500">No recent activity recorded yet.</p> {/* We'll populate this later */}

        <h3 className="text-lg font-semibold mt-4 mb-2">Feedback History</h3>
        <p className="text-gray-500">No feedback submitted yet.</p> {/* We'll populate this later */}
      </div>
    </div>
  );
}

export default UserDashboard;