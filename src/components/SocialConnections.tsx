import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import { User, EnergyLevel } from '@/types';

interface SocialConnectionsProps {
  onSendFriendRequest: (userId: string) => void;
  onAcceptFriendRequest: (userId: string) => void;
  onDeclineFriendRequest: (userId: string) => void;
  onRemoveFriend: (userId: string) => void;
  className?: string;
}

interface FriendRequest {
  id: string;
  fromUser: User;
  toUserId: string;
  message?: string;
  createdAt: Date;
}

interface ActivityFeedItem {
  id: string;
  type: 'session_complete' | 'achievement' | 'streak' | 'group_join';
  user: User;
  content: string;
  metadata?: any;
  createdAt: Date;
}

const mockFriends: User[] = [
  {
    id: 'friend1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: '🦊',
    energyLevel: EnergyLevel.STEADY,
    isOnline: true,
    lastSeen: new Date(),
    preferences: {
      theme: 'default',
      notifications: true,
      soundEnabled: true,
      reducedMotion: false,
      highContrast: false,
      sessionLength: 50,
      energyLevel: EnergyLevel.STEADY,
    },
    stats: {
      totalSessions: 45,
      totalFocusTime: 2250,
      currentStreak: 7,
      longestStreak: 14,
      achievements: [],
      sessionHistory: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'friend2',
    name: 'Sam Rivera',
    email: 'sam@example.com',
    avatar: '🦋',
    energyLevel: EnergyLevel.HIGH,
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    preferences: {
      theme: 'default',
      notifications: true,
      soundEnabled: true,
      reducedMotion: false,
      highContrast: false,
      sessionLength: 25,
      energyLevel: EnergyLevel.HIGH,
    },
    stats: {
      totalSessions: 32,
      totalFocusTime: 1600,
      currentStreak: 3,
      longestStreak: 9,
      achievements: [],
      sessionHistory: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockFriendRequests: FriendRequest[] = [
  {
    id: 'req1',
    fromUser: {
      id: 'user4',
      name: 'Jordan Kim',
      email: 'jordan@example.com',
      avatar: '🦁',
      energyLevel: EnergyLevel.GENTLE,
      isOnline: true,
      lastSeen: new Date(),
      preferences: {
        theme: 'default',
        notifications: true,
        soundEnabled: true,
        reducedMotion: false,
        highContrast: false,
        sessionLength: 90,
        energyLevel: EnergyLevel.GENTLE,
      },
      stats: {
        totalSessions: 67,
        totalFocusTime: 4020,
        currentStreak: 12,
        longestStreak: 21,
        achievements: [],
        sessionHistory: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    toUserId: 'current-user',
    message: 'Hey! I noticed we have similar study patterns. Want to be study buddies?',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
];

const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: 'activity1',
    type: 'session_complete',
    user: mockFriends[0],
    content: 'completed a 2-hour deep work session',
    metadata: { duration: 120, participants: 3 },
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'activity2',
    type: 'achievement',
    user: mockFriends[1],
    content: 'unlocked the "Week Warrior" achievement',
    metadata: { achievement: 'Week Warrior', streak: 7 },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'activity3',
    type: 'streak',
    user: mockFriends[0],
    content: 'reached a 10-day focus streak',
    metadata: { streak: 10 },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
];

const getActivityEmoji = (type: ActivityFeedItem['type']) => {
  switch (type) {
    case 'session_complete': return '🎯';
    case 'achievement': return '🏆';
    case 'streak': return '🔥';
    case 'group_join': return '👥';
    default: return '✨';
  }
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
  return `${Math.floor(diffMinutes / 1440)}d ago`;
};

const SocialConnections: React.FC<SocialConnectionsProps> = ({
  onSendFriendRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onRemoveFriend,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'activity'>('friends');

  const tabs = [
    { id: 'friends', label: 'Friends', icon: '👥', count: mockFriends.length },
    { id: 'requests', label: 'Requests', icon: '📨', count: mockFriendRequests.length },
    { id: 'activity', label: 'Activity', icon: '📈', count: mockActivityFeed.length },
  ];

  return (
    <div className={clsx('max-w-4xl mx-auto space-y-6', className)}>
      {/* Header with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🤝</span>
            <span>Social Connections</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-1 bg-surface-container rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  'flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 font-medium',
                  activeTab === tab.id
                    ? 'bg-white text-focus-purple shadow-sm'
                    : 'text-surface-variant hover:text-gray-900'
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={clsx(
                    'px-2 py-1 rounded-full text-tiny font-bold',
                    activeTab === tab.id ? 'bg-focus-purple text-white' : 'bg-surface-container-high text-surface-variant'
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'friends' && (
          <motion.div
            key="friends"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {mockFriends.length > 0 ? (
              mockFriends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card interactive>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-xl text-white font-bold">
                              {friend.avatar || friend.name.charAt(0)}
                            </div>
                            {friend.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-community-teal border-2 border-white rounded-full animate-pulse" />
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-semibold">{friend.name}</h4>
                            <p className="text-small text-surface-variant">
                              {friend.isOnline ? 'Online now' : `Last seen ${getTimeAgo(friend.lastSeen)}`}
                            </p>
                            <div className="flex items-center space-x-3 text-tiny text-gray-500 mt-1">
                              <span>{friend.stats.totalSessions} sessions</span>
                              <span>•</span>
                              <span>{friend.stats.currentStreak} day streak</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="teal"
                            size="sm"
                            onClick={() => console.log('Start session with', friend.id)}
                          >
                            📹 Session
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveFriend(friend.id)}
                          >
                            ⋯
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="text-center">
                <CardContent className="py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center">
                    <span className="text-2xl text-white">👥</span>
                  </div>
                  <h3 className="text-h2 font-semibold mb-2">No Friends Yet</h3>
                  <p className="text-body text-surface-variant mb-6">
                    Connect with study buddies to build your focus community!
                  </p>
                  <Button variant="celebration">
                    🔍 Find Study Buddies
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {activeTab === 'requests' && (
          <motion.div
            key="requests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {mockFriendRequests.length > 0 ? (
              mockFriendRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-flock-coral to-flock-coral-light flex items-center justify-center text-xl text-white font-bold">
                          {request.fromUser.avatar || request.fromUser.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{request.fromUser.name}</h4>
                            <span className="text-tiny text-gray-500">•</span>
                            <span className="text-tiny text-gray-500">{getTimeAgo(request.createdAt)}</span>
                          </div>
                          
                          {request.message && (
                            <p className="text-body text-text-secondary mb-3">
                              "{request.message}"
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-3 text-tiny text-gray-500">
                            <span>{request.fromUser.stats.totalSessions} sessions</span>
                            <span>•</span>
                            <span>{request.fromUser.stats.currentStreak} day streak</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="teal"
                            size="sm"
                            onClick={() => onAcceptFriendRequest(request.fromUser.id)}
                          >
                            ✓ Accept
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeclineFriendRequest(request.fromUser.id)}
                          >
                            ✕ Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="text-center">
                <CardContent className="py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-flock-coral to-flock-coral-light flex items-center justify-center">
                    <span className="text-2xl text-white">📨</span>
                  </div>
                  <h3 className="text-h2 font-semibold mb-2">No Friend Requests</h3>
                  <p className="text-body text-surface-variant">
                    When someone sends you a friend request, it will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {mockActivityFeed.length > 0 ? (
              mockActivityFeed.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-xl text-white font-bold">
                          {activity.user.avatar || activity.user.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">{getActivityEmoji(activity.type)}</span>
                            <h4 className="font-semibold">{activity.user.name}</h4>
                            <span className="text-body text-text-secondary">{activity.content}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-tiny text-gray-500">
                            <span>{getTimeAgo(activity.createdAt)}</span>
                            {activity.metadata && (
                              <>
                                <span>•</span>
                                <span>
                                  {activity.type === 'session_complete' && 
                                    `${activity.metadata.duration} min with ${activity.metadata.participants} people`
                                  }
                                  {activity.type === 'streak' && 
                                    `${activity.metadata.streak} days in a row`
                                  }
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="text-lg hover:scale-110 transition-transform">
                            🤍
                          </button>
                          <button className="text-lg hover:scale-110 transition-transform">
                            💬
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="text-center">
                <CardContent className="py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-dopamine-yellow to-flock-coral flex items-center justify-center">
                    <span className="text-2xl text-white">📈</span>
                  </div>
                  <h3 className="text-h2 font-semibold mb-2">No Activity Yet</h3>
                  <p className="text-body text-surface-variant">
                    Connect with friends to see their productivity updates and achievements!
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialConnections;