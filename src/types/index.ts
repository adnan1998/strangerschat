
import { type Timestamp } from 'firebase/firestore';

export type Gender = 'Male' | 'Female';

export interface User {
  id: string; // Corresponds to Firebase Auth UID
  username: string;
  gender: Gender;
  age: number;
  isOnline: boolean;
  currentRoom?: string; // Current chat room ID
  country: string; // Country name
  countryCode: string; // Country code (e.g., "US", "IN")
  state: string; // State/Province name
  stateCode: string; // State code (e.g., "CA", "TX")
}

export interface Message {
  id: string;
  chatRoomId: string; // 'global' or a private chat room ID
  senderId: string;
  sender: string; // denormalized sender username
  content: string;
  timestamp: Timestamp;
  country?: string; // User's country for display
  countryCode?: string; // User's country code for flag
  state?: string; // User's state/province for display
}

export interface ChatRoom {
  id: string;
  type: 'global' | 'private';
  participantIds: string[];
}
