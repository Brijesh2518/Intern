import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-auto max-w-6xl">
      <div className="px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          About InternNest
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              InternNest is dedicated to bridging the gap between educational institutions and the tech industry. 
              We provide virtual internship opportunities that allow students and early-career professionals to 
              gain real-world experience while developing in-demand skills.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Why Choose Us
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
                <span>Flexible remote internship opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
                <span>Mentorship from industry professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
                <span>Build a strong portfolio with real projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
                <span>Competitive compensation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What We Offer
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500+</div>
              <p className="text-gray-700 dark:text-gray-300">Active Interns</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">50+</div>
              <p className="text-gray-700 dark:text-gray-300">Partner Companies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">95%</div>
              <p className="text-gray-700 dark:text-gray-300">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
