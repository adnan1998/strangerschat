"use client";

import { useSelector } from "react-redux";
import { type RootState } from "@/lib/redux/store";
import { MessageArea } from "./message-area";
import { MessageInput } from "./message-input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Users, Globe } from "lucide-react";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { type ChatRoom, type User } from "@/types";
import { useMemo } from "react";

export function ChatPanel() {
  const firestore = useFirestore();
  const { activeChatRoomId } = useSelector((state: RootState) => state.chat);
  const { user: currentUser } = useSelector((state: RootState) => state.session);

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
  
  const isGlobal = activeChatRoomId === 'global';
  const chatName = isGlobal ? "Global Lobby" : privateChatUser?.username || "Chat";
  const chatIcon = isGlobal ? <Globe className="h-6 w-6 text-primary" /> : <Users className="h-6 w-6 text-primary" />;

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3">
        <SidebarTrigger className="md:hidden"/>
        {chatIcon}
        <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight">{chatName}</h2>
            {privateChatUser && (
                 <p className="text-sm text-muted-foreground">{privateChatUser.age} / {privateChatUser.gender}</p>
            )}
        </div>
      </header>
      <MessageArea />
      <MessageInput />
    </div>
  );
}
