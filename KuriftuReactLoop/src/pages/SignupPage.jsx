// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signup successful:', user);
      await setDoc(doc(db, 'users', user.uid), {
        points: 0,
        tier: 'Explorer', // Default tier
        // Add other user-specific data here if needed
      });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.message);
      setError(error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{
            backgroundImage: "url('/images/kuriftu_pic.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed" 
  }}
>
    
<div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm bg-white/10 p-8 rounded-xl mx-auto my-8">


        <div className="flex-1 text-white text-center md:text-left">
            <div className="space-y-2 mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">TRAVEL</h2>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">EXPLORE</h2>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">WITH KURIFTU</h2>
           
            </div>
            <p className="text-xl text-white/90 italic font-semibold">Where Every Stay Becomes an Adventure!</p>
        </div>


        <div className="bg-white shadow-lg rounded-lg px-10 pt-6 pb-8 mb-4 max-w-lg mx-auto ">

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Join Kuriftu Loop</h2>
                <form onSubmit={handleSignup}>
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
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    Already have an account? <Link to='/login' className='text-indigo-500 hover:text-indigo-700'>Login</Link>
                </p>
            </div>
        </div>
    </div>
  );
}

export default SignupPage;