/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { useAuth } from '../context/Authcontet';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email); // Ensure your login function returns the user object or true/false

    if (success) {
      // --- ROUTE CONDITION LOGIC ---
      // Check if the email mimics an admin (based on your mock logic in AuthContext)
      if (email.includes('admin')) {
          navigate('/admin');
      } else {
          navigate('/dashboard');
      }
    } else {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--color-mind-bg)]">
       <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] focus:border-[var(--color-primary-teal)] outline-none transition" 
                  placeholder="name@example.com" 
                  required 
                />
             </div>
             
             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

             <button type="submit" className="w-full py-3 text-lg font-bold text-white bg-[var(--color-primary-teal)] rounded-lg shadow-md hover:bg-teal-600 transition duration-300 transform hover:scale-[1.01]">
                Sign In
             </button>
          </form>

          <div className="mt-6 text-center space-y-2">
             <p className="text-sm text-gray-600">
                User Demo: <button onClick={() => setEmail('user@example.com')} className="font-mono font-bold text-[var(--color-primary-teal)] hover:underline">user@example.com</button>
             </p>
             <p className="text-sm text-gray-600">
                Admin Demo: <button onClick={() => setEmail('admin@mindcare.com')} className="font-mono font-bold text-[var(--color-secondary-lavender)] hover:underline">admin@mindcare.com</button>
             </p>
          </div>
       </div>
    </div>
  );
};

export default Login;