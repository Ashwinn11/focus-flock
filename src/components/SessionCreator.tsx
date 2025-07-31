import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import EnergySelector from './EnergySelector';
import { EnergyLevel, SessionType, CreateSessionForm } from '@/types';

interface SessionCreatorProps {
  onCreateSession: (sessionData: CreateSessionForm) => void;
  isLoading?: boolean;
  className?: string;
}

const sessionTypes = [
  {
    type: SessionType.BODY_DOUBLING,
    icon: '🤝',
    title: 'Body Doubling',
    description: 'Work alongside others for gentle accountability',
    color: 'from-focus-purple to-focus-purple-light',
  },
  {
    type: SessionType.STUDY_GROUP,
    icon: '📚',
    title: 'Study Group',
    description: 'Collaborative learning with shared goals',
    color: 'from-community-teal to-community-teal-light',
  },
  {
    type: SessionType.CREATIVE_WORK,
    icon: '🎨',
    title: 'Creative Work',
    description: 'Art, writing, and creative projects',
    color: 'from-flock-coral to-flock-coral-light',
  },
  {
    type: SessionType.ADMIN_TASKS,
    icon: '📋',
    title: 'Admin Tasks',
    description: 'Emails, organizing, and life maintenance',
    color: 'from-dopamine-yellow to-dopamine-yellow-light',
  },
];

const durationOptions = [
  { value: 25, label: '25 minutes', description: 'Perfect for ADHD focus' },
  { value: 50, label: '50 minutes', description: 'Extended focus session' },
  { value: 90, label: '90 minutes', description: 'Deep work session' },
  { value: 120, label: '2 hours', description: 'Marathon focus' },
];

const SessionCreator: React.FC<SessionCreatorProps> = ({
  onCreateSession,
  isLoading = false,
  className,
}) => {
  const [formData, setFormData] = useState<Partial<CreateSessionForm>>({
    title: '',
    description: '',
    sessionType: SessionType.BODY_DOUBLING,
    energyLevel: EnergyLevel.STEADY,
    duration: 25,
    maxParticipants: 4,
    isPrivate: false,
    tags: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field: keyof CreateSessionForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (formData.title && formData.sessionType && formData.energyLevel) {
      const sessionData: CreateSessionForm = {
        title: formData.title!,
        description: formData.description,
        sessionType: formData.sessionType!,
        energyLevel: formData.energyLevel!,
        startTime: new Date(),
        duration: formData.duration || 25,
        maxParticipants: formData.maxParticipants || 4,
        isPrivate: formData.isPrivate || false,
        tags: formData.tags || [],
      };
      onCreateSession(sessionData);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return !!formData.title;
      case 2: return !!formData.sessionType;
      case 3: return !!formData.energyLevel;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className={clsx('max-w-2xl mx-auto', className)}>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h1 font-bold text-text-primary">Create Your Focus Session</h2>
          <span className="text-small text-text-muted">Step {currentStep} of {totalSteps}</span>
        </div>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={clsx(
                'flex-1 h-2 rounded-full transition-all duration-300',
                i + 1 <= currentStep ? 'bg-focus-purple' : 'bg-bg-tertiary'
              )}
            />
          ))}
        </div>
      </div>

      <Card>
        <CardContent>
          {/* Step 1: Session Title & Description */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-h2 font-semibold mb-4">What are you focusing on today?</h3>
                <p className="text-body text-text-secondary mb-6">
                  Give your session a name that motivates you. Keep it simple and positive!
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-2">
                    Session Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Morning Deep Work, Essay Writing, Admin Catch-up"
                    className="w-full px-4 py-3 border border-border-default rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-small font-medium text-text-secondary mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Share what you'll be working on or any specific goals..."
                    rows={3}
                    className="w-full px-4 py-3 border border-border-default rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent resize-none"
                    maxLength={500}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Session Type */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-h2 font-semibold mb-4">What type of session works best?</h3>
                <p className="text-body text-text-secondary mb-6">
                  Choose the style that matches your work and energy today.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessionTypes.map((type) => (
                  <motion.div
                    key={type.type}
                    className={clsx(
                      'p-4 rounded-xl cursor-pointer transition-all duration-200 border-2',
                      formData.sessionType === type.type
                        ? 'border-focus-purple bg-focus-purple/5 scale-105'
                        : 'border-border-subtle hover:border-border-default hover:scale-102'
                    )}
                    onClick={() => handleInputChange('sessionType', type.type)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h4 className="text-h3 font-semibold mb-1">{type.title}</h4>
                      <p className="text-small text-text-secondary">{type.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Energy Level */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <EnergySelector
                selectedEnergy={formData.energyLevel || null}
                onEnergySelect={(energy) => handleInputChange('energyLevel', energy)}
              />
            </motion.div>
          )}

          {/* Step 4: Session Settings */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-h2 font-semibold mb-4">Final touches</h3>
                <p className="text-body text-text-secondary mb-6">
                  Set your session length and who can join your focus session.
                </p>
              </div>

              <div className="space-y-6">
                {/* Duration */}
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-3">
                    Session Duration
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {durationOptions.map((option) => (
                      <motion.div
                        key={option.value}
                        className={clsx(
                          'p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 text-center',
                          formData.duration === option.value
                            ? 'border-focus-purple bg-focus-purple/5'
                            : 'border-border-subtle hover:border-border-default'
                        )}
                        onClick={() => handleInputChange('duration', option.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-tiny text-text-muted mt-1">{option.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Max Participants */}
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-3">
                    Maximum Participants
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={formData.maxParticipants || 4}
                      onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-h3 font-semibold text-focus-purple min-w-[2rem]">
                      {formData.maxParticipants || 4}
                    </span>
                  </div>
                  <p className="text-tiny text-text-muted mt-1">
                    Smaller groups create better connections and accountability
                  </p>
                </div>

                {/* Privacy Toggle */}
                <div className="flex items-center justify-between p-4 bg-surface-dim rounded-lg">
                  <div>
                    <h4 className="font-semibold">Private Session</h4>
                    <p className="text-small text-text-secondary">Only people with the link can join</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPrivate || false}
                      onChange={(e) => handleInputChange('isPrivate', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-focus-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-bg-secondary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-focus-purple"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border-subtle">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              ← Back
            </Button>

            <div className="flex space-x-3">
              {currentStep < totalSteps ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                >
                  Continue →
                </Button>
              ) : (
                <Button
                  variant="celebration"
                  onClick={handleSubmit}
                  loading={isLoading}
                  disabled={!isStepValid(currentStep)}
                >
                  ✨ Create Session
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionCreator;