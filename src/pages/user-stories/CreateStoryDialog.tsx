
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface CreateStoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateStory: (title: string, description: string) => void;
}

export function CreateStoryDialog({ 
  isOpen, 
  onOpenChange, 
  onCreateStory 
}: CreateStoryDialogProps) {
  const [newStory, setNewStory] = useState({ title: "", description: "" });

  const handleCreateStory = () => {
    onCreateStory(newStory.title, newStory.description);
    setNewStory({ title: "", description: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Story
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User Story</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter story title"
              value={newStory.title}
              onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="description">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter story description..."
              value={newStory.description}
              onChange={(e) => setNewStory(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[150px]"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreateStory}>
              Create Story
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
