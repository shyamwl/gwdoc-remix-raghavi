
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { Project } from "@/types/project";
import { ProjectDropdown } from "./ProjectDropdown";

interface ProjectHeaderProps {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
  handleEditProject: () => void;
  handleCreateProject: () => void;
  handleCreateEpic: () => void;
  projectDropdownOpen: boolean;
  setProjectDropdownOpen: (open: boolean) => void;
}

export function ProjectHeader({
  projects,
  selectedProject,
  setSelectedProject,
  handleEditProject,
  handleCreateProject,
  handleCreateEpic,
  projectDropdownOpen,
  setProjectDropdownOpen,
}: ProjectHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ProjectDropdown
            projects={projects}
            selectedProject={selectedProject}
            projectDropdownOpen={projectDropdownOpen}
            setProjectDropdownOpen={setProjectDropdownOpen}
            handleCreateProject={handleCreateProject}
            selectProject={setSelectedProject}
          />
          
          {selectedProject && (
            <Button variant="ghost" size="sm" onClick={handleEditProject}>
              <Pencil className="h-4 w-4 mr-1" />
              Edit Project
            </Button>
          )}
        </div>
      </div>
      
      <Button onClick={handleCreateEpic} className="gap-2">
        <Plus className="h-4 w-4" />
        Create New Epic
      </Button>
    </div>
  );
}
