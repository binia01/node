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
<div className="bg-gray-50 py-12"> {/* Light background for the whole section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
          Discover Activities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map(activity => (
            <div key={activity.name} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
              {activity.imageUrl && (
                <img src={activity.imageUrl} alt={activity.name} className="w-full h-56 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{activity.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{activity.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1 sm:mb-0">
                      <span className="font-medium text-gray-700">Location:</span> {activity.location}
                    </p>
                    {activity.date && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Date:</span> {activity.date}
                      </p>
                    )}
                  </div>
                  {activity.tags && activity.tags.length > 0 && (
                    <div className="mt-3 sm:mt-0">
                      {activity.tags.map(tag => (
                        <span key={tag} className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoveryPage;