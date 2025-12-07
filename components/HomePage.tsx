
import React from 'react';
import { INTERNSHIPS } from '../constants';
import InternshipCard from './InternshipCard';
import AboutSection from './AboutSection';
import TrainerSection from './TrainerSection';
import { View, User } from '../types';

interface HomePageProps {
  setView: (view: View) => void;
  currentUser?: User | null;
}

const HomePage: React.FC<HomePageProps> = ({ setView, currentUser }) => {
  return (
    <div>
      {/* Hero Section - Only show for non-logged in users */}
      {!currentUser && (
        <section className="text-center py-8 md:py-20 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Launch Your Tech Career with
            <span className="block text-indigo-600 dark:text-indigo-400 mt-2">InternNest</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Gain valuable hands-on experience through our virtual internships. Work on real-world projects, develop your skills, and build your portfolio.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setView('register')}
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </section>
      )}

      {/* Internships Section */}
      <section id="internships" className="py-12 md:py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12">Available Internships</h2>
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {INTERNSHIPS.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-12 md:py-16 px-4">
        <TrainerSection currentUser={currentUser || null} setView={setView} />
      </section>

      {/* About Section - Only show for non-logged in users */}
      {!currentUser && (
        <section className="py-12 md:py-16 px-4">
          <AboutSection />
        </section>
      )}
    </div>
  );
};

export default HomePage;
