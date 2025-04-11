import React from 'react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    };

    const handleSignup = () => {
        history.push('/signup');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600">Kuriftu Loop</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center items-center text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Enhance Your Kuriftu Experience</h2>
                <p className="text-lg text-gray-700 mb-8">Unlock rewards, share feedback, and explore Kuriftu like never before.</p>
                <div className="flex space-x-4">
                    <button 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button 
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                </div>
            </main>
            {/* Optional Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default HomePage;