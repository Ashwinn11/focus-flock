import React from 'react';
import { motion } from 'framer-motion';
import { EnergyLevel } from '@/types';
import { clsx } from 'clsx';

interface EnergySelectorProps {
  selectedEnergy: EnergyLevel | null;
  onEnergySelect: (energy: EnergyLevel) => void;
  className?: string;
  disabled?: boolean;
}

const energyOptions = [
  {
    level: EnergyLevel.HIGH,
    icon: '⚡',
    title: 'High Energy',
    description: 'Ready for big challenges',
    color: 'energy-high',
    gradient: 'from-dopamine-yellow to-dopamine-yellow-light',
  },
  {
    level: EnergyLevel.STEADY,
    icon: '🌊',
    title: 'Steady Flow',
    description: 'Consistent, focused work',
    color: 'energy-steady',
    gradient: 'from-community-teal to-community-teal-light',
  },
  {
    level: EnergyLevel.GENTLE,
    icon: '🌙',
    title: 'Gentle Pace',
    description: 'Calm, methodical approach',
    color: 'energy-gentle',
    gradient: 'from-focus-purple to-focus-purple-light',
  },
  {
    level: EnergyLevel.RECHARGE,
    icon: '🔋',
    title: 'Recharge Mode',
    description: 'Taking it easy today',
    color: 'energy-recharge',
    gradient: 'from-flock-coral to-flock-coral-light',
  },
];

const EnergySelector: React.FC<EnergySelectorProps> = ({
  selectedEnergy,
  onEnergySelect,
  className,
  disabled = false,
}) => {
  return (
    <div className={clsx('space-y-4', className)}>
      <div className="text-center mb-6">
        <h3 className="text-h2 mb-2">How's your energy today?</h3>
        <p className="text-body text-gray-600">
          Choose your energy level to match with compatible study buddies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {energyOptions.map((option) => (
          <motion.div
            key={option.level}
            className={clsx(
              'energy-option p-6 rounded-xl text-center cursor-pointer transition-all duration-200 ease-out border-2',
              option.color,
              selectedEnergy === option.level
                ? 'border-white shadow-lg scale-105'
                : 'border-transparent hover:scale-102',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => !disabled && onEnergySelect(option.level)}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={`Select ${option.title} energy level`}
            aria-pressed={selectedEnergy === option.level}
          >
            {/* Energy Icon */}
            <motion.div
              className="text-4xl mb-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {option.icon}
            </motion.div>

            {/* Energy Title */}
            <h4 className="text-h3 font-semibold mb-2">
              {option.title}
            </h4>

            {/* Energy Description */}
            <p className="text-small opacity-90">
              {option.description}
            </p>

            {/* Selection Indicator */}
            {selectedEnergy === option.level && (
              <motion.div
                className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <svg className="w-4 h-4 text-focus-purple" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Helpful Tip */}
      <motion.div
        className="mt-6 p-4 bg-gray-50 rounded-lg text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-small text-gray-600">
          💡 <strong>Tip:</strong> Your energy level helps match you with study buddies who have similar focus goals. 
          Don't worry - you can change this anytime!
        </p>
      </motion.div>
    </div>
  );
};

export default EnergySelector; 