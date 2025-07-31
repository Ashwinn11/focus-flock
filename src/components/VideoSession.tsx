import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import SessionControls from './SessionControls';
import ProgressRing from './ProgressRing';
import BreakTimer from './BreakTimer';
import SessionTimer from './SessionTimer';
import { Session, SessionParticipant, EnergyLevel } from '@/types';
import { useMediaStore } from '@/store';

interface VideoSessionProps {
  session: Session;
  currentUserId: string;
  onEndSession: () => void;
  onToggleBreak: () => void;
  isOnBreak: boolean;
  className?: string;
}

interface VideoStreamProps {
  stream: MediaStream | null;
  participant: SessionParticipant;
  isLocal?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

const VideoStream: React.FC<VideoStreamProps> = ({
  stream,
  participant,
  isLocal = false,
  isSpeaking = false,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

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

  return (
    <motion.div
      className={clsx(
        'relative rounded-xl overflow-hidden bg-gray-900 aspect-video',
        isSpeaking && 'ring-4 ring-dopamine-yellow shadow-glow',
        className
      )}
      initial={false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        className="w-full h-full object-cover"
      />

      {/* Participant Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold',
                `bg-gradient-to-br ${getEnergyColor(participant.energyLevel)}`
              )}
            >
              {getEnergyEmoji(participant.energyLevel)}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {isLocal ? 'You' : `User ${participant.userId.slice(-4)}`}
                {participant.isHost && (
                  <span className="ml-2 px-2 py-1 bg-focus-purple text-white text-xs rounded-full">
                    Host
                  </span>
                )}
              </p>
                              <p className="text-white/90 font-medium text-xs capitalize">
                {participant.energyLevel} energy
              </p>
            </div>
          </div>

          {/* Speaking Indicator */}
          {isSpeaking && (
            <motion.div
              className="flex items-center space-x-1"
              initial={false}
              animate={{ opacity: 1 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-4 bg-dopamine-yellow rounded-full"
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="absolute top-4 right-4">
        <div className="w-3 h-3 bg-community-teal rounded-full animate-pulse shadow-md" />
      </div>
    </motion.div>
  );
};

const VideoSession: React.FC<VideoSessionProps> = ({
  session,
  currentUserId,
  onEndSession,
  onToggleBreak,
  isOnBreak,
  className,
}) => {
  const { localStream, remoteStreams, isAudioEnabled, isVideoEnabled } = useMediaStore();
  const [timeRemaining, setTimeRemaining] = useState(session.duration * 60); // Convert to seconds
  const [currentPhase, setCurrentPhase] = useState<'settling' | 'focus' | 'break' | 'wrapup'>('settling');
  const [speakingUsers, setSpeakingUsers] = useState<Set<string>>(new Set());

  const activeParticipants = session.participants.filter(p => p.isActive);
  const progressPercentage = ((session.duration * 60 - timeRemaining) / (session.duration * 60)) * 100;

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          setCurrentPhase('wrapup');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Phase management
  useEffect(() => {
    const totalDuration = session.duration * 60;
    const elapsed = totalDuration - timeRemaining;
    
    if (elapsed < 300) { // First 5 minutes
      setCurrentPhase('settling');
    } else if (elapsed < totalDuration - 300) { // Main session
      setCurrentPhase('focus');
    } else {
      setCurrentPhase('wrapup');
    }
  }, [timeRemaining, session.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseMessage = () => {
    switch (currentPhase) {
      case 'settling':
        return 'Settling in... Take a moment to get comfortable';
      case 'focus':
        return 'Deep focus time! You\'re doing great';
      case 'break':
        return 'Break time! Stretch, hydrate, or just breathe';
      case 'wrapup':
        return 'Wrapping up... Great work everyone!';
      default:
        return 'Focus session in progress';
    }
  };

  return (
    <div className={clsx('max-w-7xl mx-auto space-y-6', className)}>
      {/* Session Header */}
      <Card variant="session" className="text-center">
        <div className="relative z-10">
          <h1 className="text-h1 font-bold mb-2">{session.title}</h1>
          <p className="text-body opacity-90 mb-4">{getPhaseMessage()}</p>
          
          <div className="flex items-center justify-center space-x-6 text-sm">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>{activeParticipants.length} participants</span>
            </span>
            <span>•</span>
            <span className="capitalize">{currentPhase} phase</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Local Stream */}
                <VideoStream
                  stream={localStream}
                  participant={activeParticipants.find(p => p.userId === currentUserId)!}
                  isLocal={true}
                  isSpeaking={speakingUsers.has(currentUserId)}
                />

                {/* Remote Streams */}
                {activeParticipants
                  .filter(p => p.userId !== currentUserId)
                  .slice(0, 3)
                  .map((participant) => (
                    <VideoStream
                      key={participant.userId}
                      stream={remoteStreams.get(participant.userId) || null}
                      participant={participant}
                      isSpeaking={speakingUsers.has(participant.userId)}
                    />
                  ))}

                {/* Empty slots for additional participants */}
                {activeParticipants.length < session.maxParticipants && (
                  <div className="aspect-video rounded-xl border-2 border-dashed border-outline flex items-center justify-center bg-surface-dim">
                    <div className="text-center">
                      <div className="text-3xl mb-2">👋</div>
                      <p className="text-small text-gray-500 font-medium">
                        Waiting for more<br />study buddies
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Session Controls */}
              <SessionControls
                isAudioEnabled={isAudioEnabled}
                isVideoEnabled={isVideoEnabled}
                onToggleAudio={() => {}}
                onToggleVideo={() => {}}
                onToggleScreenShare={() => {}}
                onEndSession={onEndSession}
                onToggleBreak={onToggleBreak}
                isOnBreak={isOnBreak}
                currentPhase={currentPhase}
              />
            </CardContent>
          </Card>
        </div>

        {/* Session Sidebar */}
        <div className="space-y-6">
          {/* Timer and Progress */}
          <Card>
            <CardContent className="text-center">
              <SessionTimer
                timeRemaining={timeRemaining}
                totalDuration={session.duration * 60}
                currentPhase={currentPhase}
              />
              
              <div className="mt-6">
                <ProgressRing
                  progress={progressPercentage}
                  size="lg"
                  variant={currentPhase === 'focus' ? 'focus' : 'gentle'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Break Timer (when on break) */}
          {isOnBreak && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <BreakTimer
                onBreakEnd={() => onToggleBreak()}
                duration={5} // 5 minute break
              />
            </motion.div>
          )}

          {/* Session Info */}
          <Card variant="session">
            <CardContent>
              <h4 className="font-bold mb-4 flex items-center space-x-2">
                <span className="text-xl">💡</span>
                <span>Focus Tips</span>
              </h4>
              <ul className="space-y-3 text-sm text-surface-variant">
                <li className="flex items-start space-x-2">
                  <span className="text-community-teal mt-0.5">•</span>
                  <span>Stay present and focused on your task</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-community-teal mt-0.5">•</span>
                  <span>Take breaks when you need them</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-community-teal mt-0.5">•</span>
                  <span>Celebrate small wins with your flock</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-community-teal mt-0.5">•</span>
                  <span>Mute when not speaking</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Participants List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-xl">👥</span>
                <span>Focus Flock ({activeParticipants.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeParticipants.map((participant) => (
                  <div
                    key={participant.userId}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-surface-dim hover:bg-surface-container transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-white font-bold">
                      {participant.userId === currentUserId ? 'You' : participant.userId.slice(-2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {participant.userId === currentUserId ? 'You' : `User ${participant.userId.slice(-4)}`}
                        {participant.isHost && (
                          <span className="ml-2 px-2 py-1 bg-focus-purple text-white text-xs rounded-full">
                            Host
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {participant.energyLevel} energy
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {speakingUsers.has(participant.userId) && (
                        <div className="w-2 h-2 bg-dopamine-yellow rounded-full animate-pulse" />
                      )}
                      <div className="w-2 h-2 bg-community-teal rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoSession;