// src/components/Contact.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <div id="contact" className="py-16 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-dark">Contact Us</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Have questions? We're here to help.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-dark">Send us a message</h3>
            <form className="mt-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows="4"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"></textarea>
              </div>
              <div>
                <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-lg font-medium text-dark">Contact Information</h3>
              <div className="mt-6 space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">123 Education Street</p>
                    <p className="text-sm text-gray-700">Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faPhoneAlt} className="text-blue-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">+91 98765 43210</p>
                    <p className="text-sm text-gray-700">Mon-Sat, 9am-6pm</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">info@edulux.com</p>
                    <p className="text-sm text-gray-700">Support: help@edulux.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-medium text-dark">Follow Us</h4>
                <div className="mt-4 flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-blue-700">
                    <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-700">
                    <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-700">
                    <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-700">
                    <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;