import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy Data
const NOTIFICATIONS = [
  { id: 1, text: "Dr. Chen confirmed your appointment.", time: "2 min ago", unread: true },
  { id: 2, text: "Your session summary is ready.", time: "1 hr ago", unread: true },
  { id: 3, text: "Welcome to MindCare! Complete your profile.", time: "1 day ago", unread: false },
];

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Logic to close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if there are unread messages for the red dot
  const hasUnread = NOTIFICATIONS.some(n => n.unread);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* 1. The Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition duration-300 ${isOpen ? 'bg-teal-50 text-[var(--color-primary-teal)]' : 'text-gray-400 hover:text-[var(--color-primary-teal)]'}`}
      >
        {hasUnread && (
          <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
        )}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
      </button>

      {/* 2. The Popup Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
              <button className="text-xs text-[var(--color-primary-teal)] hover:underline font-medium">Mark all read</button>
            </div>

            {/* List */}
            <ul className="max-h-64 overflow-y-auto custom-scrollbar">
              {NOTIFICATIONS.length > 0 ? (
                NOTIFICATIONS.map((note) => (
                  <li key={note.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer flex gap-3 ${note.unread ? 'bg-blue-50/30' : ''}`}>
                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${note.unread ? 'bg-[var(--color-primary-teal)]' : 'bg-transparent'}`}></div>
                    <div>
                      <p className={`text-sm ${note.unread ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{note.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{note.time}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-6 text-center text-gray-400 text-sm">No new notifications</li>
              )}
            </ul>

            {/* Footer */}
            <div className="p-2 border-t border-gray-100 text-center">
              <button className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition">View All Activity</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;