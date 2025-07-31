import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * Button component optimized for ADHD users
 * 
 * Features:
 * - High contrast variants for clear visual hierarchy
 * - Haptic feedback on mobile devices (30ms for ADHD-friendly)
 * - Generous touch targets (40px minimum)
 * - Loading states with accessibility support
 * - Keyboard navigation support
 * - All design system variants implemented
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Start Focus Session
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Visual variant affecting color and styling */
  variant?: 'primary' | 'secondary' | 'ghost' | 'teal' | 'celebration' | 'coral' | 'accent' | 'success' | 'warning' | 'info';
  /** Size affecting padding and font size */
  size?: 'sm' | 'md' | 'lg';
  /** Disable interaction and show disabled styling */
  disabled?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Expand button to full width of container */
  fullWidth?: boolean;
  /** Click event handler */
  onClick?: () => void;
  /** Button type for form usage */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Reference to help text element */
  'aria-describedby'?: string;
  /** Toggle state for toggle buttons */
  'aria-pressed'?: boolean;
  /** Unique identifier */
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-pressed': ariaPressed,
  id,
}) => {
  const baseClasses = 'btn';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    teal: 'btn-teal',
    celebration: 'btn-celebration',
    coral: 'btn-coral',
    accent: 'btn-accent',
    success: 'btn-success',
    warning: 'btn-warning',
    info: 'btn-info',
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className
  );

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      // Add haptic feedback for mobile (ADHD-friendly tactile feedback)
      if ('vibrate' in navigator) {
        navigator.vibrate(30); // Gentler vibration for ADHD users
      }
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      id={id}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-pressed={ariaPressed}
      aria-busy={loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {loading && (
        <motion.div
          className="mr-2 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </motion.div>
      )}
      {children}
    </motion.button>
  );
};

export default Button; 