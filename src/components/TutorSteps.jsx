import React from "react";
import { BookOpenCheck, BellRing, BadgeCheck } from "lucide-react";

const TutorSteps = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 md:px-20 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Online Tutor in Just 30 Minutes
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Our premium matching system connects you with world-class educators tailored to your needs
        </p>

        <div className="relative">
          {/* Luxury decorative elements */}
          <div className="absolute -top-8 left-1/4 w-16 h-16 bg-blue-100 opacity-20 rounded-full filter blur-xl"></div>
          <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-indigo-100 opacity-15 rounded-full filter blur-xl"></div>
          
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16 relative z-10">
            {/* Step 1 */}
            <div className="flex-1 max-w-xs bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-full mb-6 inline-flex items-center justify-center">
                <BookOpenCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Post Your Requirement</h3>
              <p className="text-gray-600">
                Share your learning goals with our concierge service - completely free
              </p>
              <div className="mt-4 text-blue-600 font-medium">Step 1</div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 max-w-xs bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-full mb-6 inline-flex items-center justify-center">
                <BellRing className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Responses</h3>
              <p className="text-gray-600">
                Receive curated tutor profiles within minutes, hand-selected for your needs
              </p>
              <div className="mt-4 text-purple-600 font-medium">Step 2</div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 max-w-xs bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-full mb-6 inline-flex items-center justify-center">
                <BadgeCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare & Select</h3>
              <p className="text-gray-600">
                Review verified credentials and choose your ideal educator with confidence
              </p>
              <div className="mt-4 text-emerald-600 font-medium">Step 3</div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-12 gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className={`absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        {/* <div className="mt-16 pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            World-Class Tutors Across All Subjects
          </h3>
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ivy League Educators
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Verified Credentials
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Satisfaction Guarantee
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TutorSteps;