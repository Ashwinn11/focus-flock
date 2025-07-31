import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';
import VideoSession from '@/components/VideoSession';
import { Session, EnergyLevel } from '@/types';
import { useSessionStore, useMediaStore } from '@/store';
import { getWebRTCManager, destroyWebRTCManager } from '@/services/webrtc';
import toast from 'react-hot-toast';

const ActiveSessionPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { activeSession, setActiveSession } = useSessionStore();
  const { setLocalStream, addRemoteStream, removeRemoteStream } = useMediaStore();
  const [session, setSession] = useState<Session | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserId = 'current-user-id'; // This would come from auth

  useEffect(() => {
    if (id) {
      // In a real app, this would fetch from API or use activeSession
      const mockSession: Session = {
        id: id as string,
        title: 'Deep Work Session',
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
          { 
            userId: 'user3', 
            joinedAt: new Date(), 
            isHost: false, 
            isActive: true, 
            energyLevel: EnergyLevel.HIGH 
          },
        ],
        maxParticipants: 4,
        energyLevel: EnergyLevel.STEADY,
        sessionType: 'body_doubling' as any,
        status: 'active' as any,
        startTime: new Date(),
        duration: 50,
        tags: ['productivity', 'deep-work'],
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setSession(mockSession);
      initializeWebRTC(mockSession);
    }

    return () => {
      // Cleanup WebRTC when component unmounts
      destroyWebRTCManager();
    };
  }, [id]);

  const initializeWebRTC = async (session: Session) => {
    try {
      const webRTC = getWebRTCManager(currentUserId);
      
      // Set up event handlers
      webRTC.onStreamReceived = (peerId: string, stream: MediaStream) => {
        addRemoteStream(peerId, stream);
      };
      
      webRTC.onPeerDisconnected = (peerId: string) => {
        removeRemoteStream(peerId);
      };

      // Initialize session
      await webRTC.initializeSession(session.id);
      
      // Set local stream
      const localStream = webRTC.getLocalStream();
      if (localStream) {
        setLocalStream(localStream);
      }

      setIsLoading(false);
      toast.success('🎉 Session started! Welcome to your focus flock');
      
    } catch (error) {
      console.error('Failed to initialize WebRTC:', error);
      toast.error('Failed to start video session. You can still participate in chat.');
      setIsLoading(false);
    }
  };

  const handleEndSession = () => {
    destroyWebRTCManager();
    setActiveSession(null);
    toast.success('Session ended. Great work!');
    router.push('/session/complete');
  };

  const handleToggleBreak = () => {
    setIsOnBreak(!isOnBreak);
    toast.success(isOnBreak ? 'Back to focus mode!' : 'Break time! Take care of yourself');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-3xl text-white"
            >
              🎥
            </motion.div>
          </div>
          <h2 className="text-h2 font-bold text-gray-900 mb-2">Starting Session...</h2>
          <p className="text-body text-gray-600">
            Setting up video and connecting to your flock
          </p>
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-h1 font-bold text-gray-900 mb-4">Session Not Found</h2>
          <p className="text-body text-gray-600 mb-6">
            The session you're looking for doesn't exist or has ended.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-focus-purple text-white rounded-xl hover:bg-focus-purple-dark transition-colors font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{session.title} - Focus Flock</title>
        <meta name="description" content="Active focus session with your study flock" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VideoSession
              session={session}
              currentUserId={currentUserId}
              onEndSession={handleEndSession}
              onToggleBreak={handleToggleBreak}
              isOnBreak={isOnBreak}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ActiveSessionPage;