
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import FindTutors from './components/FindTutors';
import Aboutus from "./components/AboutusPage"
import ContactUs from "./components/ContactusPage"
import HowItWork from "./components/HowItWorkPage"
import TutorProfile from "./components/Teacherprofile"
import Register from "./components/Register"
import Login from "./components/login"
import TuitionBookingModal from "./components/TutorBookingModal"
import PrivacyPolicy from "./components/privacy"
import TermsAndConditions from "./components/term"
import SubjectGrid from "./components/Subject"
import EdutechBlogPlatform from "./components/blog"
import UserProfile from "./components/userprofile"
import Forgetpassword from "./components/Forgetpassword"


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findtutor" element={<FindTutors />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/work" element={<HowItWork />} />
            <Route path="/teacherprofile/:id" element={<TutorProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teacherbookingmodal" element={<TuitionBookingModal />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/term" element={<TermsAndConditions />} />
            <Route path="/subject" element={<SubjectGrid />} />
            <Route path="/blog" element={<EdutechBlogPlatform />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />

            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;