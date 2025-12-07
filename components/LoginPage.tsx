
import React, { useState, useEffect } from 'react';
import { User, View } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  setView: (view: View) => void;
  currentUser?: User | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setView, currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (currentUser) {
      setView(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    }
  }, [currentUser, setView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users: User[] = JSON.parse(storedUsers);
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        setError('');
        onLogin(foundUser);
      } else {
        setError('Invalid email or password.');
      }
    } else {
      setError('No users found. Please register.');
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .form-container {
          animation: slideInUp 0.6s ease-out;
        }

        .form-title {
          animation: fadeIn 0.6s ease-out 0.2s both;
        }

        .form-subtitle {
          animation: fadeIn 0.6s ease-out 0.3s both;
        }

        .form-input {
          animation: slideInLeft 0.4s ease-out;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          transform: scale(1.02);
        }

        .form-button {
          animation: slideInUp 0.6s ease-out 0.5s both;
          transition: all 0.3s ease;
        }

        .form-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
        }

        .form-button:active {
          transform: translateY(0);
        }

        .error-message {
          animation: shake 0.5s ease-in-out, slideInUp 0.4s ease-out;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
          border-left: 4px solid #ef4444;
        }
      `}</style>
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg form-container">
          <div>
            <h2 className="text-3xl font-extrabold text-center form-title">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 form-subtitle">
              Or{' '}
              <button onClick={() => setView('register')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline transition-all">
                create a new account
              </button>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center p-3 rounded-md bg-red-50 dark:bg-red-900/20 error-message">
                {error}
              </p>
            )}
            <div className="rounded-md shadow-sm space-y-4">
              <div className="form-input">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-input" style={{ animationDelay: '0.1s' }}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-button">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
