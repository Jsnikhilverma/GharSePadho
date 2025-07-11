import { useState } from 'react';
import { XMarkIcon, CheckCircleIcon, ClockIcon, UserIcon, PhoneIcon, EnvelopeIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const TuitionBookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    grade: '',
    preferredDate: '',
    address: '',
    requirements: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          grade: '',
          preferredDate: '',
          address: '',
          requirements: ''
        });
        onClose();
      }, 3000);
    }, 2000);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"></div>
      
      {/* Modal container */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all w-full max-w-2xl">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          {/* Modal header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">Premium Tuition Booking</h2>
            <p className="text-indigo-100 mt-1">Schedule your personalized learning session</p>
          </div>
          
          {/* Progress steps */}
          <div className="flex items-center justify-between px-8 py-4 bg-gray-50 border-b">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} transition-colors`}>
                  {currentStep > step ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <span className="font-medium">{step}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 ${currentStep >= step ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  {step === 1 ? 'Details' : step === 2 ? 'Schedule' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Modal content */}
          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Booking Confirmed!</h3>
                <p className="mt-2 text-gray-600">Your tuition session has been scheduled successfully.</p>
                <p className="mt-1 text-gray-600">We'll contact you shortly with confirmation details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                      <p className="text-sm text-gray-500">Provide your contact details so we can reach you</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject Needed</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                        >
                          <option value="">Select a subject</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Biology">Biology</option>
                          <option value="English">English</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Next: Schedule
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Schedule Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Session Details</h3>
                      <p className="text-sm text-gray-500">When and where would you like the tuition?</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Grade/Level</label>
                        <select
                          id="grade"
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                        >
                          <option value="">Select grade/level</option>
                          <option value="Elementary">Elementary School</option>
                          <option value="Middle">Middle School</option>
                          <option value="High">High School</option>
                          <option value="College">College/University</option>
                          <option value="Adult">Adult Education</option>
                        </select>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                          />
                        </div>
                      </div>
                      
                      <div className="relative col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                            placeholder="123 Main St, City, Country"
                          />
                        </div>
                      </div>
                      
                      <div className="relative col-span-2">
                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                        <textarea
                          id="requirements"
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleChange}
                          rows={3}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                          placeholder="Any specific topics, learning preferences, or special needs..."
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Next: Review
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Review and Submit */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Review Your Booking</h3>
                      <p className="text-sm text-gray-500">Please verify your information before submitting</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Personal Information</h4>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-900">{formData.name}</p>
                            <p className="text-sm text-gray-900">{formData.email}</p>
                            <p className="text-sm text-gray-900">{formData.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Session Details</h4>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-900"><span className="font-medium">Subject:</span> {formData.subject}</p>
                            <p className="text-sm text-gray-900"><span className="font-medium">Grade:</span> {formData.grade}</p>
                            <p className="text-sm text-gray-900"><span className="font-medium">Date:</span> {formData.preferredDate || 'Not specified'}</p>
                            <p className="text-sm text-gray-900"><span className="font-medium">Location:</span> {formData.address}</p>
                          </div>
                        </div>
                        
                        {formData.requirements && (
                          <div className="col-span-2">
                            <h4 className="text-sm font-medium text-gray-500">Special Requirements</h4>
                            <p className="text-sm text-gray-900 mt-1">{formData.requirements}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <ClockIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
          
          {/* Modal footer */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-500">Need help? <a href="#" className="text-indigo-600 hover:text-indigo-800">Contact support</a></p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Secured by</span>
              <div className="flex space-x-1">
                <div className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/>
                  </svg>
                </div>
                <div className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionBookingModal;