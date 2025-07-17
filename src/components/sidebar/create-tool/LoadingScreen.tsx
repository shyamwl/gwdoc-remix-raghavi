
import React from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingScreenProps {
  streamedText: string;
  requirement: string;
  example: string;
  categoryTitle: string;
}

export function LoadingScreen({ 
  streamedText, 
  requirement, 
  example,
  categoryTitle 
}: LoadingScreenProps) {
  return (
    <div className="py-6 space-y-4">
      <div className="flex justify-center mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium">Generating custom tool prompt...</p>
        
        <div className="border p-3 rounded-md bg-muted/30 h-36 overflow-y-auto">
          <p className="text-sm font-mono">{streamedText}<span className="animate-pulse">|</span></p>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
