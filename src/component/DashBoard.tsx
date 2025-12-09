import React, { useState } from 'react';
import { useAuth } from '../context/Authcontet';
import Calendar from '../component/Calender';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, appointments } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!user) return <p className="text-center py-20">Please log in.</p>;

  // Filter appointments for the current user
  const myAppointments = appointments.filter(a => a.userId === user.id);
  const selectedDayAppointments = selectedDate ? myAppointments.filter(a => a.date === selectedDate) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Sidebar */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-primary-teal/20">
               <h3 className="font-bold text-primary-teal text-xl mb-2">Quick Book</h3>
               <p className="text-sm text-gray-600 mb-4">Find your next session.</p>
               <button onClick={() => navigate('/booking')} className="w-full py-2 bg-secondary-lavender text-white font-bold rounded-lg hover:bg-blue-400 transition">
                  Book New Session
               </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
               <h3 className="font-bold text-gray-800 text-xl mb-4 border-b pb-2">Upcoming Sessions</h3>
               {myAppointments.length === 0 ? <p className="text-gray-500 italic">No bookings.</p> : (
                  <div className="space-y-3">
                     {myAppointments.slice(0, 3).map(appt => (
                        <div key={appt.id} className="p-3 bg-accent-light rounded-lg border-l-4 border-primary-teal">
                           <p className="font-semibold">{appt.professionalName}</p>
                           <p className="text-xs text-gray-600">{appt.date} @ {appt.time}</p>
                           <a href={appt.zoomLink} target="_blank" rel="noreferrer" className="text-secondary-lavender text-xs font-bold hover:underline block mt-1">Join Zoom</a>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>

         {/* Main Calendar Area */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
               <h3 className="text-xl font-bold mb-4">My Wellness Calendar</h3>
               <Calendar events={myAppointments} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
            </div>

            {/* Day Details */}
            {selectedDate && (
               <div className="bg-white p-6 rounded-xl shadow animate-fade-in">
                  <h4 className="font-bold text-lg mb-4">Details for {selectedDate}</h4>
                  {selectedDayAppointments.length === 0 ? <p className="text-gray-500">No sessions scheduled.</p> : (
                     <div className="space-y-2">
                        {selectedDayAppointments.map(appt => (
                           <div key={appt.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                              <div>
                                 <p className="font-bold">{appt.professionalName}</p>
                                 <p className="text-sm">{appt.time} - {appt.type}</p>
                              </div>
                              <a href={appt.zoomLink} className="px-4 py-2 bg-primary-teal text-white text-sm rounded-lg hover:bg-teal-600">Launch</a>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;