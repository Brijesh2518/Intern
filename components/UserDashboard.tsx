
import React, { useState } from 'react';
import { User, Internship, View } from '../types';
import { INTERNSHIPS } from '../constants';
import InternshipCard from './InternshipCard';
import TrainerSection from './TrainerSection';

interface UserDashboardProps {
  user: User;
  initialTab?: 'available' | 'applied' | 'trainers' | 'profile';
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user: initialUser, initialTab = 'available' }) => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [activeTab, setActiveTab] = useState<'available' | 'applied' | 'trainers' | 'profile'>(initialTab);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<User>>({
    name: currentUser.name || '',
    contactNumber: currentUser.contactNumber || '',
    collegeName: currentUser.collegeName || '',
    courseName: currentUser.courseName || '',
    year: currentUser.year || '',
  });

  const handleSetView = (view: View) => {
    // This is for navigation within dashboard if needed
    console.log('Navigate to:', view);
  };

  const handleEditProfile = () => {
    setEditFormData({
      name: currentUser.name || '',
      contactNumber: currentUser.contactNumber || '',
      collegeName: currentUser.collegeName || '',
      courseName: currentUser.courseName || '',
      year: currentUser.year || '',
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...currentUser, ...editFormData };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = (internshipId: number) => {
    const updatedUser = {
      ...currentUser,
      appliedInternships: [...currentUser.appliedInternships, internshipId],
    };
    setCurrentUser(updatedUser);

    const storedUsersRaw = localStorage.getItem('users');
    if (storedUsersRaw) {
      const users: User[] = JSON.parse(storedUsersRaw);
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
  };

  const appliedInternships = INTERNSHIPS.filter(internship => currentUser.appliedInternships.includes(internship.id));
  const availableInternships = INTERNSHIPS.filter(internship => !currentUser.appliedInternships.includes(internship.id));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser.email}!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">This is your personal dashboard. Here you can find internships, track your applications, and connect with expert trainers.</p>
      
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('available')}
            className={`${
              activeTab === 'available'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
          >
            Available Internships ({availableInternships.length})
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`${
              activeTab === 'applied'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
          >
            My Applications ({appliedInternships.length})
          </button>
          <button
            onClick={() => setActiveTab('trainers')}
            className={`${
              activeTab === 'trainers'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
          >
            Expert Trainers
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'available' && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {availableInternships.length > 0 ? (
              availableInternships.map(internship => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  onApply={handleApply}
                  isApplied={currentUser.appliedInternships.includes(internship.id)}
                />
              ))
            ) : (
              <p className="text-center col-span-full">You have applied for all available internships!</p>
            )}
          </div>
        )}
        {activeTab === 'applied' && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {appliedInternships.length > 0 ? (
              appliedInternships.map(internship => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                />
              ))
            ) : (
              <p className="text-center col-span-full">You haven't applied for any internships yet.</p>
            )}
          </div>
        )}
        {activeTab === 'trainers' && (
          <div>
            <TrainerSection currentUser={currentUser} setView={handleSetView} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
