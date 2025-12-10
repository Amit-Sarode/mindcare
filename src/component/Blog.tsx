/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding High-Functioning Anxiety",
    excerpt: "Often misunderstood, high-functioning anxiety can be a silent struggle. Learn the signs and coping mechanisms.",
    date: "Dec 12, 2024",
    author: "Dr. Emily Chen",
    category: "Anxiety",
    image: "https://placehold.co/600x400/F0F9FF/20B2AA?text=Anxiety+Support"
  },
  {
    id: 2,
    title: "The Science of Sleep and Mental Health",
    excerpt: "Why getting 8 hours isn't just about energy—it's about emotional regulation and cognitive stability.",
    date: "Dec 08, 2024",
    author: "Sarah Venti, MA",
    category: "Wellness",
    image: "https://placehold.co/600x400/93C5FD/FFFFFF?text=Sleep+Science"
  },
  {
    id: 3,
    title: "Mindfulness vs. Meditation: What's the Difference?",
    excerpt: "These terms are often used interchangeably, but they serve different roles in your mental hygiene routine.",
    date: "Nov 28, 2024",
    author: "Caleb Jones, LCSW",
    category: "Mindfulness",
    image: "https://placehold.co/600x400/FFF/20B2AA?text=Meditation"
  }
];

const Blog = () => {
  return (
    <div className="bg-[var(--color-mind-bg)] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[var(--color-accent-light)] py-16 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">MindCare Journal</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Insights, research, and stories to support your journey toward inner peace.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 hover:-translate-y-1">
              <img 
                src={post.image} 
                alt={post.title} 
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                   <span className="bg-teal-50 text-[var(--color-primary-teal)] px-2 py-1 rounded-md font-medium text-xs uppercase tracking-wide">
                     {post.category}
                   </span>
                   <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  <a href="#" className="hover:text-[var(--color-primary-teal)] transition">
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                   <span className="text-sm font-medium text-gray-900">By {post.author}</span>
                   <Link to="#" className="text-[var(--color-primary-teal)] font-semibold text-sm hover:underline">Read Article &rarr;</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-[var(--color-primary-teal)] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
           <h2 className="text-3xl font-bold mb-4">Subscribe to Wellness</h2>
           <p className="mb-8 opacity-90 max-w-xl mx-auto">Get the latest mental health tips and clinic updates delivered straight to your inbox.</p>
           <form className="max-w-md mx-auto flex gap-3 flex-col sm:flex-row">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-teal-300" />
              <button className="px-6 py-3 bg-[var(--color-secondary-lavender)] font-bold rounded-lg shadow-md hover:bg-blue-400 transition">Subscribe</button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;