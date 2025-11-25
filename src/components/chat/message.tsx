
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
        <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-accent text-accent-foreground font-bold text-xs">
                {getInitials(message.sender)}
            </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-2xl p-3 px-4 shadow-md",
          isSelf
            ? "rounded-br-lg bg-primary text-primary-foreground"
            : "rounded-bl-lg bg-card"
        )}
      >
        {!isSelf && (
          <p className="mb-1 text-xs font-bold text-primary">{message.sender}</p>
        )}
        <p className="text-sm" style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}>
            {message.content}
        </p>
        <p
          className={cn(
            "mt-2 text-right text-[10px]",
            isSelf ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {formattedTimestamp}
        </p>
      </div>
    </div>
  );
}
