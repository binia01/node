// src/pages/DiscoveryPage.jsx
import React, { useState, useEffect } from 'react';
import activitiesData from '../data/activities.json'; // Import the JSON data
import Button from '../components/Button'; // new import
import RedeemPopup from '../components/RedeemPopup'; // new import
import FeedbackPopup from '../components/FeedbackPopup'; // new import

function DiscoveryPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRedeemPopupOpen, setIsRedeemPopupOpen] = useState(false); // new state for popup
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false); // new state
  const [selectedActivity, setSelectedActivity] = useState(null); // new state

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

  const handleRedeem = (points) => { // new callback
    console.log('Redeemed points:', points);
    setIsRedeemPopupOpen(false);
  };

  const handleFeedbackSubmit = (activity, feedback, points) => { // new callback
    console.log(`Feedback for ${activity}: ${feedback} (Awarded Points: ${points})`);
  };

  if (loading) {
    return <div>Loading activities...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">🌿 Discover Activities</h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map(activity => (
            <div
              key={activity.name}
              className="bg-white border border-green-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {activity.imageUrl && (
                <img
                  src={activity.imageUrl}
                  alt={activity.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">{activity.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{activity.description}</p>
    
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-green-700">📍 Location:</span> {activity.location}
                    </p>
                    {activity.date && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-green-700">📅 Date:</span> {activity.date}
                      </p>
                    )}
                  </div>
    
                  {activity.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                      {activity.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" onClick={() => setIsRedeemPopupOpen(true)}>
                    Redeem
                  </Button>
                  <Button variant="info" onClick={() => { 
                    setSelectedActivity(activity.name); 
                    setIsFeedbackPopupOpen(true); 
                  }}>
                    Feedback
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <RedeemPopup
          isOpen={isRedeemPopupOpen}
          onClose={() => setIsRedeemPopupOpen(false)}
          onRedeem={handleRedeem}
        />
        <FeedbackPopup
          isOpen={isFeedbackPopupOpen}
          activity={selectedActivity}
          onClose={() => setIsFeedbackPopupOpen(false)}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      </div>
    </div>
  );
}

export default DiscoveryPage;