
// "use client";

// import { useMemo } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { type RootState } from "@/lib/redux/store";
// import { setFilter } from "@/lib/redux/slices/usersSlice";
// import { setActiveChatRoom } from "@/lib/redux/slices/chatSlice";
// import { Avatar, AvatarFallback } from '../ui/avatar';
// import { cn } from '@/lib/utils';
// import { type Gender, type User } from '@/types';
// import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
// import { collection, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
// import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
// import { errorEmitter } from '@/firebase/error-emitter';
// import { FirestorePermissionError } from '@/firebase/errors';
// import { useSidebar } from '../ui/sidebar';


// export function UserList() {
//   const dispatch = useDispatch();
//   const firestore = useFirestore();
//   const { filter } = useSelector((state: RootState) => state.users);
//   const { user: currentUser } = useSelector((state: RootState) => state.session);
//   const { setOpenMobile } = useSidebar();

//   const onlineUsersQuery = useMemoFirebase(() => {
//     if (!firestore) return null;
//     return query(collection(firestore, 'online_users'), where('isOnline', '==', true));
//   }, [firestore]);

//   const { data: onlineUsers, isLoading } = useCollection<User>(onlineUsersQuery);

//   const filteredUsers = useMemo(() => {
//     if (!onlineUsers) return [];
//     return onlineUsers.filter(user => {
//       if (user.id === currentUser?.id) return false;
//       if (filter === 'All') return true;
//       return user.gender === filter;
//     });
//   }, [onlineUsers, filter, currentUser]);

//   const handleUserClick = async (clickedUser: User) => {
//     if (!currentUser || !firestore) return;
  
//     // Create a consistent private chat room ID
//     const chatRoomId = [currentUser.id, clickedUser.id].sort().join('_');
//     const chatRoomRef = doc(firestore, 'chat_rooms', chatRoomId);
  
//     try {
//         const docSnap = await getDoc(chatRoomRef);
    
//         if (!docSnap.exists()) {
//           // Create the chat room if it doesn't exist
//           const newChatRoom = {
//             id: chatRoomId,
//             type: 'private',
//             participantIds: [currentUser.id, clickedUser.id],
//           };
//           setDocumentNonBlocking(chatRoomRef, newChatRoom, {});
//         }
      
//         dispatch(setActiveChatRoom(chatRoomId));
//         setOpenMobile(false);
//     } catch (error) {
//         const contextualError = new FirestorePermissionError({
//           operation: 'get',
//           path: chatRoomRef.path,
//         });
//         errorEmitter.emit('permission-error', contextualError);
//     }
//   };
  
//   const handleFilterChange = (newFilter: Gender | 'All') => {
//     dispatch(setFilter(newFilter));
//   };

//   return (
//     <div className="flex h-full flex-col">
//       <div className="p-3 border-b border-pink-200/50 dark:border-pink-800/30 bg-gradient-to-r from-pink-50/30 to-purple-50/30 dark:from-pink-950/20 dark:to-purple-950/20">
//         <p className="px-2 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
//           <span className="text-lg">🎭</span>
//           Filter by Gender
//         </p>
//         <div className="grid grid-cols-3 gap-2 mt-2">
//           <Button 
//             variant={filter === 'All' ? 'default' : 'ghost'} 
//             size="sm" 
//             onClick={() => handleFilterChange('All')}
//             className={cn(
//               "rounded-xl transition-all duration-300 h-auto py-2 px-2 flex items-center justify-center gap-1 text-xs font-medium",
//               filter === 'All' 
//                 ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl" 
//                 : "hover:bg-pink-100 dark:hover:bg-pink-950/30"
//             )}
//           >
//             <span>👥</span>
//             <span>All</span>
//           </Button>
//           <Button 
//             variant={filter === 'Male' ? 'default' : 'ghost'} 
//             size="sm" 
//             onClick={() => handleFilterChange('Male')}
//             className={cn(
//               "rounded-xl transition-all duration-300 h-auto py-2 px-2 flex items-center justify-center gap-1 text-xs font-medium",
//               filter === 'Male' 
//                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl" 
//                 : "hover:bg-blue-100 dark:hover:bg-blue-950/30"
//             )}
//           >
//             <span>👨</span>
//             <span>Male</span>
//           </Button>
//           <Button 
//             variant={filter === 'Female' ? 'default' : 'ghost'} 
//             size="sm" 
//             onClick={() => handleFilterChange('Female')}
//             className={cn(
//               "rounded-xl transition-all duration-300 h-auto py-2 px-2 flex items-center justify-center gap-1 text-xs font-medium",
//               filter === 'Female' 
//                 ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg hover:shadow-xl" 
//                 : "hover:bg-pink-100 dark:hover:bg-pink-950/30"
//             )}
//           >
//             <span>👩</span>
//             <span>Female</span>
//           </Button>
//         </div>
//       </div>
      
//       <ScrollArea className="flex-1">
//         <div className="p-3 space-y-2">
//           {isLoading && (
//             <div className="p-6 text-center text-gray-500 dark:text-gray-400">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
//                 <span>Loading users...</span>
//               </div>
//             </div>
//           )}
//           {!isLoading && filteredUsers.length > 0 ? filteredUsers.map((user) => (
//             <button
//               key={user.id}
//               onClick={() => handleUserClick(user)}
//               className="w-full text-left p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-pink-100/50 hover:to-purple-100/50 dark:hover:from-pink-950/30 dark:hover:to-purple-950/30 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 transition-all duration-300 border border-transparent hover:border-pink-200/50 dark:hover:border-pink-800/30 hover:shadow-md group"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <Avatar className="h-9 w-9 border-2 border-pink-200 dark:border-pink-800 group-hover:border-pink-400 dark:group-hover:border-pink-600 transition-colors shadow-sm">
//                       <AvatarFallback className={cn(
//                         "text-xs font-bold transition-colors",
//                         user.gender === 'Male' 
//                           ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white" 
//                           : "bg-gradient-to-br from-pink-400 to-pink-600 text-white"
//                       )}>
//                           {user.username.slice(0, 2).toUpperCase()}
//                       </AvatarFallback>
//                   </Avatar>
                  
//                   {/* Online indicator */}
//                   <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse"></div>
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors truncate">
//                     {user.username}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                     <span className="text-xs">{user.gender === 'Male' ? '👨' : '👩'}</span>
//                     <span>{user.age}</span>
//                     <span>/</span>
//                     <span>{user.gender}</span>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-1">
//                   <span className={cn(
//                     "text-lg transition-transform group-hover:scale-105",
//                     user.gender === "Male" ? "text-blue-500" : "text-pink-500"
//                   )}>
//                     {user.gender === "Male" ? "♂" : "♀"}
//                   </span>
//                 </div>
//               </div>
//             </button>
//           )) : !isLoading && (
//             <div className="p-8 text-center text-gray-500 dark:text-gray-400">
//               <div className="text-4xl mb-3">🤷‍♂️</div>
//               <p className="font-semibold mb-1">No other users online</p>
//               <p className="text-xs opacity-75">Check back later for new connections!</p>
//             </div>
//           )}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }



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
import { getFlag } from '@/lib/country-utils';


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
      <div className="p-3 border-b border-pink-200/50 dark:border-pink-800/30 bg-gradient-to-r from-pink-50/30 to-purple-50/30 dark:from-pink-950/20 dark:to-purple-950/20">
        <p className="px-2 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span className="text-lg">🎭</span>
          Filter by Gender
        </p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <Button 
            variant={filter === 'All' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => handleFilterChange('All')}
            className={cn(
              "rounded-xl transition-all duration-300 h-auto py-2 px-2 flex items-center justify-center gap-1 text-xs font-medium",
              filter === 'All' 
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl" 
                : "hover:bg-pink-100 dark:hover:bg-pink-950/30"
            )}
          >
            <span>👥</span>
            <span>All</span>
          </Button>
          <Button 
            variant={filter === 'Male' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => handleFilterChange('Male')}
            className={cn(
              "rounded-xl transition-all duration-300 h-auto py-2 px-2 flex items-center justify-center gap-1 text-xs font-medium",
              filter === 'Male' 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl" 
                : "hover:bg-blue-100 dark:hover:bg-blue-950/30"
            )}
          >
            <span>👨</span>
            <span>Male</span>
          </Button>
          <Button 
            variant={filter === 'Female' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => handleFilterChange('Female')}
            className={cn(
              "rounded-xl transition-all duration-300 h-auto py-2 px-2 flex items-center justify-center gap-1 text-xs font-medium",
              filter === 'Female' 
                ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg hover:shadow-xl" 
                : "hover:bg-pink-100 dark:hover:bg-pink-950/30"
            )}
          >
            <span>👩</span>
            <span>Female</span>
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {isLoading && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
                <span>Loading users...</span>
              </div>
            </div>
          )}
          {!isLoading && filteredUsers.length > 0 ? filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="w-full text-left p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-pink-100/50 hover:to-purple-100/50 dark:hover:from-pink-950/30 dark:hover:to-purple-950/30 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 transition-all duration-300 border border-transparent hover:border-pink-200/50 dark:hover:border-pink-800/30 hover:shadow-md group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-pink-200 dark:border-pink-800 group-hover:border-pink-400 dark:group-hover:border-pink-600 transition-colors shadow-sm">
                      <AvatarFallback className={cn(
                        "text-xs font-bold transition-colors",
                        user.gender === 'Male' 
                          ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white" 
                          : "bg-gradient-to-br from-pink-400 to-pink-600 text-white"
                      )}>
                          {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                  </Avatar>
                  
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors truncate">
                    {user.username}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{user.gender === 'Male' ? '👨' : '👩'}</span>
                      <span>{user.age}</span>
                      <span>/</span>
                      <span>{user.gender}</span>
                    </div>
                    {user.country && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs">
                          {user.countryCode && user.countryCode.length === 2 
                            ? String.fromCodePoint(...user.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))
                            : '🌍'
                          }
                        </span>
                        <span className="text-xs truncate">
                          {user.state ? `${user.state}, ${user.country}` : user.country}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "text-lg transition-transform group-hover:scale-105",
                    user.gender === "Male" ? "text-blue-500" : "text-pink-500"
                  )}>
                    {user.gender === "Male" ? "♂" : "♀"}
                  </span>
                </div>
              </div>
            </button>
          )) : !isLoading && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-3">🤷‍♂️</div>
              <p className="font-semibold mb-1">No other users online</p>
              <p className="text-xs opacity-75">Check back later for new connections!</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
