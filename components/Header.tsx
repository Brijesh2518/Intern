
import React, { useState } from 'react';
import { User, View } from '../types';

interface HeaderProps {
  currentUser: User | null;
  setView: (view: View) => void;
  onLogout: () => void;
  setDashboardTab?: (tab: 'available' | 'applied' | 'trainers' | 'profile') => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, setView, onLogout, setDashboardTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view: View) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => handleNavigation('home')} className="flex-shrink-0 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              InternNest
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {!currentUser && (
              <>
                <button onClick={() => handleNavigation('home')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Home
                </button>
                <button onClick={() => handleNavigation('about')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  About
                </button>
              </>
            )}
            {currentUser ? (
              <>
                <button onClick={() => handleNavigation(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setDashboardTab?.('profile');
                      handleNavigation('profile-page');
                    }}
                    className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('login')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation('register')}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4 animate-slideDown">
            {!currentUser && (
              <>
                <button onClick={() => handleNavigation('home')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Home
                </button>
                <button onClick={() => handleNavigation('about')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  About
                </button>
              </>
            )}
            {currentUser ? (
              <>
                <button onClick={() => handleNavigation(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setDashboardTab?.('profile');
                      handleNavigation('profile-page');
                  }}
                  className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('login')}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation('register')}
                  className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
