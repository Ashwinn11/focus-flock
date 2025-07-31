import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';

interface SessionControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onEndSession: () => void;
  onToggleBreak: () => void;
  isOnBreak: boolean;
  currentPhase: 'settling' | 'focus' | 'break' | 'wrapup';
  className?: string;
}

const SessionControls: React.FC<SessionControlsProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onEndSession,
  onToggleBreak,
  isOnBreak,
  currentPhase,
  className,
}) => {
  const controlButtons = [
    {
      icon: isAudioEnabled ? '🎤' : '🔇',
      label: isAudioEnabled ? 'Mute' : 'Unmute',
      onClick: onToggleAudio,
      variant: isAudioEnabled ? 'secondary' : 'coral',
      active: isAudioEnabled,
    },
    {
      icon: isVideoEnabled ? '📹' : '📷',
      label: isVideoEnabled ? 'Stop Video' : 'Start Video',
      onClick: onToggleVideo,
      variant: isVideoEnabled ? 'secondary' : 'coral',
      active: isVideoEnabled,
    },
    {
      icon: '🖥️',
      label: 'Share Screen',
      onClick: onToggleScreenShare,
      variant: 'ghost',
      active: false,
    },
    {
      icon: isOnBreak ? '▶️' : '⏸️',
      label: isOnBreak ? 'Resume Focus' : 'Take Break',
      onClick: onToggleBreak,
      variant: isOnBreak ? 'teal' : 'secondary',
      active: isOnBreak,
      disabled: currentPhase === 'settling' || currentPhase === 'wrapup',
    },
  ];

  return (
    <div className={clsx('flex flex-wrap items-center justify-center gap-4', className)}>
      {/* Main Controls */}
      <div className="flex items-center space-x-3">
        {controlButtons.map((button) => (
          <motion.div
            key={button.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={button.variant as any}
              size="md"
              onClick={button.onClick}
              disabled={button.disabled}
              className={clsx(
                'min-w-[120px] shadow-md',
                button.active && 'ring-2 ring-focus-purple ring-offset-2'
              )}
              aria-label={button.label}
            >
              <span className="text-lg mr-2">{button.icon}</span>
              {button.label}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* End Session Button */}
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="coral"
            size="md"
            onClick={onEndSession}
            className="min-w-[120px] shadow-md"
            aria-label="End session"
          >
            <span className="text-lg mr-2">🚪</span>
            End Session
          </Button>
        </motion.div>
      </div>

      {/* Phase Indicator */}
      <div className="w-full mt-4 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-surface-container rounded-full">
          <div className={clsx(
            'w-2 h-2 rounded-full',
            currentPhase === 'focus' ? 'bg-community-teal animate-pulse' : 'bg-gray-400'
          )} />
          <span className="text-sm font-medium text-text-secondary capitalize">
            {currentPhase} Phase
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionControls;