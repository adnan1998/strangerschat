
// "use client";

// import { useSelector } from "react-redux";
// import { formatDistanceToNow } from "date-fns";
// import { cn } from "@/lib/utils";
// import { type RootState } from "@/lib/redux/store";
// import { type Message as MessageType } from "@/types";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// interface MessageProps {
//   message: MessageType;
// }

// export function Message({ message }: MessageProps) {
//   const { user } = useSelector((state: RootState) => state.session);
//   const isSelf = message.senderId === user?.id;

//   const getInitials = (name: string) => {
//     return name ? name.substring(0, 2).toUpperCase() : '??';
//   };

//   const formattedTimestamp = message.timestamp && 'seconds' in message.timestamp
//     ? formatDistanceToNow(
//         message.timestamp.toDate(),
//         { addSuffix: true }
//       )
//     : 'sending...';


//   return (
//     <div
//       className={cn(
//         "flex items-end gap-3",
//         isSelf ? "justify-end" : "justify-start"
//       )}
//     >
//       {!isSelf && (
//         <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-800 shadow-sm">
//             <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white font-bold text-xs">
//                 {getInitials(message.sender)}
//             </AvatarFallback>
//         </Avatar>
//       )}
//       <div
//         className={cn(
//           "max-w-[70%] inline-block rounded-2xl px-3 py-2 shadow-md backdrop-blur-sm border transition-all duration-300",
//           isSelf
//             ? "rounded-br-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white border-pink-300/50"
//             : "rounded-bl-lg bg-white/90 dark:bg-gray-800/90 border-purple-200/50 dark:border-purple-800/50"
//         )}
//       >
//         {!isSelf && (
//           <p className="mb-1 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//             {message.sender}
//           </p>
//         )}
//         <p className={cn(
//           "text-sm leading-normal",
//           isSelf ? "text-white" : "text-gray-800 dark:text-gray-200"
//         )} style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}>
//             {message.content}
//         </p>
//         <p
//           className={cn(
//             "mt-1 text-right text-[10px] leading-none",
//             isSelf ? "text-white/70" : "text-gray-500 dark:text-gray-400"
//           )}
//         >
//           {formattedTimestamp}
//         </p>
//       </div>
      
//       {isSelf && (
//         <Avatar className="h-8 w-8 border-2 border-pink-200 dark:border-pink-800 shadow-sm">
//             <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold text-xs">
//                 You
//             </AvatarFallback>
//         </Avatar>
//       )}
//     </div>
//   );
// }



"use client";

import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { type RootState } from "@/lib/redux/store";
import { type Message as MessageType } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReportButton } from "./report-button";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const { user } = useSelector((state: RootState) => state.session);
  const isSelf = message.senderId === user?.id;

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : '??';
  };

  const formattedTimestamp = message.timestamp && 'seconds' in message.timestamp
    ? formatDistanceToNow(
        message.timestamp.toDate(),
        { addSuffix: true }
      )
    : 'sending...';


  return (
    <div
      className={cn(
        "flex items-start gap-3 group",
        isSelf ? "justify-end" : "justify-start"
      )}
    >
      {!isSelf && (
        <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-muted text-accent-foreground font-bold text-xs">
                {getInitials(message.sender)}
            </AvatarFallback>
        </Avatar>
      )}
      <div className="flex items-start gap-2 max-w-[70%]">
        <div
          className={cn(
            "rounded-2xl p-3 px-4 shadow-sm relative",
            isSelf
              ? "rounded-br-lg bg-gradient-to-r from-pink-500 to-purple-600 text-primary-foreground"
              : "rounded-bl-lg bg-card border"
          )}
        >
          {!isSelf && (
            <p className="mb-1 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">{message.sender}</p>
          )}
          <p className="text-sm" style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}>
              {message.content}
          </p>
          <p
            className={cn(
              "mt-1 text-right text-[10px]",
              isSelf ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {formattedTimestamp}
          </p>
        </div>
        
        {/* Report button - only show for other users' messages */}
        {!isSelf && (
          <div className="pt-2">
            <ReportButton 
              messageId={message.id} 
              senderId={message.senderId} 
              content={message.content} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
