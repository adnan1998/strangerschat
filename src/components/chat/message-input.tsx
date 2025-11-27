
// "use client";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Send } from "lucide-react";
// import { type RootState } from "@/lib/redux/store";
// import { useFirestore } from "@/firebase";
// import { collection, doc, serverTimestamp, query, orderBy, limit, getDocs, writeBatch } from "firebase/firestore";
// import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
// import { v4 as uuidv4 } from 'uuid';

// export function MessageInput() {
//   const [text, setText] = useState("");
//   const firestore = useFirestore();
//   const { activeChatRoomId } = useSelector((state: RootState) => state.chat);
//   const { user } = useSelector((state: RootState) => state.session);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (text.trim() === "" || !user || !firestore || !activeChatRoomId) return;

//     const messageId = uuidv4();
//     const messagesColRef = collection(firestore, 'chat_rooms', activeChatRoomId, 'messages');
//     const messageDocRef = doc(messagesColRef, messageId);


//     const newMessage = {
//       id: messageId,
//       chatRoomId: activeChatRoomId,
//       senderId: user.id,
//       sender: user.username, // Denormalized for display
//       content: text.trim(),
//       timestamp: serverTimestamp(),
//     };
    
//     addDocumentNonBlocking(messageDocRef, newMessage);
//     setText("");

//     // Enforce message limit for global chat
//     if (activeChatRoomId === 'global') {
//         const q = query(messagesColRef, orderBy('timestamp', 'asc'));
        
//         try {
//             const snapshot = await getDocs(q);
//             if (snapshot.size > 200) {
//                 const batch = writeBatch(firestore);
//                 const oldestDoc = snapshot.docs[0];
//                 batch.delete(oldestDoc.ref);
//                 await batch.commit();
//             }
//         } catch (error) {
//             console.error("Error enforcing message limit: ", error);
//         }
//     }
//   };

//   return (
//     <div className="border-t border-pink-200/50 dark:border-pink-800/30 bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-950/30 dark:to-purple-950/30 backdrop-blur-sm p-3 md:p-6">
//       <form onSubmit={handleSubmit} className="flex items-end gap-2 md:gap-4">
//         <div className="flex-1 relative">
//           <Textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type your message... ✨"
//             className="min-h-0 max-h-32 resize-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-pink-200 dark:border-pink-800 focus:border-pink-400 dark:focus:border-pink-600 rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-3 pr-10 md:pr-12 text-sm transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/25 placeholder:text-gray-400"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSubmit(e);
//               }
//             }}
//             disabled={!user || !firestore}
//           />
          
//           {/* Character indicator */}
//           <div className="absolute bottom-1 md:bottom-2 right-2 md:right-3 text-xs text-gray-400">
//             {text.length > 0 && (
//               <span className={text.length > 500 ? "text-red-500" : "text-gray-400"}>
//                 {text.length}/500
//               </span>
//             )}
//           </div>
//         </div>
        
//         <Button 
//           type="submit" 
//           size="lg"
//           disabled={!text.trim() || !user || !firestore || text.length > 500}
//           className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-0 shadow-xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
//         >
//           {text.trim() ? (
//             <div className="flex items-center">
//               <Send className="h-4 w-4 md:h-5 md:w-5" />
//             </div>
//           ) : (
//             <span className="text-base md:text-lg">💬</span>
//           )}
//           <span className="sr-only">Send message</span>
//         </Button>
//       </form>
      
//       {/* Typing indicator area */}
//       <div className="mt-2 md:mt-3 text-center">
//         <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
//           <span className="text-sm md:text-lg">💡</span>
//           <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
//           <span className="sm:hidden">Enter to send</span>
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, Lightbulb } from "lucide-react";
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
    <div className="border-t bg-card p-4">
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message... ✨"
            className="min-h-0 max-h-24 flex-1 resize-none bg-background rounded-full border-2 border-transparent focus:border-pink-400 focus:ring-pink-400 transition-all pr-12"
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
                }
            }}
            disabled={!user || !firestore}
            />
            <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-300/50" disabled={!text.trim() || !user || !firestore}>
                <SendHorizonal className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </form>
      </div>
       <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1.5">
          <Lightbulb className="h-3 w-3 text-yellow-500" />
          Press Enter to send, Shift+Enter for new line
        </p>
    </div>
  );
}
