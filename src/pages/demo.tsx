import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Card, { CardHeader, CardTitle, CardSubtitle, CardContent } from '@/components/Card';
import ProgressBar, { ProgressGarden } from '@/components/ProgressBar';
import EnergySelector from '@/components/EnergySelector';
import { EnergyLevel } from '@/types';

const DemoPage: React.FC = () => {
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(null);
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleProgressUpdate = () => {
    const newProgress = Math.min(100, progress + 25);
    setProgress(newProgress);
    
    if (newProgress === 100) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const gardenDays = ['bloom', 'bloom', 'sprout', 'seed', 'empty', 'empty', 'empty'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-display font-bold text-gray-900 mb-4">
            Focus Flock MVP Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the ADHD-friendly design system and core features
          </p>
        </motion.div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Energy Selector Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Energy Matching</CardTitle>
                <CardSubtitle>Select your energy level to match with study buddies</CardSubtitle>
              </CardHeader>
              <CardContent>
                <EnergySelector
                  selectedEnergy={selectedEnergy}
                  onEnergySelect={setSelectedEnergy}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardSubtitle>Dopamine-driven progress visualization</CardSubtitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-h3 font-semibold mb-3">Progress Bar</h4>
                  <ProgressBar
                    progress={progress}
                    variant="celebration"
                    showLabel
                    label="Session Progress"
                  />
                  <Button
                    onClick={handleProgressUpdate}
                    disabled={progress >= 100}
                    className="mt-4"
                  >
                    Update Progress
                  </Button>
                </div>

                <div>
                  <h4 className="text-h3 font-semibold mb-3">Progress Garden</h4>
                  <p className="text-small text-gray-600 mb-3">
                    ADHD-friendly alternative to linear streaks
                  </p>
                  <ProgressGarden days={gardenDays} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Button Showcase */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Button Components</CardTitle>
              <CardSubtitle>ADHD-friendly buttons with celebration animations</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="primary" size="md">
                  Primary Action
                </Button>
                <Button variant="coral" size="md">
                  Community
                </Button>
                <Button variant="teal" size="md">
                  Growth
                </Button>
                <Button variant="celebration" size="md">
                  🎉 Celebrate!
                </Button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="secondary" size="lg" fullWidth>
                  Secondary Action
                </Button>
                <Button variant="ghost" size="lg" fullWidth>
                  Ghost Button
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card Showcase */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Card Components</CardTitle>
              <CardSubtitle>Different card variants for various use cases</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardSubtitle>Standard content card</CardSubtitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-gray-600">
                      This is a standard card with subtle hover effects and clean design.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="session">
                  <CardHeader>
                    <CardTitle>Session Card</CardTitle>
                    <CardSubtitle>Active body doubling session</CardSubtitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90">
                      Special styling for active sessions with gradient background and celebration effects.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="achievement">
                  <CardHeader>
                    <CardTitle>Achievement Card</CardTitle>
                    <CardSubtitle>Celebration and milestone</CardSubtitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800">
                      Bright, celebratory styling for achievements and milestones.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Celebration Demo */}
        {showCelebration && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-black/50 absolute inset-0" />
            <motion.div
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-h2 font-bold text-gray-900 mb-2">
                Session Complete!
              </h3>
              <p className="text-body text-gray-600 mb-6">
                Great job staying focused! You've earned a celebration moment.
              </p>
              <Button
                variant="celebration"
                onClick={() => setShowCelebration(false)}
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Features Overview */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>ADHD-Friendly Features</CardTitle>
              <CardSubtitle>Key design principles implemented in this MVP</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <h4 className="text-h3 font-semibold mb-1">Dopamine-Driven Rewards</h4>
                      <p className="text-small text-gray-600">
                        Immediate feedback and celebration animations that provide positive reinforcement
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💚</div>
                    <div>
                      <h4 className="text-h3 font-semibold mb-1">Shame-Free Environment</h4>
                      <p className="text-small text-gray-600">
                        No failure language, gentle redirects, and supportive messaging
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">👁️</div>
                    <div>
                      <h4 className="text-h3 font-semibold mb-1">Clear Visual Hierarchy</h4>
                      <p className="text-small text-gray-600">
                        Information architecture designed for attention differences
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🎨</div>
                    <div>
                      <h4 className="text-h3 font-semibold mb-1">Accessibility First</h4>
                      <p className="text-small text-gray-600">
                        WCAG 2.1 AA compliance with high contrast and reduced motion support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="bg-gradient-to-r from-focus-purple to-community-teal text-white">
            <CardHeader>
              <CardTitle className="text-white">Ready to Experience Focus Flock?</CardTitle>
              <CardSubtitle className="text-white/90">
                This MVP demonstrates the core design principles and user experience
              </CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="celebration"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                >
                  🚀 Back to Home
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => window.open('https://github.com/focus-flock', '_blank')}
                >
                  View Source Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoPage; 