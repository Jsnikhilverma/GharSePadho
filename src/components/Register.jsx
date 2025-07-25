// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    phone: '',
    subjects: [],
    educationLevel: '',
    bio: '',
    experience: '',
    address: '',
    chargeHourly: '',
    qualifications: [{ qualification: '', institution: '', year: '' }]
  });
  const [subjectInput, setSubjectInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle subjects checkbox
      let updatedSubjects = [...formData.subjects];
      if (checked) {
        updatedSubjects.push(value);
      } else {
        updatedSubjects = updatedSubjects.filter(subject => subject !== value);
      }
      setFormData({...formData, subjects: updatedSubjects});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [name]: value
    };
    setFormData({
      ...formData,
      qualifications: updatedQualifications
    });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [...formData.qualifications, { qualification: '', institution: '', year: '' }]
    });
  };

  const removeQualification = (index) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications.splice(index, 1);
    setFormData({
      ...formData,
      qualifications: updatedQualifications
    });
  };

  const handleSubjectInput = (e) => {
    setSubjectInput(e.target.value);
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (subjectInput.trim() && !formData.subjects.includes(subjectInput.trim())) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, subjectInput.trim()]
      });
      setSubjectInput('');
    }
  };

  const removeSubject = (subjectToRemove) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter(subject => subject !== subjectToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      if (activeTab === 'student') {
        // Student registration
        const response = await fetch('http://127.0.0.1:8080/tuition_api/api/auth/register_student.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile_no: formData.phone,
            password: formData.password,
            education_level: formData.educationLevel
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Student registration failed');
        }

        // Redirect to login or dashboard after successful registration
        navigate('/login', { state: { registrationSuccess: true } });
      } else {
        // Teacher registration
        const response = await fetch('http://127.0.0.1:8080/tuition_api/api/auth/register_teacher.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile_no: formData.phone,
            password: formData.password,
            address: formData.address,
            experience: parseInt(formData.experience.split('-')[0]), // Extract years from "1-3" format
            charge_hourly: parseFloat(formData.chargeHourly),
            bio: formData.bio,
            subjects: formData.subjects,
            qualifications: formData.qualifications.filter(q => 
              q.qualification && q.institution && q.year
            )
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Teacher registration failed');
        }

        // Redirect to login or dashboard after successful registration
        navigate('/login', { state: { registrationSuccess: true } });
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'History', 'Geography', 'Computer Science',
    'Economics', 'Business Studies', 'Psychology', 'Art'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              GharSe<span className="text-blue-600">Padho</span>
            </h1>
          </Link>
          <p className="mt-2 text-lg text-gray-600">
            Join our premium learning community
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium text-lg focus:outline-none transition-colors duration-300 ${activeTab === 'student' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              onClick={() => {
                setActiveTab('student');
                setFormData({...formData, userType: 'student'});
              }}
            >
              <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Register as Student
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium text-lg focus:outline-none transition-colors duration-300 ${activeTab === 'teacher' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              onClick={() => {
                setActiveTab('teacher');
                setFormData({...formData, userType: 'teacher'});
              }}
            >
              <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Register as Teacher
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8 sm:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="Create a password"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Number (Common) */}
              <div className="mb-8">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="Enter your phone number with country code"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Student-Specific Fields */}
              {activeTab === 'student' && (
                <div className="mb-8">
                  <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Education Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  >
                    <option value="">Select your education level</option>
                    <option value="Primary School">Primary School</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              {/* Teacher-Specific Fields */}
              {activeTab === 'teacher' && (
                <>
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Subjects You Teach <span className="text-red-500">*</span>
                    </label>
                    
                    {/* Subject input and add button */}
                    <div className="flex mb-4">
                      <input
                        type="text"
                        value={subjectInput}
                        onChange={handleSubjectInput}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                        placeholder="Add a subject (e.g. Mathematics)"
                      />
                      <button
                        type="button"
                        onClick={addSubject}
                        className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      >
                        Add
                      </button>
                    </div>
                    
                    {/* Selected subjects display */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.subjects.map((subject) => (
                        <div key={subject} className="flex items-center bg-blue-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                          {subject}
                          <button
                            type="button"
                            onClick={() => removeSubject(subject)}
                            className="ml-2 text-indigo-600 hover:text-indigo-900 focus:outline-none"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {/* Predefined subject options */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {subjectOptions.map((subject) => (
                        <div key={subject} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`subject-${subject}`}
                            name="subjects"
                            value={subject}
                            checked={formData.subjects.includes(subject)}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`subject-${subject}`} className="ml-2 text-sm text-gray-700">
                            {subject}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Teaching Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                      >
                        <option value="">Select years of experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="chargeHourly" className="block text-sm font-medium text-gray-700 mb-1">
                        Hourly Charge (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="chargeHourly"
                          name="chargeHourly"
                          value={formData.chargeHourly}
                          onChange={handleChange}
                          required
                          min="0"
                          step="50"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                          placeholder="Your hourly rate"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">₹</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                      placeholder="Your full address"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Bio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="Tell us about your teaching experience, methodology, and specialties"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Qualifications <span className="text-red-500">*</span>
                    </label>
                    
                    {formData.qualifications.map((qual, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label htmlFor={`qualification-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Qualification
                          </label>
                          <input
                            type="text"
                            id={`qualification-${index}`}
                            name="qualification"
                            value={qual.qualification}
                            onChange={(e) => handleQualificationChange(index, e)}
                            required={index === 0}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Degree/Certification"
                          />
                        </div>
                        <div>
                          <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Institution
                          </label>
                          <input
                            type="text"
                            id={`institution-${index}`}
                            name="institution"
                            value={qual.institution}
                            onChange={(e) => handleQualificationChange(index, e)}
                            required={index === 0}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="University/School"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label htmlFor={`year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                              Year
                            </label>
                            <input
                              type="number"
                              id={`year-${index}`}
                              name="year"
                              value={qual.year}
                              onChange={(e) => handleQualificationChange(index, e)}
                              required={index === 0}
                              min="1900"
                              max={new Date().getFullYear()}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                              placeholder="Year"
                            />
                          </div>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeQualification(index)}
                              className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addQualification}
                      className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                    >
                      + Add Another Qualification
                    </button>
                  </div>
                </>
              )}

              {/* Terms and Conditions */}
              {/* <div className="flex items-start mb-8">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                  </label>
                </div>
              </div> */}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {activeTab === 'student' ? 'Create Student Account' : 'Apply as Teacher'}
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;