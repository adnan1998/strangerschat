
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
