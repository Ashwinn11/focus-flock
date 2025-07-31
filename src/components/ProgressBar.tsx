import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * Progress Bar component optimized for ADHD users
 * 
 * Features:
 * - High contrast progress indicators
 * - Celebration animations for completion
 * - Accessible progress announcements
 * - Multiple size and variant options
 * - Visual feedback for progress milestones
 * 
 * @example
 * ```tsx
 * <ProgressBar 
 *   progress={75} 
 *   variant="session" 
 *   showLabel 
 *   label="Study Progress" 
 * />
 * ```
 */
interface ProgressBarProps {
  /** Progress percentage (0-100) */
  progress: number;
  /** Visual variant affecting color and styling */
  variant?: 'default' | 'celebration' | 'session' | 'achievement' | 'energy';
  /** Size affecting height and padding */
  size?: 'sm' | 'md' | 'lg';
  /** Show label and percentage */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers */
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
    achievement: 'progress-achievement',
    energy: 'progress-energy',
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

  // Progress milestones for ADHD-friendly feedback
  const milestones = [25, 50, 75, 100];
  const currentMilestone = milestones.find(m => clampedProgress >= m) || 0;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-small font-semibold text-text-secondary">
            {label || 'Progress'}
          </span>
          <span className="text-small font-bold text-primary-blue">
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
        aria-describedby={isComplete ? 'completion-message' : undefined}
      >
        <motion.div
          className={progressBarClasses}
          style={{ width: `${clampedProgress}%` }}
          initial={false}
          animate={{ width: `${clampedProgress}%` }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          {/* Milestone indicators for ADHD-friendly feedback */}
          {milestones.map((milestone) => (
            <motion.div
              key={milestone}
              className={clsx(
                'absolute top-0 bottom-0 w-1 bg-bg-secondary rounded-full',
                clampedProgress >= milestone ? 'opacity-100' : 'opacity-30'
              )}
              style={{ left: `${milestone}%`, transform: 'translateX(-50%)' }}
              initial={false}
              animate={{ 
                opacity: clampedProgress >= milestone ? 1 : 0.3,
                scale: clampedProgress >= milestone ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}

          {/* Celebration particles when complete */}
          {shouldCelebrate && (
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-bg-secondary rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '50%',
                  }}
                  initial={false}
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
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          id="completion-message"
          role="status"
          aria-live="polite"
        >
          <span className="text-body font-bold text-community-teal">
            🎉 Complete!
          </span>
        </motion.div>
      )}

      {/* Milestone feedback for ADHD users */}
      {currentMilestone > 0 && clampedProgress < 100 && (
        <motion.div
          className="mt-2 text-center"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          role="status"
          aria-live="polite"
        >
          <span className="text-small font-medium text-text-secondary">
            {currentMilestone === 25 && '🌱 Getting started!'}
            {currentMilestone === 50 && '🌿 Halfway there!'}
            {currentMilestone === 75 && '🌸 Almost done!'}
          </span>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Progress Garden Component (ADHD-friendly alternative to linear streaks)
 * 
 * Features:
 * - Visual garden metaphor for progress tracking
 * - Gentle animations for engagement
 * - Clear visual progression from seed to bloom
 * - Accessible progress indicators
 * 
 * @example
 * ```tsx
 * <ProgressGarden 
 *   days={['bloom', 'sprout', 'seed', 'empty']} 
 *   className="my-4" 
 * />
 * ```
 */
interface ProgressGardenProps {
  /** Array of day states: 'seed', 'sprout', 'bloom', 'empty' */
  days: Array<'seed' | 'sprout' | 'bloom' | 'empty'>;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export const ProgressGarden: React.FC<ProgressGardenProps> = ({ 
  days, 
  className,
  'aria-label': ariaLabel 
}) => {
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
      case 'seed': return 'text-text-tertiary hover:scale-110';
      case 'sprout': return 'text-community-teal hover:scale-110';
      case 'bloom': return 'text-dopamine-yellow animate-soft-pulse hover:scale-110';
      case 'empty': return 'text-border-subtle';
      default: return 'text-border-subtle';
    }
  };

  const getDescription = (day: string) => {
    switch (day) {
      case 'seed': return 'Started but not completed';
      case 'sprout': return 'Made good progress';
      case 'bloom': return 'Fully completed';
      case 'empty': return 'No activity';
      default: return 'No activity';
    }
  };

  const completedDays = days.filter(day => day === 'bloom').length;
  const totalDays = days.length;

  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex gap-2 justify-center" role="group" aria-label={ariaLabel || 'Progress garden'}>
        {days.map((day, index) => (
          <motion.div
            key={index}
            className={clsx('text-3xl cursor-pointer transition-transform duration-200', getStyles(day))}
            initial={false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            role="img"
            aria-label={`Day ${index + 1}: ${getDescription(day)}`}
            tabIndex={0}
          >
            {getEmoji(day)}
          </motion.div>
        ))}
      </div>
      
      {/* Progress summary for screen readers */}
      <div className="text-center">
        <p className="text-small text-text-secondary font-medium">
          {completedDays} of {totalDays} days completed
        </p>
        <p className="text-tiny text-text-tertiary">
          {Math.round((completedDays / totalDays) * 100)}% success rate
        </p>
      </div>
    </div>
  );
};

export default ProgressBar; 