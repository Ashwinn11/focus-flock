import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SessionCreator from '@/components/SessionCreator';
import { CreateSessionForm } from '@/types';
import { useSessionStore } from '@/store';
import toast from 'react-hot-toast';

const CreateSessionPage: React.FC = () => {
  const router = useRouter();
  const { addSession } = useSessionStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSession = async (sessionData: CreateSessionForm) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create session object
      const newSession = {
        id: Date.now().toString(),
        ...sessionData,
        hostId: 'current-user-id', // This would come from auth
        participants: [{
          userId: 'current-user-id',
          joinedAt: new Date(),
          isHost: true,
          isActive: true,
          energyLevel: sessionData.energyLevel,
        }],
        status: 'scheduled' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to store
      addSession(newSession);
      
      // Show success message
      toast.success('🎉 Session created! Redirecting to lobby...');
      
      // Redirect to session lobby
      setTimeout(() => {
        router.push(`/session/${newSession.id}/lobby`);
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to create session. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-display font-bold text-gray-900 mb-4">
            Create Your Focus Session
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Set up a body doubling session that matches your energy and goals. 
            Your flock will find you!
          </p>
        </motion.div>

        {/* Session Creator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SessionCreator
            onCreateSession={handleCreateSession}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-h2 font-semibold mb-6 text-center">
              💡 Tips for Great Sessions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-semibold mb-1">Be Specific</h4>
                    <p className="text-small text-gray-600">
                      Clear session titles help attract the right study buddies
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h4 className="font-semibold mb-1">Match Your Energy</h4>
                    <p className="text-small text-gray-600">
                      Choose the energy level that feels right for you today
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h4 className="font-semibold mb-1">Keep It Small</h4>
                    <p className="text-small text-gray-600">
                      Smaller groups create better connections and accountability
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💚</div>
                  <div>
                    <h4 className="font-semibold mb-1">Stay Supportive</h4>
                    <p className="text-small text-gray-600">
                      Create a shame-free environment where everyone can thrive
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateSessionPage;