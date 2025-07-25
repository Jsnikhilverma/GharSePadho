// src/components/About.jsx
import React from 'react';


const About = () => {
  return (
    <div id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl font-serif font-bold text-dark">About Us</h2>
            <h4 className="text-2xl font-serif font-bold text-dark mt-2">Welcome to <span className='text-blue-600'>Gharsepadho.com</span></h4>

            <p className="mt-6 text-lg text-gray-600">
               At Ghar se padho, we believe that every student deserves personalized attention and guidance to unlock their full potential. Our team of experienced and dedicated tutors provide high-quality home tuition to students of all ages and academic levels.

            </p>
             <h2 className="text-2xl font-serif font-bold text-dark mt-4 ml-6">Our Mission</h2>
            <p className="mt-2 text-lg text-gray-600 ml-6">
   Our mission is to provide individualized support and mentorship to students, helping them achieve academic success and build confidence in their abilities. We strive to create a nurturing and supportive learning environment that fosters a love for learning and promotes academic excellence.

            </p>
           
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