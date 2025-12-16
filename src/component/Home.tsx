// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
// import DrImage from '../assets/mid-shot-woman-therapist-with-clipboard.jpg';

// // Define Animation Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1, // Delay between each child animation
//       delayChildren: 0.2
//     }
//   }
// };

// const cardVariant = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
// };

// const FAQS = [
//   {
//     question: "What services do you offer?",
//     answer: "We offer a comprehensive range of mental health services including Psychiatric Evaluations, Medication Management, Psychotherapy (CBT & DBT), Adult ADHD Assessments, and specialized care for Anxiety and Depression."
//   },
//   {
//     question: "How does online payment work?",
//     answer: "We require payment at the time of booking to secure your slot. We use Stripe, a secure global payment processor, which accepts all major credit and debit cards. Your financial data is never stored on our servers."
//   },
//   {
//     question: "Do you accept insurance or Medicare?",
//     answer: "We are currently a private billing practice. However, we can provide a detailed invoice (superbill) after your session that you may submit to your insurance provider or Medicare for potential reimbursement, depending on your plan."
//   },
//   // {
//   //   question: "Can I get prescriptions through telehealth?",
//   //   answer: "Yes. If your psychiatrist deems medication necessary for your treatment plan, e-prescriptions can be sent directly to your preferred pharmacy immediately after your consultation."
//   // },
//   // {
//   //   question: "Is my video session private and secure?",
//   //   answer: "Absolutely. We use HIPAA and GDPR-compliant video conferencing tools that are end-to-end encrypted. Your sessions are strictly confidential and are never recorded."
//   // },
//   {
//     question: "What is your cancellation policy?",
//     answer: "We understand that life happens. You can reschedule or cancel your appointment up to 24 hours in advance for a full refund. Cancellations made within 24 hours of the appointment time may incur a cancellation fee."
//   },
//   {
//     question: "Do you offer emergency crisis support?",
//     answer: "MindCare is not an emergency service. If you or someone you know is in immediate danger or experiencing a crisis, please call 000 (Australia) or 911 (US), or visit your nearest hospital emergency department immediately."
//   }
// ];


// const SERVICES = [
//   { 
//     name: "Psychiatric Evaluations", 
//     description: "Comprehensive diagnostic assessments to understand your biological, psychological, and social history for an accurate diagnosis.", 
//     iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
//   },
//   { 
//     name: "Medication Management", 
//     description: "Evidence-based psychopharmacology. We carefully prescribe, monitor, and adjust medications to ensure effectiveness and minimize side effects.", 
//     iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
//   },
//   { 
//     name: "Psychotherapy (CBT & DBT)", 
//     description: "Talk therapy sessions integrated with your treatment plan. We specialize in Cognitive Behavioral and Dialectical Behavior Therapies.", 
//     iconPath: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
//   },
//   { 
//     name: "ADHD Assessments", 
//     description: "Specialized testing and ongoing support for Adult ADHD, focusing on improving focus, executive function, and daily life skills.", 
//     iconPath: "M13 10V3L4 14h7v7l9-11h-7z" 
//   },
//   { 
//     name: "Anxiety & Panic Disorders", 
//     description: "Targeted treatments for GAD, panic attacks, and social anxiety using a blend of exposure therapy and medical support.", 
//     iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
//   },
//   { 
//     name: "Depression & Mood Care", 
//     description: "Compassionate care for Major Depressive Disorder and Bipolar Disorder, helping you regain balance and emotional stability.", 
//     iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
//   },
// ];

// const Home = () => {
//   const navigate = useNavigate();
//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   const toggleFaq = (index: number) => setActiveFaq(activeFaq === index ? null : index);

//   return (
//     <div className="bg-mind-bg overflow-x-hidden"> {/* Prevent horizontal scroll during animations */}
      
//       {/* Hero */}
//       <section className="bg-gradient-to-b from-mind-bg to-teal-50 py-20 sm:py-32">
//         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
//            {/* Text Content */}
//            <motion.div 
//              initial="hidden" 
//              animate="visible" 
//              variants={fadeInUp}
//            >
//               <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
//                 Cultivate Your Inner Peace. <br /> Start With MindCare.
//               </h1>
//               <p className="mt-4 text-xl text-gray-600">
//                 Connect with certified Australian mental wellness professionals instantly.
//               </p>
              
//               <motion.div 
//                 className="mt-8 bg-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-gray-100 max-w-md"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.4, duration: 0.5 }}
//               >
//                  <div>
//                     <p className="text-lg font-bold text-gray-900">Start your session</p>
//                     <p className="text-sm text-gray-600">Secure telehealth appointments.</p>
//                  </div>
//                  <motion.button 
//                    whileHover={{ scale: 1.05 }}
//                    whileTap={{ scale: 0.95 }}
//                    onClick={() => navigate('/booking')} 
//                    className="px-6 py-3 bg-primary-teal text-white font-bold rounded-lg shadow hover:bg-teal-600 transition"
//                  >
//                     Book Now
//                  </motion.button>
//               </motion.div>
//            </motion.div>

//            {/* Hero Image */}
//            <motion.div 
//              className="hidden md:flex justify-center"
//              initial={{ opacity: 0, x: 50 }}
//              animate={{ opacity: 1, x: 0 }}
//              transition={{ duration: 0.8, delay: 0.2 }}
//            >
//               <img src={DrImage} alt="Doctor" className="rounded-3xl shadow-2xl border-4 border-white object-cover h-96 w-full max-w-md" />
//            </motion.div>
//         </div>
//       </section>

//       {/* Services */}
//       <div id="services" className="bg-white py-24 sm:py-32">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
//           {/* Section Header */}
//           <motion.div 
//             className="mx-auto max-w-2xl text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-base font-semibold leading-7 text-[var(--color-primary-teal)] uppercase tracking-wide">
//               Holistic Care
//             </h2>
//             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Comprehensive Psychiatric Services
//             </p>
//             <p className="mt-6 text-lg leading-8 text-gray-600">
//               We combine modern medical science with compassionate therapy. Our psychiatrists provide a full spectrum of care, from diagnosis to medication management.
//             </p>
//           </motion.div>

//           {/* Cards Grid with Staggered Animation */}
//           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
//             <motion.dl 
//               className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3"
//               variants={staggerContainer}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, margin: "-50px" }}
//             >
//               {SERVICES.map((service) => (
//                 <motion.div 
//                   key={service.name} 
//                   variants={cardVariant}
//                   className="group relative bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-xl hover:ring-[var(--color-primary-teal)] transition-all duration-300"
//                 >
//                   {/* Icon Container */}
//                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-accent-light)] group-hover:bg-[var(--color-primary-teal)] transition-colors duration-300 mb-6">
//                     <svg 
//                       className="h-6 w-6 text-[var(--color-primary-teal)] group-hover:text-white transition-colors duration-300" 
//                       fill="none" 
//                       viewBox="0 0 24 24" 
//                       strokeWidth="1.5" 
//                       stroke="currentColor" 
//                       aria-hidden="true"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
//                     </svg>
//                   </div>

//                   {/* Content */}
//                   <dt className="text-xl font-semibold leading-7 text-gray-900 group-hover:text-[var(--color-primary-teal)] transition-colors">
//                     {service.name}
//                   </dt>
//                   <dd className="mt-4 text-base leading-7 text-gray-600">
//                     {service.description}
//                   </dd>

//                   {/* 'Learn More' Arrow */}
//                   <div className="mt-6 flex items-center text-sm font-semibold text-[var(--color-primary-teal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                      <span>Learn more</span>
//                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.dl>
//           </div>
          
//           {/* Bottom CTA */}
//           <motion.div 
//             className="mt-16 text-center"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//           >
//               <motion.button 
//                  whileHover={{ scale: 1.05 }}
//                  whileTap={{ scale: 0.95 }}
//                  onClick={() => navigate('/booking')} 
//                  className="px-8 py-3.5 text-base font-semibold text-white bg-[var(--color-primary-teal)] rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
//               >
//                   Book an Initial Evaluation
//               </motion.button>
//               <p className="mt-4 text-sm text-gray-500">
//                   Accepting new patients for online video consultations.
//               </p>
//           </motion.div>

//         </div>
//       </div>

//       {/* FAQ Snippet with AnimatePresence */}
//      <div className="max-w-4xl mx-auto px-4 py-12 mb-16">
//   <motion.h3 
//     initial={{ opacity: 0, y: 10 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className="text-3xl font-bold text-center mb-8"
//   >
//     Frequently Asked Questions
//   </motion.h3>

//   <div className="space-y-4">
//     {FAQS.map((faq, i) => (
//       <div key={i} className="border rounded-lg overflow-hidden bg-white shadow-sm">
//         <button 
//           onClick={() => toggleFaq(i)} 
//           className="w-full text-left p-5 font-semibold bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-colors"
//         >
//           {faq.question} 
//           <motion.span 
//             animate={{ rotate: activeFaq === i ? 45 : 0 }}
//             className="text-[var(--color-primary-teal)] text-xl"
//           >
//             {activeFaq === i ? '−' : '+'} 
//           </motion.span>
//         </button>
        
//         <AnimatePresence>
//           {activeFaq === i && (
//             <motion.div 
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="overflow-hidden"
//             >
//               <div className="p-5 text-gray-600 border-t border-gray-100 leading-relaxed">
//                 {faq.answer}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     ))}
//   </div>
// </div>
//     </div>
//   );
// };

// export default Home;



/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import DrImage from '../assets/mid-shot-woman-therapist-with-clipboard.jpg';

// --- ANIMATION VARIANTS ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- DATA CONSTANTS ---

const FAQS = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of mental health services including Psychiatric Evaluations, Medication Management, Psychotherapy (CBT & DBT), Adult ADHD Assessments, and specialized care for Anxiety and Depression."
  },
  {
    question: "How does online payment work?",
    answer: "We require payment at the time of booking to secure your slot. We use Stripe, a secure global payment processor, which accepts all major credit and debit cards. Your financial data is never stored on our servers."
  },
  {
    question: "Do you accept insurance or Medicare?",
    answer: "We are currently a private billing practice. However, we can provide a detailed invoice (superbill) after your session that you may submit to your insurance provider or Medicare for potential reimbursement, depending on your plan."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We understand that life happens. You can reschedule or cancel your appointment up to 24 hours in advance for a full refund. Cancellations made within 24 hours of the appointment time may incur a cancellation fee."
  },
  {
    question: "Do you offer emergency crisis support?",
    answer: "MindCare is not an emergency service. If you or someone you know is in immediate danger or experiencing a crisis, please call 000 (Australia) or 911 (US), or visit your nearest hospital emergency department immediately."
  }
];

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
    <div className="bg-mind-bg overflow-x-hidden relative min-h-screen">
      
      {/* ------------------------------------------------------------- */}
      {/* FLOATING BOOKING BOT (NEW ADDITION) */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end">
        {/* Tooltip Bubble */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="mb-2 mr-2 bg-white px-4 py-2 rounded-xl rounded-br-none shadow-lg border border-gray-100 text-sm font-semibold text-gray-700"
        >
            Book Appointment?
        </motion.div>

        {/* Bot Button Container */}
        <div className="relative group">
            {/* Blinking/Ripple Effect Ring */}
            <motion.div
                className="absolute inset-0 rounded-full bg-[var(--color-primary-teal)] opacity-50"
                animate={{ 
                    scale: [1, 1.5, 1.8], 
                    opacity: [0.6, 0.3, 0] 
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeOut" 
                }}
            />
            
            {/* Main Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/booking')}
                className="relative w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl text-white overflow-hidden border-2 border-white"
            >
                {/* Robot Icon SVG */}
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4" />
                    <line x1="8" y1="16" x2="8" y2="16" />
                    <line x1="16" y1="16" x2="16" y2="16" />
                </svg>
            </motion.button>

            {/* Notification Dot (Red Dot) */}
            <span className="absolute top-1 right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
        </div>
      </div>
      {/* ------------------------------------------------------------- */}


      {/* Hero Section */}
      <section className="bg-gradient-to-b from-mind-bg to-teal-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
           <motion.div 
             initial="hidden" 
             animate="visible" 
             variants={fadeInUp}
           >
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                Cultivate Your Inner Peace. <br /> Start With MindCare.
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Connect with certified Australian mental wellness professionals instantly.
              </p>
              
              <motion.div 
                className="mt-8 bg-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-gray-100 max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                 <div>
                    <p className="text-lg font-bold text-gray-900">Start your session</p>
                    <p className="text-sm text-gray-600">Secure telehealth appointments.</p>
                 </div>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => navigate('/booking')} 
                   className="px-6 py-3 bg-primary-teal text-white font-bold rounded-lg shadow hover:bg-teal-600 transition"
                 >
                    Book Now
                 </motion.button>
              </motion.div>
           </motion.div>

           <motion.div 
             className="hidden md:flex justify-center"
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <img src={DrImage} alt="Doctor" className="rounded-3xl shadow-2xl border-4 border-white object-cover h-96 w-full max-w-md" />
           </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <div id="services" className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base font-semibold leading-7 text-[var(--color-primary-teal)] uppercase tracking-wide">
              Holistic Care
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Psychiatric Services
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We combine modern medical science with compassionate therapy. Our psychiatrists provide a full spectrum of care, from diagnosis to medication management.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <motion.dl 
              className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {SERVICES.map((service) => (
                <motion.div 
                  key={service.name} 
                  variants={cardVariant}
                  className="group relative bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-xl hover:ring-[var(--color-primary-teal)] transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-accent-light)] group-hover:bg-[var(--color-primary-teal)] transition-colors duration-300 mb-6">
                    <svg 
                      className="h-6 w-6 text-[var(--color-primary-teal)] group-hover:text-white transition-colors duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="1.5" 
                      stroke="currentColor" 
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
                    </svg>
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900 group-hover:text-[var(--color-primary-teal)] transition-colors">
                    {service.name}
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600">
                    {service.description}
                  </dd>
                  <div className="mt-6 flex items-center text-sm font-semibold text-[var(--color-primary-teal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span>Learn more</span>
                     <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                </motion.div>
              ))}
            </motion.dl>
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
              <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => navigate('/booking')} 
                 className="px-8 py-3.5 text-base font-semibold text-white bg-[var(--color-primary-teal)] rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
              >
                  Book an Initial Evaluation
              </motion.button>
          </motion.div>

        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 mb-16">
        <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8"
        >
            Frequently Asked Questions
        </motion.h3>

        <div className="space-y-4">
            {FAQS.map((faq, i) => (
            <div key={i} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <button 
                onClick={() => toggleFaq(i)} 
                className="w-full text-left p-5 font-semibold bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                {faq.question} 
                <motion.span 
                    animate={{ rotate: activeFaq === i ? 45 : 0 }}
                    className="text-[var(--color-primary-teal)] text-xl"
                >
                    {activeFaq === i ? '−' : '+'} 
                </motion.span>
                </button>
                
                <AnimatePresence>
                {activeFaq === i && (
                    <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                    >
                    <div className="p-5 text-gray-600 border-t border-gray-100 leading-relaxed">
                        {faq.answer}
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;