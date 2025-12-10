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

// Define Session Types with Pricing
const SESSION_TYPES = [
  { label: '30 Minutes', value: '30 min', price: 100 },
  { label: '1 Hour', value: '1 hr', price: 150 },
  { label: '2 Hours', value: '2 hr', price: 200 },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

const Booking = () => {
  const { user, addAppointment } = useAuth();
  const navigate = useNavigate();
  
  // State
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState(SESSION_TYPES[1]); // Default to 1 Hour
  const [showPayment, setShowPayment] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Mock Payment State
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate API Call
    setTimeout(() => {
        if (selectedProfessional && selectedDate && selectedTime) {
            addAppointment({
              userId: user!.id,
              date: selectedDate,
              time: selectedTime,
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
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">Schedule Your Session</h2>
      
      {isSuccess ? (
         <div className="bg-green-50 p-8 rounded-xl text-center border border-green-200 animate-pulse-calm">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-green-700">Your appointment is confirmed. Redirecting to dashboard...</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Selection Flow */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Step 1: Select Professional */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-[var(--color-primary-teal)] border-b pb-2 mb-4">1. Select Specialist</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PROFESSIONALS.map(p => (
                            <div 
                            key={p.id}
                            onClick={() => setSelectedProfessional(p)}
                            className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3 ${selectedProfessional?.id === p.id ? 'bg-[var(--color-primary-teal)] text-white border-[var(--color-primary-teal)]' : 'hover:bg-gray-50'}`}
                            >
                            <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full border-2 border-white" />
                            <div>
                                <p className="font-bold">{p.name}</p>
                                <p className={`text-xs ${selectedProfessional?.id === p.id ? 'text-teal-100' : 'text-gray-500'}`}>{p.specialty}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 2: Session Details (Duration & Time) */}
                <div className={`transition-opacity duration-300 ${!selectedProfessional ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-[var(--color-primary-teal)] border-b pb-2 mb-4">2. Session Details</h3>
                        
                        {/* Duration Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Duration</label>
                            <div className="flex flex-wrap gap-3">
                                {SESSION_TYPES.map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => setSessionType(type)}
                                        className={`px-4 py-2 rounded-lg font-semibold text-sm border transition ${
                                            sessionType.value === type.value 
                                            ? 'bg-[var(--color-secondary-lavender)] text-white border-[var(--color-secondary-lavender)] shadow-md' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-secondary-lavender)]'
                                        }`}
                                    >
                                        {type.label} (${type.price})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calendar & Time */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Calendar events={[]} interactive={true} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                            
                            <div className="bg-[var(--color-accent-light)] p-4 rounded-xl">
                                <h4 className="font-semibold text-gray-800 mb-3">Available Slots</h4>
                                <p className="text-xs text-gray-500 mb-3">For {selectedDate || 'Select a date'}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {selectedDate ? TIME_SLOTS.map(t => (
                                        <button
                                        key={t}
                                        onClick={() => { setSelectedTime(t); setShowPayment(false); }}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                            selectedTime === t 
                                            ? 'bg-[var(--color-primary-teal)] text-white shadow-md' 
                                            : 'bg-white text-gray-600 hover:bg-teal-50'
                                        }`}
                                        >
                                        {t}
                                        </button>
                                    )) : <p className="col-span-2 text-gray-400 italic text-sm">Please select a date from the calendar.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3: Payment */}
                {selectedProfessional && selectedDate && selectedTime && (
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--color-secondary-lavender)] animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6 text-[var(--color-secondary-lavender)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            Secure Payment
                        </h3>
                        
                        <form onSubmit={handlePaymentSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Card Number</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none font-mono"
                                    value={cardDetails.number}
                                    onChange={e => setCardDetails({...cardDetails, number: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Expiry</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="MM/YY"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none font-mono"
                                        value={cardDetails.expiry}
                                        onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">CVC</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="123"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none font-mono"
                                        value={cardDetails.cvc}
                                        onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full mt-4 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition flex justify-center items-center gap-2"
                            >
                                {processing ? 'Processing...' : `Pay $${sessionType.price} & Confirm Booking`}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-2">Payments are secured with SSL encryption.</p>
                        </form>
                    </div>
                )}
            </div>

            {/* Right Column: Booking Summary Sticky */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
                    
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Professional</span>
                            <span className="font-semibold text-right">{selectedProfessional?.name || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date</span>
                            <span className="font-semibold text-right">{selectedDate || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Time</span>
                            <span className="font-semibold text-right">{selectedTime || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Duration</span>
                            <span className="font-semibold text-right">{sessionType.label}</span>
                        </div>
                        
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-bold text-lg">Total</span>
                                <span className="text-[var(--color-primary-teal)] font-extrabold text-2xl">${sessionType.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Booking;