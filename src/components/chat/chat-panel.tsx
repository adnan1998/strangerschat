// "use client";

// import { useSelector } from "react-redux";
// import { type RootState } from "@/lib/redux/store";
// import { MessageArea } from "./message-area";
// import { MessageInput } from "./message-input";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Users, Globe } from "lucide-react";
// import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
// import { doc } from "firebase/firestore";
// import { type ChatRoom, type User } from "@/types";
// import { useMemo } from "react";

// export function ChatPanel() {
//   const firestore = useFirestore();
//   const { activeChatRoomId } = useSelector((state: RootState) => state.chat);
//   const { user: currentUser } = useSelector((state: RootState) => state.session);

//   const chatRoomRef = useMemoFirebase(() => {
//     if (!firestore || !activeChatRoomId) return null;
//     return doc(firestore, 'chat_rooms', activeChatRoomId);
//   }, [firestore, activeChatRoomId]);

//   const { data: chatRoom } = useDoc<ChatRoom>(chatRoomRef);

//   const privateChatParticipantId = useMemo(() => {
//     if (chatRoom?.type !== 'private' || !currentUser) return null;
//     return chatRoom.participantIds.find(id => id !== currentUser.id);
//   }, [chatRoom, currentUser]);

//   // Fetch from online_users which is publicly readable
//   const privateChatUserRef = useMemoFirebase(() => {
//     if (!firestore || !privateChatParticipantId) return null;
//     return doc(firestore, 'online_users', privateChatParticipantId);
//   }, [firestore, privateChatParticipantId]);

//   const { data: privateChatUser } = useDoc<User>(privateChatUserRef);
  
//   const isGlobal = activeChatRoomId === 'global';
//   const chatName = isGlobal ? "Global Lobby" : privateChatUser?.username || "Chat";
//   const chatIcon = isGlobal ? <Globe className="h-6 w-6 text-primary" /> : <Users className="h-6 w-6 text-primary" />;

//   return (
//     <div className="flex h-full w-full flex-col bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm md:rounded-l-3xl shadow-2xl overflow-hidden relative">
//       {/* Header with gradient */}
//       <header className="flex items-center gap-3 border-b border-pink-200/50 dark:border-pink-800/30 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/40 dark:to-purple-950/40 px-4 md:px-6 py-3 md:py-4 shadow-lg">
//         <SidebarTrigger className="lg:hidden p-2 hover:bg-pink-200/50 dark:hover:bg-pink-800/30 rounded-xl transition-colors"/>
        
//         {/* Enhanced chat icon */}
//         <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
//           {isGlobal ? (
//             <span className="text-xl md:text-2xl">🌍</span>
//           ) : (
//             <span className="text-xl md:text-2xl">💬</span>
//           )}
//         </div>
        
//         <div className="flex flex-col flex-1 min-w-0">
//             <h2 className="text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
//               {chatName}
//             </h2>
//             {privateChatUser && (
//                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 md:gap-2">
//                    <span className="text-sm md:text-lg">{privateChatUser.gender === 'Male' ? '👨' : '👩'}</span>
//                    <span>{privateChatUser.age} / {privateChatUser.gender}</span>
//                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
//                    <span className="text-xs text-green-600 dark:text-green-400 hidden sm:inline">Online</span>
//                  </p>
//             )}
//             {isGlobal && (
//                 <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
//                   <span className="text-sm md:text-lg">✨</span>
//                   <span className="hidden sm:inline">Anonymous conversations await</span>
//                   <span className="sm:hidden">Global chat</span>
//                 </p>
//             )}
//         </div>
        
//         {/* Decorative elements */}
//         <div className="hidden md:flex items-center gap-2">
//           {isGlobal ? (
//             <div className="flex items-center gap-1 px-2 md:px-3 py-1 bg-pink-200/50 dark:bg-pink-800/30 rounded-full text-xs font-semibold text-pink-700 dark:text-pink-300">
//               <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
//               <span className="hidden sm:inline">Live Chat</span>
//             </div>
//           ) : (
//             <div className="flex items-center gap-1 px-2 md:px-3 py-1 bg-purple-200/50 dark:bg-purple-800/30 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-300">
//               <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
//               <span className="hidden sm:inline">Private</span>
//             </div>
//           )}
//         </div>
//       </header>
      
//       <MessageArea />
//       <MessageInput />
//     </div>
//   );
// }



"use client";

import { useSelector } from "react-redux";
import { type RootState } from "@/lib/redux/store";
import { MessageArea } from "./message-area";
import { MessageInput } from "./message-input";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Users, Globe } from "lucide-react";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { type ChatRoom, type User } from "@/types";
import { getRoomById, getDefaultRoom } from "@/lib/content-filter";
import { useMemo, useEffect } from "react";

export function ChatPanel() {
  const firestore = useFirestore();
  const { activeChatRoomId, unreadCounts } = useSelector((state: RootState) => state.chat);
  const { user: currentUser } = useSelector((state: RootState) => state.session);
  const { setUnreadCount } = useSidebar();

  const totalUnreadCount = useMemo(() => {
    return Object.values(unreadCounts).reduce((acc, count) => acc + count, 0);
  }, [unreadCounts]);

  useEffect(() => {
    setUnreadCount(totalUnreadCount);
  }, [totalUnreadCount, setUnreadCount]);


  const chatRoomRef = useMemoFirebase(() => {
    if (!firestore || !activeChatRoomId) return null;
    return doc(firestore, 'chat_rooms', activeChatRoomId);
  }, [firestore, activeChatRoomId]);

  const { data: chatRoom } = useDoc<ChatRoom>(chatRoomRef);

  const privateChatParticipantId = useMemo(() => {
    if (chatRoom?.type !== 'private' || !currentUser) return null;
    return chatRoom.participantIds.find(id => id !== currentUser.id);
  }, [chatRoom, currentUser]);

  // Fetch from online_users which is publicly readable
  const privateChatUserRef = useMemoFirebase(() => {
    if (!firestore || !privateChatParticipantId) return null;
    return doc(firestore, 'online_users', privateChatParticipantId);
  }, [firestore, privateChatParticipantId]);

  const { data: privateChatUser } = useDoc<User>(privateChatUserRef);
  
  // Get room information
  const currentRoom = getRoomById(activeChatRoomId || 'global') || getDefaultRoom();
  const isPrivateChat = chatRoom?.type === 'private';
  const isPublicRoom = !isPrivateChat;
  
  // Determine chat name and description
  const chatName = isPrivateChat 
    ? privateChatUser?.username || "Private Chat"
    : currentRoom.name;
  
  const chatDescription = isPrivateChat
    ? `${privateChatUser?.age} / ${privateChatUser?.gender}`
    : currentRoom.description;

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between gap-3 border-b border-pink-200/50 dark:border-pink-800/30 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
        <div className="flex items-center gap-3 min-w-0 flex-1">
            <SidebarTrigger className="md:hidden p-2 hover:bg-pink-200/50 dark:hover:bg-pink-800/30 rounded-xl transition-colors"/>
            
            {/* Enhanced chat icon */}
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg shrink-0">
              {isPrivateChat ? (
                <span className="text-lg sm:text-xl">💬</span>
              ) : (
                <span className="text-lg sm:text-xl">{currentRoom.icon}</span>
              )}
            </div>
            
            <div className="flex flex-col min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
                    {chatName}
                </h2>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 sm:gap-2">
                    {isPrivateChat ? (
                        privateChatUser ? (
                            <>
                                <span className="text-sm sm:text-base">{privateChatUser.gender === 'Male' ? '👨' : '👩'}</span>
                                <span>{privateChatUser.age} / {privateChatUser.gender}</span>
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs text-green-600 dark:text-green-400 hidden sm:inline">Online</span>
                            </>
                        ) : (
                            <span>Loading...</span>
                        )
                    ) : (
                        <>
                            <span className="text-sm sm:text-base">✨</span>
                            <span className="hidden sm:inline">{chatDescription}</span>
                            <span className="sm:hidden">{currentRoom.name}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
        
        {/* Status badge */}
        <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-pink-200/50 dark:bg-pink-800/30 rounded-full text-xs font-semibold text-pink-700 dark:text-pink-300 shrink-0">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
            <span>{isPrivateChat ? 'Private' : 'Live Chat'}</span>
        </div>
      </header>
      <MessageArea />
      <MessageInput />
    </div>
  );
}

    