import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'session' | 'achievement' | 'celebration';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  const baseClasses = 'card rounded-xl p-6 shadow-md border border-gray-200 transition-all duration-200 ease-out';
  
  const variantClasses = {
    default: 'bg-white hover:shadow-lg hover:-translate-y-1',
    session: 'session-card text-white hover:shadow-celebration hover:-translate-y-2',
    achievement: 'bg-gradient-to-br from-dopamine-yellow to-dopamine-yellow-light text-gray-900 hover:shadow-celebration hover:-translate-y-2',
    celebration: 'bg-gradient-to-br from-flock-coral to-flock-coral-light text-white hover:shadow-celebration hover:-translate-y-2',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    disabledClasses,
    clickableClasses,
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

  const CardComponent = onClick ? motion.div : motion.div;

  return (
    <CardComponent
      className={classes}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      whileHover={!disabled && onClick ? { scale: 1.02 } : {}}
      whileTap={!disabled && onClick ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </CardComponent>
  );
};

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={clsx('mb-4', className)}>
    {children}
  </div>
);

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={clsx('text-h3 font-semibold mb-2', className)}>
    {children}
  </h3>
);

// Card Subtitle Component
interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className }) => (
  <p className={clsx('text-small text-gray-600 mb-3', className)}>
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
  <div className={clsx('mt-4 pt-4 border-t border-gray-200', className)}>
    {children}
  </div>
);

export default Card; 