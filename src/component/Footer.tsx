
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* 1. Crisis / Emergency Banner (Crucial for Mental Health Sites) */}
      <div className="bg-red-900/80 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium">
          <span className="font-bold uppercase tracking-wider mr-2">Emergency:</span>
          If you or someone you know is in immediate danger, please call 000 (Aus) / 911 (US) or go to the nearest emergency room immediately.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
           
             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#fff" d="M14.84 16.26C17.86 16.83 20 18.29 20 20v2H4v-2c0-1.71 2.14-3.17 5.16-3.74L12 21l2.84-4.74M8 8h8v2a4 4 0 0 1-4 4a4 4 0 0 1-4-4V8m0-1l.41-4.1a1 1 0 0 1 1-.9h5.19c.51 0 .94.39.99.9L16 7H8m4-4h-1v1h-1v1h1v1h1V5h1V4h-1V3Z"/></svg>
              <span className="text-2xl font-bold">MindCare</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Compassionate, evidence-based psychological support tailored to your unique journey. We are dedicated to cultivating your inner peace through accessible digital care.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[var(--color-primary-teal)] transition">Home</Link></li>
              <li><Link to="/booking" className="hover:text-[var(--color-primary-teal)] transition">Book a Session</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-primary-teal)] transition">Our Services</Link></li>
              <li><Link to="/login" className="hover:text-[var(--color-primary-teal)] transition">Patient Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Therapy Focus</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-default">Anxiety & Depression</li>
              <li className="hover:text-white transition cursor-default">Cognitive Behavioral Therapy</li>
              <li className="hover:text-white transition cursor-default">Trauma & PTSD</li>
              <li className="hover:text-white transition cursor-default">Relationship Counselling</li>
            </ul>
          </div>

          {/* Column 4: Contact & Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[var(--color-primary-teal)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>support@mindcare.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[var(--color-primary-teal)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>123 Wellness Blvd,<br/>Sydney, NSW 2000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
           <p className="text-xs text-gray-500 text-justify">
             <strong>Medical Disclaimer:</strong> The content on this website is for informational purposes only and is not intended to substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. MindCare does not provide emergency services.
           </p>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MindCare. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;