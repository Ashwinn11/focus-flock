import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User, Session, EnergyLevel, SessionType, Achievement, Notification } from '@/types';

// User Store
interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ currentUser: user, isAuthenticated: true, error: null }),
      updateUser: (updates) => {
        const { currentUser } = get();
        if (currentUser) {
          set({ currentUser: { ...currentUser, ...updates } });
        }
      },
      logout: () => set({ currentUser: null, isAuthenticated: false, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    { name: 'user-store' }
  )
);

// Session Store
interface SessionState {
  activeSession: Session | null;
  availableSessions: Session[];
  userSessions: Session[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setActiveSession: (session: Session | null) => void;
  setAvailableSessions: (sessions: Session[]) => void;
  setUserSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  removeSession: (sessionId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    (set, get) => ({
      activeSession: null,
      availableSessions: [],
      userSessions: [],
      isLoading: false,
      error: null,

      setActiveSession: (session) => set({ activeSession: session }),
      setAvailableSessions: (sessions) => set({ availableSessions: sessions }),
      setUserSessions: (sessions) => set({ userSessions: sessions }),
      addSession: (session) => {
        const { availableSessions } = get();
        set({ availableSessions: [...availableSessions, session] });
      },
      updateSession: (sessionId, updates) => {
        const { availableSessions, userSessions, activeSession } = get();
        
        const updateSessionInArray = (sessions: Session[]) =>
          sessions.map(s => s.id === sessionId ? { ...s, ...updates } : s);
        
        set({
          availableSessions: updateSessionInArray(availableSessions),
          userSessions: updateSessionInArray(userSessions),
          activeSession: activeSession?.id === sessionId ? { ...activeSession, ...updates } : activeSession,
        });
      },
      removeSession: (sessionId) => {
        const { availableSessions, userSessions } = get();
        set({
          availableSessions: availableSessions.filter(s => s.id !== sessionId),
          userSessions: userSessions.filter(s => s.id !== sessionId),
        });
      },
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    { name: 'session-store' }
  )
);

// Achievement Store
interface AchievementState {
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setAchievements: (achievements: Achievement[]) => void;
  unlockAchievement: (achievement: Achievement) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAchievementStore = create<AchievementState>()(
  devtools(
    (set, get) => ({
      achievements: [],
      unlockedAchievements: [],
      isLoading: false,
      error: null,

      setAchievements: (achievements) => set({ achievements }),
      unlockAchievement: (achievement) => {
        const { unlockedAchievements } = get();
        if (!unlockedAchievements.find(a => a.id === achievement.id)) {
          set({ unlockedAchievements: [...unlockedAchievements, achievement] });
        }
      },
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    { name: 'achievement-store' }
  )
);

// Notification Store
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,

      setNotifications: (notifications) => {
        const unreadCount = notifications.filter(n => !n.isRead).length;
        set({ notifications, unreadCount });
      },
      addNotification: (notification) => {
        const { notifications } = get();
        const newNotifications = [notification, ...notifications];
        const unreadCount = newNotifications.filter(n => !n.isRead).length;
        set({ notifications: newNotifications, unreadCount });
      },
      markAsRead: (notificationId) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(n =>
          n.id === notificationId ? { ...n, isRead: true } : n
        );
        const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
        set({ notifications: updatedNotifications, unreadCount });
      },
      markAllAsRead: () => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
        set({ notifications: updatedNotifications, unreadCount: 0 });
      },
      removeNotification: (notificationId) => {
        const { notifications } = get();
        const filteredNotifications = notifications.filter(n => n.id !== notificationId);
        const unreadCount = filteredNotifications.filter(n => !n.isRead).length;
        set({ notifications: filteredNotifications, unreadCount });
      },
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    { name: 'notification-store' }
  )
);

// UI Store
interface UIState {
  theme: 'default' | 'sunset' | 'midnight' | 'calm';
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalType: string | null;
  toastMessages: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  
  // Actions
  setTheme: (theme: UIState['theme']) => void;
  toggleSidebar: () => void;
  openModal: (type: string) => void;
  closeModal: () => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      theme: 'default',
      sidebarOpen: false,
      modalOpen: false,
      modalType: null,
      toastMessages: [],

      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => {
        const { sidebarOpen } = get();
        set({ sidebarOpen: !sidebarOpen });
      },
      openModal: (type) => set({ modalOpen: true, modalType: type }),
      closeModal: () => set({ modalOpen: false, modalType: null }),
      addToast: (message, type) => {
        const { toastMessages } = get();
        const id = Date.now().toString();
        set({ toastMessages: [...toastMessages, { id, message, type }] });
        
        // Auto-remove toast after 5 seconds
        setTimeout(() => {
          const { toastMessages } = get();
          set({ toastMessages: toastMessages.filter(t => t.id !== id) });
        }, 5000);
      },
      removeToast: (id) => {
        const { toastMessages } = get();
        set({ toastMessages: toastMessages.filter(t => t.id !== id) });
      },
    }),
    { name: 'ui-store' }
  )
);

// Video/Audio Store
interface MediaState {
  localStream: MediaStream | null;
  remoteStreams: Map<string, MediaStream>;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  isConnecting: boolean;
  error: string | null;
  
  // Actions
  setLocalStream: (stream: MediaStream | null) => void;
  addRemoteStream: (peerId: string, stream: MediaStream) => void;
  removeRemoteStream: (peerId: string) => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMediaStore = create<MediaState>()(
  devtools(
    (set, get) => ({
      localStream: null,
      remoteStreams: new Map(),
      isAudioEnabled: true,
      isVideoEnabled: true,
      isScreenSharing: false,
      isConnecting: false,
      error: null,

      setLocalStream: (stream) => set({ localStream: stream }),
      addRemoteStream: (peerId, stream) => {
        const { remoteStreams } = get();
        const newStreams = new Map(remoteStreams);
        newStreams.set(peerId, stream);
        set({ remoteStreams: newStreams });
      },
      removeRemoteStream: (peerId) => {
        const { remoteStreams } = get();
        const newStreams = new Map(remoteStreams);
        newStreams.delete(peerId);
        set({ remoteStreams: newStreams });
      },
      toggleAudio: () => {
        const { isAudioEnabled } = get();
        set({ isAudioEnabled: !isAudioEnabled });
      },
      toggleVideo: () => {
        const { isVideoEnabled } = get();
        set({ isVideoEnabled: !isVideoEnabled });
      },
      toggleScreenShare: () => {
        const { isScreenSharing } = get();
        set({ isScreenSharing: !isScreenSharing });
      },
      setConnecting: (connecting) => set({ isConnecting: connecting }),
      setError: (error) => set({ error }),
    }),
    { name: 'media-store' }
  )
); 