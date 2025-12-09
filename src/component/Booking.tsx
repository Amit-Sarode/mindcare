/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontet';
import Calendar from '../component/Calender';
import { Professional } from '../types';

const PROFESSIONALS: Professional[] = [
    { id: 'dr_chen', name: 'Dr. Emily Chen, PhD', specialty: 'CBT/Anxiety', avatar: 'https://placehold.co/50x50/20B2AA/FFFFFF?text=EC' },
    { id: 'caleb_jones', name: 'Caleb Jones, LCSW', specialty: 'DBT/Trauma', avatar: 'https://placehold.co/50x50/93C5FD/000000?text=CJ' },
    { id: 'sarah_venti', name: 'Sarah Venti, MA', specialty: 'Family/Couples', avatar: 'https://placehold.co/50x50/FFD700/000000?text=SV' },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'];

const Booking = () => {
  const { user, addAppointment } = useAuth();
  const navigate = useNavigate();
  
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleBooking = () => {
    if (selectedProfessional && selectedDate && selectedTime) {
      addAppointment({
        userId: user!.id,
        date: selectedDate,
        time: selectedTime,
        professionalId: selectedProfessional.id,
        professionalName: selectedProfessional.name,
        type: 'Video Call'
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center mb-8">Book Your Zoom Session</h2>
      
      {isSuccess ? (
         <div className="bg-green-50 p-8 rounded-xl text-center border border-green-200">
            <h3 className="text-2xl font-bold text-green-700 mb-2">Booking Confirmed!</h3>
            <p>Redirecting you to your dashboard...</p>
         </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-2xl space-y-8">
            {/* Step 1 */}
            <div>
               <h3 className="text-2xl font-bold text-primary-teal border-b pb-2 mb-4">1. Select Professional</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PROFESSIONALS.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => setSelectedProfessional(p)}
                      className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3 ${selectedProfessional?.id === p.id ? 'bg-primary-teal text-white ring-4 ring-primary-teal/30' : 'hover:bg-gray-50'}`}
                    >
                       <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full" />
                       <div>
                          <p className="font-bold">{p.name}</p>
                          <p className="text-xs opacity-75">{p.specialty}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Step 2 & 3 (Conditional) */}
            <div className={`transition-opacity duration-300 ${!selectedProfessional ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <h3 className="text-2xl font-bold text-primary-teal border-b pb-2 mb-4">2. Select Date & Time</h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <Calendar events={[]} interactive={true} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                   
                   <div>
                      <h4 className="font-semibold mb-3">Available Slots for {selectedDate || '...'}</h4>
                      <div className="flex flex-wrap gap-2">
                         {selectedDate ? TIME_SLOTS.map(t => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`px-4 py-2 rounded-full text-sm font-semibold border ${selectedTime === t ? 'bg-secondary-lavender text-white' : 'border-primary-teal text-primary-teal hover:bg-teal-50'}`}
                            >
                              {t}
                            </button>
                         )) : <p className="text-gray-500 italic">Select a date first.</p>}
                      </div>
                      
                      {selectedTime && (
                        <button onClick={handleBooking} className="w-full mt-8 py-3 bg-primary-teal text-white font-bold rounded-xl shadow-lg hover:bg-teal-600 transition">
                           Confirm Booking
                        </button>
                      )}
                   </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Booking;