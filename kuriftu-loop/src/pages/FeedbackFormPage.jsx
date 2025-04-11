import React, { useState } from 'react';
import { db } from '../firebase'; // Adjust the import based on your firebase.js structure

const FeedbackFormPage = () => {
    const [serviceType, setServiceType] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Collect feedback data
            const feedbackData = {
                serviceType,
                sentiment,
                feedbackText,
                createdAt: new Date(),
            };

            // Submit feedback to Firestore
            await db.collection('feedback').add(feedbackData);
            setMessage('Feedback Submitted! Points Awarded!');
            // Clear form fields
            setServiceType('');
            setSentiment('');
            setFeedbackText('');
        } catch (error) {
            setMessage('Error submitting feedback. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Give Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Service Type</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                        >
                            <option value="">Select Service Type</option>
                            <option value="Spa">Spa</option>
                            <option value="Dining">Dining</option>
                            <option value="Adventure">Adventure</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Your Sentiment</label>
                        <div className="flex space-x-4">
                            <button type="button" className={`py-2 px-4 rounded ${sentiment === 'Positive' ? 'bg-green-500' : 'bg-gray-300'}`} onClick={() => setSentiment('Positive')}>😊 Positive</button>
                            <button type="button" className={`py-2 px-4 rounded ${sentiment === 'Neutral' ? 'bg-yellow-500' : 'bg-gray-300'}`} onClick={() => setSentiment('Neutral')}>😐 Neutral</button>
                            <button type="button" className={`py-2 px-4 rounded ${sentiment === 'Negative' ? 'bg-red-500' : 'bg-gray-300'}`} onClick={() => setSentiment('Negative')}>😞 Negative</button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Optional Feedback</label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        />
                    </div>
                    {message && <div className="text-green-500 text-sm italic mb-4 text-center">{message}</div>}
                    <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackFormPage;