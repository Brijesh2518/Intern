import React, { useState } from 'react';
import { TRAINERS } from '../constants';
import { Trainer, User, View } from '../types';
import TrainerCard from './TrainerCard';

interface TrainerSectionProps {
  currentUser: User | null;
  setView: (view: View) => void;
}

const TrainerSection: React.FC<TrainerSectionProps> = ({ currentUser, setView }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [mentorshipRequests, setMentorshipRequests] = useState<Trainer[]>([]);

  // Get unique domains
  const domains = ['All', ...Array.from(new Set(TRAINERS.map(trainer => trainer.domain)))];

  // Filter trainers based on selected domain
  const filteredTrainers = selectedDomain === 'All' 
    ? TRAINERS 
    : TRAINERS.filter(trainer => trainer.domain === selectedDomain);

  const handleRequestMentorship = (trainer: Trainer) => {
    // Add to mentorship requests if not already requested
    if (!mentorshipRequests.find(t => t.id === trainer.id)) {
      setMentorshipRequests([...mentorshipRequests, trainer]);
      
      // Store in localStorage for persistence
      const storedRequests = JSON.parse(localStorage.getItem('mentorshipRequests') || '[]');
      const updatedRequests = [...storedRequests, { trainerId: trainer.id, trainerName: trainer.name, timestamp: new Date().toISOString() }];
      localStorage.setItem('mentorshipRequests', JSON.stringify(updatedRequests));
    }
  };

  return (
    <section id="trainers" className="py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Expert Trainers & Mentors
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn from industry professionals with years of experience. Our trainers are passionate about guiding intern students to success and helping them build real-world skills.
          </p>
        </div>

        {/* Trainers - Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTrainers.map(trainer => (
            <TrainerCard 
              key={trainer.id}
              trainer={trainer}
              currentUser={currentUser}
              setView={setView}
              onRequestMentorship={handleRequestMentorship}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No trainers found for the selected domain.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainerSection;
