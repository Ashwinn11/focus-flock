import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';

interface BreakTimerProps {
  duration: number; // in minutes
  onBreakEnd: () => void;
  className?: string;
}

const breakActivities = [
  { icon: '🧘', title: 'Deep Breathing', description: 'Take 5 deep breaths' },
  { icon: '💧', title: 'Hydrate', description: 'Drink some water' },
  { icon: '🤸', title: 'Stretch', description: 'Move your body' },
  { icon: '👀', title: 'Rest Eyes', description: 'Look away from screen' },
  { icon: '🌱', title: 'Mindful Moment', description: 'Notice how you feel' },
];

const BreakTimer: React.FC<BreakTimerProps> = ({
  duration,
  onBreakEnd,
  className,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // Convert to seconds
  const [selectedActivity, setSelectedActivity] = useState(breakActivities[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          onBreakEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onBreakEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((duration * 60 - timeRemaining) / (duration * 60)) * 100;

  return (
    <Card variant="warning" className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-center">
          <span className="text-2xl">☕</span>
          <span>Break Time</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-6">
        {/* Break Timer Display */}
        <div className="relative">
          <motion.div
            className="text-4xl font-bold mb-2"
            style={{ color: 'var(--flock-coral)' }}
            initial={false}
            animate={{ scale: timeRemaining <= 60 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: timeRemaining <= 60 ? Infinity : 0 }}
          >
            {formatTime(timeRemaining)}
          </motion.div>
          <p className="text-sm text-surface-variant font-medium">
            Break time remaining
          </p>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-gray-200"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="text-flock-coral"
                initial={false}
                animate={{
                  strokeDasharray: `${2 * Math.PI * 40}`,
                  strokeDashoffset: `${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`,
                }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">{selectedActivity.icon}</span>
            </div>
          </div>
        </div>

        {/* Break Activity Suggestion */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
          <h4 className="font-bold mb-2">{selectedActivity.title}</h4>
          <p className="text-sm text-surface-variant mb-4">{selectedActivity.description}</p>
          
          {/* Activity Options */}
          <div className="flex flex-wrap gap-2 justify-center">
            {breakActivities.map((activity) => (
              <motion.button
                key={activity.title}
                className={clsx(
                  'p-2 rounded-lg text-lg transition-all duration-200',
                  selectedActivity.title === activity.title
                    ? 'bg-flock-coral text-white shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high'
                )}
                onClick={() => setSelectedActivity(activity)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Select ${activity.title} activity`}
              >
                {activity.icon}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Early Return Option */}
        <div className="pt-4 border-t border-outline-variant">
          <Button
            variant="teal"
            size="sm"
            onClick={onBreakEnd}
            className="shadow-md"
          >
            ✨ Ready to Focus
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Feeling refreshed? You can return early
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakTimer;