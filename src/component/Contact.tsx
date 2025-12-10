import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic to send form data would go here
  };

  return (
    <div className="bg-[var(--color-mind-bg)] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-600">
            Have a question about our services? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info Card */}
          <div className="bg-[var(--color-primary-teal)] text-white rounded-2xl shadow-xl p-8 lg:p-12 overflow-hidden relative">
             {/* Decorative Circle */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
             
             <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
             
             <div className="space-y-6">
                <div className="flex items-start space-x-4">
                   <svg className="w-6 h-6 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                   <div>
                      <p className="font-semibold text-lg">Our Clinic</p>
                      <p className="opacity-90">123 Wellness Blvd, Suite 400<br/>Sydney, NSW 2000, Australia</p>
                   </div>
                </div>

                <div className="flex items-start space-x-4">
                   <svg className="w-6 h-6 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   <div>
                      <p className="font-semibold text-lg">Email Us</p>
                      <p className="opacity-90">support@mindcare.com</p>
                      <p className="opacity-90">bookings@mindcare.com</p>
                   </div>
                </div>

                <div className="flex items-start space-x-4">
                   <svg className="w-6 h-6 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                   <div>
                      <p className="font-semibold text-lg">Phone Support</p>
                      <p className="opacity-90">+61 2 9999 8888</p>
                      <p className="text-sm opacity-70 mt-1">Mon-Fri: 9am - 5pm AEST</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
             {submitted ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                   <p className="text-gray-600 mt-2">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                   <button onClick={() => setSubmitted(false)} className="mt-6 text-[var(--color-primary-teal)] font-semibold hover:underline">Send another message</button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                         <input type="text" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none" placeholder="Jane" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                         <input type="text" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none" placeholder="Doe" />
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none" placeholder="you@example.com" />
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none bg-white">
                         <option>General Inquiry</option>
                         <option>Appointment Issue</option>
                         <option>Billing Question</option>
                         <option>Feedback</option>
                      </select>
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea required rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-teal)] outline-none" placeholder="How can we help you today?"></textarea>
                   </div>

                   <button type="submit" className="w-full py-4 bg-[var(--color-secondary-lavender)] text-white font-bold rounded-lg shadow-md hover:bg-blue-400 transition transform active:scale-[0.99]">
                      Send Message
                   </button>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;