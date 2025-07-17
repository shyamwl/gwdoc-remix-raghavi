
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FolderIcon, Plus } from "lucide-react";
import { useState } from "react";

interface EmptyProjectStateProps {
  isCreateProjectDialogOpen: boolean;
  setIsCreateProjectDialogOpen: (open: boolean) => void;
  handleProjectSubmit: (e: React.FormEvent) => void;
}

export function EmptyProjectState({
  isCreateProjectDialogOpen,
  setIsCreateProjectDialogOpen,
  handleProjectSubmit,
}: EmptyProjectStateProps) {
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: ""
  });

  return (
    <div className="container mx-auto py-16">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <FolderIcon className="h-16 w-16 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">No projects yet</h3>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first project
          </p>
        </div>
        <Button onClick={() => setIsCreateProjectDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Project
        </Button>
      </div>

      {/* Create Project Dialog */}
      <Dialog open={isCreateProjectDialogOpen} onOpenChange={setIsCreateProjectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProjectSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" value={projectFormData.name} onChange={e => setProjectFormData({
                ...projectFormData,
                name: e.target.value
              })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea id="project-description" value={projectFormData.description} onChange={e => setProjectFormData({
                ...projectFormData,
                description: e.target.value
              })} required />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
