
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeletonLoader() {
  return (
    <div className="flex h-screen w-screen bg-background">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex h-full w-72 flex-col border-r bg-muted/30 p-2 gap-2">
        {/* User Profile Skeleton */}
        <div className="p-3 flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
        
        {/* Tabs Skeleton */}
        <div className="border-b">
            <Skeleton className="h-10 w-full" />
        </div>

        {/* List Skeleton */}
        <div className="flex-1 p-2 space-y-3">
            <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-3 w-2/3" />
                </div>
            </div>
             <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
        </div>

        {/* Footer Skeleton */}
        <div className="border-t p-2">
            <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      {/* Main Chat Panel Skeleton */}
      <div className="flex flex-1 flex-col">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 border-b p-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
        
        {/* Message Area Skeleton */}
        <div className="flex-1 p-4 space-y-6">
            <div className="flex items-end gap-3 justify-start">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-16 w-3/5 rounded-2xl" />
            </div>
            <div className="flex items-end gap-3 justify-end">
                <Skeleton className="h-20 w-1/2 rounded-2xl" />
            </div>
            <div className="flex items-end gap-3 justify-start">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-12 w-2/5 rounded-2xl" />
            </div>
            <div className="flex items-end gap-3 justify-end">
                <Skeleton className="h-16 w-3/5 rounded-2xl" />
            </div>
        </div>
        
        {/* Message Input Skeleton */}
        <div className="border-t p-4">
            <div className="flex items-center gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10 rounded-md" />
            </div>
        </div>
      </div>
    </div>
  );
}
