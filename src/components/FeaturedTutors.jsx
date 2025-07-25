// src/components/FeaturedTutors.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TutorCard = ({ tutor }) => {
  return (
    <div className="teacher-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img 
          className="w-full h-96 object-cover" 
          src={tutor.profile_pic || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"} 
          alt={tutor.name} 
        />
        <div className="absolute top-4 right-4 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full">
          <i className="fas fa-star mr-1"></i> {tutor.experience}+
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-dark">{tutor.name}</h3>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Verified</span>
        </div>
        <p className="mt-1 text-gray-600">{tutor.subjects.join(', ')}</p>
        <div className="mt-4 flex items-center">
          <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
          <span className="text-sm text-gray-600">{tutor.address}</span>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {tutor.subjects.slice(0, 3).map((subject, index) => (
              <span key={index} className={`px-2 py-1 ${
                index === 0 ? 'bg-blue-100 text-blue-600' : 
                index === 1 ? 'bg-purple-100 text-purple-800' : 
                'bg-green-100 text-green-800'
              } text-xs rounded`}>
                {subject}
              </span>
            ))}
            {tutor.qualifications.length > 0 && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                {tutor.qualifications[0].qualification}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          {/* <span className="text-xl font-bold text-blue-700">₹{tutor.charge_hourly}/Month</span> */}
          <Link to={`/teacherprofile/${tutor.id}`} className="text-sm font-medium text-blue-700 hover:text-indigo-500">
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/tuition_api/api/teachers/get_all.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setTutors(data.slice(0, 3)); // Only show first 3 tutors
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>Loading tutors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">Error loading tutors: {error}</p>
        </div>
      </div>
    );
  }

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
          {tutors.length > 0 ? (
            tutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No tutors found</p>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/findtutor"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            View All Tutors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTutors;