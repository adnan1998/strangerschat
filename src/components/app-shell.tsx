
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
          const userDocRef = doc(firestore, 'users', firebaseUser.uid);
          
          try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
              const userData = docSnap.data() as User;
              const onlineUserDocRef = doc(firestore, 'online_users', firebaseUser.uid);
              // Mark as online when they return
              setDocumentNonBlocking(onlineUserDocRef, { ...userData, isOnline: true }, { merge: true });
              dispatch(login(userData));
            } else {
              // Data is missing, maybe an error during sign-up. Force logout to restart.
              await auth.signOut();
              dispatch(logout());
            }
          } catch (error) {
            const contextualError = new FirestorePermissionError({
              operation: 'get',
              path: userDocRef.path,
            });
            errorEmitter.emit('permission-error', contextualError);
            // Also log out the user as we can't fetch their data
            await auth.signOut();
            dispatch(logout());
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
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // This is not guaranteed to run, but it's our best effort.
      if (isLoggedIn) {
        dispatch(logoutAndLeave());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoggedIn, dispatch]);


  if (isUserLoading || isUserDataLoading) {
      return (
          <div className="flex h-screen w-screen items-center justify-center bg-background">
              <p>Loading...</p>
          </div>
      )
  }

  return (
    <main className="h-screen w-screen bg-background overflow-hidden">
      {isLoggedIn && sessionUser ? <ChatLayout /> : <Login />}
    </main>
  );
}
