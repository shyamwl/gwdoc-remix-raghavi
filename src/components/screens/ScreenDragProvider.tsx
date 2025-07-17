
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import type { ScreenItem, DragTarget } from "@/types/screens";

interface ScreenDragProviderProps {
  screens: ScreenItem[];
  setScreens: React.Dispatch<React.SetStateAction<ScreenItem[]>>;
  children: (handlers: ScreenDragHandlers) => React.ReactNode;
}

export interface ScreenDragHandlers {
  dragTarget: DragTarget | null;
  draggedId: string | null;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragEnd: () => void;
}

export function ScreenDragProvider({ screens, setScreens, children }: ScreenDragProviderProps) {
  const [dragTarget, setDragTarget] = useState<DragTarget | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedId) return;
    
    const target = e.target as HTMLElement;
    const dropContainer = target.closest("[data-drop-container]");
    if (!dropContainer) return;

    const rect = dropContainer.getBoundingClientRect();
    const index = parseInt(dropContainer.getAttribute("data-index") || "0");
    const isNested = e.clientX - rect.left > rect.width * 0.75;
    
    // Don't allow dropping on itself
    const targetScreen = screens[index];
    const draggedScreen = screens.find(s => s.id === draggedId);
    
    if (!targetScreen || !draggedScreen) return;
    
    // Don't allow nesting under self
    if (isNested && targetScreen.id === draggedId) {
      setDragTarget(null);
      return;
    }
    
    // Don't allow nesting under own children (prevents circular references)
    if (isNested && isChildOf(screens, targetScreen.id, draggedId)) {
      setDragTarget(null);
      return;
    }

    // Don't allow nesting under another nested screen (only one level of nesting)
    if (isNested && targetScreen.parentId !== null) {
      setDragTarget(null);
      return;
    }

    setDragTarget({ index, isNested });
  };

  const handleDragLeave = () => {
    setDragTarget(null);
  };

  const handleDragEnd = () => {
    setDragTarget(null);
    setDraggedId(null);
  };

  // Helper function to check if a screen is a child of another screen
  const isChildOf = (screens: ScreenItem[], childId: string, parentId: string): boolean => {
    const child = screens.find(s => s.id === childId);
    if (!child) return false;
    if (child.parentId === parentId) return true;
    if (child.parentId === null) return false;
    return isChildOf(screens, child.parentId, parentId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("text/plain");
    
    if (!dragTarget || !droppedId) {
      setDragTarget(null);
      setDraggedId(null);
      return;
    }
    
    setScreens(prev => {
      const newScreens = [...prev];
      const draggedIndex = newScreens.findIndex(s => s.id === droppedId);
      
      if (draggedIndex === -1) {
        return prev;
      }
      
      const draggedScreen = {...newScreens[draggedIndex]};
      
      // Don't allow items with children to be nested
      if (dragTarget.isNested && newScreens.some(s => s.parentId === draggedScreen.id)) {
        toast({
          title: "Cannot nest",
          description: "Items with nested screens cannot be nested under other items",
          variant: "destructive"
        });
        return prev;
      }

      // Remove the dragged screen from its current position
      newScreens.splice(draggedIndex, 1);

      if (dragTarget.isNested) {
        // Set parent ID for nesting
        draggedScreen.parentId = newScreens[dragTarget.index].id;
        
        // Find all screens with same parent to determine position
        const siblingScreens = newScreens.filter(s => s.parentId === draggedScreen.parentId);
        
        if (siblingScreens.length === 0) {
          // Insert right after the parent
          const parentIndex = newScreens.findIndex(s => s.id === draggedScreen.parentId);
          newScreens.splice(parentIndex + 1, 0, draggedScreen);
        } else {
          // Insert at the end of the siblings
          const lastSiblingIndex = newScreens.findIndex(s => s.id === siblingScreens[siblingScreens.length - 1].id);
          newScreens.splice(lastSiblingIndex + 1, 0, draggedScreen);
        }
      } else {
        // Regular insertion (not nested)
        draggedScreen.parentId = null;
        
        // Insert at the target index
        // Adjust the index if needed (based on whether the dragged item was before or after the drop target)
        let insertIndex = dragTarget.index;
        if (draggedIndex < dragTarget.index) {
          insertIndex -= 1;
        }
        newScreens.splice(insertIndex + 1, 0, draggedScreen);
      }

      return newScreens;
    });
    
    setDragTarget(null);
    setDraggedId(null);
  };

  return (
    <>
      {children({
        dragTarget,
        draggedId,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd
      })}
    </>
  );
}
