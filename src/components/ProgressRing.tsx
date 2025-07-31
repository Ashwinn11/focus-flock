import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'focus' | 'celebration' | 'gentle';
  showPercentage?: boolean;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 'md',
  variant = 'default',
  showPercentage = true,
  strokeWidth,
  className,
  children,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  const sizeConfig = {
    sm: { diameter: 60, defaultStroke: 4 },
    md: { diameter: 80, defaultStroke: 6 },
    lg: { diameter: 120, defaultStroke: 8 },
    xl: { diameter: 160, defaultStroke: 10 },
  };

  const config = sizeConfig[size];
  const radius = (config.diameter - (strokeWidth || config.defaultStroke)) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  const getVariantColors = () => {
    switch (variant) {
      case 'focus':
        return {
          background: 'stroke-gray-200',
          progress: 'stroke-focus-purple',
          glow: 'drop-shadow-[0_0_8px_rgba(139,95,191,0.4)]',
        };
      case 'celebration':
        return {
          background: 'stroke-gray-200',
          progress: 'stroke-dopamine-yellow',
          glow: 'drop-shadow-[0_0_8px_rgba(255,217,61,0.6)]',
        };
      case 'gentle':
        return {
          background: 'stroke-gray-200',
          progress: 'stroke-community-teal',
          glow: 'drop-shadow-[0_0_8px_rgba(78,205,196,0.4)]',
        };
      default:
        return {
          background: 'stroke-gray-200',
          progress: 'stroke-focus-purple',
          glow: 'drop-shadow-[0_0_8px_rgba(139,95,191,0.4)]',
        };
    }
  };

  const colors = getVariantColors();
  const isComplete = clampedProgress >= 100;

  return (
    <div className={clsx('relative inline-flex items-center justify-center', className)}>
      <svg
        width={config.diameter}
        height={config.diameter}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth || config.defaultStroke}
          className={colors.background}
        />
        
        {/* Progress Circle */}
        <motion.circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth || config.defaultStroke}
          strokeLinecap="round"
          className={clsx(colors.progress, isComplete && colors.glow)}
          initial={false}
          animate={{
            strokeDasharray,
            strokeDashoffset,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />

        {/* Celebration sparkles when complete */}
        {isComplete && variant === 'celebration' && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={config.diameter / 2 + Math.cos((i * Math.PI) / 4) * (radius - 10)}
                cy={config.diameter / 2 + Math.sin((i * Math.PI) / 4) * (radius - 10)}
                r="2"
                fill="currentColor"
                className="text-dopamine-yellow"
                initial={false}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </>
        )}
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showPercentage && (
          <div className="text-center">
            <motion.div
              className={clsx(
                'font-bold',
                size === 'sm' ? 'text-sm' : 
                size === 'md' ? 'text-lg' : 
                size === 'lg' ? 'text-2xl' : 'text-3xl'
              )}
              style={{ color: 'var(--focus-purple)' }}
              initial={false}
              animate={{ scale: isComplete ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.round(clampedProgress)}%
            </motion.div>
            {isComplete && (
              <motion.div
                className="text-xs text-community-teal font-semibold"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Complete!
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressRing;