
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import type { ScreenItem } from "@/types/screens";

interface ScreenActionsProps {
  screens: ScreenItem[];
  setScreens: React.Dispatch<React.SetStateAction<ScreenItem[]>>;
  children: (handlers: ScreenActionHandlers) => React.ReactNode;
}

export interface ScreenActionHandlers {
  handleToggleExpand: (id: string) => void;
  handleDescriptionChange: (id: string, description: string) => void;
  handleDeleteScreen: (id: string) => void;
  handleNewImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ScreenActions({ screens, setScreens, children }: ScreenActionsProps) {
  const handleToggleExpand = (id: string) => {
    setScreens(prev =>
      prev.map(screen =>
        screen.id === id ? { ...screen, isExpanded: !screen.isExpanded } : screen
      )
    );
  };

  const handleDescriptionChange = (id: string, description: string) => {
    setScreens(prev =>
      prev.map(screen =>
        screen.id === id ? { ...screen, description } : screen
      )
    );
  };

  const handleDeleteScreen = (id: string) => {
    // Check if the screen has children
    const hasChildren = screens.some(screen => screen.parentId === id);
    
    if (hasChildren) {
      toast({
        title: "Cannot delete",
        description: "This screen has nested screens. Please delete or move those first.",
        variant: "destructive"
      });
      return;
    }
    
    // Remove the screen
    setScreens(prev => prev.filter(screen => screen.id !== id));
    
    toast({
      title: "Screen deleted",
      description: "The screen has been removed successfully."
    });
  };

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      
      if (screens.length + imageFiles.length > 20) {
        toast({
          title: "Error",
          description: "You can only have up to 20 images",
          variant: "destructive"
        });
        return;
      }

      const newImages: ScreenItem[] = imageFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        image: URL.createObjectURL(file),
        description: file.name.replace(/\.[^/.]+$/, ""),
        parentId: null,
        isExpanded: true
      }));

      setScreens(prev => [...prev, ...newImages]);
    }
  };

  return (
    <>
      {children({
        handleToggleExpand,
        handleDescriptionChange,
        handleDeleteScreen,
        handleNewImage
      })}
    </>
  );
}
