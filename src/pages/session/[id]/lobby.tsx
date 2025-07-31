import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SessionLobby from '@/components/SessionLobby';
import { Session, EnergyLevel } from '@/types';
import { useSessionStore } from '@/store';
import toast from 'react-hot-toast';

const SessionLobbyPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { availableSessions, setActiveSession } = useSessionStore();
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserId = 'current-user-id'; // This would come from auth

  useEffect(() => {
    if (id) {
      // In a real app, this would fetch from API
      const foundSession = availableSessions.find(s => s.id === id) || {
        id: id as string,
        title: 'Morning Deep Work Session',
        description: 'Focused work session for getting things done',
        hostId: 'host1',
        participants: [
          { 
            userId: 'host1', 
            joinedAt: new Date(), 
            isHost: true, 
            isActive: true, 
            energyLevel: EnergyLevel.STEADY 
          },
          { 
            userId: currentUserId, 
            joinedAt: new Date(), 
            isHost: false, 
            isActive: true, 
            energyLevel: EnergyLevel.STEADY 
          },
        ],
        maxParticipants: 4,
        energyLevel: EnergyLevel.STEADY,
        sessionType: 'body_doubling' as any,
        status: 'scheduled' as any,
        startTime: new Date(),
        duration: 50,
        tags: ['productivity', 'morning'],
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setSession(foundSession);
      setIsLoading(false);
    }
  }, [id, availableSessions]);

  const handleStartSession = () => {
    if (session) {
      setActiveSession(session);
      toast.success('🚀 Session starting!');
      router.push(`/session/${session.id}/active`);
    }
  };

  const handleLeaveSession = () => {
    toast.success('Left session');
    router.push('/');
  };

  const handleToggleReady = () => {
    setIsReady(!isReady);
    toast.success(isReady ? 'Marked as not ready' : '✓ Ready to focus!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-2xl text-white"
            >
              🔄
            </motion.div>
          </div>
          <h2 className="text-h2 font-semibold text-text-primary">Loading session...</h2>
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-h1 font-bold text-text-primary mb-4">Session Not Found</h2>
          <p className="text-body text-text-secondary mb-6">
            The session you're looking for doesn't exist or has ended.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-focus-purple text-white rounded-lg hover:bg-focus-purple-dark transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isHost = session.participants.some(p => p.userId === currentUserId && p.isHost);

  return (
    <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SessionLobby
            session={session}
            currentUserId={currentUserId}
            onStartSession={handleStartSession}
            onLeaveSession={handleLeaveSession}
            onToggleReady={handleToggleReady}
            isHost={isHost}
            isReady={isReady}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SessionLobbyPage;