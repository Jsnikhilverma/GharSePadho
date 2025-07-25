import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Terms and Conditions</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p> */}
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this website.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">2. Services Provided</h2>
          <p className="text-gray-700 mb-4">
            Our platform connects students/parents with qualified home tuition teachers. We act as an intermediary and do not directly provide tutoring services.
          </p>
          <p className="text-gray-700">
            We verify tutor credentials to the best of our ability but cannot guarantee their performance or the results of their tutoring.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">3. User Responsibilities</h2>
          <p className="text-gray-700 mb-2">As a user of our platform, you agree to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate and complete information during registration</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use the platform only for lawful purposes</li>
            <li>Not engage in any fraudulent activities</li>
            <li>Respect the privacy of tutors/students you connect with</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">4. Fees and Payments</h2>
          <p className="text-gray-700 mb-2">Our fee structure is as follows:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Students/Parents: Service fee of X% per transaction or fixed amount per session</li>
            <li>Tutors: Commission of X% per session or monthly subscription fee</li>
          </ul>
          <p className="text-gray-700 mt-4">
            All fees are non-refundable except as required by law or at our sole discretion.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">5. Cancellation and Rescheduling</h2>
          <p className="text-gray-700">
            Sessions may be cancelled or rescheduled with at least 24 hours notice. Late cancellations may result in a cancellation fee.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">6. Intellectual Property</h2>
          <p className="text-gray-700">
            All content on this website, including text, graphics, logos, and software, is the property of our company and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express permission.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">7. Limitation of Liability</h2>
          <p className="text-gray-700">
            We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">8. Governing Law</h2>
          <p className="text-gray-700">
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">9. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Your continued use of the website after such changes constitutes your acceptance of the new terms.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">10. Contact Information</h2>
          <p className="text-gray-700">
            For any questions regarding these terms, please contact us at support@yourhometuitionwebsite.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;