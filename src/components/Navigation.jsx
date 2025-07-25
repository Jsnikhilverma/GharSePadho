// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if token exists in cookies
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close user dropdown when mobile menu is toggled
    if (userDropdownOpen) setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    // Close mobile menu when user dropdown is toggled
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Remove token from cookies
    Cookies.remove('token');
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
    navigate('/');
    window.location.reload(); // Refresh to update the UI
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/subject', label: 'Find Tutors' },
    { path: '/work', label: 'How It Works' },
    { path: '/aboutus', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-white shadow-lg mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-16 w-auto"
              src="/gharsepadho.png"
              alt="EduLux Tutors Logo"
              onClick={() => handleNavigation('/')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-2">
            {navLinks.map((link) => (
              <button 
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            
            {isLoggedIn ? (
              <div className="relative ml-4">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center text-gray-700 hover:text-blue-700 focus:outline-none"
                  aria-expanded={userDropdownOpen}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {userDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      <button
                        onClick={() => handleNavigation('/profile')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Account
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Sign In
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu (dropdown) */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavigation(link.path)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavigation('/profile')}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-colors duration-200"
              >
                My Account
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNavigation('/login')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50 transition-colors duration-200"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;