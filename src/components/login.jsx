// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
    userType: 'student',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (error) setError('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const { emailOrMobile, password, userType, rememberMe } = formData; // Use formData, not formData2
    const endpoint = userType === 'student'
      ? `${import.meta.env.VITE_BASE_URL}/public/index.php/student_login`
      : `${import.meta.env.VITE_BASE_URL}/public/index.php/teacher_login`;

    const requestData = new FormData();
    requestData.append('email', emailOrMobile);
    requestData.append('password', password);

    const response = await axios.post(endpoint, requestData);

    if (response.data.status === 200) {
      const userData = response.data.msg;
      const token = userData.secure_token;

      // Save token and user data in cookies
      Cookies.set('token', token, { expires: rememberMe ? 7 : undefined });
      Cookies.set('userId', userData.id, { expires: rememberMe ? 7 : undefined });
      Cookies.set('userType', userType, { expires: rememberMe ? 7 : undefined });
      Cookies.set('userName', userData.name, { expires: rememberMe ? 7 : undefined });
      
      if (userType === 'teacher') {
        Cookies.set('profileImg', userData.profile_img || '', { expires: rememberMe ? 7 : undefined });
      }

      // Redirect to profile page after login and then refresh
      navigate('/profile');
      window.location.reload();
    } else {
      setError(response.data.message || 'Login failed. Please try again.');
    }
  } catch (err) {
    console.error('Login error:', err);
    if (err.response) {
      setError(err.response.data.message || 'Login failed. Please check your credentials.');
    } else if (err.request) {
      setError('Network error. Please check your connection.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-serif font-bold text-gray-900">
              GharSe<span className="text-blue-600">Padho</span>
            </h1>
          </Link>
          <p className="mt-4 text-lg text-gray-600">
            Welcome back to our premium learning community
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              className={`flex-1 py-5 px-6 text-center font-medium text-lg focus:outline-none transition-colors duration-300 ${activeTab === 'student' ? 'bg-indigo-50 text-blue-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              onClick={() => {
                setActiveTab('student');
                setFormData({ ...formData, userType: 'student' });
              }}
            >
              Student Login
            </button>
            <button
              type="button"
              className={`flex-1 py-5 px-6 text-center font-medium text-lg focus:outline-none transition-colors duration-300 ${activeTab === 'teacher' ? 'bg-indigo-50 text-blue-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              onClick={() => {
                setActiveTab('teacher');
                setFormData({ ...formData, userType: 'teacher' });
              }}
            >
              Teacher Login
            </button>
          </div>

          <div className="p-8 sm:p-10">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="emailOrMobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="emailOrMobile"
                  name="emailOrMobile"
                  value={formData.emailOrMobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  placeholder="Enter your email or mobile number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgetpassword" className="font-medium text-blue-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    {activeTab === 'student' ? 'Sign in as Student' : 'Sign in as Teacher'}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;