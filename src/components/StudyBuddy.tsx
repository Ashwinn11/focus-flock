import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import { User, EnergyLevel, SessionType } from '@/types';

interface StudyBuddyProps {
  buddy: User;
  onSendMessage: (buddyId: string, message: string) => void;
  onScheduleSession: (buddyId: string) => void;
  onRemoveBuddy: (buddyId: string) => void;
  className?: string;
}

interface StudyBuddyFinderProps {
  onBuddyFound: (buddy: User) => void;
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

const getCompatibilityScore = (user1: User, user2: User): number => {
  let score = 0;
  
  // Energy level compatibility
  if (user1.energyLevel === user2.energyLevel) score += 40;
  else if (Math.abs(Object.values(EnergyLevel).indexOf(user1.energyLevel!) - Object.values(EnergyLevel).indexOf(user2.energyLevel!)) <= 1) score += 20;
  
  // Activity patterns (mock calculation)
  score += Math.floor(Math.random() * 30) + 20;
  
  // Online status
  if (user2.isOnline) score += 10;
  
  return Math.min(100, score);
};

const StudyBuddy: React.FC<StudyBuddyProps> = ({
  buddy,
  onSendMessage,
  onScheduleSession,
  onRemoveBuddy,
  className,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(buddy.id, message);
      setMessage('');
    }
  };

  const getLastSeenText = () => {
    if (buddy.isOnline) return 'Online now';
    
    const now = new Date();
    const lastSeen = new Date(buddy.lastSeen);
    const diffMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <Card className={clsx('transition-all duration-200', className)} interactive>
      <CardContent>
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-2xl text-white font-bold shadow-md">
              {buddy.avatar || buddy.name.charAt(0).toUpperCase()}
            </div>
            {buddy.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-community-teal border-2 border-white rounded-full animate-pulse" />
            )}
          </div>

          {/* Buddy Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-bold text-gray-900">{buddy.name}</h4>
              {buddy.energyLevel && (
                <span className="text-lg">{getEnergyEmoji(buddy.energyLevel)}</span>
              )}
            </div>
            
            <p className="text-small text-gray-600 mb-2">
              {getLastSeenText()}
            </p>

            <div className="flex items-center space-x-4 text-tiny text-gray-500">
              <span>{buddy.stats.totalSessions} sessions</span>
              <span>•</span>
              <span>{buddy.stats.currentStreak} day streak</span>
              <span>•</span>
              <span>{Math.floor(buddy.stats.totalFocusTime / 60)}h focused</span>
            </div>
          </div>

          {/* Actions Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
          >
            {showActions ? '✕' : '⋯'}
          </Button>
        </div>

        {/* Expanded Actions */}
        {showActions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200 space-y-4"
          >
            {/* Quick Message */}
            <div className="space-y-2">
              <label className="block text-small font-medium text-gray-700">
                Send a quick message
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey! Want to study together?"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  Send
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="teal"
                size="sm"
                onClick={() => onScheduleSession(buddy.id)}
                className="flex-1"
              >
                📅 Schedule Session
              </Button>
              <Button
                variant="coral"
                size="sm"
                onClick={() => onRemoveBuddy(buddy.id)}
              >
                Remove
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export const StudyBuddyFinder: React.FC<StudyBuddyFinderProps> = ({
  onBuddyFound,
  className,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [filters, setFilters] = useState({
    energyLevel: null as EnergyLevel | null,
    sessionType: null as SessionType | null,
    onlineOnly: false,
  });

  // Mock users for demonstration
  const mockUsers: User[] = [
    {
      id: 'user1',
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
      id: 'user2',
      name: 'Sam Rivera',
      email: 'sam@example.com',
      avatar: '🦋',
      energyLevel: EnergyLevel.HIGH,
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
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
    {
      id: 'user3',
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
  ];

  const currentUser: User = {
    id: 'current-user',
    name: 'You',
    email: 'you@example.com',
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
      totalSessions: 23,
      totalFocusTime: 1150,
      currentStreak: 5,
      longestStreak: 8,
      achievements: [],
      sessionHistory: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate search with filtering
    setTimeout(() => {
      let results = mockUsers.filter(user => {
        if (filters.onlineOnly && !user.isOnline) return false;
        if (filters.energyLevel && user.energyLevel !== filters.energyLevel) return false;
        return true;
      });

      // Sort by compatibility score
      results = results
        .map(user => ({ user, score: getCompatibilityScore(currentUser, user) }))
        .sort((a, b) => b.score - a.score)
        .map(item => item.user);

      setSearchResults(results);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className={clsx('max-w-4xl mx-auto space-y-6', className)}>
      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🔍</span>
            <span>Find Your Study Buddy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body text-gray-600 mb-6">
            Connect with study partners who match your energy and goals for 1-on-1 accountability.
          </p>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-small font-medium text-gray-700 mb-2">
                Energy Level
              </label>
              <select
                value={filters.energyLevel || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  energyLevel: e.target.value as EnergyLevel || null 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent"
              >
                <option value="">Any energy level</option>
                <option value={EnergyLevel.HIGH}>⚡ High Energy</option>
                <option value={EnergyLevel.STEADY}>🌊 Steady Flow</option>
                <option value={EnergyLevel.GENTLE}>🌙 Gentle Pace</option>
                <option value={EnergyLevel.RECHARGE}>🔋 Recharge Mode</option>
              </select>
            </div>

            <div>
              <label className="block text-small font-medium text-gray-700 mb-2">
                Session Type
              </label>
              <select
                value={filters.sessionType || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  sessionType: e.target.value as SessionType || null 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent"
              >
                <option value="">Any session type</option>
                <option value={SessionType.BODY_DOUBLING}>🤝 Body Doubling</option>
                <option value={SessionType.STUDY_GROUP}>📚 Study Group</option>
                <option value={SessionType.CREATIVE_WORK}>🎨 Creative Work</option>
                <option value={SessionType.ADMIN_TASKS}>📋 Admin Tasks</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.onlineOnly}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    onlineOnly: e.target.checked 
                  }))}
                  className="rounded border-gray-300 text-focus-purple focus:ring-focus-purple"
                />
                <span className="text-small text-gray-700">Online only</span>
              </label>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleSearch}
            loading={isSearching}
            disabled={isSearching}
            className="w-full"
          >
            {isSearching ? 'Finding compatible study buddies...' : '🔍 Find Study Buddies'}
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {(isSearching || searchResults.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isSearching ? 'Searching...' : `${searchResults.length} Compatible Study Buddies`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSearching ? (
              <div className="text-center py-8">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl text-white">🔍</span>
                </motion.div>
                <p className="text-body text-gray-600">
                  Analyzing compatibility and finding your perfect study matches...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-focus-purple transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-xl text-white font-bold">
                            {user.avatar || user.name.charAt(0)}
                          </div>
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-community-teal border-2 border-white rounded-full" />
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{user.name}</h4>
                            {user.energyLevel && (
                              <span className="text-lg">{getEnergyEmoji(user.energyLevel)}</span>
                            )}
                          </div>
                          <p className="text-small text-gray-600">
                            {user.stats.totalSessions} sessions • {user.stats.currentStreak} day streak
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-lg font-bold text-community-teal">
                            {getCompatibilityScore(currentUser, user)}%
                          </div>
                          <div className="text-tiny text-gray-500">match</div>
                        </div>
                        
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onBuddyFound(user)}
                        >
                          Connect
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudyBuddy;