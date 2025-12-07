
import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import { MOCK_USERS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'available' | 'applied' | 'trainers' | 'profile'>('available');

  useEffect(() => {
    // Check local storage for a logged-in user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      setCurrentUser(user);
      setView(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    }

    // Initialize mock users in local storage if not present
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(MOCK_USERS));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setView(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setView('home');
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginPage onLogin={handleLogin} setView={setView} currentUser={currentUser} />;
      case 'register':
        return <RegisterPage onLogin={handleLogin} setView={setView} currentUser={currentUser} />;
      case 'about':
        return <AboutPage setView={setView} />;
      case 'user-dashboard':
        return currentUser && <UserDashboard user={currentUser} initialTab={dashboardTab} />;
      case 'profile-page':
        return currentUser && <ProfilePage user={currentUser} setView={setView} />;
      case 'admin-dashboard':
        return currentUser && <AdminDashboard />;
      case 'home':
      default:
        return <HomePage setView={setView} currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header currentUser={currentUser} setView={setView} onLogout={handleLogout} setDashboardTab={setDashboardTab} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
