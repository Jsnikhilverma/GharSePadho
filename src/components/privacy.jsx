import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Privacy Policy</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p> */}
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our home tuition platform. We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <p className="text-gray-700">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">2. Information We Collect</h2>
          <p className="text-gray-700 mb-2">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Demographic information (location, preferences, etc.)</li>
            <li>Academic information (subjects, grade levels, etc.)</li>
            <li>Payment information (processed securely through our payment gateway)</li>
            <li>Usage data and website interaction information</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-2">We use the information we collect for various purposes:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To match students with appropriate tutors</li>
            <li>To process payments and transactions</li>
            <li>To communicate with you about your account or our services</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">4. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">5. Third-Party Services</h2>
          <p className="text-gray-700">
            We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, or assist us in analyzing how our service is used. These third parties have access to your personal information only to perform these tasks and are obligated not to disclose or use it for any other purpose.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">6. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at privacy@yourhometuitionwebsite.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;