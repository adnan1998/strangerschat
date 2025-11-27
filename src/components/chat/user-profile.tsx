
// "use client";

// import { useSelector } from 'react-redux';
// import { type RootState } from '@/lib/redux/store';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { cn } from '@/lib/utils';

// export function UserProfile() {
//   const { user } = useSelector((state: RootState) => state.session);

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="flex items-center gap-3 p-3">
//       <div className="relative">
//         <Avatar className="h-11 w-11 border-2 border-pink-300 dark:border-pink-700 shadow-lg">
//           <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-pink-400 to-purple-500 text-white">
//             {user.username.slice(0, 2).toUpperCase()}
//           </AvatarFallback>
//         </Avatar>
        
//         {/* Online indicator */}
//         <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse shadow-sm"></div>
//       </div>
      
//       <div className="flex-1 min-w-0">
//         <h3 className="font-bold text-base truncate bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//           {user.username}
//         </h3>
//         <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
//           <span className="text-sm">{user.gender === 'Male' ? '👨' : '👩'}</span>
//           <span>{user.age}</span>
//           <span>/</span>
//           <span className={cn(
//             user.gender === 'Male' ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400', 
//             'font-semibold'
//           )}>
//             {user.gender}
//           </span>
//         </div>
//       </div>
      
//       <div className="flex flex-col items-center">
//         <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mb-1"></div>
//         <span className="text-xs font-medium text-green-600 dark:text-green-400">Online</span>
//       </div>
//     </div>
//   );
// }



"use client";

import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/lib/redux/store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { login } from '@/lib/redux/slices/sessionSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Gender } from '@/types';


export function UserProfile() {
  const { user } = useSelector((state: RootState) => state.session);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  const handleGenderChange = (newGender: Gender) => {
    if (!firestore || !user) return;

    const updatedUser = { ...user, gender: newGender };
    const userDocRef = doc(firestore, 'users', user.id);
    const onlineUserDocRef = doc(firestore, 'online_users', user.id);
    
    // Update redux state immediately for instant UI feedback
    dispatch(login(updatedUser));

    // Update firestore documents
    updateDocumentNonBlocking(userDocRef, { gender: newGender });
    updateDocumentNonBlocking(onlineUserDocRef, { gender: newGender });
  }

  return (
    <div className="flex items-center gap-3 p-3">
        <div className="relative">
            <Avatar className="h-11 w-11 border-2 border-transparent">
                <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
             <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-sidebar-background"></div>
        </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between w-full">
            <h3 className="font-bold text-base truncate">{user.username}</h3>
             <Badge variant="outline" className="text-green-600 border-green-400 bg-green-500/10 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Online
            </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span>{user.age}</span>
          <span>/</span>
          <Select onValueChange={handleGenderChange} defaultValue={user.gender}>
            <SelectTrigger className={cn(
                "h-auto p-0 focus:ring-0 focus:ring-offset-0 text-xs w-auto gap-1 border-0 bg-transparent",
                "data-[placeholder]:text-muted-foreground",
                 user.gender === 'Male' ? 'text-blue-500' : 'text-pink-500', 
                'font-semibold hover:bg-accent/50 rounded-sm px-1'
            )}>
                <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
