
"use client";

import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { type RootState } from "@/lib/redux/store";
import { type Message as MessageType } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
        "flex items-end gap-3",
        isSelf ? "justify-end" : "justify-start"
      )}
    >
      {!isSelf && (
        <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-800 shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white font-bold text-xs">
                {getInitials(message.sender)}
            </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] inline-block rounded-2xl px-3 py-2 shadow-md backdrop-blur-sm border transition-all duration-300",
          isSelf
            ? "rounded-br-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white border-pink-300/50"
            : "rounded-bl-lg bg-white/90 dark:bg-gray-800/90 border-purple-200/50 dark:border-purple-800/50"
        )}
      >
        {!isSelf && (
          <p className="mb-1 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {message.sender}
          </p>
        )}
        <p className={cn(
          "text-sm leading-normal",
          isSelf ? "text-white" : "text-gray-800 dark:text-gray-200"
        )} style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}>
            {message.content}
        </p>
        <p
          className={cn(
            "mt-1 text-right text-[10px] leading-none",
            isSelf ? "text-white/70" : "text-gray-500 dark:text-gray-400"
          )}
        >
          {formattedTimestamp}
        </p>
      </div>
      
      {isSelf && (
        <Avatar className="h-8 w-8 border-2 border-pink-200 dark:border-pink-800 shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold text-xs">
                You
            </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
