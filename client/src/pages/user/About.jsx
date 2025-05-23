import React from 'react';
import aboutImage from '../../assets/aboutImage.png'; // Aap apni image yahan import karein

const About = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-12 bg-gradient-to-br from-white via-slate-100 to-indigo-100">
      
      {/* Text Section */}
      <div className="md:w-1/2 max-w-xl mb-10 md:mb-0">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">About GIIT</h2>
        <p className="text-lg text-gray-700 mb-4">
          <strong>GIIT</strong> is your trusted platform for seamless and modern <span className="text-indigo-500 font-semibold">online test services</span>. 
          We help students and institutions take secure, randomized, and smartly timed exams from anywhere.
        </p>
        <p className="text-gray-600 mb-4">
          Whether you're preparing for competitive exams or internal assessments, GIIT offers a simple interface, real-time results, and daily updated question sets to keep things fresh and fair.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Daily randomized question sets</li>
          <li>Secure online exam environment</li>
          <li>Instant result & performance analytics</li>
          <li>Admin panel to manage courses & tests</li>
        </ul>
        <p className="text-sm text-gray-500">Built with ❤️ by GIIT</p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2">
        <img src={aboutImage} alt="About GIIT" className="w-full max-w-md mx-auto drop-shadow-xl" />
      </div>
    </div>
  );
};

export default About;
