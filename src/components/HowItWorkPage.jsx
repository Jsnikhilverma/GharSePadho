import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleBookSession = () => {
    navigate('/contact');
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-blue-700"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Our <span className="text-blue-300">Premium</span> Process
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover how GharSePadho Educators delivers exceptional tutoring through our carefully crafted methodology
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full inline-block mb-6">
            SIMPLE YET EFFECTIVE
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Your Journey to <span className="text-blue-700">Academic Excellence</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our 4-step process ensures personalized attention and measurable results
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-200 via-indigo-400 to-indigo-200 transform -translate-x-1/2"></div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {[
              {
                step: "01",
                title: "Personalized Assessment",
                description: "Begin with a comprehensive evaluation of your academic needs, learning style, and goals. Our education specialists will analyze strengths and areas for improvement.",
                icon: (
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
                image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              },
              {
                step: "02",
                title: "Tutor Matching",
                description: "We handpick 2-3 elite tutors from our network who best match your requirements. Review profiles and schedule introductory sessions at no cost.",
                icon: (
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                image: "/tuitorprocess.jpg"
              },
              {
                step: "03",
                title: "Custom Learning Plan",
                description: "Your selected tutor creates a tailored curriculum with milestones and progress tracking. Regular assessments ensure continuous improvement.",
                icon: (
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              },
              {
                step: "04",
                title: "Ongoing Excellence",
                description: "Receive regular progress reports and adjust the learning approach as needed. Our academic advisors remain available for consultation throughout your journey.",
                icon: (
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              }
            ].map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                {/* Step number */}
                <div className="flex-shrink-0 w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 shadow-lg">
                  {item.step}
                </div>

                {/* Image */}
                <div className={`flex-shrink-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'} mb-8 md:mb-0`}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl aspect-w-16 aspect-h-9">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
                  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative">
                    <div className="absolute -top-6 left-6 bg-indigo-100 rounded-lg p-3 shadow-md">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full inline-block mb-6">
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              The <span className="text-blue-700">GharSePadho Educators</span> Advantage
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Expert Tutors",
                description: "Only 8% of applicants make it through our rigorous selection process",
                icon: (
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Flexible Scheduling",
                description: "24/7 booking system with last-minute session availability",
                icon: (
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Progress Tracking",
                description: "Real-time dashboards and monthly performance reports",
                icon: (
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "All Subjects Covered",
                description: "From primary school to competitive exam preparation",
                icon: (
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: "Premium Learning Materials",
                description: "Exclusive resources curated by top educators",
                icon: (
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              },
              {
                title: "Satisfaction Guarantee",
                description: "Change tutors anytime if not completely satisfied",
                icon: (
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full inline-block mb-6">
            SUCCESS STORIES
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Transforming <span className="text-blue-700">Lives Through Education</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Rajesh Mehta",
              role: "Parent of Class 10 Student",
              quote: "My daughter's math scores improved from 65% to 92% in just 3 months. The personalized attention made all the difference.",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              rating: 5
            },
            {
              name: "Priya Chatterjee",
              role: "NEET Aspirant",
              quote: "My tutor's deep subject knowledge and test-taking strategies helped me secure AIR 342. Couldn't have done it without Elite Educators!",
              image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              rating: 5
            },
            {
              name: "Sanjay Gupta",
              role: "Parent of Class 6 Student",
              quote: "The progress tracking system gives us complete visibility into our son's improvement. Worth every rupee for the quality of education.",
              image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              rating: 4
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-6">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              <div className="bg-gray-50 px-8 py-4 flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Begin Your <span className="text-white">Educational Journey</span>?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Experience the GharSePadho Educators difference with a complimentary first session.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleBookSession}
              className="bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Book Free Session
            </button>
            {/* <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-800 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Speak to Advisor
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;