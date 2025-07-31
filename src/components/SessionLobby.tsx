import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import { Session, SessionParticipant, EnergyLevel } from '@/types';

interface SessionLobbyProps {
  session: Session;
  currentUserId: string;
  onStartSession: () => void;
  onLeaveSession: () => void;
  onToggleReady: () => void;
  isHost: boolean;
  isReady: boolean;
  className?: string;
}

const getEnergyEmoji = (energy: EnergyLevel) => {
  switch (energy) {
    case EnergyLevel.HIGH: return '⚡';
    case EnergyLevel.STEADY: return '🌊';
    case EnergyLevel.GENTLE: return '🌙';
    case EnergyLevel.RECHARGE: return '🔋';
    default: return '🌊';
  }
};

const getEnergyColor = (energy: EnergyLevel) => {
  switch (energy) {
    case EnergyLevel.HIGH: return 'from-dopamine-yellow to-dopamine-yellow-light';
    case EnergyLevel.STEADY: return 'from-community-teal to-community-teal-light';
    case EnergyLevel.GENTLE: return 'from-focus-purple to-focus-purple-light';
    case EnergyLevel.RECHARGE: return 'from-flock-coral to-flock-coral-light';
    default: return 'from-community-teal to-community-teal-light';
  }
};

const SessionLobby: React.FC<SessionLobbyProps> = ({
  session,
  currentUserId,
  onStartSession,
  onLeaveSession,
  onToggleReady,
  isHost,
  isReady,
  className,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const activeParticipants = session.participants.filter(p => p.isActive);
  const readyCount = activeParticipants.filter(p => p.userId === currentUserId ? isReady : true).length;
  const allReady = readyCount === activeParticipants.length && activeParticipants.length >= 2;

  // Breathing exercise animation
  useEffect(() => {
    const breathingCycle = setInterval(() => {
      setBreathingPhase(prev => {
        switch (prev) {
          case 'inhale': return 'hold';
          case 'hold': return 'exhale';
          case 'exhale': return 'inhale';
          default: return 'inhale';
        }
      });
    }, 4000); // 4 second cycles

    return () => clearInterval(breathingCycle);
  }, []);

  const handleStartCountdown = () => {
    setCountdown(5);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          onStartSession();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe out...';
      default: return 'Breathe in...';
    }
  };

  return (
    <div className={clsx('max-w-4xl mx-auto space-y-6', className)}>
      {/* Session Header */}
      <Card variant="session">
        <div className="text-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              scale: breathingPhase === 'inhale' ? 1.1 : breathingPhase === 'hold' ? 1.1 : 1,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full" />
          </motion.div>
          
          <div className="relative z-10">
            <h1 className="text-h1 font-bold mb-2">{session.title}</h1>
            {session.description && (
              <p className="text-body opacity-90 mb-4">{session.description}</p>
            )}
            
            <div className="flex items-center justify-center space-x-4 text-small">
              <span className="flex items-center space-x-1">
                <span>{getEnergyEmoji(session.energyLevel)}</span>
                <span className="capitalize">{session.energyLevel} Energy</span>
              </span>
              <span>•</span>
              <span>{session.duration} minutes</span>
              <span>•</span>
              <span>{activeParticipants.length}/{session.maxParticipants} participants</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Participants */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Focus Flock ({activeParticipants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {activeParticipants.map((participant, index) => (
                    <motion.div
                      key={participant.userId}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.1 }}
                      className={clsx(
                        'p-4 rounded-xl border-2 transition-all duration-200',
                        participant.userId === currentUserId && isReady
                          ? 'border-community-teal bg-community-teal/5'
                          : participant.userId !== currentUserId
                          ? 'border-community-teal bg-community-teal/5'
                          : 'border-gray-200 bg-gray-50'
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={clsx(
                          'w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold',
                          `bg-gradient-to-br ${getEnergyColor(participant.energyLevel)} text-white`
                        )}>
                          {getEnergyEmoji(participant.energyLevel)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">
                              {participant.userId === currentUserId ? 'You' : `User ${participant.userId.slice(-4)}`}
                            </h4>
                            {participant.isHost && (
                              <span className="px-2 py-1 bg-focus-purple text-white text-tiny rounded-full">
                                Host
                              </span>
                            )}
                          </div>
                          <p className="text-small text-gray-600 capitalize">
                            {participant.energyLevel} energy
                          </p>
                        </div>
                        <div className="text-right">
                          {(participant.userId === currentUserId && isReady) || 
                           (participant.userId !== currentUserId) ? (
                            <div className="w-3 h-3 bg-community-teal rounded-full animate-pulse" />
                          ) : (
                            <div className="w-3 h-3 bg-gray-300 rounded-full" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Ready Status */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Ready to Focus?</h4>
                    <p className="text-small text-gray-600">
                      {readyCount} of {activeParticipants.length} participants ready
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-community-teal rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(readyCount / activeParticipants.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-small font-semibold">
                      {Math.round((readyCount / activeParticipants.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pre-Session Preparation */}
        <div className="space-y-6">
          {/* Breathing Exercise */}
          <Card>
            <CardHeader>
              <CardTitle>Settling In</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <motion.div
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center"
                animate={{
                  scale: breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'hold' ? 1.2 : 1,
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              >
                <span className="text-2xl text-white">🫁</span>
              </motion.div>
              
              <h4 className="font-semibold mb-2">{getBreathingInstruction()}</h4>
              <p className="text-small text-gray-600">
                Take a moment to center yourself before we begin
              </p>
            </CardContent>
          </Card>

          {/* Session Controls */}
          <Card>
            <CardContent className="space-y-4">
              {countdown !== null ? (
                <motion.div
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <div className="text-6xl font-bold text-focus-purple mb-2">
                    {countdown}
                  </div>
                  <p className="text-body">Starting session...</p>
                </motion.div>
              ) : (
                <>
                  <Button
                    variant={isReady ? "teal" : "primary"}
                    fullWidth
                    onClick={onToggleReady}
                  >
                    {isReady ? "✓ Ready to Focus" : "Mark as Ready"}
                  </Button>

                  {isHost && allReady && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Button
                        variant="celebration"
                        fullWidth
                        onClick={handleStartCountdown}
                      >
                        🚀 Start Session
                      </Button>
                    </motion.div>
                  )}

                  {isHost && !allReady && (
                    <p className="text-small text-gray-600 text-center">
                      Waiting for all participants to be ready...
                    </p>
                  )}

                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={onLeaveSession}
                  >
                    Leave Session
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Session Tips */}
          <Card className="bg-gradient-to-br from-focus-purple/5 to-community-teal/5">
            <CardContent>
              <h4 className="font-semibold mb-3">💡 Focus Tips</h4>
              <ul className="space-y-2 text-small text-gray-600">
                <li>• Keep your camera on for better accountability</li>
                <li>• Mute yourself unless you need to communicate</li>
                <li>• Take breaks when you need them - no judgment!</li>
                <li>• Celebrate small wins with your flock</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SessionLobby;