import React, { useState } from 'react';
import { Appointment } from '../types';

interface CalendarProps {
  events: Appointment[];
  onDateSelect?: (date: string) => void;
  selectedDate?: string | null;
  interactive?: boolean; // If true, allows selecting future dates (for booking)
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
  today.setHours(0,0,0,0);

  const handleDayClick = (day: number) => {
    const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    const clickDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (interactive && clickDate < today) return; // Prevent picking past dates
    if (onDateSelect) onDateSelect(dateString);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">&larr;</button>
        <h4 className="text-xl font-semibold text-primary-teal">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">&rarr;</button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="font-medium text-gray-500">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {padding.map(i => <div key={`pad-${i}`} />)}
        
        {days.map(day => {
          const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
          const dayEvents = events.filter(e => e.date === dateStr);
          const isSelected = selectedDate === dateStr;
          const isPast = new Date(dateStr) < today;
          
          let className = "h-20 border rounded-lg p-1 cursor-pointer transition flex flex-col items-center justify-start ";
          
          if (interactive) {
             if (isPast) className += "bg-gray-50 text-gray-300 cursor-not-allowed ";
             else if (isSelected) className += "bg-secondary-lavender text-white ring-2 ring-primary-teal ";
             else className += "bg-white hover:bg-blue-50 text-gray-700 ";
          } else {
             // Dashboard view style
             className += dayEvents.length > 0 ? "bg-primary-teal/10 border-primary-teal " : "bg-white ";
             if (isSelected) className += "ring-2 ring-secondary-lavender ";
          }

          return (
            <div key={day} className={className} onClick={() => handleDayClick(day)}>
              <span className={`font-bold ${dayEvents.length > 0 ? 'text-primary-teal' : ''}`}>{day}</span>
              {dayEvents.length > 0 && !interactive && (
                <span className="text-xs bg-primary-teal text-white px-1.5 rounded-full mt-1">
                  {dayEvents.length}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;