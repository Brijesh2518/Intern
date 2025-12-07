
import React, { useState } from 'react';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
  onApply?: (id: number) => void;
  isApplied?: boolean;
}

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full animate-fadeIn">
    {children}
  </span>
);

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onApply, isApplied }) => {
  const { id, title, domain, description, duration, stipend, skills } = internship;
  const [isClicked, setIsClicked] = useState(false);

  const handleApply = (internshipId: number) => {
    setIsClicked(true);
    if (onApply) {
      onApply(internshipId);
    }
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .card-entrance {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .card-pulse {
          animation: pulse 0.3s ease-in-out;
        }

        .skill-tag {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 flex flex-col card-entrance h-full">
        {/* Top Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

        <div className="p-5 sm:p-6 flex-grow flex flex-col">
          {/* Domain Badge */}
          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
              {domain}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={skill}
                className="inline-block bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 skill-tag hover:shadow-md transition-all duration-200"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg text-gray-600 dark:text-gray-400">
                +{skills.length - 4} more
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

          {/* Duration and Stipend - Grid Layout */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Duration Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 rounded-xl p-3 border border-blue-200 dark:border-blue-800 text-center">
              <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                ⏱️
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Duration</p>
              <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-1">
                {duration}
              </p>
            </div>

            {/* Stipend Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40 rounded-xl p-3 border border-green-200 dark:border-green-800 text-center">
              <p className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                💰
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Stipend</p>
              <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-1">
                {stipend}
              </p>
            </div>
          </div>

          {/* Apply Button */}
          {onApply && (
            <button
              onClick={() => handleApply(id)}
              disabled={isApplied}
              className={`w-full py-2.5 sm:py-3 px-4 border border-transparent rounded-xl text-sm sm:text-base font-bold transition-all duration-300 transform ${
                isClicked ? 'card-pulse' : ''
              } ${
                isApplied
                  ? 'bg-green-500 dark:bg-green-600 text-white cursor-not-allowed hover:bg-green-600 shadow-lg'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isApplied ? '✓ Applied' : 'Apply Now'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InternshipCard;
