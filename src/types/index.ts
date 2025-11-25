import { type Timestamp } from 'firebase/firestore';

export type Gender = 'Male' | 'Female';

export interface User {
  id: string; // Corresponds to Firebase Auth UID
  username: string;
  gender: Gender;
  age: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  chatRoomId: string; // 'global' or a private chat room ID
  senderId: string;
  sender: string; // denormalized sender username
  content: string;
  timestamp: Timestamp;
}

export interface ChatRoom {
  id: string;
  type: 'global' | 'private';
  participantIds: string[];
}
