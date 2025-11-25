
"use client";

import { useSelector } from 'react-redux';
import { type RootState } from '@/lib/redux/store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function UserProfile() {
  const { user } = useSelector((state: RootState) => state.session);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 p-3">
      <Avatar className="h-11 w-11 border-2 border-primary/50">
        <AvatarFallback className="text-lg font-bold bg-background text-primary">
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-bold text-base truncate">{user.username}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{user.age}</span>
          <span>/</span>
          <span className={cn(user.gender === 'Male' ? 'text-blue-500' : 'text-pink-500', 'font-semibold')}>{user.gender}</span>
        </div>
      </div>
      <Badge variant="outline" className="text-green-600 border-green-400 bg-green-500/10 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        Online
      </Badge>
    </div>
  );
}
