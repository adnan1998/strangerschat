
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
      <div className="relative">
        <Avatar className="h-11 w-11 border-2 border-pink-300 dark:border-pink-700 shadow-lg">
          <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-pink-400 to-purple-500 text-white">
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Online indicator */}
        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse shadow-sm"></div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base truncate bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          {user.username}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
          <span className="text-sm">{user.gender === 'Male' ? '👨' : '👩'}</span>
          <span>{user.age}</span>
          <span>/</span>
          <span className={cn(
            user.gender === 'Male' ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400', 
            'font-semibold'
          )}>
            {user.gender}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mb-1"></div>
        <span className="text-xs font-medium text-green-600 dark:text-green-400">Online</span>
      </div>
    </div>
  );
}
