import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Button from '@/components/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';

const SessionCompletePage: React.FC = () => {
  const router = useRouter();
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Mock session data - in real app this would come from completed session
  const sessionData = {
    title: 'Deep Work Session',
    duration: 50, // minutes
    participants: 3,
    focusTime: 45, // actual focus time
    completionRate: 90,
    energyLevel: 'steady' as const,
  };

  const achievements = [
    { icon: '🎯', title: 'Focus Master', description: '45 minutes of deep work' },
    { icon: '👥', title: 'Community Builder', description: 'Studied with 3 people' },
    { icon: '🔥', title: 'Streak Keeper', description: '5 days in a row' },
  ];

  const handleShareProgress = () => {
    setShowShareOptions(true);
  };

  const handleStartNewSession = () => {
    router.push('/session/find');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Session Complete - Focus Flock</title>
        <meta name="description" content="Celebrate your focus session completion" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-dopamine-yellow/10 to-flock-coral/10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Celebration Header */}
          <motion.div
            className="text-center mb-12"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-dopamine-yellow to-flock-coral flex items-center justify-center shadow-xl"
              initial={false}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-4xl text-white">🎉</span>
            </motion.div>
            
            <h1 className="text-display font-bold text-gray-900 mb-4">
              Session Complete!
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Amazing work! You just completed a {sessionData.duration}-minute focus session 
              with your study flock. Time to celebrate! 🎊
            </p>
          </motion.div>

          {/* Session Stats */}
          <motion.div
            className="mb-12"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center space-x-2">
                  <span className="text-2xl">📊</span>
                  <span>Your Focus Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: 'var(--community-teal)' }}>
                      {sessionData.focusTime}m
                    </div>
                    <p className="text-body text-gray-600 font-medium">Focus Time</p>
                    <ProgressBar 
                      progress={(sessionData.focusTime / sessionData.duration) * 100}
                      variant="celebration"
                      size="sm"
                      className="mt-3"
                    />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: 'var(--focus-purple)' }}>
                      {sessionData.participants}
                    </div>
                    <p className="text-body text-gray-600 font-medium">Study Buddies</p>
                    <div className="flex justify-center space-x-1 mt-3">
                      {[...Array(sessionData.participants)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-white text-sm font-bold"
                        >
                          👤
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: 'var(--dopamine-yellow)' }}>
                      {sessionData.completionRate}%
                    </div>
                    <p className="text-body text-gray-600 font-medium">Completion Rate</p>
                    <ProgressBar 
                      progress={sessionData.completionRate}
                      variant="celebration"
                      size="sm"
                      className="mt-3"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="mb-12"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-focus-purple/5 to-community-teal/5">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center space-x-2">
                  <span className="text-2xl">🏆</span>
                  <span>Achievements Unlocked</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                      initial={false}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="font-bold mb-2">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="text-center space-y-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="celebration"
                size="lg"
                onClick={handleShareProgress}
                className="shadow-xl"
              >
                📱 Share Your Win
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartNewSession}
                className="shadow-xl"
              >
                🚀 Start New Session
              </Button>
            </div>
            
            <Button
              variant="ghost"
              onClick={handleGoHome}
            >
              🏠 Back to Home
            </Button>
          </motion.div>

          {/* Share Options Modal */}
          {showShareOptions && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={false}
              animate={{ opacity: 1 }}
              onClick={() => setShowShareOptions(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                initial={false}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <h3 className="text-h2 font-bold mb-2">Share Your Achievement</h3>
                  <p className="text-body text-gray-600">
                    Let your friends know about your focus session success!
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      // Simulate social sharing
                      toast.success('Shared to Instagram Stories!');
                      setShowShareOptions(false);
                    }}
                  >
                    📸 Instagram Story
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => {
                      // Simulate social sharing
                      toast.success('Shared to TikTok!');
                      setShowShareOptions(false);
                    }}
                  >
                    🎵 TikTok
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      navigator.clipboard.writeText('Just completed a 50-minute focus session with Focus Flock! 🎉');
                      toast.success('Copied to clipboard!');
                      setShowShareOptions(false);
                    }}
                  >
                    📋 Copy Link
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => setShowShareOptions(false)}
                  className="mt-4"
                >
                  Cancel
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SessionCompletePage;