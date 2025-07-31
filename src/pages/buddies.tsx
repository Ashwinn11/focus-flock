import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import StudyBuddy, { StudyBuddyFinder } from '@/components/StudyBuddy';
import { User, EnergyLevel } from '@/types';
import toast from 'react-hot-toast';

const BuddiesPage: React.FC = () => {
  const [currentBuddies, setCurrentBuddies] = useState<User[]>([]);
  const [showFinder, setShowFinder] = useState(false);

  // Mock current buddies
  const mockBuddies: User[] = [
    {
      id: 'buddy1',
      name: 'Alex Chen',
      email: 'alex@example.com',
      avatar: '🦊',
      energyLevel: EnergyLevel.STEADY,
      isOnline: true,
      lastSeen: new Date(),
      preferences: {
        theme: 'default',
        notifications: true,
        soundEnabled: true,
        reducedMotion: false,
        highContrast: false,
        sessionLength: 50,
        energyLevel: EnergyLevel.STEADY,
      },
      stats: {
        totalSessions: 45,
        totalFocusTime: 2250,
        currentStreak: 7,
        longestStreak: 14,
        achievements: [],
        sessionHistory: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'buddy2',
      name: 'Sam Rivera',
      email: 'sam@example.com',
      avatar: '🦋',
      energyLevel: EnergyLevel.HIGH,
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      preferences: {
        theme: 'default',
        notifications: true,
        soundEnabled: true,
        reducedMotion: false,
        highContrast: false,
        sessionLength: 25,
        energyLevel: EnergyLevel.HIGH,
      },
      stats: {
        totalSessions: 32,
        totalFocusTime: 1600,
        currentStreak: 3,
        longestStreak: 9,
        achievements: [],
        sessionHistory: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  React.useEffect(() => {
    setCurrentBuddies(mockBuddies);
  }, []);

  const handleBuddyFound = (buddy: User) => {
    setCurrentBuddies(prev => [...prev, buddy]);
    setShowFinder(false);
    toast.success(`Connected with ${buddy.name}! 🎉`);
  };

  const handleSendMessage = (buddyId: string, message: string) => {
    toast.success('Message sent! 📨');
  };

  const handleScheduleSession = (buddyId: string) => {
    toast.success('Session scheduled! 📅');
  };

  const handleRemoveBuddy = (buddyId: string) => {
    setCurrentBuddies(prev => prev.filter(b => b.id !== buddyId));
    toast.success('Study buddy removed');
  };

  return (
    <>
      <Head>
        <title>Study Buddies - Focus Flock</title>
        <meta name="description" content="Find and manage your study buddies for 1-on-1 accountability" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center shadow-xl">
              <span className="text-4xl text-white">🤝</span>
            </div>
            <h1 className="text-display font-bold text-gray-900 mb-4">
              Study Buddies
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Build meaningful 1-on-1 connections with study partners who understand your goals and energy
            </p>
          </motion.div>

          {/* Current Buddies or Finder */}
          {!showFinder ? (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Action Bar */}
              <div className="flex justify-between items-center">
                <h2 className="text-h1 font-bold text-gray-900">
                  Your Study Buddies ({currentBuddies.length})
                </h2>
                <Button
                  variant="celebration"
                  onClick={() => setShowFinder(true)}
                >
                  🔍 Find New Buddies
                </Button>
              </div>

              {/* Buddies List */}
              {currentBuddies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentBuddies.map((buddy, index) => (
                    <motion.div
                      key={buddy.id}
                      initial={false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <StudyBuddy
                        buddy={buddy}
                        onSendMessage={handleSendMessage}
                        onScheduleSession={handleScheduleSession}
                        onRemoveBuddy={handleRemoveBuddy}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center shadow-xl">
                    <span className="text-4xl text-white">🔍</span>
                  </div>
                  <h3 className="text-h2 font-bold text-gray-900 mb-4">
                    No Study Buddies Yet
                  </h3>
                  <p className="text-body text-gray-600 mb-8 max-w-md mx-auto">
                    Find your perfect study partner! Connect with someone who matches your energy and goals.
                  </p>
                  <Button
                    variant="celebration"
                    size="lg"
                    onClick={() => setShowFinder(true)}
                  >
                    🚀 Find Your First Buddy
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setShowFinder(false)}
                >
                  ← Back to Buddies
                </Button>
              </div>
              <StudyBuddyFinder onBuddyFound={handleBuddyFound} />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuddiesPage;