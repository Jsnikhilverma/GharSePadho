import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingModal = ({
  showBookingModal,
  selectedTutor,
  closeBookingModal
}) => {
  // Form state
  const [formData, setFormData] = useState({
    course: '',
    subject: '',
    name: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    area: '',
    mode: '',
    message: ''
  });

  // API data states
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  // Loading states
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial data on modal open
  useEffect(() => {
    if (showBookingModal) {
      fetchStates();
      fetchCourses();
    }
  }, [showBookingModal]);

  const fetchStates = async () => {
    setLoadingStates(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/public/index.php/get_states`);
      if (response.data.status === 200) {
        setStates(response.data.msg);
      }
    } catch (err) {
      console.error('Error fetching states:', err);
      setError('Failed to load states. Please try again.');
    } finally {
      setLoadingStates(false);
    }
  };

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/public/index.php/get_courses`);
      if (response.data.status === 200) {
        setCourses(response.data.msg);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchSubjects = async (courseId) => {
    setLoadingSubjects(true);
    try {
      const formData = new FormData();
      formData.append('course', courseId);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/public/index.php/get_subjects`,
        formData
      );
      
      if (response.data.status === 200) {
        setSubjects(response.data.msg);
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError('Failed to load subjects. Please try again.');
    } finally {
      setLoadingSubjects(false);
    }
  };

  const fetchCities = async (stateId) => {
    setLoadingCities(true);
    try {
      const formData = new FormData();
      formData.append('state', stateId);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/public/index.php/get_cities`,
        formData
      );
      
      if (response.data.status === 200) {
        setCities(response.data.msg);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to load cities. Please try again.');
    } finally {
      setLoadingCities(false);
    }
  };

  const fetchAreas = async (cityId) => {
    setLoadingAreas(true);
    try {
      const formData = new FormData();
      formData.append('city', cityId);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/public/index.php/get_city_area`,
        formData
      );
      
      if (response.data.status === 200) {
        setAreas(response.data.msg);
      }
    } catch (err) {
      console.error('Error fetching areas:', err);
      setError('Failed to load areas. Please try again.');
    } finally {
      setLoadingAreas(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    handleInputChange(e);
    
    // Reset subjects when course changes
    setSubjects([]);
    setFormData(prev => ({
      ...prev,
      subject: ''
    }));
    
    if (courseId) {
      fetchSubjects(courseId);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    handleInputChange(e);
    
    // Reset dependent fields
    setCities([]);
    setAreas([]);
    setFormData(prev => ({
      ...prev,
      city: '',
      area: ''
    }));
    
    if (stateId) {
      fetchCities(stateId);
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    handleInputChange(e);
    
    // Reset dependent field
    setAreas([]);
    setFormData(prev => ({
      ...prev,
      area: ''
    }));
    
    if (cityId) {
      fetchAreas(cityId);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setError(null);
  
  try {
    const submitFormData = new FormData();
    
    // Append all form data to FormData object
      submitFormData.append('name', formData.name);
      submitFormData.append('email', formData.email);
      submitFormData.append('mobile', formData.mobile);
      // submitFormData.append('mode', formData.mode);

      // Append mode_name based on mode value
      let modeName = '';
      if (formData.mode === '1') modeName = 'Online';
      else if (formData.mode === '2') modeName = 'Offline';
      else if (formData.mode === '3') modeName = 'Both';
      if (modeName) {
        submitFormData.append('mode', modeName);
      }
      
    
    // Find and append names for IDs
    if (formData.course) {
      const selectedCourse = courses.find(c => c.id == formData.course);
      if (selectedCourse) {
        submitFormData.append('course_name', selectedCourse.class_name);
      }
    }
    
    if (formData.subject) {
      const selectedSubject = subjects.find(s => s.id == formData.subject);
      if (selectedSubject) {
        submitFormData.append('subject_name', selectedSubject.subject_name);
      }
    }
    
    if (formData.state) {
      const selectedState = states.find(s => s.id == formData.state);
      if (selectedState) {
        submitFormData.append('state_name', selectedState.state_name);
      }
    }
    
    if (formData.city) {
      const selectedCity = cities.find(c => c.id == formData.city);
      if (selectedCity) {
        submitFormData.append('city_name', selectedCity.city_name);
      }
    }
    
    if (formData.area) {
      const selectedArea = areas.find(a => a.id == formData.area);
      if (selectedArea) {
        submitFormData.append('area_name', selectedArea.area_name);
      }
    }
    
    // Add tutor information
    // submitFormData.append('tutor_id', selectedTutor.id);
    // submitFormData.append('tutor_name', selectedTutor.name);
    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/public/index.php/save_enquiry`,
      submitFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    if (response.data.status === 200) {
      setSubmitSuccess(true);
      setFormData({
        course: '',
        subject: '',
        name: '',
        email: '',
        mobile: '',
        state: '',
        city: '',
        area: '',
        mode: '',
        message: ''
      });
      setStates([]);
      setCities([]);
      setAreas([]);
      setCourses([]);
      setSubjects([]);
      // Reset loading states
      setLoadingStates(false);
      setLoadingCities(false);
      setLoadingAreas(false);
      setLoadingCourses(false);
      setLoadingSubjects(false);
      setError(null);
      // Close modal after successful submission
      setTimeout(() => {
        closeBookingModal();
        setSubmitSuccess(false);
      }, 2000);

    } else {
      setError(response.data.msg || 'Submission failed. Please try again.');
    }
  } catch (err) {
    console.error('Error submitting form:', err);
    setError('An error occurred. Please try again.');
  } finally {
    setSubmitting(false);
  }
};

  if (!showBookingModal || !selectedTutor) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Book a Session
            </h3>
            <button
              onClick={closeBookingModal}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enquiry Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">Our team will contact you shortly.</p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={closeBookingModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Back to Form
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4 overflow-hidden">
                    {selectedTutor.profile_pic ? (
                      <img
                        src={selectedTutor.profile_pic}
                        alt={selectedTutor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
                      ₹{selectedTutor.charge_hourly} <span className="text-gray-500 font-normal">/Month</span>
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                      Course *
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleCourseChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={loadingCourses}
                    >
                      <option value="">{loadingCourses ? 'Loading...' : 'Select Course'}</option>
                      {courses?.map(course => (
                        <option key={course.id} value={course.id}>{course.class_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={!formData.course || loadingSubjects}
                    >
                      <option value="">{loadingSubjects ? 'Loading...' : 'Select Subject'}</option>
                      {subjects?.map(subject => (
                        <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={loadingStates}
                    >
                      <option value="">Select State</option>
                      {states?.map(state => (
                        <option key={state.id} value={state.id}>{state.state_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleCityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={!formData.state || loadingCities}
                    >
                      <option value="">{loadingCities ? 'Loading...' : 'Select City'}</option>
                      {cities?.map(city => (
                        <option key={city.id} value={city.id}>{city.city_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                      Area *
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={!formData.city || loadingAreas}
                    >
                      <option value="">{loadingAreas ? 'Loading...' : 'Select Area'}</option>
                      {areas?.map(area => (
                        <option key={area.id} value={area.id}>{area.area_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
                      Mode of Teaching *
                    </label>
                    <select
                      id="mode"
                      name="mode"
                      value={formData.mode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Mode</option>
                      <option value="1">Online</option>
                      <option value="2">Offline</option>
                      <option value="3">Both</option>
                    </select>
                  </div>
                </div>
                {/* <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div> */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;