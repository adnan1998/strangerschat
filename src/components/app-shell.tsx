
"use client";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/lib/redux/store';
import { login, logout, logoutAndLeave } from '@/lib/redux/slices/sessionSlice';
import Login from '@/components/auth/login-form';
import { ChatLayout } from '@/components/chat/chat-layout';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { type User } from '@/types';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { getAuth } from 'firebase/auth';
import { type AppDispatch } from '@/lib/redux/store';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { ChatSkeletonLoader } from './chat/chat-skeleton-loader';

export function AppShell() {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn, user: sessionUser } = useSelector((state: RootState) => state.session);
  const { user: firebaseUser, isUserLoading } = useUser();
  const firestore = useFirestore();

  const [isUserDataLoading, setIsUserDataLoading] = useState(false);

  // Ensure global chat room exists
  useEffect(() => {
    if (!firestore) return;
    const globalChatRoomRef = doc(firestore, 'chat_rooms', 'global');
    
    getDoc(globalChatRoomRef).then(docSnap => {
        if (!docSnap.exists()) {
            setDocumentNonBlocking(globalChatRoomRef, {
                id: 'global',
                type: 'global',
                participantIds: [] // Global room doesn't need participant tracking in the same way
            }, {});
        }
    }).catch(error => {
       const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: globalChatRoomRef.path,
        });
        errorEmitter.emit('permission-error', contextualError);
    });
  }, [firestore]);


  useEffect(() => {
    const auth = getAuth();
    if (isUserLoading || !firestore) return;

    if (firebaseUser) {
      // User is authenticated with Firebase
      const pendingUserDetailsStr = localStorage.getItem('pending-user-details');

      if (pendingUserDetailsStr) {
        // New user just logged in, create their documents
        const pendingUserDetails = JSON.parse(pendingUserDetailsStr);
        const newUser: User = {
          id: firebaseUser.uid,
          isOnline: true,
          ...pendingUserDetails
        };

        const userDocRef = doc(firestore, 'users', firebaseUser.uid);
        const onlineUserDocRef = doc(firestore, 'online_users', firebaseUser.uid);

        setDocumentNonBlocking(userDocRef, newUser, {});
        setDocumentNonBlocking(onlineUserDocRef, newUser, {});


        dispatch(login(newUser));
        localStorage.removeItem('pending-user-details');

      } else if (!sessionUser) {
        // This is a returning user (already logged into Firebase, but redux state is empty)
        const fetchUser = async () => {
          setIsUserDataLoading(true);
          
          try {
            // Try to get user data from the main users collection first
            const userDocRef = doc(firestore, 'users', firebaseUser.uid);
            const docSnap = await getDoc(userDocRef);
            
            if (docSnap.exists()) {
              const userData = docSnap.data() as User;
              const onlineUserDocRef = doc(firestore, 'online_users', firebaseUser.uid);
              
              // Mark as online when they return and restore session
              const updatedUserData = { ...userData, isOnline: true };
              setDocumentNonBlocking(onlineUserDocRef, updatedUserData, { merge: true });
              dispatch(login(updatedUserData));
            } else {
              // Try to get from online_users as fallback (in case main doc was deleted but online_users exists)
              const onlineUserDocRef = doc(firestore, 'online_users', firebaseUser.uid);
              const onlineDocSnap = await getDoc(onlineUserDocRef);
              
              if (onlineDocSnap.exists()) {
                const userData = onlineDocSnap.data() as User;
                const updatedUserData = { ...userData, isOnline: true };
                
                // Restore to main collection and mark as online
                setDocumentNonBlocking(userDocRef, updatedUserData, {});
                setDocumentNonBlocking(onlineUserDocRef, updatedUserData, { merge: true });
                dispatch(login(updatedUserData));
              } else {
                // No user data found anywhere, force logout to restart registration
                await auth.signOut();
                dispatch(logout());
              }
            }
          } catch (error) {
            const contextualError = new FirestorePermissionError({
              operation: 'get',
              path: `users/${firebaseUser.uid}`,
            });
            errorEmitter.emit('permission-error', contextualError);
            console.warn('Failed to restore user session, will need to re-register:', error);
            // Don't force logout immediately, let user try to re-register
          } finally {
            setIsUserDataLoading(false);
          }
        };
        fetchUser();
      }
    } else {
      // No Firebase user, ensure app state is logged out
      if (isLoggedIn) {
        dispatch(logout());
      }
    }

  }, [firebaseUser, isUserLoading, firestore, dispatch, isLoggedIn, sessionUser]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (isLoggedIn && sessionUser) {
            // Only update online status to false, don't delete the user completely
            const onlineUserDocRef = doc(firestore, 'online_users', sessionUser.id);
            setDocumentNonBlocking(onlineUserDocRef, { ...sessionUser, isOnline: false }, { merge: true });
        }
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden' && isLoggedIn && sessionUser) {
            // User switched tabs or minimized - mark as offline but keep session
            const onlineUserDocRef = doc(firestore, 'online_users', sessionUser.id);
            setDocumentNonBlocking(onlineUserDocRef, { ...sessionUser, isOnline: false }, { merge: true });
        } else if (document.visibilityState === 'visible' && isLoggedIn && sessionUser) {
            // User came back - mark as online
            const onlineUserDocRef = doc(firestore, 'online_users', sessionUser.id);
            setDocumentNonBlocking(onlineUserDocRef, { ...sessionUser, isOnline: true }, { merge: true });
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLoggedIn, dispatch, sessionUser, firestore]);


  if (isUserLoading || isUserDataLoading) {
      return <ChatSkeletonLoader />;
  }

  return (
    <main className="h-screen w-screen bg-background overflow-hidden">
      {isLoggedIn && sessionUser ? <ChatLayout /> : <Login />}
    </main>
  );
}
