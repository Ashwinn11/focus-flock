import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import { Session, EnergyLevel, SessionType } from '@/types';

interface MatchingAlgorithmProps {
  userEnergyLevel: EnergyLevel;
  preferredSessionType?: SessionType;
  onSessionFound: (session: Session) => void;
  onCreateNew: () => void;
  className?: string;
}

// Mock sessions for demonstration
const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Morning Deep Work',
    description: 'Quiet focus session for getting things done',
    hostId: 'host1',
    participants: [
      { userId: 'host1', joinedAt: new Date(), isHost: true, isActive: true, energyLevel: EnergyLevel.STEADY },
      { userId: 'user2', joinedAt: new Date(), isHost: false, isActive: true, energyLevel: EnergyLevel.STEADY },
    ],
    maxParticipants: 4,
    energyLevel: EnergyLevel.STEADY,
    sessionType: SessionType.BODY_DOUBLING,
    status: 'scheduled' as any,
    startTime: new Date(),
    duration: 50,
    tags: ['productivity', 'morning'],
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Creative Flow Session',
    description: 'Art, writing, and creative projects welcome',
    hostId: 'host2',
    participants: [
      { userId: 'host2', joinedAt: new Date(), isHost: true, isActive: true, energyLevel: EnergyLevel.HIGH },
    ],
    maxParticipants: 6,
    energyLevel: EnergyLevel.HIGH,
    sessionType: SessionType.CREATIVE_WORK,
    status: 'scheduled' as any,
    startTime: new Date(),
    duration: 90,
    tags: ['creative', 'art', 'writing'],
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Gentle Study Time',
    description: 'Low-pressure environment for easy tasks',
    hostId: 'host3',
    participants: [
      { userId: 'host3', joinedAt: new Date(), isHost: true, isActive: true, energyLevel: EnergyLevel.GENTLE },
      { userId: 'user4', joinedAt: new Date(), isHost: false, isActive: true, energyLevel: EnergyLevel.GENTLE },
      { userId: 'user5', joinedAt: new Date(), isHost: false, isActive: true, energyLevel: EnergyLevel.RECHARGE },
    ],
    maxParticipants: 4,
    energyLevel: EnergyLevel.GENTLE,
    sessionType: SessionType.ADMIN_TASKS,
    status: 'scheduled' as any,
    startTime: new Date(),
    duration: 25,
    tags: ['gentle', 'admin', 'organizing'],
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const getEnergyEmoji = (energy: EnergyLevel) => {
  switch (energy) {
    case EnergyLevel.HIGH: return '⚡';
    case EnergyLevel.STEADY: return '🌊';
    case EnergyLevel.GENTLE: return '🌙';
    case EnergyLevel.RECHARGE: return '🔋';
    default: return '🌊';
  }
};

const getSessionTypeEmoji = (type: SessionType) => {
  switch (type) {
    case SessionType.BODY_DOUBLING: return '🤝';
    case SessionType.STUDY_GROUP: return '📚';
    case SessionType.CREATIVE_WORK: return '🎨';
    case SessionType.ADMIN_TASKS: return '📋';
    case SessionType.READING: return '📖';
    case SessionType.WRITING: return '✍️';
    default: return '🤝';
  }
};

const MatchingAlgorithm: React.FC<MatchingAlgorithmProps> = ({
  userEnergyLevel,
  preferredSessionType,
  onSessionFound,
  onCreateNew,
  className,
}) => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchedSessions, setMatchedSessions] = useState<Session[]>([]);
  const [currentStep, setCurrentStep] = useState<'matching' | 'results'>('matching');

  useEffect(() => {
    if (isMatching) {
      // Simulate matching algorithm
      const timer = setTimeout(() => {
        const compatibleSessions = mockSessions.filter(session => {
          // Energy level compatibility
          const energyMatch = session.energyLevel === userEnergyLevel;
          
          // Session type preference
          const typeMatch = !preferredSessionType || session.sessionType === preferredSessionType;
          
          // Has space
          const hasSpace = session.participants.length < session.maxParticipants;
          
          return (energyMatch || typeMatch) && hasSpace;
        });

        setMatchedSessions(compatibleSessions);
        setCurrentStep('results');
        setIsMatching(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isMatching, userEnergyLevel, preferredSessionType]);

  const startMatching = () => {
    setIsMatching(true);
    setCurrentStep('matching');
  };

  const getCompatibilityScore = (session: Session) => {
    let score = 0;
    if (session.energyLevel === userEnergyLevel) score += 50;
    if (preferredSessionType && session.sessionType === preferredSessionType) score += 30;
    if (session.participants.length < session.maxParticipants / 2) score += 20;
    return Math.min(100, score);
  };

  return (
    <div className={clsx('max-w-4xl mx-auto', className)}>
      <AnimatePresence mode="wait">
        {currentStep === 'matching' && (
          <motion.div
            key="matching"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <Card variant="info">
              <CardContent className="py-12">
                {!isMatching ? (
                  <>
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-3xl text-white">🎯</span>
                    </motion.div>
                    
                    <h2 className="text-h1 font-bold mb-4">Find Your Focus Flock</h2>
                    <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
                      We'll match you with study buddies who share your energy level and focus goals. 
                      Ready to find your perfect focus session?
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        variant="celebration"
                        size="lg"
                        onClick={startMatching}
                      >
                        🔍 Find Sessions
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={onCreateNew}
                      >
                        Create New Session
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="text-3xl text-white">🔍</span>
                    </motion.div>
                    
                    <h2 className="text-h1 font-bold mb-4">Finding Your Perfect Match...</h2>
                    <p className="text-body text-text-secondary mb-8">
                      Analyzing energy levels, session types, and compatibility...
                    </p>
                    
                    <div className="max-w-md mx-auto">
                      <div className="flex justify-between text-small text-text-muted mb-2">
                        <span>Matching Progress</span>
                        <span>Finding sessions...</span>
                      </div>
                      <div className="w-full bg-bg-tertiary rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-focus-purple to-community-teal h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-h1 font-bold mb-4">
                {matchedSessions.length > 0 ? 'Perfect Matches Found!' : 'No Matches Right Now'}
              </h2>
              <p className="text-body text-text-secondary">
                {matchedSessions.length > 0 
                  ? `We found ${matchedSessions.length} session${matchedSessions.length > 1 ? 's' : ''} that match your ${userEnergyLevel} energy level`
                  : "Don't worry! You can create a new session and others will find you."
                }
              </p>
            </div>

            {matchedSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center space-x-2">
                              <span>{getSessionTypeEmoji(session.sessionType)}</span>
                              <span>{session.title}</span>
                            </CardTitle>
                            {session.description && (
                              <p className="text-small text-text-secondary mt-1">
                                {session.description}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-small text-text-muted">
                              <span>{getCompatibilityScore(session)}%</span>
                              <span className="text-community-teal">match</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-small text-text-secondary">
                            <span className="flex items-center space-x-1">
                              <span>{getEnergyEmoji(session.energyLevel)}</span>
                              <span className="capitalize">{session.energyLevel}</span>
                            </span>
                            <span>•</span>
                            <span>{session.duration} min</span>
                            <span>•</span>
                            <span>{session.participants.length}/{session.maxParticipants} people</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                          {session.participants.slice(0, 3).map((participant, i) => (
                            <div
                              key={participant.userId}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-white text-small font-semibold"
                            >
                              {getEnergyEmoji(participant.energyLevel)}
                            </div>
                          ))}
                          {session.participants.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary text-tiny font-semibold">
                              +{session.participants.length - 3}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="primary"
                          fullWidth
                          onClick={() => onSessionFound(session)}
                        >
                          Join Session
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="text-center">
                <CardContent className="py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-flock-coral to-flock-coral-light flex items-center justify-center">
                    <span className="text-2xl text-white">🌱</span>
                  </div>
                  <h3 className="text-h2 font-semibold mb-4">Be the First to Start!</h3>
                  <p className="text-body text-text-secondary mb-6 max-w-md mx-auto">
                    No sessions match your energy right now, but that's okay! 
                    Create your own session and watch your flock gather.
                  </p>
                  <Button
                    variant="celebration"
                    size="lg"
                    onClick={onCreateNew}
                  >
                    🚀 Create Session
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep('matching')}
              >
                ← Search Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchingAlgorithm;