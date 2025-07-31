import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
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
    <>
      <Head>
        <title>Focus Flock Demo - ADHD-Friendly Design System</title>
        <meta name="description" content="Experience the ADHD-friendly design system and core features" />
      </Head>

    <div className="min-h-screen py-12" style={{ background: 'linear-gradient(135deg, var(--soft-lavender) 0%, var(--mint-cream) 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center shadow-xl">
            <span className="text-4xl text-white">🎨</span>
          </div>
          <h1 className="text-display font-bold text-gray-900 mb-6">
            Focus Flock MVP Demo
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Experience the ADHD-friendly design system and core features
          </p>
        </motion.div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Energy Selector Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span>Energy Matching</span>
                </CardTitle>
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
            <Card className="bg-white/90 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">📊</span>
                  <span>Progress Tracking</span>
                </CardTitle>
                <CardSubtitle>Dopamine-driven progress visualization</CardSubtitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="text-h3 font-bold mb-4 flex items-center space-x-2">
                    <span className="text-xl">📈</span>
                    <span>Progress Bar</span>
                  </h4>
                  <ProgressBar
                    progress={progress}
                    variant="celebration"
                    showLabel
                    label="Session Progress"
                  />
                  <Button
                    onClick={handleProgressUpdate}
                    disabled={progress >= 100}
                    className="mt-6"
                    variant={progress >= 100 ? "teal" : "primary"}
                  >
                    {progress >= 100 ? "🎉 Complete!" : "📈 Update Progress"}
                  </Button>
                </div>

                <div>
                  <h4 className="text-h3 font-bold mb-4 flex items-center space-x-2">
                    <span className="text-xl">🌱</span>
                    <span>Progress Garden</span>
                  </h4>
                  <p className="text-body text-gray-600 mb-4 font-medium">
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
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <span>Button Components</span>
              </CardTitle>
              <CardSubtitle>ADHD-friendly buttons with celebration animations</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button variant="primary" size="md">
                  🎯 Primary
                </Button>
                <Button variant="coral" size="md">
                  👥 Community
                </Button>
                <Button variant="teal" size="md">
                  📈 Growth
                </Button>
                <Button variant="celebration" size="md">
                  🎉 Celebrate!
                </Button>
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Button variant="secondary" size="lg" fullWidth>
                  📋 Secondary Action
                </Button>
                <Button variant="ghost" size="lg" fullWidth>
                  👻 Ghost Button
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card Showcase */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🃏</span>
                <span>Card Components</span>
              </CardTitle>
              <CardSubtitle>Different card variants for various use cases</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card variant="default" interactive>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">📄</span>
                      <span>Default Card</span>
                    </CardTitle>
                    <CardSubtitle>Standard content card</CardSubtitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-gray-600 font-medium">
                      This is a standard card with subtle hover effects and clean design.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="session" interactive>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <span className="text-xl">🎥</span>
                      <span>Session Card</span>
                    </CardTitle>
                    <CardSubtitle>Active body doubling session</CardSubtitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 font-medium">
                      Special styling for active sessions with gradient background and celebration effects.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="achievement" interactive>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <span className="text-xl">🏆</span>
                      <span>Achievement Card</span>
                    </CardTitle>
                    <CardSubtitle>Celebration and milestone</CardSubtitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 font-medium">
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
            <div className="bg-black/60 absolute inset-0 backdrop-blur-sm" />
            <motion.div
              className="bg-white rounded-2xl p-10 text-center max-w-md mx-4 shadow-2xl border border-white/50"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div 
                className="text-8xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                🎉
              </motion.div>
              <h3 className="text-h1 font-bold text-gray-900 mb-4">
                Session Complete!
              </h3>
              <p className="text-body text-gray-600 mb-8 font-medium">
                Great job staying focused! You've earned a celebration moment.
              </p>
              <Button
                variant="celebration"
                size="lg"
                onClick={() => setShowCelebration(false)}
              >
                ✨ Continue
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Features Overview */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🧠</span>
                <span>ADHD-Friendly Features</span>
              </CardTitle>
              <CardSubtitle>Key design principles implemented in this MVP</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-dopamine-yellow to-flock-coral flex items-center justify-center text-xl shadow-md">
                      🎯
                    </div>
                    <div>
                      <h4 className="text-h3 font-bold mb-2">Dopamine-Driven Rewards</h4>
                      <p className="text-body text-gray-600 font-medium">
                        Immediate feedback and celebration animations that provide positive reinforcement
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-community-teal to-focus-purple flex items-center justify-center text-xl shadow-md">
                      💚
                    </div>
                    <div>
                      <h4 className="text-h3 font-bold mb-2">Shame-Free Environment</h4>
                      <p className="text-body text-gray-600 font-medium">
                        No failure language, gentle redirects, and supportive messaging
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-flock-coral to-dopamine-yellow flex items-center justify-center text-xl shadow-md">
                      👁️
                    </div>
                    <div>
                      <h4 className="text-h3 font-bold mb-2">Clear Visual Hierarchy</h4>
                      <p className="text-body text-gray-600 font-medium">
                        Information architecture designed for attention differences
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center text-xl shadow-md">
                      🎨
                    </div>
                    <div>
                      <h4 className="text-h3 font-bold mb-2">Accessibility First</h4>
                      <p className="text-body text-gray-600 font-medium">
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
          <Card className="text-white border-none" style={{ background: 'linear-gradient(135deg, var(--focus-purple) 0%, var(--community-teal) 100%)' }}>
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <CardTitle className="text-white">Ready to Experience Focus Flock?</CardTitle>
              <CardSubtitle className="text-white/90">
                This MVP demonstrates the core design principles and user experience
              </CardSubtitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="celebration"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                  className="shadow-2xl"
                >
                  🚀 Back to Home
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                  onClick={() => window.open('https://github.com/focus-flock', '_blank')}
                >
                  💻 View Source
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default DemoPage; 