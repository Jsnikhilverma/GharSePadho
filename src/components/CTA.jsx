// src/components/CTA.jsx
import React from 'react';

const CTA = () => {
  return (
    <div className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl">
          <span className="block">Ready to transform learning?</span>
          <span className="block text-indigo-200">Find your perfect tutor today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-blue-400 hover:bg-gray-50 hover:text-blue-700">
              Get Started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-400">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;