// src/components/FeaturedTutors.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TutorCard = ({ tutor }) => {
  return (
    <div className="teacher-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img 
          className="w-full h-96 object-cover" 
          src={tutor.profile_img || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"} 
          alt={tutor.name} 
        />
        <div className="absolute top-4 right-4 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full">
          <i className="fas fa-star mr-1"></i> {tutor.experience || 'N/A'}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-dark">{tutor.name}</h3>
          <span className={`text-sm ${tutor.verify_status === "1" ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}>
            {tutor.verify_status === "1" ? "Verified" : "Not Verified"}
          </span>
        </div>
        <p className="mt-1 text-gray-600">{tutor.email}</p>
        <div className="mt-4 flex items-center">
          <i className="fas fa-phone-alt text-gray-400 mr-2"></i>
          <span className="text-sm text-gray-600">{tutor.mobile}</span>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {tutor.subjects ? (
              tutor.subjects.split(',').slice(0, 3).map((subject, index) => (
                <span key={index} className={`px-2 py-1 ${
                  index === 0 ? 'bg-blue-100 text-blue-600' : 
                  index === 1 ? 'bg-purple-100 text-purple-800' : 
                  'bg-green-100 text-green-800'
                } text-xs rounded`}>
                  {subject.trim()}
                </span>
              ))
            ) : (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                Subjects not specified
              </span>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
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
        const formData = new FormData();
        formData.append('teacher_id', 'all');

        const response = await fetch('https://gharsepadho.com/gsp_api/public/index.php/get_teacher_details', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.status === 200) {
          // If the API returns a single tutor object when successful
          if (data.msg && !Array.isArray(data.msg)) {
            setTutors([data.msg]);
          } 
          // If the API returns an array of tutors
          else if (Array.isArray(data.msg)) {
            setTutors(data.msg.slice(0, 3)); // Only show first 3 tutors
          } else {
            throw new Error('Unexpected API response format');
          }
        } else {
          throw new Error(data.message || 'Failed to fetch tutors');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching tutors:', err);
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
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <p className="mt-4">Loading tutors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">Error loading tutors: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
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

        {tutors.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/findtutor"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              View All Tutors
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedTutors;