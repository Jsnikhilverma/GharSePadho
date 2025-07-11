// src/components/FeaturedTutors.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const tutors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Mathematics Professor",
    rating: 4.9,
    location: "Central District, Online",
    price: "₹800/hr",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    tags: ["Class 9-12", "IIT-JEE", "10+ Years Exp"],
    profileLink: "/teacherprofile"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Physics Specialist",
    rating: 4.8,
    location: "North District, In-person",
    price: "₹650/hr",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    tags: ["Class 6-10", "NEET", "7 Years Exp"],
    profileLink: "/teacherprofile"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "English Literature",
    rating: 4.7,
    location: "South District, Hybrid",
    price: "₹550/hr",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    tags: ["Class 1-8", "IELTS", "5 Years Exp"],
    profileLink: "/teacherprofile"
  }
];

const TutorCard = ({ tutor }) => {
  return (
    <div className="teacher-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img className="w-full h-96 object-cover" src={tutor.image} alt="Tutor" />
        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
          <i className="fas fa-star mr-1"></i> {tutor.rating}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-dark">{tutor.name}</h3>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Verified</span>
        </div>
        <p className="mt-1 text-gray-600">{tutor.role}</p>
        <div className="mt-4 flex items-center">
          <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
          <span className="text-sm text-gray-600">{tutor.location}</span>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {tutor.tags.map((tag, index) => (
              <span key={index} className={`px-2 py-1 ${
                index === 0 ? 'bg-blue-100 text-blue-800' : 
                index === 1 ? 'bg-purple-100 text-purple-800' : 
                'bg-green-100 text-green-800'
              } text-xs rounded`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{tutor.price}</span>
          <Link to="/findtuter" className="text-sm font-medium text-blue-700 hover:text-indigo-500">
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedTutors = () => {
  return (
    <div id="teachers" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-dark">Our Premium Tutors</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Carefully selected educators with proven track records
          </p>
        </div>

        {/* Tutor Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/findtuter"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            View All Tutors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTutors;