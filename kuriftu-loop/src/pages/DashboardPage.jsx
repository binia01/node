import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase';

const DashboardPage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            history.push('/login');
        } else {
            const fetchUserData = async () => {
                try {
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    if (userDoc.exists) {
                        setUserData(userDoc.data());
                    } else {
                        setError('User data not found');
                    }
                } catch (err) {
                    setError('Error fetching user data');
                }
            };
            fetchUserData();
        }
    }, [history]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            history.push('/');
        } catch (err) {
            setError('Error logging out');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">Kuriftu Loop</h1>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main className="container mx-auto px-4 py-8">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {userData ? (
                    <>
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {userData.name}!</h2>
                        </div>
                        <div className="flex justify-around mb-8">
                            <div className="bg-white shadow-md rounded p-4 text-center">
                                <h3 className="text-gray-700 font-bold mb-2">Your Points</h3>
                                <p className="text-3xl text-indigo-600 font-bold">{userData.points}</p>
                            </div>
                            <div className="bg-white shadow-md rounded p-4 text-center">
                                <h3 className="text-gray-700 font-bold mb-2">Your Tier</h3>
                                <p className="text-xl text-green-500 font-bold">{userData.tier || 'Explorer'}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline text-center" onClick={() => history.push('/explore')}>
                                Explore Activities
                            </button>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline text-center" onClick={() => history.push('/redeem-qr')}>
                                Redeem QR Code
                            </button>
                            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline text-center" onClick={() => history.push('/feedback')}>
                                Give Feedback
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">Loading...</div>
                )}
            </main>
        </div>
    );
};

export default DashboardPage;