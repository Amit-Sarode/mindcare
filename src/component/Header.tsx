/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontet';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M14.84 16.26C17.86 16.83 20 18.29 20 20v2H4v-2c0-1.71 2.14-3.17 5.16-3.74L12 21l2.84-4.74M8 8h8v2a4 4 0 0 1-4 4a4 4 0 0 1-4-4V8m0-1l.41-4.1a1 1 0 0 1 1-.9h5.19c.51 0 .94.39.99.9L16 7H8m4-4h-1v1h-1v1h1v1h1V5h1V4h-1V3Z"/></svg>
            <span className="text-2xl font-bold text-gray-900">MindCare</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/booking" className="text-gray-600 hover:text-primary-teal transition">Book Now</Link>
            <a href="/#services" className="text-gray-600 hover:text-primary-teal transition">Services</a>
            {user && (
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-gray-600 hover:text-primary-teal transition">Dashboard</Link>
            )}
          </nav>

          <div className="hidden md:flex space-x-3">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                <button onClick={handleLogout} className="px-5 py-2 text-sm font-semibold text-white bg-gray-600 rounded-full hover:bg-gray-700 transition">
                   Log Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/signup" className="px-5 py-2 text-sm font-semibold text-primary-teal border border-primary-teal rounded-full hover:bg-primary-teal/10 transition">
                  Register
                </Link>
                <Link to="/login" className="px-5 py-2 text-sm font-semibold text-white bg-secondary-lavender rounded-full hover:bg-blue-400 transition">
                  Sign In
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-2">
           <Link to="/booking" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-teal/10">Book Now</Link>
           {!user && <Link to="/login" className="block w-full text-left px-3 py-2 text-primary-teal font-bold">Sign In</Link>}
        </div>
      )}
    </header>
  );
};

export default Header;