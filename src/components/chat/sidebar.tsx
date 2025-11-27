
// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { LogOut, Globe, Users, MessageSquare } from "lucide-react";
// import { logoutAndLeave } from "@/lib/redux/slices/sessionSlice";
// import { setActiveChatRoom } from "@/lib/redux/slices/chatSlice";
// import { UserProfile } from "./user-profile";
// import { UserList } from "./user-list";
// import { PrivateChatList } from "./private-chat-list";
// import {
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { type RootState, type AppDispatch } from "@/lib/redux/store";

// export function AppSidebar() {
//   const dispatch: AppDispatch = useDispatch();
//   const { unreadCounts } = useSelector((state: RootState) => state.chat);
//   const { setOpenMobile } = useSidebar();

//   const unreadPrivateMessages = Object.entries(unreadCounts)
//     .filter(([key]) => key !== 'global')
//     .reduce((acc, [, count]) => acc + count, 0);
  
//   const handleLogout = () => {
//     dispatch(logoutAndLeave());
//   };

//   const handleGlobalLobbyClick = () => {
//     dispatch(setActiveChatRoom('global'));
//     setOpenMobile(false);
//   }

//   return (
//     <>
//       <SidebarHeader className="border-b border-pink-200/50 dark:border-pink-800/30 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30">
//         <UserProfile />
//       </SidebarHeader>

//       <SidebarContent className="p-0">
//         <Tabs defaultValue="users" className="flex flex-col h-full">
//             <TabsList className="w-full justify-around rounded-none bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 p-1 border-b border-pink-200/50 dark:border-pink-800/30">
//                 <TabsTrigger value="lobby" className="flex-1 gap-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-pink-500 data-[state=active]:text-pink-600 dark:data-[state=active]:text-pink-400 hover:bg-pink-100/50 dark:hover:bg-pink-950/20 transition-colors py-2.5 px-3 flex items-center justify-center text-xs font-medium">
//                     <span>🌍</span>
//                     <span className="hidden sm:inline">Lobby</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="users" className="flex-1 gap-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 hover:bg-purple-100/50 dark:hover:bg-purple-950/20 transition-colors py-2.5 px-3 flex items-center justify-center text-xs font-medium">
//                     <span>👥</span>
//                     <span className="hidden sm:inline">Users</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="chats" className="relative flex-1 gap-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-950/20 transition-colors py-2.5 px-3 flex items-center justify-center text-xs font-medium">
//                     <span>💬</span>
//                     <span className="hidden sm:inline">Chats</span>
//                     {unreadPrivateMessages > 0 && (
//                         <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-xs text-white font-bold animate-pulse shadow-lg">
//                             {unreadPrivateMessages > 9 ? '9+' : unreadPrivateMessages}
//                         </span>
//                     )}
//                 </TabsTrigger>
//             </TabsList>
//             <TabsContent value="lobby" className="flex-1 p-3">
//                 <Button 
//                   variant="ghost" 
//                   className="w-full justify-start text-base bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30 hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-900/40 dark:hover:to-purple-900/40 border border-pink-200 dark:border-pink-800 rounded-xl transition-all duration-300 font-semibold" 
//                   onClick={handleGlobalLobbyClick}
//                 >
//                   <span className="mr-2 text-lg">🌍</span>
//                   # Global Lobby
//                 </Button>
//             </TabsContent>
//             <TabsContent value="users" className="flex-1 overflow-auto">
//                 <UserList />
//             </TabsContent>
//             <TabsContent value="chats" className="flex-1 overflow-auto">
//                 <PrivateChatList />
//             </TabsContent>
//         </Tabs>
//       </SidebarContent>

//       <SidebarFooter className="border-t border-pink-200/50 dark:border-pink-800/30 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 p-3">
//         <Button
//           variant="ghost"
//           className="w-full justify-start text-base hover:bg-red-100 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 border border-red-200 dark:border-red-800 rounded-xl transition-all duration-300"
//           onClick={handleLogout}
//         >
//           <LogOut className="mr-2 h-4 w-4" />
//           <span className="mr-2 text-lg">👋</span>
//           Logout
//         </Button>
//       </SidebarFooter>
//     </>
//   );
// }


"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { LogOut, Globe, Users, MessageSquare } from "lucide-react";
import { logoutAndLeave } from "@/lib/redux/slices/sessionSlice";
import { setActiveChatRoom } from "@/lib/redux/slices/chatSlice";
import { UserProfile } from "./user-profile";
import { UserList } from "./user-list";
import { PrivateChatList } from "./private-chat-list";
import {
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type RootState, type AppDispatch } from "@/lib/redux/store";

export function AppSidebar() {
  const dispatch: AppDispatch = useDispatch();
  const { unreadCounts } = useSelector((state: RootState) => state.chat);
  const { setOpenMobile } = useSidebar();

  const unreadPrivateMessages = Object.entries(unreadCounts)
    .filter(([key]) => key !== 'global')
    .reduce((acc, [, count]) => acc + count, 0);
  
  const handleLogout = () => {
    dispatch(logoutAndLeave());
  };

  const handleGlobalLobbyClick = () => {
    dispatch(setActiveChatRoom('global'));
    setOpenMobile(false);
  }

  return (
    <>
      <SidebarHeader className="border-b">
        <UserProfile />
      </SidebarHeader>

      <SidebarContent className="p-0">
        <Tabs defaultValue="users" className="flex flex-col h-full">
            <TabsList className="w-full justify-around rounded-none bg-transparent p-0 border-b">
                <TabsTrigger value="lobby" className="flex-1 gap-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary">
                    <Globe className="h-4 w-4" /> Lobby
                </TabsTrigger>
                <TabsTrigger value="users" className="flex-1 gap-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary">
                    <Users className="h-4 w-4" /> Users
                </TabsTrigger>
                <TabsTrigger value="chats" className="relative flex-1 gap-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary">
                    <MessageSquare className="h-4 w-4" /> Chats
                    {unreadPrivateMessages > 0 && (
                        <span className="absolute top-1 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                            {unreadPrivateMessages > 9 ? '9+' : unreadPrivateMessages}
                        </span>
                    )}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="lobby" className="flex-1 p-2">
                <Button variant="ghost" className="w-full justify-start text-base" onClick={handleGlobalLobbyClick}>
                    # Global Lobby
                </Button>
            </TabsContent>
            <TabsContent value="users" className="flex-1 overflow-auto">
                <UserList />
            </TabsContent>
            <TabsContent value="chats" className="flex-1 overflow-auto">
                <PrivateChatList />
            </TabsContent>
        </Tabs>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-base"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </>
  );
}
