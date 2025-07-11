// src/components/Stats.jsx
import React from 'react';

const Stats = () => {
    return (
        <div className="bg-blue-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-4xl font-serif font-bold text-primary">500+</div>
                        <div className="mt-2 text-sm font-medium text-gray-500">QUALIFIED TUTORS</div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-4xl font-serif font-bold text-primary">10,000+</div>
                        <div className="mt-2 text-sm font-medium text-gray-500">HAPPY STUDENTS</div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-4xl font-serif font-bold text-primary">95%</div>
                        <div className="mt-2 text-sm font-medium text-gray-500">SUCCESS RATE</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;