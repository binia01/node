import React from 'react';

const ExploreActivitiesPage = () => {
    // Hardcoded activities for MVP
    const activities = [
        {
            name: 'Spa Treatment',
            description: 'Relax and rejuvenate with our luxurious spa services.',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Dining Experience',
            description: 'Enjoy a gourmet meal at our exquisite restaurant.',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Adventure Tours',
            description: 'Explore the beautiful surroundings with our guided tours.',
            image: 'https://via.placeholder.com/150'
        },
        // Add more activities as needed
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-gray-800">Explore Activities</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore Activities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map((activity, index) => (
                        <div key={index} className="bg-white shadow-md rounded overflow-hidden">
                            <img className="w-full h-48 object-cover" src={activity.image} alt={activity.name} />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{activity.name}</h3>
                                <p className="text-gray-700 text-sm">{activity.description}</p>
                                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block w-full text-center">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ExploreActivitiesPage;