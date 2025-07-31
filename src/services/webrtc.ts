import SimplePeer from 'simple-peer';
import { io, Socket } from 'socket.io-client';

export interface PeerConnection {
  peerId: string;
  peer: SimplePeer.Instance;
  stream?: MediaStream;
}

export class WebRTCManager {
  private socket: Socket | null = null;
  private localStream: MediaStream | null = null;
  private peers: Map<string, PeerConnection> = new Map();
  private sessionId: string | null = null;
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async initializeSession(sessionId: string): Promise<void> {
    this.sessionId = sessionId;
    
    try {
      // Get user media
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Initialize socket connection
      this.initializeSocket();
      
    } catch (error) {
      console.error('Failed to initialize session:', error);
      throw new Error('Could not access camera/microphone');
    }
  }

  private initializeSocket(): void {
    // In a real implementation, this would connect to your backend
    // For now, we'll simulate the socket connection
    console.log('Socket connection initialized for session:', this.sessionId);
    
    // Simulate socket events
    setTimeout(() => {
      this.handleUserJoined('peer-1');
    }, 2000);
  }

  private handleUserJoined(peerId: string): void {
    if (this.peers.has(peerId)) return;

    const peer = new SimplePeer({
      initiator: this.userId < peerId, // Deterministic initiator selection
      trickle: false,
      stream: this.localStream || undefined,
    });

    peer.on('signal', (data) => {
      // In real implementation, send signal through socket
      console.log('Sending signal to peer:', peerId, data);
    });

    peer.on('stream', (stream) => {
      console.log('Received stream from peer:', peerId);
      const connection = this.peers.get(peerId);
      if (connection) {
        connection.stream = stream;
        this.onStreamReceived?.(peerId, stream);
      }
    });

    peer.on('error', (error) => {
      console.error('Peer connection error:', error);
      this.peers.delete(peerId);
    });

    peer.on('close', () => {
      console.log('Peer connection closed:', peerId);
      this.peers.delete(peerId);
      this.onPeerDisconnected?.(peerId);
    });

    this.peers.set(peerId, { peerId, peer, stream: undefined });
  }

  async toggleAudio(): Promise<boolean> {
    if (!this.localStream) return false;

    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      return audioTrack.enabled;
    }
    return false;
  }

  async toggleVideo(): Promise<boolean> {
    if (!this.localStream) return false;

    const videoTrack = this.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      return videoTrack.enabled;
    }
    return false;
  }

  async shareScreen(): Promise<MediaStream | null> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: true
      });

      // Replace video track in all peer connections
      const videoTrack = screenStream.getVideoTracks()[0];
      this.peers.forEach(({ peer }) => {
        const sender = peer._pc?.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );
        if (sender) {
          sender.replaceTrack(videoTrack);
        }
      });

      return screenStream;
    } catch (error) {
      console.error('Failed to share screen:', error);
      return null;
    }
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStreams(): Map<string, MediaStream> {
    const streams = new Map<string, MediaStream>();
    this.peers.forEach((connection, peerId) => {
      if (connection.stream) {
        streams.set(peerId, connection.stream);
      }
    });
    return streams;
  }

  disconnect(): void {
    // Close all peer connections
    this.peers.forEach(({ peer }) => {
      peer.destroy();
    });
    this.peers.clear();

    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Disconnect socket
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Event handlers (to be set by components)
  onStreamReceived?: (peerId: string, stream: MediaStream) => void;
  onPeerDisconnected?: (peerId: string) => void;
}

// Singleton instance
let webRTCManager: WebRTCManager | null = null;

export const getWebRTCManager = (userId: string): WebRTCManager => {
  if (!webRTCManager) {
    webRTCManager = new WebRTCManager(userId);
  }
  return webRTCManager;
};

export const destroyWebRTCManager = (): void => {
  if (webRTCManager) {
    webRTCManager.disconnect();
    webRTCManager = null;
  }
};