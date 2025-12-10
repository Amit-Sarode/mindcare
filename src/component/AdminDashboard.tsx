/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontet';
import Calendar from '../component/Calender';
import { useNavigate } from 'react-router-dom';

const PROVIDERS = [
    { name: 'Dr. Emily Chen, PhD', status: 'Active' },
    { name: 'Caleb Jones, LCSW', status: 'Active' },
    { name: 'Sarah Venti, MA', status: 'On Leave' },
];

const AdminDashboard = () => {
  const { user, logout, appointments } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
        navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // --- METRIC CALCULATIONS ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to midnight
  const todayStr = today.toISOString().split('T')[0];

  const upcomingCount = appointments.filter(a => new Date(a.date) >= today).length;
  const todayCount = appointments.filter(a => a.date === todayStr).length;
  const totalCount = appointments.length;

  // Filter appointments for the selected date on the calendar
  const selectedDayAppointments = selectedDate 
    ? appointments.filter(a => a.date === selectedDate) 
    : [];

  // Sort appointments by date (newest first)
  const recentAppointments = [...appointments].sort((a, b) => 
    new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-[var(--color-mind-bg)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900">Admin Panel: Clinic Overview</h2>
        <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="px-5 py-2 text-sm font-semibold text-white bg-gray-600 rounded-full hover:bg-gray-700 transition duration-300"
        >
            Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Metrics & Providers */}
        <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-secondary-lavender)] border-b border-gray-200 pb-2">Key Metrics</h3>
            
            {/* Metric 1: Today's Count (Highlighted) */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--color-primary-teal)]">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Sessions Today</p>
                <div className="flex justify-between items-end">
                    <p className="text-4xl font-extrabold text-gray-900">{todayCount}</p>
                    <span className="text-xs text-[var(--color-primary-teal)] bg-teal-50 px-2 py-1 rounded-full font-semibold">Priority</span>
                </div>
            </div>

            {/* Metric 2: Upcoming Count */}
             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <p className="text-sm text-gray-500">Upcoming Sessions</p>
                <p className="text-3xl font-extrabold text-gray-900">{upcomingCount}</p>
            </div>

            {/* Metric 3: Total Count */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <p className="text-sm text-gray-500">Total Bookings (All Time)</p>
                <p className="text-3xl font-extrabold text-gray-700">{totalCount}</p>
            </div>
            
            {/* Metric 4: Pending (Static Mock) */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-3xl font-extrabold text-red-500">3</p>
            </div>

            {/* Provider List */}
            <h3 className="text-2xl font-bold mt-8 mb-4 text-[var(--color-secondary-lavender)] border-b border-gray-200 pb-2">Provider List</h3>
            <ul className="bg-white p-6 rounded-xl shadow-md space-y-3">
                {PROVIDERS.map((p, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                        <span className="font-medium">{p.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {p.status}
                        </span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Right Column: Calendar & Recent Bookings */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Calendar Section */}
            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Clinic Appointment Schedule</h3>
                <Calendar events={appointments} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                
                {/* Selected Date Details */}
                {selectedDate && (
                   <div className="mt-4 p-4 bg-[var(--color-accent-light)] rounded-lg border border-blue-100 animate-fade-in">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-800">Bookings for {selectedDate}</h4>
                        <span className="bg-white text-[var(--color-primary-teal)] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            {selectedDayAppointments.length} Meeting{selectedDayAppointments.length !== 1 && 's'}
                        </span>
                      </div>
                      
                      {selectedDayAppointments.length === 0 ? (
                          <p className="text-sm text-gray-500 italic">No bookings for this date.</p>
                      ) : (
                          <ul className="space-y-2">
                              {selectedDayAppointments.map(appt => (
                                  <li key={appt.id} className="text-sm bg-white p-3 rounded border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                      <div>
                                          <span className="font-bold text-gray-900 block sm:inline">{appt.time}</span> 
                                          <span className="hidden sm:inline mx-2 text-gray-300">|</span>
                                          <span className="text-gray-700">{appt.userName || 'Client'}</span>
                                          <span className="text-gray-400 mx-1">with</span>
                                          <span className="text-[var(--color-primary-teal)] font-medium">{appt.professionalName}</span>
                                      </div>
                                      <div className="mt-2 sm:mt-0 flex items-center gap-2">
                                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{appt.duration || '1 hr'}</span>
                                          <span className="text-xs font-mono text-gray-400">#{appt.id}</span>
                                      </div>
                                  </li>
                              ))}
                          </ul>
                      )}
                   </div>
                )}
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Recent Bookings & Requests</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Professional</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {recentAppointments.slice(0, 5).map((appt) => {
                                const isUpcoming = new Date(appt.date) >= today;
                                return (
                                    <tr key={appt.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">
                                            <div className="font-bold">{appt.date}</div>
                                            <div className="text-xs text-gray-500">{appt.time} ({appt.duration || '1 hr'})</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-600 font-medium">{appt.userName || 'Guest User'}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">{appt.professionalName.split(',')[0]}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <a href={appt.zoomLink} target="_blank" rel="noreferrer" className="text-[var(--color-secondary-lavender)] hover:text-blue-600 hover:underline text-xs font-bold flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-5 4v-4m0 0H8m2 0h2m-2 0V9m0 0H9m-1 4H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H8z"></path></svg>
                                                Zoom
                                            </a>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                                                {isUpcoming ? 'Confirmed' : 'Completed'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;