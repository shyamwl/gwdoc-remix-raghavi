
import { useState } from "react";
import { GripVertical, ChevronRight, ChevronDown, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lightbox } from "./Lightbox";
import type { ScreenItem } from "@/types/screens";

interface ScreenItemCardProps {
  screen: ScreenItem;
  hasChildren: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onToggleExpand: (id: string) => void;
  onDescriptionChange: (id: string, description: string) => void;
  onDelete: (id: string) => void;
}

export function ScreenItemCard({
  screen,
  hasChildren,
  onDragStart,
  onDragEnd,
  onToggleExpand,
  onDescriptionChange,
  onDelete,
}: ScreenItemCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="flex gap-4 items-start"
        draggable
        onDragStart={(e) => onDragStart(e, screen.id)}
        onDragEnd={onDragEnd}
      >
        <div className="cursor-move">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-shrink-0">
          <img
            src={screen.image}
            alt={`Screen ${screen.id}`}
            className="w-48 h-[10.5rem] object-contain rounded-md cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setLightboxOpen(true)}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => onToggleExpand(screen.id)}
              className={`${hasChildren ? "" : "invisible"}`}
            >
              {screen.isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <span className="font-medium">Screen {screen.id}</span>
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(screen.id)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete screen</span>
              </Button>
            </div>
          </div>
          <Textarea
            value={screen.description}
            onChange={(e) => onDescriptionChange(screen.id, e.target.value)}
            placeholder="Enter screen description..."
            className="min-h-[100px]"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {screen.description.length} / 500 characters
          </div>
        </div>
      </div>

      {/* Lightbox for full screen image view */}
      <Lightbox
        image={screen.image}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
