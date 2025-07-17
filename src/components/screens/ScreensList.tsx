
import { ScreenItemCard } from "./ScreenItemCard";
import type { ScreenItem, DragTarget } from "@/types/screens";

interface ScreensListProps {
  screens: ScreenItem[];
  dragTarget: DragTarget | null;
  draggedId: string | null;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onToggleExpand: (id: string) => void;
  onDescriptionChange: (id: string, description: string) => void;
  onDelete: (id: string) => void;
}

export function ScreensList({
  screens,
  dragTarget,
  draggedId,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onToggleExpand,
  onDescriptionChange,
  onDelete
}: ScreensListProps) {
  const renderScreen = (screen: ScreenItem, index: number, level: number = 0) => {
    const hasChildren = screens.some(s => s.parentId === screen.id);
    const children = screens.filter(s => s.parentId === screen.id);
    const isDragged = draggedId === screen.id;

    return (
      <div key={screen.id} className="space-y-4">
        <div
          className={`relative border rounded-lg p-4 bg-background ${isDragged ? 'opacity-50' : ''}`}
          data-drop-container
          data-index={index}
          data-id={screen.id}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{ marginLeft: `${level * 2}rem` }}
        >
          {/* Show drop indicator only if this is not the dragged item */}
          {dragTarget?.index === index && !isDragged && (
            <>
              {dragTarget.isNested ? (
                <div className="absolute top-0 bottom-0 right-0 w-1 bg-primary" />
              ) : (
                <div className="absolute -top-2 left-0 right-0 h-1 bg-primary" />
              )}
            </>
          )}
          <ScreenItemCard
            screen={screen}
            hasChildren={hasChildren}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onToggleExpand={onToggleExpand}
            onDescriptionChange={onDescriptionChange}
            onDelete={onDelete}
          />
        </div>
        {screen.isExpanded && children.map((child, childIndex) => 
          renderScreen(child, screens.findIndex(s => s.id === child.id), level + 1)
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {screens.filter(screen => !screen.parentId).map((screen, index) => 
        renderScreen(screen, screens.findIndex(s => s.id === screen.id))
      )}
    </div>
  );
}
