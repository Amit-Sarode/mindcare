/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../types';
import DrImage from '../assets/mid-shot-woman-therapist-with-clipboard.jpg'

// Inside src/pages/Home.tsx or a separate data file

const SERVICES = [
  { 
    name: "Psychiatric Evaluations", 
    description: "Comprehensive diagnostic assessments to understand your biological, psychological, and social history for an accurate diagnosis.", 
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
  },
  { 
    name: "Medication Management", 
    description: "Evidence-based psychopharmacology. We carefully prescribe, monitor, and adjust medications to ensure effectiveness and minimize side effects.", 
    iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
  },
  { 
    name: "Psychotherapy (CBT & DBT)", 
    description: "Talk therapy sessions integrated with your treatment plan. We specialize in Cognitive Behavioral and Dialectical Behavior Therapies.", 
    iconPath: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
  },
  { 
    name: "ADHD Assessments", 
    description: "Specialized testing and ongoing support for Adult ADHD, focusing on improving focus, executive function, and daily life skills.", 
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z" 
  },
  { 
    name: "Anxiety & Panic Disorders", 
    description: "Targeted treatments for GAD, panic attacks, and social anxiety using a blend of exposure therapy and medical support.", 
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
  },
  { 
    name: "Depression & Mood Care", 
    description: "Compassionate care for Major Depressive Disorder and Bipolar Disorder, helping you regain balance and emotional stability.", 
    iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => setActiveFaq(activeFaq === index ? null : index);

  return (
    <div className="bg-mind-bg">
      {/* Hero */}
      <section className="bg-gradient-to-b from-mind-bg to-teal-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
           <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                Cultivate Your Inner Peace. <br /> Start With MindCare.
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Connect with certified Australian mental wellness professionals instantly.
              </p>
              <div className="mt-8 bg-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-gray-100 max-w-md">
                 <div>
                    <p className="text-lg font-bold text-gray-900">Online Zoom Session</p>
                    <p className="text-sm text-gray-600">Secure telehealth appointments.</p>
                 </div>
                 <button onClick={() => navigate('/booking')} className="px-6 py-3 bg-primary-teal text-white font-bold rounded-lg shadow hover:bg-teal-600 transition animate-pulse-calm hover:animate-none">
                    Book Now
                 </button>
              </div>
           </div>
           <div className="hidden md:flex justify-center">
              <img src={DrImage} alt="Doctor" className="rounded-3xl shadow-2xl border-4 border-white object-cover h-96 w-full max-w-md" />
           </div>
        </div>
      </section>

      {/* Services */}
    <div id="services" className="bg-white py-24 sm:py-32">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="mx-auto max-w-2xl text-center mb-16">
      <h2 className="text-base font-semibold leading-7 text-[var(--color-primary-teal)] uppercase tracking-wide">
        Holistic Care
      </h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Comprehensive Psychiatric Services
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        We combine modern medical science with compassionate therapy. Our psychiatrists provide a full spectrum of care, from diagnosis to medication management.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
        {SERVICES.map((service) => (
          <div 
            key={service.name} 
            className="group relative bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-xl hover:ring-[var(--color-primary-teal)] transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon Container */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-accent-light)] group-hover:bg-[var(--color-primary-teal)] transition-colors duration-300 mb-6">
              <svg 
                className="h-6 w-6 text-[var(--color-primary-teal)] group-hover:text-white transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
              </svg>
            </div>

            {/* Content */}
            <dt className="text-xl font-semibold leading-7 text-gray-900 group-hover:text-[var(--color-primary-teal)] transition-colors">
              {service.name}
            </dt>
            <dd className="mt-4 text-base leading-7 text-gray-600">
              {service.description}
            </dd>

            {/* 'Learn More' Arrow (Decorative Link) */}
            <div className="mt-6 flex items-center text-sm font-semibold text-[var(--color-primary-teal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span>Learn more</span>
               <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>
        ))}
      </dl>
    </div>
    
    {/* Bottom CTA */}
    <div className="mt-16 text-center">
        <button 
           onClick={() => navigate('/booking')} 
           className="px-8 py-3.5 text-base font-semibold text-white bg-[var(--color-primary-teal)] rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
        >
            Book an Initial Evaluation
        </button>
        <p className="mt-4 text-sm text-gray-500">
            Accepting new patients for online video consultations.
        </p>
    </div>

  </div>
</div>
      {/* FAQ Snippet */}
      <div className="max-w-4xl mx-auto px-4 py-12 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
             {['What services do you offer?', 'How does online payment work?'].map((q, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                   <button onClick={() => toggleFaq(i)} className="w-full text-left p-5 font-semibold bg-gray-50 flex justify-between">
                      {q} <span>{activeFaq === i ? '-' : '+'}</span>
                   </button>
                   {activeFaq === i && <div className="p-5 bg-white text-gray-600 border-t">Sample answer text...</div>}
                </div>
             ))}
          </div>
      </div>
    </div>
  );
};

export default Home;