import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

const TutorProfile = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: '1',
    message: '',
  });

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await fetch('https://gharsepadho.com/gsp_api/public/index.php/get_teacher_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `teacher_id=${id}`
        });

        const data = await response.json();
        console.log(data);

        if (data.msg && Array.isArray(data.msg)) {
          // Find the tutor with matching ID (ensure both are strings for comparison)
          const foundTutor = data.msg.find(t => String(t.id) === String(id));
          if (foundTutor) {
            setTutor(foundTutor);
          } else {
            setTutor(null);
            setError('Tutor not found');
          }
        } else {
          setTutor(null);
          setError('Failed to fetch tutor data');
        }
      } catch (err) {
        setTutor(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [id]);

  const openBookingModal = () => setShowBookingModal(true);
  const closeBookingModal = () => setShowBookingModal(false);

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    console.log('Booking submitted:', {
      tutorId: tutor.id,
      tutorName: tutor.name,
      ...bookingForm,
    });
    alert(`Booking request sent for ${tutor.name} on ${bookingForm.date} at ${bookingForm.time} for ${bookingForm.duration} hours.`);
    closeBookingModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading tutor profile</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/findtutors" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Tutors
          </Link>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tutor not found</h3>
          <p className="text-gray-600 mb-4">The tutor you're looking for doesn't exist or may have been removed.</p>
          <Link to="/findtutors" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
              <div className="relative">
                <img
                  src={tutor?.profile_img || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"}
                  alt={tutor?.name}
                  className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl font-serif font-bold mb-2">{tutor.name}</h1>
              <h2 className="text-2xl font-light mb-4">{tutor.subjects || 'General Subjects'}</h2>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center bg-white text-blue-700 bg-opacity-20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {tutor?.experience || 'Experienced'} Tutor
                </div>
                <div className="flex items-center bg-white text-blue-700 bg-opacity-20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {tutor?.mobile}
                </div>
              </div>

              <div className="flex justify-center md:justify-start space-x-4">
                <button
                  onClick={openBookingModal}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300 flex items-center"
                >
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
              <p className="text-gray-700 mb-6">
                {tutor.name} is an experienced tutor with {tutor.experience || 'several years'} of teaching experience. 
                {tutor.courses ? ` Specializing in ${tutor.courses}.` : ' Available for various subjects and courses.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-4">Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects ? (
                      tutor.subjects.split(',').map((subject, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                          {subject.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                        General Subjects
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-4">Contact</h4>
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {tutor.mobile}
                    </p>
                    <p className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {tutor.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Experience</h3>
              <p className="text-gray-700">
                {tutor.name} has been teaching for {tutor.experience || 'several years'}, helping students achieve their academic goals.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Contact Tutor</h3>

              <div className="space-y-4">
                <button
                  onClick={openBookingModal}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                >
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
          <Link to="/findtutors" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Tutors
          </Link>
        </div>
      </div>

      {/* Booking Modal */}
      {tutor && (
        <BookingModal
          showBookingModal={showBookingModal}
          selectedTutor={tutor}
          bookingForm={bookingForm}
          closeBookingModal={closeBookingModal}
          handleBookingSubmit={handleBookingSubmit}
          handleBookingFormChange={handleBookingFormChange}
        />
      )}
    </div>
  );
};

export default TutorProfile;