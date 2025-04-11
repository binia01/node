import React from 'react';
import {  Routes, Route, Link } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DiscoveryPage from './pages/DiscoveryPage';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  // const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <>
    <nav className="bg-gray-100 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold">Kuriftu Loop</Link>
          <div>
            <Link to="/discovery" className="mr-4">Explore</Link>
            <Link to="/dashboard">Dashboard</Link>
            {/* logout implementation here?  */}
          </div>
        </div>
      </nav>
     <Routes>
        <Route path="/" element={<div>Home Page </div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/discovery" element={<ProtectedRoute><DiscoveryPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      </Routes>
    </>
     
  );
}

export default App;