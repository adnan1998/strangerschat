"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { type RootState } from "@/lib/redux/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./message";
import { AnimatePresence, motion } from "framer-motion";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, Timestamp, where, onSnapshot, limit }from "firebase/firestore";
import { type Message as MessageType } from "@/types";
import { incrementUnread, clearUnread } from "@/lib/redux/slices/chatSlice";

export function MessageArea() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const { activeChatRoomId } = useSelector((state: RootState) => state.chat);
  const { user: currentUser } = useSelector((state: RootState) => state.session);

  const messagesQuery = useMemoFirebase(() => {
    if (!firestore || !activeChatRoomId) return null;
    return query(
      collection(firestore, 'chat_rooms', activeChatRoomId, 'messages'),
      orderBy('timestamp', 'asc')
    );
  }, [firestore, activeChatRoomId]);

  const { data: messages, isLoading } = useCollection<MessageType>(messagesQuery);
  
  useEffect(() => {
    // When switching to a new chat, mark its messages as read
    if (activeChatRoomId) {
      dispatch(clearUnread(activeChatRoomId));
      isInitialLoad.current = true; // Reset initial load flag for the new chat
    }
    // Mark initial load as done after first render with an active chat
    const timeout = setTimeout(() => {
        isInitialLoad.current = false;
    }, 1000);
    return () => clearTimeout(timeout);
  }, [activeChatRoomId, dispatch]);

  useEffect(() => {
    // This effect is specifically for listening to ALL chats and incrementing unread counts
    if (!firestore || !currentUser) return;
  
    const chatRoomsRef = collection(firestore, 'chat_rooms');
    const q = query(chatRoomsRef, where('participantIds', 'array-contains', currentUser.id));
  
    const unsubscribes = new Map<string, () => void>();
  
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          const chatRoomId = change.doc.id;
          if (chatRoomId === 'global') return; // Skip global for this listener
  
          // Listen for new messages in this chat room
          const messagesRef = collection(firestore, `chat_rooms/${chatRoomId}/messages`);
          const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
  
          const messageUnsub = onSnapshot(messagesQuery, (msgSnapshot) => {
             if (isInitialLoad.current && chatRoomId === activeChatRoomId) return;
             
             msgSnapshot.docChanges().forEach((msgChange) => {
                if (msgChange.type === 'added') {
                    const message = msgChange.doc.data() as MessageType;
                    // Check if message is new and not from current user, and chat is not active
                    if (message.senderId !== currentUser.id && chatRoomId !== activeChatRoomId) {
                       dispatch(incrementUnread(chatRoomId));
                    }
                }
             })
          });
          unsubscribes.set(chatRoomId, messageUnsub);
        } else if (change.type === 'removed') {
            // Clean up listener when leaving a private chat
            const chatRoomId = change.doc.id;
            unsubscribes.get(chatRoomId)?.();
            unsubscribes.delete(chatRoomId);
        }
      });
    });
  
    return () => {
      // Unsubscribe from all listeners on cleanup
      unsub();
      unsubscribes.forEach(unsubFunc => unsubFunc());
    };
  
  }, [firestore, currentUser, activeChatRoomId, dispatch]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, activeChatRoomId]);


  return (
    <ScrollArea className="flex-1 bg-gradient-to-b from-white/40 to-pink-50/20 dark:from-gray-900/40 dark:to-pink-950/20" ref={scrollAreaRef}>
      <div className="p-6 space-y-4">
        {isLoading && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
              <span>Loading messages...</span>
            </div>
          </div>
        )}
        <AnimatePresence>
            {messages && messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: index * 0.05 + 0.5,
                  },
                }}
              >
                <Message message={msg} />
              </motion.div>
            ))}
        </AnimatePresence>
        {!isLoading && (!messages || messages.length === 0) && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg font-semibold mb-2">No messages yet!</p>
            <p className="text-sm opacity-75">Start the conversation with a friendly hello! 👋</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
