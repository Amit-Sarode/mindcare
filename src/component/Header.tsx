/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontet'; 
import logo from '../assets/logo (1).png'
import NotificationBell from './Notification'
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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
           
            <img className='h-50  w-50 object-contain' src={logo}/>
          </Link>


  

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
             <Link to="/" className="text-gray-600 hover:text-[var(--color-primary-teal)] transition font-medium">Home</Link>
            <Link to="/booking" className="text-gray-600 hover:text-[var(--color-primary-teal)] transition font-medium">Book Now</Link>
            {/* New Links */}
            <Link to="/blog" className="text-gray-600 hover:text-[var(--color-primary-teal)] transition font-medium">Blog</Link>
            <Link to="/contact" className="text-gray-600 hover:text-[var(--color-primary-teal)] transition font-medium">Contact Us</Link>
            
            {user && (
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-gray-600 hover:text-[var(--color-primary-teal)] transition font-medium">Dashboard</Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Notification Icon (Only shown if logged in) */}
                {/* <button className="relative p-2 text-gray-400 hover:text-[var(--color-primary-teal)] transition">
                  <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </button> */}
                <NotificationBell/>

                <div className="h-6 w-px bg-gray-200"></div>

                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                <button onClick={handleLogout} className="px-5 py-2 text-sm font-semibold text-white bg-gray-600 rounded-full hover:bg-gray-700 transition shadow-sm">
                   Log Out
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/signup" className="px-5 py-2 text-sm font-semibold text-[var(--color-primary-teal)] border border-[var(--color-primary-teal)] rounded-full hover:bg-[var(--color-primary-teal)] hover:text-white transition">
                  Register
                </Link>
                <Link to="/login" className="px-5 py-2 text-sm font-semibold text-white bg-[var(--color-secondary-lavender)] rounded-full hover:bg-blue-400 transition shadow-md">
                  Sign In
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-4">
           
             {user && (
                // <button className="relative p-1 text-gray-400 hover:text-[var(--color-primary-teal)]">
                //   <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                //   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                // </button>
                <NotificationBell/>
             )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 rounded-md hover:bg-gray-100">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-[var(--color-primary-teal)]/10 hover:text-[var(--color-primary-teal)]" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/booking" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-[var(--color-primary-teal)]/10 hover:text-[var(--color-primary-teal)]" onClick={() => setMobileMenuOpen(false)}>Book Now</Link>
            
            <Link to="/blog" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-[var(--color-primary-teal)]/10 hover:text-[var(--color-primary-teal)]" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/contact" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-[var(--color-primary-teal)]/10 hover:text-[var(--color-primary-teal)]" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            
            {user && (
               <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-[var(--color-primary-teal)]/10 hover:text-[var(--color-primary-teal)]" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            )}

            {!user && (
               <div className="pt-4 border-t border-gray-100 mt-2">
                  <Link to="/login" className="block w-full text-center px-4 py-3 text-white bg-[var(--color-primary-teal)] rounded-lg font-bold shadow-sm" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
               </div>
            )}
            {user && (
              <div className="pt-4 border-t border-gray-100 mt-2">
                  <button onClick={() => {handleLogout(); setMobileMenuOpen(false);}} className="block w-full text-center px-4 py-3 text-gray-600 bg-gray-100 rounded-lg font-bold">Log Out</button>
               </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;