/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { useAuth } from '../context/Authcontet';
import Calendar from '../component/Calender';
import { useNavigate } from 'react-router-dom';

// Mock data matching your HTML
const PROVIDERS = [
    { name: 'Dr. Emily Chen, PhD', status: 'Active' },
    { name: 'Caleb Jones, LCSW', status: 'Active' },
    { name: 'Sarah Venti, MA', status: 'On Leave' },
];

const AdminDashboard = () => {
  const { user, logout, appointments } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 1. Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
        navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Filter appointments for the selected date on the calendar
  const selectedDayAppointments = selectedDate 
    ? appointments.filter(a => a.date === selectedDate) 
    : [];

  // Sort appointments by date (newest first) for the table
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
            
            {/* Metric Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <p className="text-sm text-gray-500">Total Zoom Bookings</p>
                <p className="text-3xl font-extrabold text-gray-900">{appointments.length}</p>
            </div>
            
            {/* Metric Card 2 */}
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
                {/* Admin sees ALL appointments */}
                <Calendar events={appointments} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                
                {/* Selected Date Details (Admin View) */}
                {selectedDate && (
                   <div className="mt-4 p-4 bg-[var(--color-accent-light)] rounded-lg border border-blue-100 animate-fade-in">
                      <h4 className="font-bold text-gray-800 mb-2">Bookings for {selectedDate}</h4>
                      {selectedDayAppointments.length === 0 ? (
                          <p className="text-sm text-gray-500 italic">No bookings for this date.</p>
                      ) : (
                          <ul className="space-y-2">
                              {selectedDayAppointments.map(appt => (
                                  <li key={appt.id} className="text-sm bg-white p-2 rounded shadow-sm flex justify-between">
                                      <span><span className="font-bold">{appt.time}</span> - {appt.userName || 'Client'} with {appt.professionalName}</span>
                                      <span className="text-[var(--color-primary-teal)] font-mono text-xs">ID: {appt.userId}</span>
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
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Professional</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Zoom Link</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {recentAppointments.slice(0, 5).map((appt) => {
                                const isUpcoming = new Date(appt.date) >= new Date();
                                return (
                                    <tr key={appt.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900 font-medium">
                                            {appt.date} <br/> <span className="text-gray-500 font-normal">{appt.time}</span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">{appt.userName || 'Guest User'}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">{appt.professionalName.split(',')[0]}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <a href={appt.zoomLink} target="_blank" rel="noreferrer" className="text-[var(--color-secondary-lavender)] hover:underline text-xs font-bold">
                                                Open Zoom
                                            </a>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
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