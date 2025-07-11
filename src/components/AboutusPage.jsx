import React from 'react';
import { useNavigate } from 'react-router-dom';


const AboutUs = () => {
    const navigate = useNavigate();
  
  const handleBookSession = () => {
      navigate('/contact');

};
  
  const handleContactSession = () => {
        navigate('/findtuter');

  };


  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-700"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Redefining <span className="text-blue-100">Excellence</span> in Education
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              India's premier tutoring service delivering world-class education with personalized attention.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full inline-block mb-6">
              OUR MISSION
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Empowering India's Future Through <span className="text-blue-700">Personalized Learning</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              At GharSePadho Educators, we believe every student deserves access to exceptional tutors who can unlock their full potential. 
              Our mission is to bridge the gap between ambition and achievement through tailored, one-on-one instruction.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900">Verified & Certified Tutors</h4>
                <p className="text-gray-600">Rigorous selection process ensures only the best educators</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Tutor teaching student" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-gray-200 w-64">
              <div className="text-blue-700 text-4xl font-bold mb-2">5,000+</div>
              <div className="text-gray-700 font-medium">Students Transformed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full inline-block mb-6">
              OUR VALUES
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              The <span className="text-blue-700">GharSePadho Educators</span> Difference
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What sets us apart in India's competitive education landscape
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Curriculum Mastery",
                description: "Our tutors have deep subject knowledge aligned with Indian and international curricula."
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
                title: "Personalized Approach",
                description: "Tailored learning plans designed for each student's unique needs and goals."
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Flexible Scheduling",
                description: "Learn at your convenience with 24/7 booking and last-minute session options."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full inline-block mb-6">
            MEET OUR TEAM
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            The Minds Behind <span className="text-blue-700">GharSePadho Educators</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our leadership team brings decades of combined experience in education and technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Arjun Patel",
              role: "Founder & CEO",
              bio: "Former IIT professor with 15+ years in education technology",
              image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Priya Sharma",
              role: "Chief Academic Officer",
              bio: "Oxford-educated educator specializing in curriculum design",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Rahul Mehta",
              role: "Director of Operations",
              bio: "Expert in scaling educational services across India",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            }
          ].map((member, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-300 font-medium mb-2">{member.role}</p>
                <p className="text-gray-200 text-sm">{member.bio}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                <span className="text-transparent bg-clip-text bg-blue-700">
                  GharSePadho Team
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Experience <span className="text-blue-300">Premium Tutoring</span>?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Join thousands of Indian students who have transformed their academic performance with GharSePadho Educators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
            onClick={handleContactSession}

              className="bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Find Your Tutor
            </button>
            <button
            onClick={handleBookSession}

              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-800 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;