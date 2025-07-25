// src/pages/FindTutors.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FindTutors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject'); // Fixed: get 'subject' parameter

  const [filters, setFilters] = useState({
    name: '',
    classLevel: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    subject: subjectParam || '', // Initialize with subjectParam or empty string
    sortBy: 'rating'
  });

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: '1',
    message: ''
  });

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tutors based on filters
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        let url = 'http://127.0.0.1:8080/tuition_api/api/teachers/get_all.php';
        
        if (filters.subject) {
          url = `http://127.0.0.1:8080/tuition_api/api/teachers/get_by_subject.php?subject=${encodeURIComponent(filters.subject)}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Handle different response structures
        if (filters.subject) {
          setTutors(data.data || []);
        } else {
          setTutors(data || []);
        }
        
        setError(null);
      } catch (err) {
        setError(err.message);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters.subject]);

  // Update filters when subjectParam changes
  useEffect(() => {
    if (subjectParam) {
      setFilters(prev => ({
        ...prev,
        subject: subjectParam
      }));
    }
  }, [subjectParam]);

  // Filter tutors based on other filters (name, price, etc.)
  const filteredTutors = tutors.filter(tutor => {
    return (
      (filters.name === '' || tutor.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.minPrice === '' || parseFloat(tutor.charge_hourly) >= parseFloat(filters.minPrice)) &&
      (filters.maxPrice === '' || parseFloat(tutor.charge_hourly) <= parseFloat(filters.maxPrice))
    );
  });

  // Sort tutors based on selected option
  const sortedTutors = [...filteredTutors].sort((a, b) => {
    switch(filters.sortBy) {
      case 'priceLowHigh':
        return parseFloat(a.charge_hourly) - parseFloat(b.charge_hourly);
      case 'priceHighLow':
        return parseFloat(b.charge_hourly) - parseFloat(a.charge_hourly);
      case 'experience':
        return b.experience - a.experience;
      case 'rating':
      default:
        // Since your API doesn't have rating, we'll sort by experience as default
        return b.experience - a.experience;
    }
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      classLevel: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      subject: subjectParam || '', // Keep the subject from URL param when resetting
      sortBy: 'rating'
    });
  };

  const viewProfile = (id) => {
    navigate(`/teacherprofile/${id}`);
  };

  const openBookingModal = (tutor) => {
    setSelectedTutor(tutor);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedTutor(null);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      duration: '1',
      message: ''
    });
  };

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', {
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      ...bookingForm
    });
    
    // Close modal and show success message
    closeBookingModal();
    alert('Booking request submitted successfully!');
  };

  // Get badge color based on experience
  const getBadgeColor = (experience) => {
    if (experience >= 10) return 'bg-amber-100 text-amber-800';
    if (experience >= 5) return 'bg-rose-100 text-rose-800';
    return 'bg-emerald-100 text-emerald-800';
  };

  // Get badge text based on experience
  const getBadgeText = (experience) => {
    if (experience >= 10) return 'Expert';
    if (experience >= 5) return 'Experienced';
    return 'Fast Learner';
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-8">
      <div>
        {/* Elegant Header */}
        <div className="relative overflow-hidden bg-gray-900 mb-8">
          <div className="absolute inset-0 bg-blue-700 opacity-90"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                {filters.subject ? `${filters.subject} Tutors` : 'Discover Exceptional Tutors'}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                {filters.subject ? `Find the best ${filters.subject} tutors for your needs` : 'Connect with vetted experts who inspire and transform learning experiences'}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Minimalist Filter Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Name Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Tutor Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  placeholder="Search by name"
                  className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  placeholder="Search by subject"
                  className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Price Range Filter */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Price Range (₹/hr)
                </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min price"
                    className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max price"
                    className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  />
                  <button
                    onClick={resetFilters}
                    className="whitespace-nowrap text-xs font-medium text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                {filters.subject ? `${filters.subject} Tutors` : 'Available Tutors'}
              </h2>
              <p className="text-gray-500">
                {loading ? 'Loading...' : `${sortedTutors.length} ${sortedTutors.length === 1 ? 'tutor' : 'tutors'} found`}
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="border-0 text-sm font-medium text-blue-600 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="rating">Experience (High to Low)</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="experience">Most Experience</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Loading Tutors</h3>
              <p className="mt-1 text-gray-500">Please wait while we fetch the best tutors for you.</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Tutors</h3>
              <p className="mt-1 text-gray-500">{error}</p>
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Tutors Grid */}
          {!loading && !error && sortedTutors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sortedTutors.map(tutor => (
                <div key={tutor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="md:flex">
                    {/* Tutor Image */}
                    <div className="md:w-1/3 relative bg-gray-200">
                      <div className="w-full h-48 md:h-full flex items-center justify-center text-gray-400">
                        {tutor.profile_pic ? (
                          <img 
                            src={tutor.profile_pic} 
                            alt={tutor.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`absolute top-4 left-4 text-xs font-medium px-2.5 py-0.5 rounded-full ${getBadgeColor(tutor.experience)}`}>
                        {getBadgeText(tutor.experience)}
                      </span>
                    </div>
                    
                    {/* Tutor Details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
                          <p className="text-gray-600">
                            {Array.isArray(tutor.subjects) ? tutor.subjects.join(', ') : tutor.subjects}
                          </p>
                        </div>
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                          <svg className="w-4 h-4 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium text-blue-600">Verified</span>
                        </div>
                      </div>
                      
                      {/* Experience */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-sm text-gray-500">
                          {tutor.experience} {tutor.experience === 1 ? 'year' : 'years'} experience
                        </div>
                      </div>
                      
                      {/* Qualifications */}
                      <div className="mb-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Education:</span> 
                          {tutor.qualifications && tutor.qualifications.length > 0 ? (
                            ` ${tutor.qualifications[0].qualification} from ${tutor.qualifications[0].institution}`
                          ) : 'Not specified'}
                        </p>
                      </div>
                      
                      {/* Bio */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">About:</span> {tutor.bio || 'No bio provided'}
                        </p>
                      </div>
                      
                      {/* Subjects */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Teaches:</p>
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(tutor.subjects) ? (
                            tutor.subjects.slice(0, 4).map((subject, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                                {subject}
                              </span>
                            ))
                          ) : (
                            <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                              {tutor.subjects}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {/* <div>
                          <span className="text-xl font-bold text-gray-900">₹{tutor.charge_hourly}</span>
                          <span className="text-sm text-gray-500">/Month</span>
                        </div> */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewProfile(tutor.id)}
                            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 text-sm font-medium rounded-lg transition duration-200"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => openBookingModal(tutor)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && !error && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No tutors found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
                <div className="mt-6">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Book a Session with {selectedTutor.name}
                </h3>
                <button
                  onClick={closeBookingModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    {selectedTutor.profile_pic ? (
                      <img 
                        src={selectedTutor.profile_pic} 
                        alt={selectedTutor.name} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedTutor.name}</h4>
                    <p className="text-sm text-gray-600">
                      {Array.isArray(selectedTutor.subjects) ? selectedTutor.subjects.join(', ') : selectedTutor.subjects}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      ₹{selectedTutor.charge_hourly} <span className="text-gray-500 font-normal">/hour</span>
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleBookingFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleBookingFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleBookingFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleBookingFormChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleBookingFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (hours)
                    </label>
                    <select
                      name="duration"
                      value={bookingForm.duration}
                      onChange={handleBookingFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="1">1 hour</option>
                      <option value="1.5">1.5 hours</option>
                      <option value="2">2 hours</option>
                      <option value="2.5">2.5 hours</option>
                      <option value="3">3 hours</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleBookingFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTutors;