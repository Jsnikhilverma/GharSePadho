// src/pages/TutorProfile.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TutorProfile = () => {
  const { id } = useParams();

  // Sample tutor data (in a real app, this would come from an API)
  const tutor = {
    id: 1,
    name: "Dr. Priya Sharma",
    subject: "Mathematics",
    classLevels: ["Class 9", "Class 10", "Class 11", "Class 12"],
    location: "Central District, New Delhi",
    price: 800,
    rating: 4.9,
    reviews: 128,
    experience: "10+ years",
    education: "PhD in Mathematics, IIT Delhi",
    languages: ["English", "Hindi", "Bengali"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    methodology: "Concept-based learning with real-world applications",
    bio: "With over a decade of teaching experience, I specialize in making complex mathematical concepts accessible and enjoyable. My students consistently achieve top results in board exams and competitive tests.",
    availability: [
      { day: "Monday", time: "4:00 PM - 8:00 PM" },
      { day: "Wednesday", time: "4:00 PM - 8:00 PM" },
      { day: "Friday", time: "4:00 PM - 8:00 PM" },
      { day: "Saturday", time: "10:00 AM - 2:00 PM" }
    ],
    qualifications: [
      "PhD in Mathematics (IIT Delhi)",
      "MSc Mathematics (University of Delhi)",
      "BEd (Mathematics Specialization)"
    ],
    achievements: [
      "Gold Medalist in National Mathematics Olympiad",
      "Author of 'Advanced Calculus Made Simple'",
      "Recognized as Top Educator 2022 by Education Times"
    ],
    teachingStyle: [
      "Interactive whiteboard sessions",
      "Customized learning plans",
      "Regular progress assessments",
      "Exam strategy workshops"
    ]
  };

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      student: "Rahul Mehta",
      rating: 5,
      date: "2 weeks ago",
      comment: "Dr. Sharma transformed my approach to calculus. Her explanations are crystal clear and she makes even the most complex topics manageable."
    },
    {
      id: 2,
      student: "Ananya Patel",
      rating: 5,
      date: "1 month ago",
      comment: "Best math tutor I've ever had! My grades improved from 65% to 92% in just 3 months."
    },
    {
      id: 3,
      student: "Vikram Singh",
      rating: 4,
      date: "2 months ago",
      comment: "Very knowledgeable and patient. The only reason I didn't give 5 stars is because her schedule is quite packed."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
              <div className="relative">
                <img 
                  src={tutor.image} 
                  alt={tutor.name} 
                  className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-900 font-bold px-3 py-1 rounded-full text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {tutor.rating}
                </div>
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl font-serif font-bold mb-2">{tutor.name}</h1>
              <h2 className="text-2xl font-light mb-4">{tutor.subject} Specialist</h2>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center bg-white text-blue-700 bg-opacity-20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {tutor.experience} Experience
                </div>
                <div className="flex items-center bg-white text-blue-700 bg-opacity-20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tutor.location}
                </div>
                <div className="flex items-center bg-white text-blue-700 bg-opacity-20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ₹{tutor.price}/hour
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start space-x-4">
                <button className="bg-white text-indigo-900 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg shadow-md transition duration-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message Tutor
                </button>
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">About {tutor.name}</h3>
              <p className="text-gray-700 mb-6">{tutor.bio}</p>
              
              <h4 className="text-xl font-medium text-gray-900 mb-4">Teaching Methodology</h4>
              <p className="text-gray-700 mb-6">{tutor.methodology}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-4">Teaching Style</h4>
                  <ul className="space-y-2">
                    {tutor.teachingStyle.map((style, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{style}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-4">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Qualifications Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Qualifications & Achievements</h3>
              
              <h4 className="text-xl font-medium text-gray-900 mb-4">Education</h4>
              <ul className="space-y-3 mb-6">
                {tutor.qualifications.map((qualification, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{qualification}</span>
                  </li>
                ))}
              </ul>
              
              <h4 className="text-xl font-medium text-gray-900 mb-4">Notable Achievements</h4>
              <ul className="space-y-3">
                {tutor.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-amber-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.83.602-1.816-.202-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                <h3 className="text-2xl font-serif font-bold text-gray-900">Student Reviews</h3>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-900 font-medium">{tutor.rating}</span>
                  <span className="text-gray-500 ml-1">({tutor.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{review.student}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{review.date}</p>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                View all reviews
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:w-1/3">
            {/* Availability Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8 sticky top-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Availability</h3>
              
              <div className="space-y-4">
                {tutor.availability.map((slot, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{slot.day}</span>
                    <span className="text-gray-500">{slot.time}</span>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Check Full Calendar
              </button>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Teaches</h4>
                <div className="flex flex-wrap gap-2">
                  {tutor.classLevels.map((level, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Contact Tutor</h3>
              
              <div className="space-y-4">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Message
                </button>
                
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book Trial Session
                </button>
                
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Share Profile</h4>
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Link to="/find-tutors" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Tutors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;