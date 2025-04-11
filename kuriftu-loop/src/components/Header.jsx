import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">Kuriftu Loop</h1>
                <nav className="flex space-x-4">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-700">Login</Link>
                    <Link to="/signup" className="text-green-500 hover:text-green-600">Sign Up</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;