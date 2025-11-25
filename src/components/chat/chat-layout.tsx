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
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <ChatPanel />
      </SidebarInset>
    </SidebarProvider>
  );
}
