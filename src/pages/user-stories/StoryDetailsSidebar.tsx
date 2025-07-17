import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserStory, EditHistory } from "./types";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Edit, Check, Save, Loader, Maximize, Minimize, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { StoryEditHistory } from "./StoryEditHistory";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StoryDetailsSidebarProps {
  story: UserStory | null;
  onClose: () => void;
  onToggleChecklistItem: (storyId: string, itemId: string, checked: boolean) => void;
  onDescriptionChange: (description: string) => void;
  onAddChecklistItem?: (storyId: string, text: string) => void;
  onEditChecklistItem?: (storyId: string, itemId: string, text: string) => void;
  onDeleteChecklistItem?: (storyId: string, itemId: string) => void;
}

export function StoryDetailsSidebar({ 
  story, 
  onClose, 
  onToggleChecklistItem, 
  onDescriptionChange,
  onAddChecklistItem,
  onEditChecklistItem,
  onDeleteChecklistItem
}: StoryDetailsSidebarProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editItemText, setEditItemText] = useState("");
  const [generatingCriteria, setGeneratingCriteria] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [pendingDescription, setPendingDescription] = useState("");
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  const sampleHistory: EditHistory[] = [
    {
      id: "1",
      userId: "1",
      userName: "Alice Smith",
      timestamp: new Date('2025-04-23T10:30:00'),
      field: "description",
      oldValue: "Original description",
      newValue: "Updated description with more details"
    },
    {
      id: "2",
      userId: "2",
      userName: "Bob Johnson",
      timestamp: new Date('2025-04-23T09:15:00'),
      field: "status",
      oldValue: "todo",
      newValue: "in-progress"
    },
    {
      id: "3",
      userId: "3",
      userName: "Carol Williams",
      timestamp: new Date('2025-04-22T16:45:00'),
      field: "story points",
      oldValue: "3",
      newValue: "5"
    }
  ];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isFullScreen]);

  const handleDescriptionEdit = () => {
    if (story) {
      setPendingDescription(story.description);
      setEditingDescription(true);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPendingDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    if (story && pendingDescription !== story.description) {
      onDescriptionChange(pendingDescription);
      setIsSaving(true);
      
      setTimeout(() => {
        setIsSaving(false);
        setEditingDescription(false);
        
        toast({
          title: "Changes saved",
          description: "Your changes have been saved successfully",
        });
      }, 1000);
    } else {
      setEditingDescription(false);
    }
  };

  const handleCancelDescription = () => {
    if (story && pendingDescription !== story.description) {
      setShowUnsavedDialog(true);
    } else {
      setEditingDescription(false);
    }
  };

  const handleCloseWithCheck = () => {
    if (editingDescription && story && pendingDescription !== story.description) {
      setShowUnsavedDialog(true);
    } else {
      onClose();
    }
  };

  const handleAddItem = () => {
    if (!story || !newItemText.trim() || !onAddChecklistItem) return;
    
    onAddChecklistItem(story.id, newItemText.trim());
    setNewItemText("");
    toast({
      title: "Item added",
      description: "New checklist item added successfully",
    });
  };

  const startEditItem = (id: string, text: string) => {
    setEditItemId(id);
    setEditItemText(text);
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setEditItemText("");
  };

  const saveEdit = (id: string) => {
    if (!story || !editItemText.trim() || !onEditChecklistItem) return;
    
    onEditChecklistItem(story.id, id, editItemText.trim());
    setEditItemId(null);
    setEditItemText("");
    toast({
      title: "Item updated",
      description: "Checklist item updated successfully",
    });
  };

  const deleteItem = (id: string) => {
    if (!story || !onDeleteChecklistItem) return;
    
    onDeleteChecklistItem(story.id, id);
    toast({
      title: "Item deleted",
      description: "Checklist item removed",
    });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useState(() => {
    if (story) {
      setGeneratingCriteria(true);
      
      setTimeout(() => {
        setGeneratingCriteria(false);
        toast({
          title: "Acceptance criteria generated",
          description: "Acceptance criteria has been successfully generated.",
          variant: "default",
        });
      }, 2000);
    }
    
    return () => {
      setGeneratingCriteria(false);
    };
  });

  return (
    <>
      {isFullScreen && (
        <div className="fixed inset-0 bg-background z-[100] p-6 overflow-auto">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{story?.title}</h2>
              <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
                <Minimize className="h-5 w-5" />
                <span className="sr-only">Exit Full Screen</span>
              </Button>
            </div>
            
            <div className="relative">
              <Textarea
                className="min-h-[70vh] font-mono text-base p-4 w-full"
                value={editingDescription ? pendingDescription : story?.description || ""}
                onChange={handleDescriptionChange}
                disabled={!editingDescription}
                autoFocus={isFullScreen && editingDescription}
              />
              {isSaving && (
                <div className="absolute top-2 right-2 text-sm text-muted-foreground">
                  Saving...
                </div>
              )}
              
              {editingDescription ? (
                <div className="mt-4 flex justify-end gap-2">
                  <Button onClick={handleSaveDescription} size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button onClick={handleCancelDescription} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleDescriptionEdit} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Sheet open={!!story && !isFullScreen} onOpenChange={handleCloseWithCheck}>
        <SheetContent className="w-full sm:max-w-xl">
          {story && (
            <ScrollArea className="h-[calc(100vh-2rem)] pr-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{story.title}</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <History className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowHistoryDialog(true)}>
                        See History
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {generatingCriteria && (
                  <div className="flex items-center py-3 px-4 bg-muted/50 rounded-md animate-pulse gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Generating acceptance criteria...</span>
                  </div>
                )}
                
                <div className="relative">
                  <div className="flex items-center justify-end mb-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleFullScreen} 
                      className="h-8"
                    >
                      <Maximize className="h-4 w-4 mr-1" />
                      Full Screen
                    </Button>
                  </div>
                  <Textarea
                    className="min-h-[300px] font-mono text-sm"
                    value={editingDescription ? pendingDescription : story.description}
                    onChange={handleDescriptionChange}
                    disabled={!editingDescription}
                  />
                  {isSaving && (
                    <div className="absolute top-2 right-2 text-sm text-muted-foreground">
                      Saving...
                    </div>
                  )}
                  
                  {editingDescription ? (
                    <div className="mt-2 flex justify-end gap-2">
                      <Button onClick={handleSaveDescription} size="sm">
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleCancelDescription} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-2 flex justify-end">
                      <Button onClick={handleDescriptionEdit} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Checklist</h3>
                  </div>

                  <div className="space-y-2">
                    {story.checklist.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        {editItemId === item.id ? (
                          <>
                            <Input 
                              value={editItemText}
                              onChange={(e) => setEditItemText(e.target.value)}
                              className="flex-grow"
                              autoFocus
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => saveEdit(item.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={cancelEdit}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Checkbox
                              checked={item.checked}
                              onCheckedChange={(checked) => 
                                onToggleChecklistItem(story.id, item.id, checked as boolean)
                              }
                              id={`checkbox-${item.id}`}
                            />
                            <label
                              htmlFor={`checkbox-${item.id}`}
                              className={cn(
                                "text-sm cursor-pointer flex-grow",
                                item.checked && "line-through text-muted-foreground"
                              )}
                            >
                              {item.text}
                            </label>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => startEditItem(item.id, item.text)}
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteItem(item.id)}
                            >
                              <X className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Input
                      placeholder="Add new checklist item"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newItemText.trim()) {
                          handleAddItem();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleAddItem}
                      disabled={!newItemText.trim()}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit History</DialogTitle>
          </DialogHeader>
          <StoryEditHistory history={sampleHistory} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Would you like to save them before closing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowUnsavedDialog(false);
              setEditingDescription(false);
              if (story) {
                setPendingDescription(story.description);
              }
            }}>Discard</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              handleSaveDescription();
              setShowUnsavedDialog(false);
            }}>Save changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
