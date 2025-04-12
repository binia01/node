// src/pages/DiscoveryPage.jsx
import React, { useState, useEffect } from 'react';
import activitiesData from '../data/activities.json'; // Import the JSON data

function DiscoveryPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = () => {
      setLoading(true);
      setError('');
      try {
        // Simulate an asynchronous operation
        setTimeout(() => {
          setActivities(activitiesData.activities); // Access the 'activities' array
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Error loading activities:', err);
        setError('Failed to load activities.');
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return <div>Loading activities...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Discover Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map(activity => (
          <div key={activity.name} className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{activity.name}</h2>
            <p className="text-gray-700 mb-2">{activity.description}</p>
            {activity.imageUrl && <img src={activity.imageUrl} alt={activity.name} className="w-full h-32 object-cover rounded mb-2" />}
            <p className="text-sm text-gray-500">Location: {activity.location}</p>
            {activity.date && <p className="text-sm text-gray-500">Date: {activity.date}</p>}
            {activity.tags && activity.tags.length > 0 && (
              <div className="mt-2">
                <span className="text-sm text-gray-600">Tags:</span>
                {activity.tags.map(tag => (
                  <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoveryPage;