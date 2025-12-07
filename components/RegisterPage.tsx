import React, { useState, useEffect } from 'react';
import { User, View } from '../types';

interface RegisterPageProps {
  onLogin: (user: User) => void;
  setView: (view: View) => void;
  currentUser?: User | null;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onLogin, setView, currentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (currentUser) {
      setView(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    }
  }, [currentUser, setView]);

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidContactNumber = (value: string) => {
    const number = value.replace(/\D/g, '');
    return /^[0-9]{10}$/.test(number);
  };

  const isValidPassword = (value: string) => {
    const hasCapital = /[A-Z]/.test(value);
    const hasSmall = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
    return hasCapital && hasSmall && hasSpecial && value.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Name is required.');
    if (!email.trim()) return setError('Email is required.');
    if (!isValidEmail(email)) return setError('Please enter a valid email format.');
    if (!contactNumber.trim()) return setError('Contact number is required.');
    if (!isValidContactNumber(contactNumber)) return setError('Contact must be 10 digits.');
    if (!collegeName.trim()) return setError('College name is required.');
    if (!courseName.trim()) return setError('Course name is required.');
    if (!year) return setError('Year is required.');
    if (!password.trim()) return setError('Password is required.');
    if (!isValidPassword(password)) return setError('Password: 8+ chars, 1 uppercase, 1 lowercase, 1 special.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    const stored = localStorage.getItem('users');
    const users: User[] = stored ? JSON.parse(stored) : [];
    if (users.some(u => u.email === email)) return setError('Email already registered.');

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      contactNumber,
      collegeName,
      courseName,
      year,
      password,
      role: 'user',
      appliedInternships: [],
    };

    const updated = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updated));
    setError('');
    onLogin(newUser);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <style>{`
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .reg-form { animation: slideInUp 0.5s ease-out; }
        .reg-title { animation: fadeIn 0.5s ease-out 0.1s both; }
      `}</style>

      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg reg-form">
        <div>
          <h2 className="text-3xl font-extrabold text-center reg-title">Create Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <button onClick={() => setView('login')} className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in
            </button>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-600 text-sm p-3 bg-red-50 rounded border border-red-200">{error}</p>}

          <div>
            <label className="block text-sm font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
            <input type="text" required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input type="email" required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact <span className="text-red-500">*</span></label>
            <input type="tel" required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" placeholder="10-digit" value={contactNumber} onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">College <span className="text-red-500">*</span></label>
            <input type="text" required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" placeholder="College" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course <span className="text-red-500">*</span></label>
            <input type="text" required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" placeholder="Course" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Year <span className="text-red-500">*</span></label>
            <select required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
            <input type="password" required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="mt-2 text-xs text-gray-600">
              <p>{password.length >= 8 ? '✓' : '✗'} 8+ chars</p>
              <p>{/[A-Z]/.test(password) ? '✓' : '✗'} Uppercase</p>
              <p>{/[a-z]/.test(password) ? '✓' : '✗'} Lowercase</p>
              <p>{/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? '✓' : '✗'} Special char</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm <span className="text-red-500">*</span></label>
            <input type="password" required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" placeholder="Confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {confirmPassword && password !== confirmPassword && <p className="text-xs text-red-600 mt-1">✗ Passwords do not match</p>}
            {confirmPassword && password === confirmPassword && <p className="text-xs text-green-600 mt-1">✓ Passwords match</p>}
          </div>

          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400" disabled={!isValidPassword(password) || password !== confirmPassword}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
