import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'default' | 'celebration' | 'session' | 'achievement';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
  'aria-label'?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  className,
  'aria-label': ariaLabel,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  const baseClasses = 'progress-container';
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'progress-bar',
    celebration: 'progress-celebration',
    session: 'progress-focus',
    achievement: 'progress-bar',
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    className
  );

  const progressBarClasses = clsx(
    'h-full rounded-full relative',
    variantClasses[variant]
  );

  // Celebration animation when progress reaches 100%
  const isComplete = clampedProgress >= 100;
  const shouldCelebrate = isComplete && variant === 'celebration';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-small font-semibold text-gray-700">
            {label || 'Progress'}
          </span>
          <span className="text-small font-bold" style={{ color: 'var(--focus-purple)' }}>
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      
      <div
        className={classes}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || `${label || 'Progress'}: ${clampedProgress}%`}
      >
        <motion.div
          className={progressBarClasses}
          style={{ width: `${clampedProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          {/* Celebration particles when complete */}
          {shouldCelebrate && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '50%',
                  }}
                  initial={{ 
                    scale: 0, 
                    y: 0,
                    opacity: 0 
                  }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    y: [-10, -30, -50],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Completion celebration */}
      {isComplete && (
        <motion.div
          className="mt-3 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-body font-bold" style={{ color: 'var(--community-teal)' }}>
            🎉 Complete!
          </span>
        </motion.div>
      )}
    </div>
  );
};

// Progress Garden Component (ADHD-friendly alternative to linear streaks)
interface ProgressGardenProps {
  days: Array<'seed' | 'sprout' | 'bloom' | 'empty'>;
  className?: string;
}

export const ProgressGarden: React.FC<ProgressGardenProps> = ({ days, className }) => {
  const getEmoji = (day: string) => {
    switch (day) {
      case 'seed': return '🌱';
      case 'sprout': return '🌿';
      case 'bloom': return '🌸';
      case 'empty': return '⬜';
      default: return '⬜';
    }
  };

  const getStyles = (day: string) => {
    switch (day) {
      case 'seed': return 'text-gray-400 hover:scale-110';
      case 'sprout': return 'hover:scale-110';
      case 'bloom': return 'animate-bounce-gentle hover:scale-110';
      case 'empty': return 'text-gray-200';
      default: return 'text-gray-200';
    }
  };

  return (
    <div className={clsx('flex gap-2 justify-center', className)}>
      {days.map((day, index) => (
        <motion.div
          key={index}
          className={clsx('text-3xl cursor-pointer transition-transform duration-200', getStyles(day))}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          {getEmoji(day)}
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressBar; 