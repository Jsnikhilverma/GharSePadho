import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Microscope,
  BarChart3,
  Landmark,
  Atom,
  ClipboardList,
  BookOpen,
  Scale,
  Languages,
  FlaskConical,
  FileText,
  Globe,
  MonitorSmartphone,
  IndianRupee,
  ChevronRight,
  Award,
  GraduationCap
} from "lucide-react";

const subjects = [
  { icon: <Calculator className="h-8 w-8" />, label: "Mathematics" },
  { icon: <Microscope className="h-8 w-8" />, label: "Biology" },
  { icon: <BarChart3 className="h-8 w-8" />, label: "Economics" },
  { icon: <Landmark className="h-8 w-8" />, label: "History" },
  { icon: <Atom className="h-8 w-8" />, label: "Science" },
  { icon: <ClipboardList className="h-8 w-8" />, label: "Physics" },
  { icon: <BookOpen className="h-8 w-8" />, label: "Business Studies" },
  { icon: <Scale className="h-8 w-8" />, label: "Political Science" },
  { icon: <Languages className="h-8 w-8" />, label: "Hindi" },
  { icon: <FileText className="h-8 w-8" />, label: "English" },
  { icon: <FlaskConical className="h-8 w-8" />, label: "Chemistry" },
  { icon: <Languages className="h-8 w-8" />, label: "French" },
  { icon: <MonitorSmartphone className="h-8 w-8" />, label: "Computer Science" },
  { icon: <IndianRupee className="h-8 w-8" />, label: "Accounts" },
  { icon: <Globe className="h-8 w-8" />, label: "Geography" },
];

export default function SubjectGrid() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/findtuter');
  };

//   const handleButtonClick = () => {
//     navigate('/findtuter');
//   };

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Certified Educators</span>
            <GraduationCap className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 tracking-tight">
            Expert Tutors for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Every Subject</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Connect with our professional educators to unlock your academic potential.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {subjects.map((subject, index) => (
            <div
              key={index}
              onClick={handleCardClick}
              className="group relative bg-white p-6 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-all">
                  {React.cloneElement(subject.icon, { className: "h-8 w-8 text-blue-600" })}
                </div>
                <h3 className="text-center font-medium text-gray-800">{subject.label}</h3>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-blue-600 text-sm font-medium">
                  View tutors <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 flex justify-center">
          <button 
            onClick={handleButtonClick}
            className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center">
              Browse All Subjects
              <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
}