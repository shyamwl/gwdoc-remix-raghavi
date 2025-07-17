
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <Skeleton className="h-12 w-64 mx-auto" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
          <Skeleton className="h-4 w-4/6 mx-auto" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-14 w-48 mx-auto rounded-md" />
          <p className="text-sm text-muted-foreground animate-pulse">Generating user stories...</p>
        </div>
      </div>
    </div>
  );
}
