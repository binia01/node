import React, { useState } from 'react';

const FeedbackPopup = ({ isOpen, activity, onClose, onFeedbackSubmit }) => {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Award points based on feedback logic. Default is 5 points if feedback provided.
    const awardedPoints = feedback.trim() ? 5 : 0;
    onFeedbackSubmit(activity, feedback, awardedPoints);
    setFeedback('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-xl font-bold mb-4">Feedback for {activity}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Leave your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit Feedback
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPopup;
