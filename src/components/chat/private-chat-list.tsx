
"use client";

import { useSelector, useDispatch } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area";
import { type RootState } from '@/lib/redux/store';
import { setActiveChatRoom } from '@/lib/redux/slices/chatSlice';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useCollection, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';
import { type ChatRoom, type User } from '@/types';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '../ui/sidebar';
import { getFlag } from '@/lib/country-utils';

function PrivateChatListItem({ chatRoomId }: { chatRoomId: string }) {
    const dispatch = useDispatch();
    const firestore = useFirestore();
    const { user: currentUser } = useSelector((state: RootState) => state.session);
    const { unreadCounts, activeChatRoomId } = useSelector((state: RootState) => state.chat);
    const { setOpenMobile } = useSidebar();
    const unreadCount = unreadCounts[chatRoomId] || 0;

    const chatRoomRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'chat_rooms', chatRoomId);
    }, [firestore, chatRoomId]);

    const { data: chatRoom } = useDoc<ChatRoom>(chatRoomRef);

    const participantId = useMemo(() => {
        if (!chatRoom || !currentUser) return null;
        return chatRoom.participantIds.find(id => id !== currentUser.id);
    }, [chatRoom, currentUser]);

    const participantRef = useMemoFirebase(() => {
        if (!firestore || !participantId) return null;
        // Fetch from online_users which is publicly readable
        return doc(firestore, 'online_users', participantId);
    }, [firestore, participantId]);

    const { data: participant } = useDoc<User>(participantRef);

    const handleClick = () => {
        dispatch(setActiveChatRoom(chatRoomId));
        setOpenMobile(false);
    }

    if (!participant) return null;

    return (
        <button
            onClick={handleClick}
            className={cn(
                "w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                activeChatRoomId === chatRoomId && "bg-accent text-accent-foreground"
            )}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted-foreground/20 text-xs">
                        {participant.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-semibold">{participant.username}</p>
                    <p className="text-xs text-muted-foreground">{participant.age} / {participant.gender}</p>
                    {participant.country && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span>
                                {participant.countryCode && participant.countryCode.length === 2 
                                    ? String.fromCodePoint(...participant.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))
                                    : '🌍'
                                }
                            </span>
                            <span className="truncate">
                                {participant.state ? `${participant.state}, ${participant.country}` : participant.country}
                            </span>
                        </p>
                    )}
                </div>
                {unreadCount > 0 && (
                    <Badge variant="destructive" className="h-6 w-6 flex items-center justify-center p-0">{unreadCount > 9 ? '9+' : unreadCount}</Badge>
                )}
            </div>
        </button>
    );
}


export function PrivateChatList() {
    const firestore = useFirestore();
    const { user: currentUser } = useSelector((state: RootState) => state.session);

    const privateChatsQuery = useMemoFirebase(() => {
        if (!firestore || !currentUser) return null;
        return query(
            collection(firestore, 'chat_rooms'),
            where('type', '==', 'private'),
            where('participantIds', 'array-contains', currentUser.id)
        );
    }, [firestore, currentUser]);

    const { data: privateChatRooms, isLoading } = useCollection<ChatRoom>(privateChatsQuery);
    
    if (isLoading) {
      return <div className="p-4 text-center text-sm text-muted-foreground">Loading chats...</div>;
    }

    if (!privateChatRooms || privateChatRooms.length === 0) {
        return <div className="p-4 text-center text-sm text-muted-foreground">No private chats yet. Click a user to start a conversation.</div>;
    }

    return (
        <ScrollArea className="h-full">
            <div className="p-2 space-y-1">
                {privateChatRooms.map(chatRoom => (
                   <PrivateChatListItem key={chatRoom.id} chatRoomId={chatRoom.id} />
                ))}
            </div>
        </ScrollArea>
    );
}
