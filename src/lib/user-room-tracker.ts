'use client';

import { doc, updateDoc } from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';

/**
 * Updates the user's current room in the online_users collection
 */
export async function updateUserCurrentRoom(
  firestore: Firestore, 
  userId: string, 
  roomId: string
) {
  try {
    const onlineUserDocRef = doc(firestore, 'online_users', userId);
    await updateDoc(onlineUserDocRef, {
      currentRoom: roomId,
      lastSeen: new Date(), // Update last seen timestamp
    });
    console.log(`✅ Updated user ${userId} current room to: ${roomId}`);
  } catch (error) {
    console.warn(`⚠️ Failed to update user room for ${userId}:`, error);
    // Don't throw error to avoid breaking the chat flow
  }
}

/**
 * Non-blocking version that doesn't await the update
 */
export function updateUserCurrentRoomNonBlocking(
  firestore: Firestore, 
  userId: string, 
  roomId: string
) {
  updateUserCurrentRoom(firestore, userId, roomId).catch(error => {
    console.warn(`⚠️ Non-blocking room update failed for ${userId}:`, error);
  });
}