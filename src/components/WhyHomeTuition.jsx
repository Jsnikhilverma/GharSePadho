import React from "react";

const WhyHomeTuition = () => {
  const benefits = [
    {
      emoji: "📍",
      title: "Easy to reach out",
      description: "Can find tutor according to your budget."
    },
    {
      emoji: "💬",
      title: "One-on-one interaction",
      description: "Personalized attention for better understanding."
    },
    {
      emoji: "💪",
      title: "Building confidence",
      description: "Improved self-assurance in academic abilities."
    },
    {
      emoji: "📈",
      title: "Better academic outcomes",
      description: "Targeted support leads to improved grades."
    },
    {
      emoji: "🎯",
      title: "Focus on specific areas",
      description: "Tutors address specific weaknesses or needs."
    },
    {
      emoji: "🔄",
      title: "Personalized and flexible learning",
      description: "Catering to individual needs and goals."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-3">
          Why Choose Home Tuition? <span className="text-2xl">🧑🏻‍🏫</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Discover the benefits of personalized home tutoring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="text-4xl mb-4">{benefit.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-10 text-center">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition duration-300">
          Find a Tutor Now
        </button>
      </div> */}
    </div>
  );
};

export default WhyHomeTuition;