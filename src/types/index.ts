// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  energyLevel?: EnergyLevel;
  isOnline: boolean;
  lastSeen: Date;
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'default' | 'sunset' | 'midnight' | 'calm';
  notifications: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  sessionLength: number; // in minutes
  energyLevel: EnergyLevel;
}

export interface UserStats {
  totalSessions: number;
  totalFocusTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  sessionHistory: SessionHistory[];
}

// Session Types
export interface Session {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  participants: SessionParticipant[];
  maxParticipants: number;
  energyLevel: EnergyLevel;
  sessionType: SessionType;
  status: SessionStatus;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  tags: string[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionParticipant {
  userId: string;
  joinedAt: Date;
  leftAt?: Date;
  isHost: boolean;
  isActive: boolean;
  energyLevel: EnergyLevel;
}

export interface SessionHistory {
  sessionId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  completed: boolean;
  energyLevel: EnergyLevel;
  participants: number;
}

// Enums
export enum EnergyLevel {
  HIGH = 'high',
  STEADY = 'steady',
  GENTLE = 'gentle',
  RECHARGE = 'recharge'
}

export enum SessionType {
  BODY_DOUBLING = 'body_doubling',
  STUDY_GROUP = 'study_group',
  CREATIVE_WORK = 'creative_work',
  ADMIN_TASKS = 'admin_tasks',
  READING = 'reading',
  WRITING = 'writing'
}

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  unlockedAt: Date;
  progress?: number; // 0-100
  maxProgress?: number;
}

export enum AchievementCategory {
  SESSIONS = 'sessions',
  STREAKS = 'streaks',
  COMMUNITY = 'community',
  MILESTONES = 'milestones',
  SPECIAL = 'special'
}

// Community Types
export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  hostId: string;
  members: StudyGroupMember[];
  maxMembers: number;
  tags: string[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyGroupMember {
  userId: string;
  joinedAt: Date;
  role: 'host' | 'moderator' | 'member';
  isActive: boolean;
}

// Creator Economy Types
export interface Creator {
  id: string;
  userId: string;
  bio?: string;
  specialties: string[];
  followerCount: number;
  sessionCount: number;
  rating: number;
  isVerified: boolean;
  earnings: CreatorEarnings;
  createdAt: Date;
}

export interface CreatorEarnings {
  totalEarnings: number;
  monthlyEarnings: number;
  tipsReceived: number;
  sponsoredSessions: number;
  lastPayout: Date;
}

// Video/Audio Types
export interface MediaStream {
  stream: MediaStream;
  userId: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
}

export interface PeerConnection {
  peerId: string;
  connection: RTCPeerConnection;
  stream?: MediaStream;
  isConnected: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

export enum NotificationType {
  SESSION_INVITE = 'session_invite',
  ACHIEVEMENT = 'achievement',
  STREAK_MILESTONE = 'streak_milestone',
  FRIEND_REQUEST = 'friend_request',
  GROUP_INVITE = 'group_invite',
  SYSTEM = 'system'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateSessionForm {
  title: string;
  description?: string;
  sessionType: SessionType;
  energyLevel: EnergyLevel;
  startTime: Date;
  duration: number;
  maxParticipants: number;
  isPrivate: boolean;
  tags: string[];
}

export interface JoinSessionForm {
  sessionId: string;
  energyLevel: EnergyLevel;
  allowAudio: boolean;
  allowVideo: boolean;
}

// Analytics Types
export interface SessionAnalytics {
  sessionId: string;
  duration: number;
  participants: number;
  completionRate: number;
  energyLevels: Record<EnergyLevel, number>;
  tags: string[];
  createdAt: Date;
}

export interface UserAnalytics {
  userId: string;
  totalSessions: number;
  totalFocusTime: number;
  averageSessionLength: number;
  preferredEnergyLevel: EnergyLevel;
  preferredSessionType: SessionType;
  completionRate: number;
  retentionRate: number;
  lastActive: Date;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Theme Types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    display: string;
  };
}

// Settings Types
export interface AppSettings {
  theme: Theme;
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
    screenReader: boolean;
  };
  privacy: {
    shareProgress: boolean;
    shareAchievements: boolean;
    allowNotifications: boolean;
    dataCollection: boolean;
  };
  performance: {
    videoQuality: 'low' | 'medium' | 'high';
    audioQuality: 'low' | 'medium' | 'high';
    autoConnect: boolean;
  };
} 