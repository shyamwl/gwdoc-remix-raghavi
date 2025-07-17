
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ScreensPageHeaderProps {
  onAddImages: () => void;
}

export function ScreensPageHeader({ onAddImages }: ScreensPageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Describe UI Screens</h1>
        <p className="text-muted-foreground">
          Add descriptions for each screen and drag to reorder them
        </p>
      </div>
      <div>
        <Button
          onClick={onAddImages}
          variant="outline"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Images
        </Button>
      </div>
    </div>
  );
}
