import React, { useState } from 'react';
import { User, View } from '../types';

interface ProfilePageProps {
  user: User;
  setView: (view: View) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user: initialUser, setView }) => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<User>>({
    name: currentUser.name || '',
    contactNumber: currentUser.contactNumber || '',
    collegeName: currentUser.collegeName || '',
    courseName: currentUser.courseName || '',
    year: currentUser.year || '',
  });

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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => setView('user-dashboard')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Profile</h1>
        
        {!isEditingProfile ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">Full Name</p>
                <p className="text-xl text-gray-900 dark:text-white font-medium">{currentUser.name || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">Email</p>
                <p className="text-xl text-gray-900 dark:text-white font-medium">{currentUser.email}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">Contact Number</p>
                <p className="text-xl text-gray-900 dark:text-white font-medium">{currentUser.contactNumber || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">College Name</p>
                <p className="text-xl text-gray-900 dark:text-white font-medium">{currentUser.collegeName || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">Course Name</p>
                <p className="text-xl text-gray-900 dark:text-white font-medium">{currentUser.courseName || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">Year of Study</p>
                <p className="text-xl text-gray-900 dark:text-white font-medium">{currentUser.year || 'Not provided'}</p>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-lg"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ''}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={editFormData.contactNumber || ''}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="10-digit number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  value={editFormData.collegeName || ''}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Name</label>
                <input
                  type="text"
                  name="courseName"
                  value={editFormData.courseName || ''}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year of Study</label>
                <select
                  name="year"
                  value={editFormData.year || ''}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-lg"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
