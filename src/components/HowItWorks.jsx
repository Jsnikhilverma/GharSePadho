// src/components/HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-16 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-dark">How GharSe<span className='text-blue-600'>Padho</span> Works</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Simple steps to find your perfect tutor and start learning
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold text-blue-700">1</span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-dark tracking-tight">Search Tutors</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Browse our verified tutor profiles by subject, location, or availability.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold text-blue-700">2</span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-dark tracking-tight">Book a Session</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Select your preferred time slot and schedule your first session.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold text-blue-700">3</span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-dark tracking-tight">Start Learning</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Connect with your tutor online or in-person and begin your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;