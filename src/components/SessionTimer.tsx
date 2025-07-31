import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SessionTimerProps {
  timeRemaining: number; // in seconds
  totalDuration: number; // in seconds
  currentPhase: 'settling' | 'focus' | 'break' | 'wrapup';
  className?: string;
}

const SessionTimer: React.FC<SessionTimerProps> = ({
  timeRemaining,
  totalDuration,
  currentPhase,
  className,
}) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'settling': return 'text-focus-purple';
      case 'focus': return 'text-community-teal';
      case 'break': return 'text-flock-coral';
      case 'wrapup': return 'text-dopamine-yellow';
      default: return 'text-focus-purple';
    }
  };

  const getPhaseEmoji = () => {
    switch (currentPhase) {
      case 'settling': return '🧘';
      case 'focus': return '🎯';
      case 'break': return '☕';
      case 'wrapup': return '🎉';
      default: return '🎯';
    }
  };

  const getEncouragementMessage = () => {
    const progressPercentage = ((totalDuration - timeRemaining) / totalDuration) * 100;
    
    if (currentPhase === 'settling') {
      return 'Take your time to get comfortable';
    } else if (currentPhase === 'wrapup') {
      return 'Amazing work! You did it!';
    } else if (progressPercentage < 25) {
      return 'You\'ve got this! Just getting started';
    } else if (progressPercentage < 50) {
      return 'Great momentum! Keep it up';
    } else if (progressPercentage < 75) {
      return 'You\'re more than halfway there!';
    } else {
      return 'Almost done! Finish strong';
    }
  };

  const isLowTime = timeRemaining <= 300; // Last 5 minutes
  const isVeryLowTime = timeRemaining <= 60; // Last minute

  return (
    <div className={clsx('text-center space-y-4', className)}>
      {/* Phase Indicator */}
      <div className="flex items-center justify-center space-x-2 mb-4">
        <span className="text-2xl">{getPhaseEmoji()}</span>
        <span className={clsx('font-semibold capitalize', getPhaseColor())}>
          {currentPhase} Phase
        </span>
      </div>

      {/* Main Timer */}
      <motion.div
        className={clsx(
          'text-6xl font-bold font-mono',
          getPhaseColor(),
          isVeryLowTime && 'animate-pulse'
        )}
        initial={false}
        animate={{ 
          scale: isLowTime ? [1, 1.05, 1] : 1,
          color: isVeryLowTime ? ['currentColor', '#FF6B7A', 'currentColor'] : 'currentColor'
        }}
        transition={{ 
          duration: 1, 
          repeat: isLowTime ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {formatTime(timeRemaining)}
      </motion.div>

      {/* Encouragement Message */}
      <motion.p
        className="text-body text-gray-600 font-medium"
        initial={false}
        animate={{ opacity: 1 }}
        key={getEncouragementMessage()} // Re-animate when message changes
      >
        {getEncouragementMessage()}
      </p>

      {/* Progress Indicator */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className={clsx(
            'h-full rounded-full',
            currentPhase === 'focus' ? 'bg-community-teal' :
            currentPhase === 'settling' ? 'bg-focus-purple' :
            currentPhase === 'break' ? 'bg-flock-coral' :
            'bg-dopamine-yellow'
          )}
          initial={false}
          animate={{ 
            width: `${((totalDuration - timeRemaining) / totalDuration) * 100}%` 
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Time Milestones */}
      {currentPhase === 'focus' && (
        <div className="flex justify-between text-xs text-gray-500 font-medium">
          <span>Start</span>
          <span>25 min</span>
          <span>50 min</span>
          <span>End</span>
        </div>
      )}

      {/* Session Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: 'var(--community-teal)' }}>
            {Math.round(((totalDuration - timeRemaining) / totalDuration) * 100)}%
          </div>
          <div className="text-xs text-gray-500 font-medium">Complete</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: 'var(--focus-purple)' }}>
            {Math.round((totalDuration - timeRemaining) / 60)}m
          </div>
          <div className="text-xs text-gray-500 font-medium">Focused</div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimer;