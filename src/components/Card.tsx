import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * Card component optimized for ADHD users
 * 
 * Features:
 * - Clear visual hierarchy with proper heading structure
 * - High contrast variants for different content types
 * - Interactive cards with keyboard navigation
 * - Consistent spacing and typography
 * - Accessibility support for screen readers
 * 
 * @example
 * ```tsx
 * <Card variant="primary" interactive onClick={handleClick}>
 *   <CardHeader>
 *     <CardTitle>Study Session Available</CardTitle>
 *     <CardSubtitle>Mathematics • 2 hours</CardSubtitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Join Sarah and Mike for focused math study.</p>
 *   </CardContent>
 * </Card>
 * ```
 */
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'session' | 'achievement' | 'celebration';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  interactive = false,
  className,
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  const baseClasses = 'card';
  
  const variantClasses = {
    default: '',
    primary: 'card-primary',
    secondary: 'card-secondary', 
    accent: 'card-accent',
    success: 'card-success',
    warning: 'card-warning',
    info: 'card-info',
    session: 'session-card',
    achievement: 'achievement-card',
    celebration: 'celebration-card',
  };

  const interactiveClasses = (onClick || interactive) && !disabled ? 'card-interactive' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    interactiveClasses,
    disabledClasses,
    className
  );

  const handleClick = () => {
    if (!disabled && onClick) {
      // Add haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(30);
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

  const motionProps = (onClick || interactive) && !disabled ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  } : {};

  return (
    <motion.div
      className={classes}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={clsx('mb-4 pb-3 border-b border-border-subtle', className)}>
    {children}
  </div>
);

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={clsx('text-h3 font-semibold mb-1 text-text-primary', className)}>
    {children}
  </h3>
);

// Card Subtitle Component
interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className }) => (
  <p className={clsx('text-small text-text-tertiary font-medium opacity-85 mb-0', className)}>
    {children}
  </p>
);

// Card Content Component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={clsx('', className)}>
    {children}
  </div>
);

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={clsx('mt-4 pt-3 border-t border-border-subtle', className)}>
    {children}
  </div>
);

export default Card; 