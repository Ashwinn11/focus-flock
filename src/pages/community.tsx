import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { clsx } from 'clsx';
import Button from '@/components/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/Card';
import { StudyBuddyFinder } from '@/components/StudyBuddy';
import GroupSystem from '@/components/GroupSystem';
import ForumSystem from '@/components/ForumSystem';
import SocialConnections from '@/components/SocialConnections';
import { User, StudyGroup } from '@/types';
import toast from 'react-hot-toast';

const CommunityPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'buddies' | 'groups' | 'forum' | 'connections'>('overview');

  const handleBuddyFound = (buddy: User) => {
    toast.success(`Connected with ${buddy.name}! 🎉`);
  };

  const handleCreateGroup = (groupData: Partial<StudyGroup>) => {
    toast.success(`Created group "${groupData.name}"! 🎉`);
  };

  const handleJoinGroup = (groupId: string) => {
    toast.success('Joined study group! 👥');
  };

  const handleCreatePost = (postData: any) => {
    toast.success('Post published! 📝');
  };

  const handleLikePost = (postId: string) => {
    toast.success('Post liked! ❤️');
  };

  const handleReplyToPost = (postId: string, content: string) => {
    toast.success('Reply posted! 💬');
  };

  const handleSendFriendRequest = (userId: string) => {
    toast.success('Friend request sent! 📨');
  };

  const handleAcceptFriendRequest = (userId: string) => {
    toast.success('Friend request accepted! 🤝');
  };

  const handleDeclineFriendRequest = (userId: string) => {
    toast.success('Friend request declined');
  };

  const handleRemoveFriend = (userId: string) => {
    toast.success('Friend removed');
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'buddies', label: 'Study Buddies', icon: '🤝' },
    { id: 'groups', label: 'Study Groups', icon: '👥' },
    { id: 'forum', label: 'Forum', icon: '💬' },
    { id: 'connections', label: 'Social', icon: '🌐' },
  ];

  const communityStats = [
    { label: 'Active Members', value: '12,847', icon: '👥', color: 'text-community-teal' },
    { label: 'Study Sessions Today', value: '1,234', icon: '🎯', color: 'text-focus-purple' },
    { label: 'Study Groups', value: '456', icon: '📚', color: 'text-flock-coral' },
    { label: 'Success Stories', value: '89', icon: '🎉', color: 'text-dopamine-yellow' },
  ];

  return (
    <>
      <Head>
        <title>Community - Focus Flock</title>
        <meta name="description" content="Connect with your focus flock and build lasting study relationships" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-muted-blue to-soft-sage flex items-center justify-center shadow-xl">
              <span className="text-4xl text-white">🤝</span>
            </div>
            <h1 className="text-display font-bold text-gray-900 mb-4">
              Your Focus Community
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto font-medium">
              Connect with study buddies, join groups, and build lasting relationships 
              with people who understand your productivity journey
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="mb-8"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-bg-secondary border border-border-subtle">
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? 'primary' : 'ghost'}
                      onClick={() => setActiveSection(section.id as any)}
                      className="flex items-center space-x-2"
                    >
                      <span>{section.icon}</span>
                      <span>{section.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {activeSection === 'overview' && (
              <div className="space-y-8">
                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {communityStats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          className="text-center"
                          initial={false}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={clsx('text-3xl font-bold mb-1', stat.color)}>
                            {stat.value}
                          </div>
                          <div className="text-small text-gray-600 font-medium">
                            {stat.icon} {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="text-center" interactive onClick={() => setActiveSection('buddies')}>
                    <CardContent className="py-8">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="font-bold mb-2">Find Study Buddies</h3>
                      <p className="text-small text-gray-600">
                        Connect with 1-on-1 accountability partners
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center" interactive onClick={() => setActiveSection('groups')}>
                    <CardContent className="py-8">
                      <div className="text-4xl mb-4">👥</div>
                      <h3 className="font-bold mb-2">Join Study Groups</h3>
                      <p className="text-small text-gray-600">
                        Collaborate with like-minded learners
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center" interactive onClick={() => setActiveSection('forum')}>
                    <CardContent className="py-8">
                      <div className="text-4xl mb-4">💬</div>
                      <h3 className="font-bold mb-2">Community Forum</h3>
                      <p className="text-small text-gray-600">
                        Share tips and support each other
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center" interactive onClick={() => setActiveSection('connections')}>
                    <CardContent className="py-8">
                      <div className="text-4xl mb-4">🌐</div>
                      <h3 className="font-bold mb-2">Social Feed</h3>
                      <p className="text-small text-gray-600">
                        See your friends' achievements
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === 'buddies' && (
              <StudyBuddyFinder onBuddyFound={handleBuddyFound} />
            )}

            {activeSection === 'groups' && (
              <GroupSystem
                onCreateGroup={handleCreateGroup}
                onJoinGroup={handleJoinGroup}
              />
            )}

            {activeSection === 'forum' && (
              <ForumSystem
                onCreatePost={handleCreatePost}
                onLikePost={handleLikePost}
                onReplyToPost={handleReplyToPost}
              />
            )}

            {activeSection === 'connections' && (
              <SocialConnections
                onSendFriendRequest={handleSendFriendRequest}
                onAcceptFriendRequest={handleAcceptFriendRequest}
                onDeclineFriendRequest={handleDeclineFriendRequest}
                onRemoveFriend={handleRemoveFriend}
              />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CommunityPage;