// src/components/About.jsx
import React from 'react';


const About = () => {
  return (
    <div id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-serif font-bold text-dark">About GharSe<span className='text-blue-600'>Padho</span> Tutors</h2>
            <p className="mt-6 text-lg text-gray-600">
               GharSePadho Tutors is India's premier home tutoring service, connecting students
              with exceptional educators for personalized learning experiences.
            </p>
            <p className="mt-4 text-gray-600">
              Our rigorous selection process ensures only the top 5% of tutor applicants join our network. We
              combine traditional teaching values with modern pedagogical approaches.
            </p>
            <div className="mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-blue-700">
                    <i className="fas fa-check text-blue-700"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-dark">Verified Credentials</h4>
                  <p className="mt-2 text-gray-600">
                    Every tutor undergoes background checks, qualification verification, and teaching demonstrations.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-blue-700">
                    <i className="fas fa-star text-blue-700"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-dark">Performance Tracking</h4>
                  <p className="mt-2 text-gray-600">
                    Regular progress reports and feedback sessions ensure measurable improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img className="w-full rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="Tutoring session" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;