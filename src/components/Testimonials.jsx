// src/components/Testimonials.jsx
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Meera Kapoor",
    role: "Parent of Class 10 Student",
    quote: "Thanks to EduLux, my daughter's math grades improved from 65% to 92% in just 3 months. The personalized attention made all the difference.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    name: "Rohan Malhotra",
    role: "Class 12 Student",
    quote: "My physics tutor from EduLux helped me crack IIT-JEE with his unique teaching methods. He didn't just teach concepts but how to think like a scientist.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    name: "Neha Gupta",
    role: "College Student",
    quote: "I was struggling with English for my competitive exams. My EduLux tutor tailored lessons to my needs and helped me score 8.5 in IELTS. Highly recommended!",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif  font-bold text-blue-600">Success Stories</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            What our students and parents say about us
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-quote-left text-gray-300 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                      <img className="h-full w-full object-cover" src={testimonial.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-dark">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">"{testimonial.quote}"</p>
                    <div className="mt-3 flex text-accent">
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(testimonial.rating) ? 
                          <i key={i} className="fas fa-star"></i> : 
                          (i === Math.floor(testimonial.rating) && testimonial.rating % 1 !== 0) ? 
                          <i key={i} className="fas fa-star-half-alt"></i> : 
                          <i key={i} className="far fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;