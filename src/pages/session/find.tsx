import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import MatchingAlgorithm from '@/components/MatchingAlgorithm';
import EnergySelector from '@/components/EnergySelector';
import { EnergyLevel, SessionType, Session } from '@/types';
import { useUserStore } from '@/store';
import toast from 'react-hot-toast';

const FindSessionPage: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useUserStore();
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(
    currentUser?.energyLevel || null
  );
  const [preferredSessionType, setPreferredSessionType] = useState<SessionType | undefined>();
  const [showMatching, setShowMatching] = useState(false);

  const handleEnergySelected = () => {
    if (selectedEnergy) {
      setShowMatching(true);
    } else {
      toast.error('Please select your energy level first');
    }
  };

  const handleSessionFound = (session: Session) => {
    toast.success(`Joining ${session.title}...`);
    router.push(`/session/${session.id}/lobby`);
  };

  const handleCreateNew = () => {
    router.push('/session/create');
  };

  const sessionTypeOptions = [
    {
      type: SessionType.BODY_DOUBLING,
      icon: '🤝',
      title: 'Body Doubling',
      description: 'Work alongside others',
    },
    {
      type: SessionType.STUDY_GROUP,
      icon: '📚',
      title: 'Study Group',
      description: 'Collaborative learning',
    },
    {
      type: SessionType.CREATIVE_WORK,
      icon: '🎨',
      title: 'Creative Work',
      description: 'Art and creative projects',
    },
    {
      type: SessionType.ADMIN_TASKS,
      icon: '📋',
      title: 'Admin Tasks',
      description: 'Organizing and maintenance',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showMatching ? (
          <>
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-display font-bold text-text-primary mb-4">
                Find Your Focus Flock
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Tell us about your energy today and we'll match you with the perfect study buddies
              </p>
            </motion.div>

            {/* Energy Selection */}
            <motion.div
              className="max-w-4xl mx-auto mb-12"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <EnergySelector
                  selectedEnergy={selectedEnergy}
                  onEnergySelect={setSelectedEnergy}
                  showProTip={false}
                />
                
                {/* Subtle Help Icon */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <button
                    className="w-8 h-8 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-tertiary hover:text-text-secondary hover:border-border-default transition-colors"
                    title="Energy levels help match you with study buddies who have similar focus goals"
                    aria-label="Learn about energy levels"
                  >
                    <span className="text-sm">?</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Session Type Preference (Optional) */}
            <motion.div
              className="max-w-4xl mx-auto mb-12"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-h2 font-semibold mb-2 text-text-primary">
                  Session Type Preference (Optional)
                </h3>
                <p className="text-body text-text-secondary">
                  Choose a specific type of session, or leave blank to see all options
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sessionTypeOptions.map((option) => (
                  <motion.div
                    key={option.type}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 text-center bg-bg-secondary ${
                      preferredSessionType === option.type
                        ? 'border-focus-purple bg-focus-purple/5 scale-105'
                        : 'border-border-subtle hover:border-border-default hover:scale-102'
                    }`}
                    onClick={() => 
                      setPreferredSessionType(
                        preferredSessionType === option.type ? undefined : option.type
                      )
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <h4 className="font-semibold mb-1 text-text-primary">{option.title}</h4>
                    <p className="text-small text-text-tertiary font-medium opacity-85">{option.description}</p>
                  </motion.div>
                ))}
              </div>

              {preferredSessionType && (
                <motion.div
                  className="mt-4 text-center"
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <button
                    onClick={() => setPreferredSessionType(undefined)}
                    className="text-small text-text-muted hover:text-text-secondary"
                  >
                    Clear preference
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Continue Button */}
            <motion.div
              className="text-center"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={handleEnergySelected}
                disabled={!selectedEnergy}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  selectedEnergy
                    ? 'bg-gradient-to-r from-focus-purple to-community-teal text-white hover:scale-105 shadow-lg'
                    : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
                }`}
              >
                {selectedEnergy ? '🔍 Find My Flock' : 'Select Your Energy Level'}
              </button>
            </motion.div>
          </>
        ) : (
          <MatchingAlgorithm
            userEnergyLevel={selectedEnergy!}
            preferredSessionType={preferredSessionType}
            onSessionFound={handleSessionFound}
            onCreateNew={handleCreateNew}
          />
        )}
      </div>
    </div>
  );
};

export default FindSessionPage;