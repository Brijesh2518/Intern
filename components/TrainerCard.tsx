import React, { useState } from 'react';
import { Trainer, User, View } from '../types';

interface TrainerCardProps {
  trainer: Trainer;
  currentUser: User | null;
  setView: (view: View) => void;
  onRequestMentorship?: (trainer: Trainer) => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, currentUser, setView, onRequestMentorship }) => {
  const [isRequested, setIsRequested] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleRequestMentorship = () => {
    // Check if user is logged in
    if (!currentUser) {
      alert('Please login first to request mentorship');
      setView('login');
      return;
    }

    setIsClicked(true);
    setIsRequested(true);
    setShowMessage(true);
    
    // Call the callback if provided
    if (onRequestMentorship) {
      onRequestMentorship(trainer);
    }

    setTimeout(() => setIsClicked(false), 600);

    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
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

        @keyframes slideInMessage {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .trainer-card-entrance {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .trainer-pulse {
          animation: pulse 0.3s ease-in-out;
        }

        .expertise-tag {
          animation: fadeIn 0.4s ease-out;
        }

        .success-message {
          animation: slideInMessage 0.3s ease-out forwards;
        }
      `}</style>
      <div className="w-full h-full">
        {/* Modern Card Design */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform trainer-card-entrance hover:-translate-y-3 flex flex-col h-full">
          
          {/* Top Accent Bar */}
          <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

          {/* Main Content Area */}
          <div className="p-5 sm:p-6 flex flex-col h-full">
            
            {/* Avatar Section */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group hover:scale-110 transition-transform duration-300 group">
                <div className="text-4xl sm:text-5xl font-bold text-white group-hover:animate-bounce">{trainer.name.charAt(0)}</div>
              </div>
            </div>

            {/* Name */}
            <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
              {trainer.name}
            </h3>

            {/* Experience Badge */}
            <div className="text-center mb-3">
              <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs sm:text-sm font-semibold">
                📊 {trainer.experience}
              </span>
            </div>

            {/* Domain */}
            <p className="text-center text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">
              {trainer.domain}
            </p>

            {/* Bio - Short */}
            <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {trainer.bio}
            </p>

            {/* Skills Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5 justify-center">
                {trainer.expertise.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-medium border border-indigo-200 dark:border-indigo-800 expertise-tag hover:shadow-md transition-all duration-200"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
                {trainer.expertise.length > 3 && (
                  <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-300 dark:border-gray-600">
                    +{trainer.expertise.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

            {/* Availability */}
            <div className="mb-4 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <span className="text-lg">🕐</span>
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{trainer.availability}</p>
              </div>
            </div>

            {/* Button - Fills remaining space at bottom */}
            <div className="mt-auto">
              <button 
                onClick={handleRequestMentorship}
                disabled={isRequested || !currentUser}
                className={`w-full px-4 py-2.5 text-sm sm:text-base font-bold rounded-xl transition-all duration-300 transform ${
                  isClicked ? 'trainer-pulse' : ''
                } ${
                  isRequested
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                    : !currentUser
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                }`}
                title={!currentUser ? 'Please login to request mentorship' : ''}
              >
                {isRequested ? '✓ Request Sent' : !currentUser ? 'Login to Request' : 'Request Mentorship'}
              </button>

              {/* Success Message */}
              {showMessage && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg success-message">
                  <p className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-200 text-center">
                    ✓ Request sent successfully!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerCard;
