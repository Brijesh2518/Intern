import React from 'react';
import { View } from '../types';
import AboutSection from './AboutSection';

interface AboutPageProps {
  setView: (view: View) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setView }) => {
  return (
    <div>
      {/* About Section */}
      <AboutSection />

      {/* Call to Action Section */}
      <section className="py-16 bg-indigo-600 dark:bg-indigo-900 text-white mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Internship Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students and professionals building their careers with InternNest
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setView('register')}
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => setView('home')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
            >
              View Internships
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
