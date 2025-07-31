import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'session' | 'achievement' | 'celebration';
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
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
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
  <div className={clsx('mb-6 pb-4 border-b border-gray-100', className)}>
    {children}
  </div>
);

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={clsx('text-h3 font-semibold mb-2 text-gray-900', className)}>
    {children}
  </h3>
);

// Card Subtitle Component
interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className }) => (
  <p className={clsx('text-small text-gray-600 mb-0', className)}>
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
  <div className={clsx('mt-6 pt-4 border-t border-gray-100', className)}>
    {children}
  </div>
);

export default Card; 