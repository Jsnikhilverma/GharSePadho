// src/pages/FindTutors.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookingModal from "./BookingModal";

const FindTutors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stateParam = searchParams.get("state");
  const cityParam = searchParams.get("city");
  const areaParam = searchParams.get("area");
  const subjectParam = searchParams.get("subject");

  const [filters, setFilters] = useState({
    name: "",
    classLevel: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    subject: subjectParam || "",
    sortBy: "rating",
    state: stateParam || "",
    city: cityParam || "",
    area: areaParam || ""
  });

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tutors based on filters
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        let url;
        let options = {};

        if (filters.state || filters.city || filters.area) {
          // Fetch by location
          url = `${import.meta.env.VITE_BASE_URL}/public/index.php/get_teacher_by_location`;

          const formData = new FormData();
          if (filters.state) formData.append("state", filters.state);
          if (filters.city) formData.append("city", filters.city);
          if (filters.area) formData.append("area", filters.area);

          options = {
            method: "POST",
            body: formData
          };
        }  else {
          // Fetch all tutors
          url = `${import.meta.env.VITE_BASE_URL}/public/index.php/get_teacher_details`;
          const formData = new FormData();
          formData.append("teacher_id", "all");
          options = {
            method: "POST",
            body: formData
          };
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Handle different response structures
        if (data.msg && Array.isArray(data.msg)) {
          // For location-based response, we need to extract teacher_detail
          if (filters.state || filters.city || filters.area) {
            const tutorsWithDetails = data.msg.map(item => ({
              ...item.teacher_detail,
              id: item.teacher_id,
              experience: item.teacher_detail.experience || "0 years"
            }));
            setTutors(tutorsWithDetails);
          } else {
            setTutors(data.msg);
          }
        } else {
          setTutors([]);
        }

        setError(null);
      } catch (err) {
        setError(err.message);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters.subject, filters.state, filters.city, filters.area]);

  // Update filters when URL params change
  useEffect(() => {
    if (stateParam || cityParam || areaParam || subjectParam) {
      setFilters((prev) => ({
        ...prev,
        ...(stateParam && { state: stateParam }),
        ...(cityParam && { city: cityParam }),
        ...(areaParam && { area: areaParam }),
        ...(subjectParam && { subject: subjectParam })
      }));
    }
  }, [stateParam, cityParam, areaParam, subjectParam]);

  // Filter tutors based on other filters (name, price, etc.)
  const filteredTutors = tutors.filter((tutor) => {
    // Extract numerical value from experience string (e.g., "10 years" -> 10)
    // const experienceYears = parseInt(tutor.experience) || 0;
    
    return (
      (filters.name === "" ||
        tutor.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.minPrice === "" || true) && // Price filtering disabled as API doesn't provide price
      (filters.maxPrice === "" || true) && // Price filtering disabled as API doesn't provide price
      (filters.subject === "" ||
        (tutor.subjects && tutor.subjects.toLowerCase().includes(filters.subject.toLowerCase())))
    );
  });

  // Sort tutors based on selected option
  const sortedTutors = [...filteredTutors].sort((a, b) => {
    const experienceA = parseInt(a.experience) || 0;
    const experienceB = parseInt(b.experience) || 0;
    
    switch (filters.sortBy) {
      case "priceLowHigh":
        return 0; // Can't sort by price as it's not in API response
      case "priceHighLow":
        return 0; // Can't sort by price as it's not in API response
      case "experience":
        return experienceB - experienceA;
      case "rating":
      default:
        return experienceB - experienceA;
    }
  });

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const resetFilters = () => {
    setFilters({
      name: "",
      classLevel: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      subject: subjectParam || "",
      sortBy: "rating",
      state: stateParam || "",
      city: cityParam || "",
      area: areaParam || ""
    });
  };

  const viewProfile = (id) => {
    navigate(`/teacherprofile/${id}`);
  };

  const openBookingModal = (tutor) => {
    setSelectedTutor(tutor);
    setShowBookingModal(true);
  };

  // Get badge color based on experience
  const getBadgeColor = (experience) => {
    const expYears = parseInt(experience) || 0;
    if (expYears >= 10) return "bg-amber-100 text-amber-800";
    if (expYears >= 5) return "bg-rose-100 text-rose-800";
    return "bg-emerald-100 text-emerald-800";
  };

  // Get badge text based on experience
  const getBadgeText = (experience) => {
    const expYears = parseInt(experience) || 0;
    if (expYears >= 10) return "Expert";
    if (expYears >= 5) return "Experienced";
    return "Fast Learner";
  };

  // Extract location information if available
  const getLocationInfo = (tutor) => {
    if (tutor.state_id && tutor.city_id && tutor.area_id) {
      return `State: ${tutor.state_id}, City: ${tutor.city_id}, Area: ${tutor.area_id}`;
    }
    return "Location not specified";
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-8">
      <div>
        {/* Elegant Header */}
        <div className="relative overflow-hidden bg-gray-900 mb-8">
          <div className="absolute inset-0 bg-blue-700 opacity-90"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                {filters.subject
                  ? `${filters.subject} Tutors`
                  : filters.state || filters.city || filters.area
                  ? "Tutors in Selected Location"
                  : "Discover Exceptional Tutors"}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                {filters.subject
                  ? `Find the best ${filters.subject} tutors for your needs`
                  : filters.state || filters.city || filters.area
                  ? "Connect with tutors in your area"
                  : "Connect with vetted experts who inspire and transform learning experiences"}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Minimalist Filter Section */}
          {/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
             
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Tutor Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  placeholder="Search by name"
                  className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
                />
              </div>

            
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  placeholder="Search by subject"
                  className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
                />
              </div>

             
              {(filters.state || filters.city || filters.area) && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <div className="px-3 py-2 text-sm text-gray-700">
                    {filters.state && `State: ${filters.state}`}
                    {filters.city && `, City: ${filters.city}`}
                    {filters.area && `, Area: ${filters.area}`}
                  </div>
                </div>
              )}

              
              <div className="flex items-end justify-end">
                <button
                  onClick={resetFilters}
                  className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div> */}

        
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                {filters.subject
                  ? `${filters.subject} Tutors`
                  : filters.state || filters.city || filters.area
                  ? "Tutors in Selected Location"
                  : "Available Tutors"}
              </h2>
              <p className="text-gray-500">
                {loading
                  ? "Loading..."
                  : `${sortedTutors.length} ${
                      sortedTutors.length === 1 ? "tutor" : "tutors"
                    } found`}
              </p>
            </div>
            {/* <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="border-0 text-sm font-medium text-blue-600 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="rating">Experience (High to Low)</option>
                <option value="experience">Most Experience</option>
              </select>
            </div> */}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Loading Tutors
              </h3>
              <p className="mt-1 text-gray-500">
                Please wait while we fetch the best tutors for you.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Error Loading Tutors
              </h3>
              <p className="mt-1 text-gray-500">{error}</p>
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Tutors Grid */}
          {!loading && !error && sortedTutors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sortedTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="md:flex">
                    {/* Tutor Image */}
                    <div className="md:w-1/3 relative bg-gray-200">
                      <div className="w-full h-48 md:h-full flex items-center justify-center text-gray-400">
                        {tutor.profile_img ? (
                          <img
                            src={tutor.profile_img}
                            alt={tutor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            className="w-24 h-24"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`absolute top-4 left-4 text-xs font-medium px-2.5 py-0.5 rounded-full ${getBadgeColor(
                          tutor.experience
                        )}`}
                      >
                        {getBadgeText(tutor.experience)}
                      </span>
                    </div>

                    {/* Tutor Details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {tutor.name}
                          </h3>
                          <p className="text-gray-600">
                            {tutor.subjects || "Subjects not specified"}
                          </p>
                        </div>
                        {tutor.verify_status === "1" && (
                          <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                            <svg
                              className="w-4 h-4 text-blue-600 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs font-medium text-blue-600">
                              Verified
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Experience */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-sm text-gray-500">
                          Experience: {tutor.experience || "Not specified"}
                        </div>
                      </div>

                      {/* Location */}
                      {(tutor.state_id || tutor.city_id || tutor.area_id) && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Location:</span>{" "}
                            {getLocationInfo(tutor)}
                          </p>
                        </div>
                      )}

                      {/* Contact */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Contact:</span>{" "}
                          {tutor.mobile || "Not provided"}
                        </p>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewProfile(tutor.id)}
                            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 text-sm font-medium rounded-lg transition duration-200"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => openBookingModal(tutor)}
                            className="book-now-btn bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition duration-200"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No tutors found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search filters to find what you're looking
                  for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        showBookingModal={showBookingModal}
        selectedTutor={selectedTutor}
        closeBookingModal={() => setShowBookingModal(false)}
      />
    </div>
  );
};

export default FindTutors;