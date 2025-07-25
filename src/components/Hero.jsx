// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const images = [
        'url("/banner1.jpg")',
        'url("/tutionbanner2.jpg")',
        'url("/tutionbanner3.jpg")',
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const [selectedState, setSelectedState] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [areas, setAreas] = useState([]);
    const [sectors, setSectors] = useState([]);
    const navigate = useNavigate();

    // Sample data for states and areas in India
    const states = [
        'Delhi',
        'Maharashtra',
        'Karnataka',
        'Tamil Nadu',
        'Uttar Pradesh',
    ];

    const stateAreas = {
        'Delhi': ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
        'Karnataka': ['Bangalore', 'Mysore'],
        'Tamil Nadu': ['Chennai', 'Coimbatore'],
        'Uttar Pradesh': ['Lucknow', 'Noida'],
    };

    // Sector data for each area
    const areaSectors = {
        'South Delhi': Array.from({length: 10}, (_, i) => `Sector ${i+1}`),
        'North Delhi': Array.from({length: 8}, (_, i) => `Sector ${i+1}`),
        'East Delhi': Array.from({length: 12}, (_, i) => `Sector ${i+1}`),
        'West Delhi': Array.from({length: 7}, (_, i) => `Sector ${i+1}`),
        'Central Delhi': Array.from({length: 5}, (_, i) => `Sector ${i+1}`),
        'Mumbai': ['Andheri', 'Bandra', 'Dadar', 'Thane', 'Navi Mumbai'],
        'Pune': ['Kothrud', 'Hinjewadi', 'Viman Nagar', 'Baner'],
        'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City'],
        // Add sectors for other areas as needed
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        if (selectedState) {
            setAreas(stateAreas[selectedState] || []);
            setSelectedArea('');
            setSectors([]);
            setSelectedSector('');
        } else {
            setAreas([]);
            setSelectedArea('');
            setSectors([]);
            setSelectedSector('');
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedArea) {
            setSectors(areaSectors[selectedArea] || []);
            setSelectedSector('');
        } else {
            setSectors([]);
            setSelectedSector('');
        }
    }, [selectedArea]);

    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
    };

    const handleSearchTutors = () => {
        if (searchQuery.trim()) {
            // Search by query only
            navigate(`/findtutor/${encodeURIComponent(searchQuery)}`);
        } else if (selectedState && selectedArea && selectedSector) {
            // Search by location filters
            navigate(`/findtutor?state=${encodeURIComponent(selectedState)}&area=${encodeURIComponent(selectedArea)}&sector=${encodeURIComponent(selectedSector)}`);
        }
        window.scrollTo(0, 0);
    };

    const handleSearchStudents = () => {
        if (searchQuery.trim()) {
            // Search by query only
            navigate(`/findstudent?query=${encodeURIComponent(searchQuery)}`);
        } else if (selectedState && selectedArea && selectedSector) {
            // Search by location filters
            navigate(`/findstudent?state=${encodeURIComponent(selectedState)}&area=${encodeURIComponent(selectedArea)}&sector=${encodeURIComponent(selectedSector)}`);
        }
        window.scrollTo(0, 0);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchTutors();
        }
    };

    return (
        <div
            className="hero-white text-white"
            style={{
                backgroundImage: images[currentImage],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in-out',
            }}
        >
            <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Premium Home Tutoring <br /> For Academic Excellence
                    </h1>
                    <p className="mt-6 text-xl max-w-3xl mx-auto">
                        Connect with India's top 1% tutors for personalized learning experiences that deliver results.
                    </p>
                    
                    {/* Search Filter Section */}
                    <div className="mt-12 text-black rounded-xl p-8 max-w-5xl mx-auto border border-black shadow-2xl bg-white bg-opacity-10">
                        {/* Search Bar */}
                        {/* <div className="mt-6">
                            <label htmlFor="search" className="block text-xl font-bold tracking-wide text-black mb-2">
                                SEARCH
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search by Address"
                                    className="flex-grow appearance-none bg-blue-200 bg-opacity-40 border border-black text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                                />
                            </div>
                        </div> */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {/* State Selector */}
                            <div className="relative">
                                <label htmlFor="state" className="block text-xl font-bold tracking-wide text-black mb-2">
                                    STATE
                                </label>
                                <div className="relative">
                                    <select
                                        id="state"
                                        className="appearance-none w-full bg-grya-50 bg-opacity-40 border border-[#dcdcdc] text-black px-4 py-3 pr-10 rounded-lg focus:outline-none transition-all duration-200"
                                        value={selectedState}
                                        onChange={(e) => setSelectedState(e.target.value)}
                                    >
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Area Selector */}
                            <div className="relative">
                                <label htmlFor="area" className="block text-xl font-bold tracking-wide text-black mb-2">
                                    AREA
                                </label>
                                <div className="relative">
                                    <select
                                        id="area"
                                        className="appearance-none w-full bg-gray-50 bg-opacity-40 border border-[#dcdcdc] text-black px-4 py-3 pr-10 rounded-lg focus:outline-none transition-all duration-200"
                                        value={selectedArea}
                                        onChange={(e) => setSelectedArea(e.target.value)}
                                        disabled={!selectedState}
                                    >
                                        <option value="">Select Area</option>
                                        {areas.map((area) => (
                                            <option key={area} value={area}>
                                                {area}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Sector Selector */}
                            <div className="relative">
                                <label htmlFor="sector" className="block text-xl font-bold tracking-wide text-black mb-2">
                                    SECTOR/BLOCK
                                </label>
                                <div className="relative">
                                    <select
                                        id="sector"
                                        className="appearance-none w-full bg-gray-50 bg-opacity-40 border border-[#dcdcdc] text-black px-4 py-3 pr-10 rounded-lg focus:outline-none transition-all duration-200"
                                        value={selectedSector}
                                        onChange={(e) => setSelectedSector(e.target.value)}
                                        disabled={!selectedArea}
                                    >
                                        <option value="">Select Sector</option>
                                        {sectors.map((sector) => (
                                            <option key={sector} value={sector}>
                                                {sector}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Search Buttons */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleSearchTutors}
                                disabled={!searchQuery.trim() && (!selectedState || !selectedArea || !selectedSector)}
                                className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                            >
                                <span className="relative z-10">SEARCH TUTORS</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </button>
                            <button
                                onClick={handleSearchStudents}
                                disabled={!searchQuery.trim() && (!selectedState || !selectedArea || !selectedSector)}
                                className="relative overflow-hidden ml-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                            >
                                <span className="relative z-10">SEARCH STUDENTS</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;