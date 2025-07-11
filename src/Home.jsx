// src/App.js
import React from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import FeaturedTutors from './components/FeaturedTutors';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
// import Contact from './components/Contact';
import WhyHomeTuition from "./components/WhyHomeTuition";
import TutorSteps from "./components/TutorSteps"
import SubjectGrid from "./components/Subject"

function Home() {
  return (
    <div className="font-sans bg-gray-50">
      <Hero />
      <Stats />
      <About />
      <HowItWorks />
      <TutorSteps/>
      <FeaturedTutors />
      <WhyHomeTuition />
      <Testimonials />
      <CTA />
      {/* <Contact /> */}
    </div>
  );
}

export default Home;