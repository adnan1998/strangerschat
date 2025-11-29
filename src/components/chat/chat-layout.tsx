"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";
import { useDispatch } from "react-redux";
import { logoutAndLeave } from "@/lib/redux/slices/sessionSlice";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "./sidebar";
import { ChatPanel } from "./chat-panel";
import { SafetyNotice } from "@/components/safety-notice";
import { type AppDispatch } from "@/lib/redux/store";


export function ChatLayout() {
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  useInactivityTimer(() => {
    dispatch(logoutAndLeave());
    toast({
      title: "Session Expired",
      description: "You have been logged out due to inactivity.",
      variant: "destructive"
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <SidebarProvider defaultOpen={true}>
        <Sidebar 
          className="border-r border-pink-200/50 dark:border-pink-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
        >
          <AppSidebar />
        </Sidebar>
        <SidebarInset className="bg-transparent flex-1 flex flex-col">
          <div className="flex-1">
            <ChatPanel />
          </div>
          {/* Safety notice at bottom */}
          <div className="p-4 border-t border-pink-200/50 dark:border-pink-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
            <SafetyNotice variant="compact" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
