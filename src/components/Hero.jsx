// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const images = [
    'url("/banner1.jpg")',
    'url("/tutionbanner2.jpg")',
    'url("/tutionbanner3.jpg")',
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      setIsLoadingStates(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/public/index.php/get_states`
        );
        if (response.data.status === 200) {
          setStates(response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setIsLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedStateId) {
        setIsLoadingCities(true);
        setCities([]);
        setSelectedCity("");
        setSelectedCityId("");
        setAreas([]);
        setSelectedArea("");
        setSelectedAreaId("");

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/public/index.php/get_cities`,
            { state: selectedStateId },
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (response.data.status === 200) {
            setCities(response.data.msg);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
        } finally {
          setIsLoadingCities(false);
        }
      } else {
        setCities([]);
        setSelectedCity("");
        setSelectedCityId("");
        setAreas([]);
        setSelectedArea("");
        setSelectedAreaId("");
      }
    };

    fetchCities();
  }, [selectedStateId]);

  // Fetch areas when city is selected
  useEffect(() => {
    const fetchAreas = async () => {
      if (selectedCityId) {
        setIsLoadingAreas(true);
        setAreas([]);
        setSelectedArea("");
        setSelectedAreaId("");

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/public/index.php/get_city_area`,
            { city: selectedCityId },
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (response.data.status === 200) {
            setAreas(response.data.msg);
          }
        } catch (error) {
          console.error("Error fetching areas:", error);
        } finally {
          setIsLoadingAreas(false);
        }
      } else {
        setAreas([]);
        setSelectedArea("");
        setSelectedAreaId("");
      }
    };

    fetchAreas();
  }, [selectedCityId]);
const navigateToTutorsPage = () => {
    navigate(
        `/findtutor?state=${encodeURIComponent(selectedStateId)}&city=${encodeURIComponent(selectedCityId)}&area=${encodeURIComponent(selectedAreaId)}`
    );
};

const navigateToStudentsPage = () => {
    navigate(
        `/findstudent?state=${encodeURIComponent(selectedStateId)}&city=${encodeURIComponent(selectedCityId)}&area=${encodeURIComponent(selectedAreaId)}`
    );
};

  return (
    <div
      className="hero-white text-white"
      style={{
        backgroundImage: images[currentImage],
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Premium Home Tutoring <br /> For Academic Excellence
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Connect with India's top 1% tutors for personalized learning
            experiences that deliver results.
          </p>

          {/* Search Filter Section */}
          <div className="mt-12 text-black rounded-xl p-8 max-w-5xl mx-auto border border-black shadow-2xl bg-white bg-opacity-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* State Selector */}
              <div className="relative">
                <label
                  htmlFor="state"
                  className="block text-xl font-bold tracking-wide text-black mb-2"
                >
                  STATE
                </label>
                <div className="relative">
                  <select
                    id="state"
                    className="appearance-none w-full bg-grya-50 bg-opacity-40 border border-[#dcdcdc] text-black px-4 py-3 pr-10 rounded-lg focus:outline-none transition-all duration-200"
                    value={selectedStateId}
                    onChange={(e) => {
                      const selectedOption = e.target.options[e.target.selectedIndex];
                      setSelectedState(selectedOption.text);
                      setSelectedStateId(e.target.value);
                    }}
                    disabled={isLoadingStates}
                  >
                    <option value="">Select State</option>
                    {states?.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    {isLoadingStates ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* City Selector */}
              <div className="relative">
                <label
                  htmlFor="city"
                  className="block text-xl font-bold tracking-wide text-black mb-2"
                >
                  CITY
                </label>
                <div className="relative">
                  <select
                    id="city"
                    className="appearance-none w-full bg-gray-50 bg-opacity-40 border border-[#dcdcdc] text-black px-4 py-3 pr-10 rounded-lg focus:outline-none transition-all duration-200"
                    value={selectedCityId}
                    onChange={(e) => {
                      const selectedOption = e.target.options[e.target.selectedIndex];
                      setSelectedCity(selectedOption.text);
                      setSelectedCityId(e.target.value);
                    }}
                    disabled={!selectedStateId || isLoadingCities}
                  >
                    <option value="">Select City</option>
                    {cities?.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    {isLoadingCities ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Area Selector */}
              <div className="relative">
                <label
                  htmlFor="area"
                  className="block text-xl font-bold tracking-wide text-black mb-2"
                >
                  AREA
                </label>
                <div className="relative">
                  <select
                    id="area"
                    className="appearance-none w-full bg-gray-50 bg-opacity-40 border border-[#dcdcdc] text-black px-4 py-3 pr-10 rounded-lg focus:outline-none transition-all duration-200"
                    value={selectedAreaId}
                    onChange={(e) => {
                      const selectedOption = e.target.options[e.target.selectedIndex];
                      setSelectedArea(selectedOption.text);
                      setSelectedAreaId(e.target.value);
                    }}
                    disabled={!selectedCityId || isLoadingAreas}
                  >
                    <option value="">Select Area</option>
                    {areas?.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.area_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    {isLoadingAreas ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Buttons */}
            <div className="mt-8 text-center">
              <button
                onClick={navigateToTutorsPage}
                disabled={!selectedStateId || !selectedCityId || !selectedAreaId}
                className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10">SEARCH TUTORS</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button
                onClick={navigateToStudentsPage}
                disabled={!selectedStateId || !selectedCityId || !selectedAreaId}
                className="relative overflow-hidden ml-4 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10">SEARCH STUDENTS</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;