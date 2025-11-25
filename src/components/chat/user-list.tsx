
"use client";

import { useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { type RootState } from "@/lib/redux/store";
import { setFilter } from "@/lib/redux/slices/usersSlice";
import { setActiveChatRoom } from "@/lib/redux/slices/chatSlice";
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { type Gender, type User } from '@/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useSidebar } from '../ui/sidebar';


export function UserList() {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const { filter } = useSelector((state: RootState) => state.users);
  const { user: currentUser } = useSelector((state: RootState) => state.session);
  const { setOpenMobile } = useSidebar();

  const onlineUsersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'online_users'), where('isOnline', '==', true));
  }, [firestore]);

  const { data: onlineUsers, isLoading } = useCollection<User>(onlineUsersQuery);

  const filteredUsers = useMemo(() => {
    if (!onlineUsers) return [];
    return onlineUsers.filter(user => {
      if (user.id === currentUser?.id) return false;
      if (filter === 'All') return true;
      return user.gender === filter;
    });
  }, [onlineUsers, filter, currentUser]);

  const handleUserClick = async (clickedUser: User) => {
    if (!currentUser || !firestore) return;
  
    // Create a consistent private chat room ID
    const chatRoomId = [currentUser.id, clickedUser.id].sort().join('_');
    const chatRoomRef = doc(firestore, 'chat_rooms', chatRoomId);
  
    try {
        const docSnap = await getDoc(chatRoomRef);
    
        if (!docSnap.exists()) {
          // Create the chat room if it doesn't exist
          const newChatRoom = {
            id: chatRoomId,
            type: 'private',
            participantIds: [currentUser.id, clickedUser.id],
          };
          setDocumentNonBlocking(chatRoomRef, newChatRoom, {});
        }
      
        dispatch(setActiveChatRoom(chatRoomId));
        setOpenMobile(false);
    } catch (error) {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: chatRoomRef.path,
        });
        errorEmitter.emit('permission-error', contextualError);
    }
  };
  
  const handleFilterChange = (newFilter: Gender | 'All') => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-2 border-b">
        <p className="p-2 text-sm font-semibold">Filter by Gender</p>
        <div className="grid grid-cols-3 gap-1">
          <Button variant={filter === 'All' ? 'default' : 'ghost'} size="sm" onClick={() => handleFilterChange('All')}>All</Button>
          <Button variant={filter === 'Male' ? 'default' : 'ghost'} size="sm" onClick={() => handleFilterChange('Male')}>Male</Button>
          <Button variant={filter === 'Female' ? 'default' : 'ghost'} size="sm" onClick={() => handleFilterChange('Female')}>Female</Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading && <div className="p-4 text-center text-sm text-muted-foreground">Loading users...</div>}
          {!isLoading && filteredUsers.length > 0 ? filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted-foreground/20 text-xs">
                        {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.age} / {user.gender === 'Male' ? 'M' : 'F'}
                  </div>
                </div>
                <span className={cn("text-xl", user.gender === "Male" ? "text-blue-500" : "text-pink-500")}>
                  {user.gender === "Male" ? "♂" : "♀"}
                </span>
              </div>
            </button>
          )) : !isLoading && (
            <div className="p-4 text-center text-sm text-muted-foreground">No other users online.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
