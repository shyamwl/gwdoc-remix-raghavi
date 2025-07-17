
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditHistory } from "./types";
import { UserRound } from "lucide-react";

interface StoryEditHistoryProps {
  history?: EditHistory[];
}

export function StoryEditHistory({ history = [] }: StoryEditHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-4">
        No edit history available
      </div>
    );
  }

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-4 p-4">
        {history.map((edit) => (
          <div key={edit.id} className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <UserRound className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{edit.userName}</p>
                <time className="text-xs text-muted-foreground">
                  {format(edit.timestamp, "MMM d, yyyy 'at' h:mm a")}
                </time>
              </div>
              <p className="text-sm text-muted-foreground">
                Changed {edit.field} from <span className="text-destructive">{edit.oldValue}</span> to{" "}
                <span className="text-primary">{edit.newValue}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
