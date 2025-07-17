
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { CreateStoryDialog } from "./CreateStoryDialog";

interface StoriesHeaderProps {
  isNewStoryDialogOpen: boolean;
  onNewStoryDialogOpenChange: (open: boolean) => void;
  onCreateStory: (title: string, description: string) => void;
  onExport: (platform: string) => void;
}

export function StoriesHeader({
  isNewStoryDialogOpen,
  onNewStoryDialogOpenChange,
  onCreateStory,
  onExport
}: StoriesHeaderProps) {
  return (
    <div className="flex justify-between items-center p-6 border-b">
      <h1 className="text-2xl font-semibold">User Stories</h1>
      <div className="flex gap-2">
        <CreateStoryDialog
          isOpen={isNewStoryDialogOpen}
          onOpenChange={onNewStoryDialogOpenChange}
          onCreateStory={onCreateStory}
        />
        <Button onClick={() => onExport('Notion')} variant="outline" className="gap-2">
          <Check className="h-4 w-4" />
          Connect to Notion
        </Button>
      </div>
    </div>
  );
}
