
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { type RootState } from "@/lib/redux/store";
import { useFirestore } from "@/firebase";
import { collection, doc, serverTimestamp, query, orderBy, limit, getDocs, writeBatch } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { v4 as uuidv4 } from 'uuid';

export function MessageInput() {
  const [text, setText] = useState("");
  const firestore = useFirestore();
  const { activeChatRoomId } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.session);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "" || !user || !firestore || !activeChatRoomId) return;

    const messageId = uuidv4();
    const messagesColRef = collection(firestore, 'chat_rooms', activeChatRoomId, 'messages');
    const messageDocRef = doc(messagesColRef, messageId);


    const newMessage = {
      id: messageId,
      chatRoomId: activeChatRoomId,
      senderId: user.id,
      sender: user.username, // Denormalized for display
      content: text.trim(),
      timestamp: serverTimestamp(),
    };
    
    addDocumentNonBlocking(messageDocRef, newMessage);
    setText("");

    // Enforce message limit for global chat
    if (activeChatRoomId === 'global') {
        const q = query(messagesColRef, orderBy('timestamp', 'asc'));
        
        try {
            const snapshot = await getDocs(q);
            if (snapshot.size > 200) {
                const batch = writeBatch(firestore);
                const oldestDoc = snapshot.docs[0];
                batch.delete(oldestDoc.ref);
                await batch.commit();
            }
        } catch (error) {
            console.error("Error enforcing message limit: ", error);
        }
    }
  };

  return (
    <div className="border-t bg-muted/30 p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="min-h-0 max-h-24 flex-1 resize-none bg-background"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={!user || !firestore}
        />
        <Button type="submit" size="icon" disabled={!text.trim() || !user || !firestore}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
