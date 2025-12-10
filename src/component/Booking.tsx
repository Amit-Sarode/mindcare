import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontet'; // Fixed typo in import from 'Authcontet' to 'AuthContext'
import Calendar from '../component/Calender'; // Fixed typo 'component' to 'components'
import { Professional } from '../types';

const PROFESSIONALS: Professional[] = [
    { id: 'dr_chen', name: 'Dr. Emily Chen, PhD', specialty: 'CBT/Anxiety', avatar: 'https://placehold.co/50x50/20B2AA/FFFFFF?text=EC' },
    { id: 'caleb_jones', name: 'Caleb Jones, LCSW', specialty: 'DBT/Trauma', avatar: 'https://placehold.co/50x50/93C5FD/000000?text=CJ' },
    { id: 'sarah_venti', name: 'Sarah Venti, MA', specialty: 'Family/Couples', avatar: 'https://placehold.co/50x50/FFD700/000000?text=SV' },
];

// Added 'minutes' property for calculation
const SESSION_TYPES = [
  { label: '30 Minutes', value: '30 min', price: 100, minutes: 30 },
  { label: '1 Hour', value: '1 hr', price: 150, minutes: 60 },
  { label: '2 Hours', value: '2 hr', price: 200, minutes: 120 },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

// Helper function to calculate end time
const formatTimeRange = (startTime: string, durationMinutes: number) => {
  if (!startTime) return '';
  
  // Parse the start time string (e.g. "09:00 AM")
  const [time, modifier] = startTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Convert to 24hr format for calculation
  if (hours === 12) hours = 0;
  if (modifier === 'PM') hours += 12;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  // Add duration
  date.setMinutes(date.getMinutes() + durationMinutes);

  // Format end time back to AM/PM
  let endHours = date.getHours();
  const endMinutes = date.getMinutes();
  const endModifier = endHours >= 12 ? 'PM' : 'AM';

  if (endHours > 12) endHours -= 12;
  if (endHours === 0) endHours = 12;

  const formattedEndMinutes = endMinutes < 10 ? `0${endMinutes}` : endMinutes;
  
  // Return format: "10:00 - 10:30 AM" or "11:00 AM - 12:00 PM"
  // Simplified logic: Just show the range, keeping the modifier at the end if same, or both if different
  // For simplicity based on your request: "10:00 - 10:30" (keeping it clean)
  
  return `${startTime} - ${endHours}:${formattedEndMinutes} ${endModifier}`;
};

const Booking = () => {
  const { user, addAppointment } = useAuth();
  const navigate = useNavigate();
  
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // Stores just the start time
  const [sessionType, setSessionType] = useState(SESSION_TYPES[1]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Calculate the full time string for the record (e.g., "10:00 AM - 11:00 AM")
    const finalTimeRecord = selectedTime ? formatTimeRange(selectedTime, sessionType.minutes) : '';

    setTimeout(() => {
        if (selectedProfessional && selectedDate && selectedTime) {
            addAppointment({
              userId: user!.id,
              date: selectedDate,
              time: finalTimeRecord, // Save the full range to the database
              duration: sessionType.value,
              price: sessionType.price,
              professionalId: selectedProfessional.id,
              professionalName: selectedProfessional.name,
              type: 'Video Call'
            });
            setProcessing(false);
            setIsSuccess(true);
            setTimeout(() => navigate('/dashboard'), 3000);
          }
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-[var(--color-mind-bg)] min-h-screen">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">Schedule Your Session</h2>
      
      {isSuccess ? (
         <div className="bg-green-50 p-8 rounded-xl text-center border border-green-200 animate-pulse-calm max-w-md mx-auto shadow-lg">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
            <p className="text-green-700">Redirecting to your dashboard...</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* MAIN CONTENT (Left Side) */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* 1. Specialist & Duration */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">1. Choose Specialist</h3>
                        {/* Duration Tabs */}
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            {SESSION_TYPES.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setSessionType(type)}
                                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                        sessionType.value === type.value 
                                        ? 'bg-white text-[var(--color-primary-teal)] shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {PROFESSIONALS.map(p => (
                            <div 
                            key={p.id}
                            onClick={() => setSelectedProfessional(p)}
                            className={`p-3 rounded-xl border cursor-pointer transition flex flex-col items-center text-center gap-2 ${selectedProfessional?.id === p.id ? 'bg-teal-50 border-[var(--color-primary-teal)] ring-1 ring-[var(--color-primary-teal)]' : 'border-gray-100 hover:border-[var(--color-primary-teal)] hover:shadow-md'}`}
                            >
                                <img src={p.avatar} alt={p.name} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                                <div>
                                    <p className="font-bold text-sm text-gray-900">{p.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{p.specialty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Date & Time */}
                <div className={`transition-opacity duration-300 ${!selectedProfessional ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
                         <div className="flex-1">
                             <h3 className="text-lg font-bold text-gray-800 mb-4">2. Select Date</h3>
                             <Calendar events={[]} interactive={true} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                         </div>
                         
                         <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">3. Select Time</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedDate ? TIME_SLOTS.map(t => {
                                    // Calculate the range based on start time 't' and selected duration
                                    const timeRangeLabel = formatTimeRange(t, sessionType.minutes);
                                    
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedTime(t)}
                                            className={`py-2 px-3 rounded-lg text-xs font-medium border transition ${
                                                selectedTime === t 
                                                ? 'bg-[var(--color-primary-teal)] text-white border-[var(--color-primary-teal)] shadow-md' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-primary-teal)] hover:text-[var(--color-primary-teal)]'
                                            }`}
                                        >
                                            {timeRangeLabel}
                                        </button>
                                    );
                                }) : <p className="col-span-2 text-gray-400 text-sm italic">Please choose a date first.</p>}
                            </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* SIDEBAR (Right Side - Summary & Payment) */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Summary Card */}
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-sm uppercase tracking-wide font-bold text-gray-400 mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Specialist</span>
                            <span className="font-medium">{selectedProfessional?.name.split(',')[0] || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Date & Time</span>
                            <span className="font-medium">
                                {selectedDate 
                                    ? `${selectedDate.slice(5)}, ${selectedTime ? formatTimeRange(selectedTime, sessionType.minutes) : ''}` 
                                    : '-'
                                }
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Session Length</span>
                            <span className="font-medium">{sessionType.label}</span>
                        </div>
                        <div className="border-t border-dashed border-gray-200 pt-3 mt-2 flex justify-between items-center">
                            <span className="font-bold text-gray-900">Total Due</span>
                            <span className="font-extrabold text-2xl text-[var(--color-primary-teal)]">${sessionType.price}</span>
                        </div>
                    </div>
                </div>

                {/* Compact Payment UI */}
                {selectedProfessional && selectedDate && selectedTime && (
                    <div className="bg-white p-5 rounded-2xl shadow-lg border border-[var(--color-secondary-lavender)] animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-secondary-lavender)] to-blue-400"></div>
                        <h3 className="text-md font-bold text-gray-800 mb-4">Payment Details</h3>
                        
                        <form onSubmit={handlePaymentSubmit} className="space-y-3">
                            <div>
                                <input 
                                    type="text" required placeholder="Card Number"
                                    className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[var(--color-primary-teal)] outline-none bg-gray-50"
                                    value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-3">
                                <input 
                                    type="text" required placeholder="MM/YY"
                                    className="w-1/2 py-2 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[var(--color-primary-teal)] outline-none bg-gray-50"
                                    value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                                />
                                <input 
                                    type="text" required placeholder="CVC"
                                    className="w-1/2 py-2 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[var(--color-primary-teal)] outline-none bg-gray-50"
                                    value={cardDetails.cvc} onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})}
                                />
                            </div>

                            <button 
                                type="submit" disabled={processing}
                                className="w-full mt-2 py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-lg shadow-md transition transform active:scale-[0.98] flex justify-center items-center"
                            >
                                {processing ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : 'Pay & Confirm'}
                            </button>
                            
                            <div className="flex justify-center items-center gap-2 mt-2 opacity-50">
                                <span className="text-[10px] text-gray-500">Powered by Stripe</span>
                                <svg className="h-4" viewBox="0 0 38 24" fill="none"><path d="M2.5 12H35.5" stroke="currentColor" strokeLinecap="round"/><rect x="0.5" y="0.5" width="37" height="23" rx="3.5" stroke="currentColor"/></svg>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Booking;