'use client';

import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot, query, where, Unsubscribe } from 'firebase/firestore';

interface RoomUserCounts {
  [roomId: string]: number;
}

export function useRoomUserCounts() {
  const [userCounts, setUserCounts] = useState<RoomUserCounts>({});
  const [isLoading, setIsLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;

    const unsubscribes: Unsubscribe[] = [];
    
    // List of all room IDs to monitor
    const roomIds = [
      'global',
      'india', 
      'usa',
      'uk',
      'canada',
      'books',
      'gaming',
      'movies',
      'music',
      'technology',
      'sports',
      'food'
    ];

    // Set up real-time listeners for each room
    roomIds.forEach(roomId => {
      const onlineUsersRef = collection(firestore, 'online_users');
      const roomUsersQuery = query(
        onlineUsersRef,
        where('currentRoom', '==', roomId)
      );

      const unsubscribe = onSnapshot(roomUsersQuery, 
        (snapshot) => {
          const count = snapshot.size;
          setUserCounts(prev => ({
            ...prev,
            [roomId]: count
          }));
          setIsLoading(false);
        },
        (error) => {
          console.warn(`Error monitoring user count for room ${roomId}:`, error);
          // Set default count on error
          setUserCounts(prev => ({
            ...prev,
            [roomId]: 0
          }));
          setIsLoading(false);
        }
      );

      unsubscribes.push(unsubscribe);
    });

    // Cleanup all listeners on unmount
    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [firestore]);

  return { userCounts, isLoading };
}

// Hook for getting count of a specific room
export function useRoomUserCount(roomId: string) {
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore || !roomId) return;

    const onlineUsersRef = collection(firestore, 'online_users');
    const roomUsersQuery = query(
      onlineUsersRef,
      where('currentRoom', '==', roomId)
    );

    const unsubscribe = onSnapshot(roomUsersQuery,
      (snapshot) => {
        setUserCount(snapshot.size);
        setIsLoading(false);
      },
      (error) => {
        console.warn(`Error monitoring user count for room ${roomId}:`, error);
        setUserCount(0);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [firestore, roomId]);

  return { userCount, isLoading };
}