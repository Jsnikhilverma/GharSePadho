// src/components/Stats.jsx
import React, { useState, useEffect } from 'react';

const Stats = () => {
    const [counts, setCounts] = useState({
        tutors: 0,
        students: 0,
        successRate: 0
    });

    const targetValues = {
        tutors: 500,
        students: 10000,
        successRate: 95
    };

    const duration = 2000; // Animation duration in ms
    const interval = 20; // Update interval in ms

    useEffect(() => {
        const steps = {
            tutors: Math.ceil(targetValues.tutors / (duration / interval)),
            students: Math.ceil(targetValues.students / (duration / interval)),
            successRate: Math.ceil(targetValues.successRate / (duration / interval))
        };

        const intervals = {
            tutors: setInterval(() => {
                setCounts(prev => ({
                    ...prev,
                    tutors: prev.tutors + steps.tutors >= targetValues.tutors 
                        ? targetValues.tutors 
                        : prev.tutors + steps.tutors
                }));
            }, interval),
            students: setInterval(() => {
                setCounts(prev => ({
                    ...prev,
                    students: prev.students + steps.students >= targetValues.students 
                        ? targetValues.students 
                        : prev.students + steps.students
                }));
            }, interval),
            successRate: setInterval(() => {
                setCounts(prev => ({
                    ...prev,
                    successRate: prev.successRate + steps.successRate >= targetValues.successRate 
                        ? targetValues.successRate 
                        : prev.successRate + steps.successRate
                }));
            }, interval)
        };

        // Clear intervals when targets are reached
        const clearAll = () => {
            clearInterval(intervals.tutors);
            clearInterval(intervals.students);
            clearInterval(intervals.successRate);
        };

        const timeout = setTimeout(clearAll, duration);

        return () => {
            clearAll();
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="bg-blue-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-4xl font-serif font-bold text-primary">
                            {counts.tutors.toLocaleString()}+
                        </div>
                        <div className="mt-2 text-sm font-medium text-gray-500">QUALIFIED TUTORS</div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-4xl font-serif font-bold text-primary">
                            {counts.students.toLocaleString()}+
                        </div>
                        <div className="mt-2 text-sm font-medium text-gray-500">HAPPY STUDENTS</div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-4xl font-serif font-bold text-primary">
                            {counts.successRate}%
                        </div>
                        <div className="mt-2 text-sm font-medium text-gray-500">SUCCESS RATE</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;