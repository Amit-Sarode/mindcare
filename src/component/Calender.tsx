/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { Appointment } from '../types';

interface CalendarProps {
  events: Appointment[];
  onDateSelect?: (date: string) => void;
  selectedDate?: string | null;
  interactive?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateSelect, selectedDate, interactive = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => i);
  
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

  const handleDayClick = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    const clickDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // Prevent selecting past dates in interactive mode
    if (interactive && clickDate < new Date(new Date().setHours(0,0,0,0))) return;
    
    if (onDateSelect) onDateSelect(dateStr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
            onClick={() => changeMonth(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-[var(--color-primary-teal)] transition"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h4 className="text-lg font-bold text-gray-800 tracking-wide uppercase">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <button 
            onClick={() => changeMonth(1)} 
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-[var(--color-primary-teal)] transition"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
      
      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {padding.map(i => <div key={`pad-${i}`} />)}
        
        {days.map(day => {
          const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
          const dayEvents = events.filter(e => e.date === dateStr);
          const isSelected = selectedDate === dateStr;
          const isToday = isCurrentMonth && day === today.getDate();
          const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));
          
          let containerClass = "relative h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ";
          
          if (interactive) {
             if (isPast) {
                 containerClass += "text-gray-300 cursor-not-allowed ";
             } else if (isSelected) {
                 containerClass += "bg-gradient-to-br from-[var(--color-primary-teal)] to-teal-600 text-white shadow-md scale-110 ";
             } else {
                 containerClass += "text-gray-700 hover:bg-teal-50 hover:text-[var(--color-primary-teal)] cursor-pointer hover:scale-105 ";
             }
          } else {
             // Dashboard View Logic
             if (isSelected) containerClass += "ring-2 ring-[var(--color-secondary-lavender)] ring-offset-1 ";
             if (dayEvents.length > 0) {
                 containerClass += "bg-teal-50 text-[var(--color-primary-teal)] font-bold ";
             } else {
                 containerClass += "text-gray-700 ";
             }
          }

          return (
            <div key={day} onClick={() => handleDayClick(day)} className="flex justify-center">
                <div className={containerClass}>
                    {day}
                    {/* Today Indicator Dot */}
                    {isToday && !isSelected && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[var(--color-secondary-lavender)]"></span>
                    )}
                    {/* Event Indicator Dot (Dashboard only) */}
                    {!interactive && dayEvents.length > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--color-primary-teal)] ring-1 ring-white"></span>
                    )}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;