import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card, { CardHeader, CardTitle, CardSubtitle, CardContent, CardFooter } from '@/components/Card';
import EnergySelector from '@/components/EnergySelector';
import ProgressBar, { ProgressGarden } from '@/components/ProgressBar';
import { EnergyLevel } from '@/types';

/**
 * Demo page showcasing ADHD-friendly components
 * 
 * This page demonstrates:
 * - All button variants with proper accessibility
 * - Card system with different content types
 * - Energy selector with visual feedback
 * - Progress indicators with milestones
 * - Layout and navigation patterns
 * - Cognitive load management techniques
 */
const DemoPage: React.FC = () => {
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(null);
  const [sessionProgress, setSessionProgress] = useState(65);
  const [showCelebration, setShowCelebration] = useState(false);

  const gardenDays: ('bloom' | 'sprout' | 'seed' | 'empty')[] = ['bloom', 'sprout', 'bloom', 'seed', 'empty', 'sprout', 'bloom'];

  const handleCompleteSession = () => {
    setSessionProgress(100);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <motion.section 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-display font-bold text-text-primary">
            ADHD-Friendly Design System
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Experience how thoughtful design can support neurodivergent users while creating 
            beautiful, accessible experiences for everyone.
          </p>
        </motion.section>

        {/* Button Showcase */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center">
            <h2 className="text-h1 font-semibold mb-4 text-text-primary">Button Components</h2>
            <p className="text-body text-text-secondary">
              High-contrast variants with haptic feedback and generous touch targets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Actions */}
            <Card variant="primary">
              <CardHeader>
                <CardTitle>Primary Actions</CardTitle>
                <CardSubtitle>Main call-to-action buttons</CardSubtitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="primary" size="lg" fullWidth>
                  Start Focus Session
                </Button>
                <Button variant="primary" loading fullWidth>
                  Connecting...
                </Button>
                <Button variant="primary" disabled fullWidth>
                  Session Full
                </Button>
              </CardContent>
            </Card>

            {/* Energy-themed Buttons */}
            <Card variant="accent">
              <CardHeader>
                <CardTitle>Energy-themed Actions</CardTitle>
                <CardSubtitle>Contextual energy levels</CardSubtitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="teal" fullWidth>
                  Join Community
                </Button>
                <Button variant="celebration" fullWidth>
                  🎉 Celebrate Achievement
                </Button>
                <Button variant="coral" fullWidth>
                  Need Break
                </Button>
              </CardContent>
            </Card>

            {/* Semantic Variants */}
            <Card variant="info">
              <CardHeader>
                <CardTitle>Semantic Actions</CardTitle>
                <CardSubtitle>Clear meaning through color</CardSubtitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="success" fullWidth>
                  ✓ Complete Task
                </Button>
                <Button variant="warning" fullWidth>
                  ⚠ Attention Needed
                </Button>
                <Button variant="info" fullWidth>
                  ℹ Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Card System Showcase */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-h1 font-semibold mb-4 text-text-primary">Card System</h2>
            <p className="text-body text-text-secondary">
              Clear visual hierarchy with consistent spacing and typography
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Information Card */}
            <Card variant="primary" interactive onClick={() => alert('Card clicked!')}>
              <CardHeader>
                <CardTitle>Study Session Available</CardTitle>
                <CardSubtitle>Mathematics • 2 hours</CardSubtitle>
              </CardHeader>
              <CardContent>
                <p className="text-body text-text-secondary">
                  Join Sarah and Mike for focused math study. High energy level preferred.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Join Session</Button>
                <Button variant="ghost" size="sm">View Details</Button>
              </CardFooter>
            </Card>

            {/* Achievement Card */}
            <Card variant="achievement">
              <div className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-h2 font-bold mb-2">Session Complete!</h3>
                <p className="text-body">You studied for 45 minutes. Amazing focus!</p>
              </div>
            </Card>

            {/* Celebration Card */}
            <Card variant="celebration">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="text-h3 font-bold">High Energy Session</h3>
                <p className="text-small">3 participants active</p>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* Energy Selector Demo */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center">
            <h2 className="text-h1 font-semibold mb-4 text-text-primary">Energy Selector</h2>
            <p className="text-body text-text-secondary">
              Match with study buddies based on your current energy level
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <EnergySelector
              selectedEnergy={selectedEnergy}
              onEnergySelect={setSelectedEnergy}
            />
          </div>

          {selectedEnergy && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card variant="info" className="max-w-md mx-auto">
                <p className="text-body font-medium">
                  Great choice! You'll be matched with study buddies who have{' '}
                  <span className="font-bold text-primary-blue">
                    {selectedEnergy.toLowerCase()}
                  </span>{' '}
                  energy levels.
                </p>
              </Card>
            </motion.div>
          )}
        </motion.section>

        {/* Progress Indicators */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <h2 className="text-h1 font-semibold mb-4 text-text-primary">Progress Tracking</h2>
            <p className="text-body text-text-secondary">
              Visual feedback with milestone celebrations and gentle animations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Linear Progress */}
            <Card variant="secondary">
              <CardHeader>
                <CardTitle>Session Progress</CardTitle>
                <CardSubtitle>Current study session</CardSubtitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar 
                  progress={sessionProgress} 
                  variant="session" 
                  showLabel 
                  label="Study Progress" 
                />
                <div className="flex gap-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setSessionProgress(Math.min(100, sessionProgress + 10))}
                  >
                    +10%
                  </Button>
                  <Button 
                    variant="celebration" 
                    size="sm"
                    onClick={handleCompleteSession}
                  >
                    Complete Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Garden */}
            <Card variant="accent">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardSubtitle>Visual garden metaphor</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ProgressGarden 
                  days={gardenDays} 
                  className="my-4"
                  aria-label="Weekly study progress garden"
                />
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Accessibility Features */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-h1 font-semibold mb-4 text-text-primary">Accessibility Features</h2>
            <p className="text-body text-text-secondary">
              Built-in support for screen readers, keyboard navigation, and high contrast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="info">
              <CardHeader>
                <CardTitle>Keyboard Navigation</CardTitle>
                <CardSubtitle>Full keyboard support</CardSubtitle>
              </CardHeader>
              <CardContent>
                <p className="text-body text-text-secondary mb-4">
                  All interactive elements support keyboard navigation. Try using Tab, Enter, and Space keys.
                </p>
                <div className="space-y-2">
                  <Button variant="primary" size="sm" aria-describedby="keyboard-help">
                    Focus me (Tab)
                  </Button>
                  <div id="keyboard-help" className="sr-only">
                    Press Enter or Space to activate this button
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="success">
              <CardHeader>
                <CardTitle>Screen Reader Support</CardTitle>
                <CardSubtitle>Comprehensive ARIA labels</CardSubtitle>
              </CardHeader>
              <CardContent>
                <p className="text-body text-text-secondary mb-4">
                  All components include proper ARIA attributes for screen reader compatibility.
                </p>
                <Button 
                  variant="success" 
                  size="sm"
                  aria-label="Complete task"
                  aria-describedby="sr-help"
                >
                  ✓ Complete Task
                </Button>
                <div id="sr-help" className="sr-only">
                  This button marks the current task as complete
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Cognitive Load Management */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <h2 className="text-h1 font-semibold mb-4 text-text-primary">Cognitive Load Management</h2>
            <p className="text-body text-text-secondary">
              Progressive disclosure, clear hierarchy, and gentle animations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="primary">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-h3 font-bold mb-2">Single Focus</h3>
                <p className="text-small text-text-secondary">
                  One primary action per screen to reduce decision fatigue
                </p>
              </div>
            </Card>

            <Card variant="accent">
              <div className="text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-h3 font-bold mb-2">Progressive Disclosure</h3>
                <p className="text-small text-text-secondary">
                  Complex workflows broken into digestible steps
                </p>
              </div>
            </Card>

            <Card variant="success">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-h3 font-bold mb-2">Visual Hierarchy</h3>
                <p className="text-small text-text-secondary">
                  Clear typography and spacing guide attention
                </p>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* Celebration Demo */}
        {showCelebration && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-bg-secondary p-8 rounded-2xl text-center max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-h2 font-bold mb-2">Session Complete!</h2>
              <p className="text-body text-text-secondary mb-6">
                Great job staying focused! You've completed your study session.
              </p>
              <Button variant="celebration" onClick={() => setShowCelebration(false)}>
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default DemoPage; 