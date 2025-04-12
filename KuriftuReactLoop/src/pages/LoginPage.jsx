import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Import the auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;




      console.log('Login successful:', user);
      // Redirect to the discovery page after successful login
      navigate('/discovery');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message);
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Please check your email or sign up.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-100 to-white 
                flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="container flex flex-col justify-center md:flex-row w-full max-w-3xl h-[28rem] md:h-[24rem] shadow-xl rounded-xl overflow-hidden mx-auto">

            <div className="w-full md:w-2/5 h-64 md:h-auto bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/kuriftu pic4.jpg')",
                minHeight: '300px'
                }}>
                </div>

                {/* Form section (right) */}
            <div className="w-full md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Kuriftu Loop</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm italic mb-4">{error}</div>}
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Login
                    </button>
                    <p className="text-center text-gray-600 text-sm mt-4">
                        Don't have an account? <Link to='/signup' className='text-green-500 hover:text-green-700'>Sign Up</Link>
                    </p>
                </form>
            </div>
            </div>
        </div>
  );
}

export default LoginPage;